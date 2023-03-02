import { memo } from 'react';
import { Controller, useForm } from 'react-hook-form';

import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import { Box, Button, CircularProgress, Container, TextField, Typography } from '@mui/material';

import { useAppDispatch } from '~/store';
import { closeModalAction } from '~/store/ModalStack';
import { showErrorSnackbar, showSuccessSnackbar } from '~/store/Notifications';

import { useEditStoryMutation } from '../store';

export type storyEditTypes = 'from' | 'content' | 'to';

interface IStoryDialogProps {
  story: IStoryFull;
  edit: storyEditTypes;
}

const StoryItemDialog = ({ story, edit }: IStoryDialogProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const [editStory, { isLoading }] = useEditStoryMutation();
  const { handleSubmit, control } = useForm<ISendStory>();

  const handleEditStory = handleSubmit(async (data) => {
    try {
      const sendData = { id: story._id, data };
      const res = await editStory(sendData).unwrap();
      dispatch(showSuccessSnackbar(`История ${res.from} изменена`));
    } catch (e) {
      dispatch(showErrorSnackbar((e as IQueryError)?.data?.message || 'fail'));
    }
  });

  const validObj = () => {
    switch (edit) {
      case 'content':
        return { required: 'Напишите историю' };
      case 'from':
        return {
          required: 'Введите год',
          pattern: {
            value: /^[0-9]*$/,
            message: 'Только цифры',
          },
        };
      case 'to':
        return {
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
        <Typography>Редактирование Истории</Typography>

        {(edit === 'from' || edit === 'content' || edit === 'to') && (
          <Controller
            control={control}
            defaultValue={story[edit]}
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
            onClick={handleEditStory}
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

export default memo(StoryItemDialog);
