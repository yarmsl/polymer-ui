import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';

import EditRoundedIcon from '@mui/icons-material/EditRounded';
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  LinearProgress,
  ListItemIcon,
  ListItemText,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';

import { SERVER_URL } from '~/lib/constants';
import { useAppDispatch } from '~/store';
import { showErrorSnackbar, showSuccessSnackbar } from '~/store/Notifications';
import { useGetAllProjectsQuery } from '~/modules/ControlPanel/Project/store';

import { useEditBottomBannerMutation, useGetBottomBannerQuery } from '../store';

const ChooseBottomBanner = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { data: bottomBanners, isLoading: isBannersLoading } = useGetBottomBannerQuery('');
  const { data: projects, isLoading: isProjectsLoading } = useGetAllProjectsQuery('');
  const [editBanner, { isLoading: isEditingLoading }] = useEditBottomBannerMutation();

  const { control, handleSubmit, setValue } = useForm<IEditBottomBanner>({
    defaultValues: { projects: bottomBanners?.projects || [] },
  });

  useEffect(() => {
    setValue('projects', bottomBanners?.projects || []);
  }, [bottomBanners, setValue]);

  const handleEditBanner = handleSubmit(async (data) => {
    try {
      const res = await editBanner(data).unwrap();
      dispatch(showSuccessSnackbar(res.message));
    } catch (e) {
      dispatch(
        showErrorSnackbar((e as IQueryError)?.data?.message || 'failed to save bottom banner'),
      );
    }
  });

  return (
    <Container maxWidth='sm' sx={styles.root}>
      <Typography sx={{ mb: '12px' }} variant='h6'>
        Выберите проекты, которые будут отображены в нижнем баннере
      </Typography>
      <Box sx={styles.progress}>{isBannersLoading && isProjectsLoading && <LinearProgress />}</Box>
      <Box component='form' sx={styles.form}>
        {bottomBanners && projects && (
          <Controller
            control={control}
            name='projects'
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                error={!!error}
                helperText={error ? error.message : null}
                label='Проекты нижнего баннера'
                value={value}
                variant='outlined'
                SelectProps={{
                  multiple: true,
                  renderValue: (selected) => {
                    const imgs = projects?.filter((proj) =>
                      (selected as string[]).includes(proj._id),
                    );
                    return (
                      <Box sx={styles.wrapper}>
                        {imgs?.map((img) => {
                          return (
                            <Box key={img._id} sx={styles.img}>
                              <img alt='Проект' src={`${SERVER_URL}/${img.images?.[0] || ''}`} />
                            </Box>
                          );
                        })}
                      </Box>
                    );
                  },

                  MenuProps: {
                    PaperProps: { style: { maxHeight: 450, marginTop: 5 } },
                  },
                }}
                fullWidth
                select
                onChange={onChange}
              >
                {projects?.map((proj) => (
                  <MenuItem key={proj._id} sx={styles.menuitem} value={proj._id} dense>
                    <Checkbox checked={value?.includes(proj._id)} size='small' />
                    <ListItemText>{proj.title}</ListItemText>
                    <ListItemIcon sx={styles.img}>
                      <img alt='Проект' src={`${SERVER_URL}/${proj.images?.[0] || ''}`} />
                    </ListItemIcon>
                  </MenuItem>
                ))}
              </TextField>
            )}
            rules={{
              required: 'Выберите хотя бы один проект',
            }}
          />
        )}
        <Button
          color='success'
          disabled={isEditingLoading}
          sx={{ mt: '18px' }}
          variant='contained'
          endIcon={
            isEditingLoading ? <CircularProgress color='inherit' size={20} /> : <EditRoundedIcon />
          }
          onClick={handleEditBanner}
        >
          Сохранить
        </Button>
      </Box>
    </Container>
  );
};

const styles: TStyles = {
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  progress: {
    width: '100%',
    height: '2px',
    mb: '8px',
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  menuitem: {
    height: '40px',
  },
  wrapper: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  img: {
    height: '40px',
    width: '100px',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center',
    },
  },
};

export default ChooseBottomBanner;
