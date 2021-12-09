import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { SxProps } from "@mui/system";
import { useAppDispatch } from "../../../store";
import { Controller, useForm } from "react-hook-form";
import {
  useDeleteBannerMutation,
  useEditBannerMutation,
} from "../../../store/Banner";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import {
  showErrorSnackbar,
  showSuccessSnackbar,
} from "../../../store/Notifications";
import { SERVER_URL } from "../../../lib/constants";
import { memo, useCallback } from "react";

interface IBannerCardProps {
  banner: IBanner;
}

const BannerCard = ({ banner }: IBannerCardProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const [editBanner, { isLoading: isEditingLoading }] = useEditBannerMutation();
  const [deleteBanner, { isLoading: isDeletingLoading }] =
    useDeleteBannerMutation();
  const { handleSubmit, control, reset } = useForm<{
    text: string;
  }>({
    defaultValues: { text: banner.text },
  });

  const handleEditBanner = handleSubmit(async (data) => {
    try {
      const res = await editBanner({ id: banner._id, data }).unwrap();
      reset({ text: res.text });
      dispatch(showSuccessSnackbar(`Содержание слайда успешно изменено`));
    } catch (e) {
      dispatch(
        showErrorSnackbar(
          (e as IQueryError)?.data?.message || "failed to edit banner"
        )
      );
    }
  });

  const removeBanner = useCallback(
    async (id: string) => {
      try {
        await deleteBanner(id);
        dispatch(showSuccessSnackbar(`Баннер успешно удалён`));
      } catch (e) {
        dispatch(
          showErrorSnackbar(
            (e as IQueryError)?.data?.message || "failed to delete banner"
          )
        );
      }
    },
    [deleteBanner, dispatch]
  );

  return (
    <Box sx={styles.root}>
      <Box sx={styles.image}>
        <img src={`${SERVER_URL}/${banner.image}`} alt="Баннер" />
      </Box>
      <Box sx={styles.field} component="form">
        <Controller
          name="text"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              size="small"
              color={"info"}
              tabIndex={1}
              sx={styles.input}
              label="Содержание слайда"
              fullWidth
              multiline
              minRows={6}
              maxRows={6}
              type="text"
              autoComplete="off"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
            />
          )}
          rules={{
            required: "Введите Текст для слайда",
          }}
        />
        <Box sx={styles.actions}>
          <Button
            variant="contained"
            color="success"
            disabled={isEditingLoading}
            onClick={handleEditBanner}
            endIcon={
              isEditingLoading ? (
                <CircularProgress color="inherit" size={20} />
              ) : (
                <EditRoundedIcon />
              )
            }
          >
            Сохранить
          </Button>
          <Button
            variant="contained"
            color="error"
            disabled={isDeletingLoading}
            onClick={() => removeBanner(banner._id)}
            endIcon={
              isDeletingLoading ? (
                <CircularProgress color="inherit" size={20} />
              ) : (
                <DeleteForeverRoundedIcon />
              )
            }
          >
            Удалить
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: "100%",
    minWidth: "400px",
    height: "200px",
    mb: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: "35%",
    height: "100%",
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center",
    },
  },
  field: {
    width: "60%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    flexGrow: 1,
  },
  actions: {
    width: "100%",
    display: "flex",
    justifyContent: "space-evenly",
  },
};

export default memo(BannerCard);
