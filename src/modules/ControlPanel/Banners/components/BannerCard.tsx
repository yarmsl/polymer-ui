import { memo, useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';

import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { Box, Button, CircularProgress, TextField } from '@mui/material';

import { SERVER_URL } from '~/lib/constants';
import { useAppDispatch } from '~/store';
import { showErrorSnackbar, showSuccessSnackbar } from '~/store/Notifications';

import { useDeleteBannerMutation, useEditBannerMutation } from '../store';

interface IBannerCardProps {
  banner: IBanner;
}

const BannerCard = ({ banner }: IBannerCardProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const [editBanner, { isLoading: isEditingLoading }] = useEditBannerMutation();
  const [deleteBanner, { isLoading: isDeletingLoading }] = useDeleteBannerMutation();
  const { handleSubmit, control, reset } = useForm<IEditBannerData>({
    defaultValues: { text: banner.text, order: banner.order },
  });

  const handleEditBanner = handleSubmit(async (data) => {
    try {
      const res = await editBanner({ id: banner._id, data }).unwrap();
      reset({ text: res.text, order: res.order });
      dispatch(showSuccessSnackbar('Слайд успешно изменен'));
    } catch (e) {
      dispatch(showErrorSnackbar((e as IQueryError)?.data?.message || 'failed to edit banner'));
    }
  });

  const removeBanner = useCallback(
    async (id: string) => {
      try {
        await deleteBanner(id);
        dispatch(showSuccessSnackbar(`Баннер успешно удалён`));
      } catch (e) {
        dispatch(showErrorSnackbar((e as IQueryError)?.data?.message || 'failed to delete banner'));
      }
    },
    [deleteBanner, dispatch],
  );

  return (
    <Box sx={styles.root}>
      <Box sx={styles.image}>
        <img alt='Баннер' src={`${SERVER_URL}/${banner.image}`} />
      </Box>
      <Box component='form' sx={styles.field}>
        <Controller
          control={control}
          name='text'
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              autoComplete='off'
              color={'info'}
              error={!!error}
              helperText={error ? error.message : null}
              label='Содержание слайда'
              maxRows={6}
              minRows={6}
              size='small'
              sx={styles.input}
              type='text'
              value={value}
              fullWidth
              multiline
              onChange={onChange}
            />
          )}
          rules={{
            required: 'Введите Текст для слайда',
          }}
        />

        <Box sx={styles.actions}>
          <Controller
            control={control}
            name='order'
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                autoComplete='off'
                color={'info'}
                error={!!error}
                helperText={error ? error.message : null}
                label='Порядковый номер баннера'
                size='small'
                type='text'
                value={value}
                onChange={onChange}
              />
            )}
            rules={{
              required: 'Введите порядковый номер',
              pattern: {
                value: /^[0-9]*$/,
                message: 'Только цифры',
              },
            }}
          />
          <Button
            color='success'
            disabled={isEditingLoading}
            variant='contained'
            endIcon={
              isEditingLoading ? (
                <CircularProgress color='inherit' size={20} />
              ) : (
                <EditRoundedIcon />
              )
            }
            onClick={handleEditBanner}
          >
            Сохранить
          </Button>
          <Button
            color='error'
            disabled={isDeletingLoading}
            variant='contained'
            endIcon={
              isDeletingLoading ? (
                <CircularProgress color='inherit' size={20} />
              ) : (
                <DeleteForeverRoundedIcon />
              )
            }
            onClick={() => removeBanner(banner._id)}
          >
            Удалить
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

const styles: TStyles = {
  root: {
    width: '100%',
    minWidth: '400px',
    height: '200px',
    mb: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: '35%',
    height: '100%',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center',
    },
  },
  field: {
    width: '60%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    flexGrow: 1,
  },
  actions: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
};

export default memo(BannerCard);
