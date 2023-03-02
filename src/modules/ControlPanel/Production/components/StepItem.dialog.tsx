import { memo, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';

import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  ListItemText,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';

import { useAppDispatch } from '~/store';
import { useGetProductionArticlesDataQuery } from '~/store/Data';
import { closeModalAction } from '~/store/ModalStack';
import { showErrorSnackbar, showSuccessSnackbar } from '~/store/Notifications';

import { useEditProductionStepMutation } from '../store';

export type stepEditTypes = 'title' | 'content' | 'order' | 'productionArticle';

interface IStepDialogProps {
  step: IStepFull;
  edit: stepEditTypes;
}

const StepItemDialog = ({ step, edit }: IStepDialogProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const { data } = useGetProductionArticlesDataQuery('');
  const articles = useMemo(
    () => (Array.isArray(data) ? data.filter((article) => article.content !== '') : []),
    [data],
  );
  const [editStep, { isLoading }] = useEditProductionStepMutation();
  const { handleSubmit, control } = useForm<ISendStep>();

  const handleEditStep = handleSubmit(async (data) => {
    try {
      const sendData = { id: step._id, data };
      const res = await editStep(sendData).unwrap();
      dispatch(showSuccessSnackbar(`Статья ${res.title} изменена`));
    } catch (e) {
      dispatch(showErrorSnackbar((e as IQueryError)?.data?.message || 'fail'));
    }
  });

  const validObj = () => {
    switch (edit) {
      case 'productionArticle':
        return { required: 'Выберите статью' };
      case 'title':
        return { required: 'Введите заголовок статьи' };
      case 'content':
        return { required: 'Напишите статью' };
      case 'order':
        return {
          required: 'Введите порядковый номер',
          pattern: {
            value: /^[0-9]*$/,
            message: 'Только цифры',
          },
        };
      default:
        return undefined;
    }
  };

  return (
    <Container sx={styles.dialog}>
      <Box component='form' sx={styles.form}>
        <Typography>Редактирование Статьи</Typography>

        {(edit === 'title' || edit === 'content' || edit === 'order') && (
          <Controller
            control={control}
            defaultValue={step[edit]}
            name={edit}
            rules={validObj()}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                error={!!error}
                helperText={error ? error.message : null}
                label={edit}
                maxRows={12}
                minRows={5}
                multiline={edit === 'content'}
                size='small'
                sx={styles.input}
                type='text'
                value={value}
                fullWidth
                onChange={onChange}
              />
            )}
          />
        )}

        {edit === 'productionArticle' && (
          <Controller
            control={control}
            name='productionArticle'
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                color={'warning'}
                error={!!error}
                helperText={error ? error.message : null}
                label='Выберите Статью'
                size='small'
                sx={styles.input}
                value={value}
                fullWidth
                select
                onChange={onChange}
              >
                <MenuItem value={undefined} dense></MenuItem>
                {articles?.map((article, i) => (
                  <MenuItem key={i} value={article._id} dense>
                    <ListItemText>{article.title}</ListItemText>
                  </MenuItem>
                )) || <p>wait...</p>}
              </TextField>
            )}
          />
        )}

        <Box sx={styles.actions}>
          <Button
            color='success'
            disabled={isLoading}
            variant='contained'
            endIcon={
              isLoading ? <CircularProgress color='inherit' size={20} /> : <SaveRoundedIcon />
            }
            onClick={handleEditStep}
          >
            Сохранить
          </Button>
          <Button variant='contained' onClick={() => dispatch(closeModalAction())}>
            Закрыть
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

const styles: TStyles = {
  actions: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  dialog: {
    padding: '24px',
  },
  form: {
    width: { sm: '300px', md: '600px' },
    '&>*:not(:last-child)': {
      mb: '12px',
    },
  },
  input: {
    minHeight: '60px',
  },
};

export default memo(StepItemDialog);
