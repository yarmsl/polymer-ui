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
} from "@mui/material";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { SERVER_URL } from "../../../lib/constants";
import {
  useEditBottomBannerMutation,
  useGetBottomBannerQuery,
} from "../../../store/Banner";
import { useGetAllProjectsQuery } from "../../../store/Project";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { useAppDispatch } from "../../../store";
import {
  showErrorSnackbar,
  showSuccessSnackbar,
} from "../../../store/Notifications";

const ChooseBottomBanner = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { data: bottomBanners, isLoading: isBannersLoading } =
    useGetBottomBannerQuery("");
  const { data: projects, isLoading: isProjectsLoading } =
    useGetAllProjectsQuery("");
  const [editBanner, { isLoading: isEditingLoading }] =
    useEditBottomBannerMutation();

  const { control, handleSubmit, setValue } = useForm<IEditBottomBanner>({
    defaultValues: { projects: bottomBanners?.projects || [] },
  });

  useEffect(() => {
    setValue("projects", bottomBanners?.projects || []);
  }, [bottomBanners, setValue]);

  const handleEditBanner = handleSubmit(async (data) => {
    try {
      const res = await editBanner(data).unwrap();
      dispatch(showSuccessSnackbar(res.message));
    } catch (e) {
      dispatch(
        showErrorSnackbar(
          (e as IQueryError)?.data?.message || "failed to save bottom banner"
        )
      );
    }
  });

  return (
    <Container sx={styles.root} maxWidth="sm">
      <Typography variant="h6" sx={{ mb: "12px" }}>
        Выберите проекты, которые будут отображены в нижнем баннере
      </Typography>
      <Box sx={styles.progress}>
        {isBannersLoading && isProjectsLoading && <LinearProgress />}
      </Box>
      <Box sx={styles.form} component="form">
        {bottomBanners && projects && (
          <Controller
            name="projects"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                label="Проекты нижнего баннера"
                select
                SelectProps={{
                  multiple: true,
                  renderValue: (selected) => {
                    const imgs = projects?.filter((proj) =>
                      (selected as string[]).includes(proj._id)
                    );
                    return (
                      <Box sx={styles.wrapper}>
                        {imgs?.map((img) => {
                          return (
                            <Box key={img._id} sx={styles.img}>
                              <img
                                src={`${SERVER_URL}/${img.images?.[0] || ""}`}
                                alt="Проект"
                              />
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
                variant="outlined"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
              >
                {projects?.map((proj) => (
                  <MenuItem
                    sx={styles.menuitem}
                    dense
                    key={proj._id}
                    value={proj._id}
                  >
                    <Checkbox
                      size="small"
                      checked={value?.includes(proj._id)}
                    />
                    <ListItemText>{proj.title}</ListItemText>
                    <ListItemIcon sx={styles.img}>
                      <img
                        src={`${SERVER_URL}/${proj.images?.[0] || ""}`}
                        alt="Проект"
                      />
                    </ListItemIcon>
                  </MenuItem>
                ))}
              </TextField>
            )}
            rules={{
              required: "Выберите хотя бы один проект",
            }}
          />
        )}
        <Button
          sx={{ mt: "18px" }}
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
      </Box>
    </Container>
  );
};

const styles: TStyles = {
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  progress: {
    width: "100%",
    height: "2px",
    mb: "8px",
  },
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  menuitem: {
    height: "40px",
  },
  wrapper: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
  },
  img: {
    height: "40px",
    width: "100px",
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center",
    },
  },
};

export default ChooseBottomBanner;
