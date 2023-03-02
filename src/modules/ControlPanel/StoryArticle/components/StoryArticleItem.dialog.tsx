import { memo } from 'react';
import { Controller, useForm } from 'react-hook-form';

import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import { Box, Button, CircularProgress, Container, TextField, Typography } from '@mui/material';

import { useAppDispatch } from '~/store';
import { closeModalAction } from '~/store/ModalStack';
import { showErrorSnackbar, showSuccessSnackbar } from '~/store/Notifications';

import { useEditStoryArticleMutation } from '../store';

export type storyArticleEditTypes = 'title' | 'content';

interface IStoryArticleDialogProps {
  storyArticle: IStoryArticleFull;
  edit: storyArticleEditTypes;
}

const StoryArticleItemDialog = ({ storyArticle, edit }: IStoryArticleDialogProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const [editStoryArticle, { isLoading }] = useEditStoryArticleMutation();
  const { handleSubmit, control } = useForm<ISendStoryArticle>();

  const handleEditStoryArticle = handleSubmit(async (data) => {
    try {
      const sendData = { id: storyArticle._id, data };
      const res = await editStoryArticle(sendData).unwrap();
      dispatch(showSuccessSnackbar(`Статья ${res.title} изменена`));
    } catch (e) {
      dispatch(showErrorSnackbar((e as IQueryError)?.data?.message || 'fail'));
    }
  });

  const validObj = () => {
    switch (edit) {
      case 'title':
        return { required: 'Введите заголовок' };
      case 'content':
        return { required: 'Напишите статью' };
      default:
        return undefined;
    }
  };

  return (
    <Container sx={styles.dialog}>
      <Box component='form' sx={styles.form}>
        <Typography>Редактирование Статьи</Typography>

        {(edit === 'title' || edit === 'content') && (
          <Controller
            control={control}
            defaultValue={storyArticle[edit]}
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
            onClick={handleEditStoryArticle}
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

export default memo(StoryArticleItemDialog);
