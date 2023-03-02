import { memo } from 'react';
import { Controller, useForm } from 'react-hook-form';

import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import { Box, Button, CircularProgress, Container, TextField, Typography } from '@mui/material';

import { useAppDispatch } from '~/store';
import { closeModalAction } from '~/store/ModalStack';
import { showErrorSnackbar, showSuccessSnackbar } from '~/store/Notifications';

import { useEditProductionArticleMutation } from '../store/';

export type prodactionArticleEditTypes = 'title' | 'content' | 'order';

interface IProjectDialogProps {
  productionArticle: IProductionArticleFull;
  edit: prodactionArticleEditTypes;
}

const ProductionArticleItemDialog = ({
  productionArticle,
  edit,
}: IProjectDialogProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const [editProductionArticle, { isLoading }] = useEditProductionArticleMutation();
  const { handleSubmit, control } = useForm<ISendProductionArticle>();

  const handleEditProductionArticle = handleSubmit(async (data) => {
    try {
      const sendData = { id: productionArticle._id, data };
      const res = await editProductionArticle(sendData).unwrap();
      dispatch(showSuccessSnackbar(`Статья ${res.title} успешно изменена`));
    } catch (e) {
      dispatch(showErrorSnackbar((e as IQueryError)?.data?.message || 'fail'));
    }
  });

  const validObj = () => {
    switch (edit) {
      case 'title':
        return { required: 'Введите заголовок статьи' };
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
            defaultValue={productionArticle[edit]}
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

        <Box sx={styles.actions}>
          <Button
            color='success'
            disabled={isLoading}
            variant='contained'
            endIcon={
              isLoading ? <CircularProgress color='inherit' size={20} /> : <SaveRoundedIcon />
            }
            onClick={handleEditProductionArticle}
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

export default memo(ProductionArticleItemDialog);
