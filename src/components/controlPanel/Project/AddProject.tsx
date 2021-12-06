import {
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { SxProps } from "@mui/system";
import { Controller, useForm } from "react-hook-form";
import { useAppDispatch } from "../../../store";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import {
  showErrorSnackbar,
  showSuccessSnackbar,
} from "../../../store/Notifications";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { file2optiFile, file2optiDataurl } from "../../../lib/imageOptimaze";
import { useAddProjectMutation } from "../../../store/Project";

interface IImgItemProps {
  src: string;
  n: number;
  remove: (n: number) => void;
}

const ImgItem = ({ src, n, remove }: IImgItemProps): JSX.Element => {
  return (
    <Box sx={styles.imgitem}>
      <IconButton onClick={() => remove(n)} sx={styles.remove} size="small">
        <CloseRoundedIcon color="error" fontSize="small" />
      </IconButton>
      <img src={src} alt="Предпросмотр" />
    </Box>
  );
};

const AddProject = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [files, setFiles] = useState<File[]>([]);
  const [upLoading, setUpLoading] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const { handleSubmit, control, reset, setValue } = useForm<IProject>({
    defaultValues: {
      title: "",
      done: "",
      year: undefined,
      slug: "",
      images: undefined,
    },
  });
  const [newProject, { isLoading }] = useAddProjectMutation();

  const fileUpload = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      try {
        setUpLoading(true);
        if (
          inputRef.current != null &&
          inputRef.current.files != null &&
          inputRef.current.files.length > 0
        ) {
          const resBlobs = Array.from(inputRef.current.files)?.map((file) => {
            return file2optiFile(file, 1920, 0.75, "webp");
          });
          const res = await Promise.all(resBlobs);
          setFiles((p) => p.concat(res));

          const resurl = Array.from(inputRef.current.files)?.map((file) => {
            return file2optiDataurl(file, 160, 0.75, "webp");
          });
          const res2 = await Promise.all(resurl);
          setPreviews((p) => p.concat(res2));

          e.target.value = "";
        }
        setUpLoading(false);
      } catch (e) {
        setUpLoading(false);
        dispatch(showErrorSnackbar("ошибка загрузки файлов"));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (files.length > 0) {
      setValue("images", ["file"]);
    } else {
      setValue("images", []);
    }
  }, [files, setValue]);

  const handleNewCustomer = handleSubmit(async (data) => {
    try {
      const sendData = new FormData();
      files?.forEach((file) => sendData.append("images", file as Blob));
      sendData.append("title", data.title);
      sendData.append("done", data.done);
      sendData.append("year", `${data.year}`);
      sendData.append("slug", data.slug);
      const res = await newProject(sendData).unwrap();
      dispatch(showSuccessSnackbar(`Проект ${res.title} успешно создан`));
      reset();
    } catch (e) {
      dispatch(
        showErrorSnackbar(
          (e as IQueryError)?.data?.message || "failed to add project"
        )
      );
    }
  });

  const remove = useCallback((n: number) => {
    setFiles((p) => p?.filter((fl, i) => i !== n));
    setPreviews((p) => p?.filter((fl, i) => i !== n));
  }, []);

  return (
    <Container maxWidth={"xs"}>
      <Box sx={styles.form} component="form">
        <Typography variant="h6" sx={{ mb: "12px" }}>
          Добавление нового Проекта
        </Typography>
        <input
          onChange={fileUpload}
          style={{ display: "none" }}
          type="file"
          accept="image/webp, image/jpg, image/jpeg, image/png"
          ref={inputRef}
          multiple
        />
        <Paper sx={styles.preview}>
          {previews.length > 0 &&
            previews?.map((src, i) => (
              <ImgItem key={i} src={src} n={i} remove={remove} />
            ))}
        </Paper>
        <Controller
          name="images"
          control={control}
          render={({ fieldState: { error } }) => (
            <Typography sx={styles.error}>{error?.message}</Typography>
          )}
          rules={{
            required: "Загрузите фото",
            validate: (val) => (val.length > 0 ? undefined : "Загрузите фото"),
          }}
        />
        <Button
          startIcon={
            upLoading && <CircularProgress color="inherit" size={20} />
          }
          variant="outlined"
          color="success"
          onClick={() => inputRef.current?.click()}
        >
          Выбрать изображения
        </Button>
        <Controller
          name="title"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              size="small"
              color={"info"}
              tabIndex={1}
              sx={styles.input}
              label="Проект"
              fullWidth
              type="text"
              autoComplete="off"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
            />
          )}
          rules={{
            required: "Введите название проекта",
          }}
        />

        <Controller
          name="done"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              size="small"
              color={"info"}
              tabIndex={1}
              multiline
              maxRows={3}
              sx={styles.input}
              label="Что сделано"
              fullWidth
              type="text"
              autoComplete="off"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
            />
          )}
          rules={{
            required: "Что было сделано по проекту",
          }}
        />

        <Controller
          name="year"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              size="small"
              color={"info"}
              tabIndex={1}
              sx={styles.input}
              label="Год выполнения"
              fullWidth
              type="text"
              autoComplete="off"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
            />
          )}
          rules={{
            required: "Введите год",
            pattern: {
              value: /^[0-9]*$/,
              message: "Только цифры",
            },
          }}
        />

        <Controller
          name="slug"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              size="small"
              color={"info"}
              tabIndex={1}
              sx={styles.input}
              label="URL slug"
              fullWidth
              type="text"
              autoComplete="off"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
            />
          )}
          rules={{
            required: "Введите url slug",
            pattern: {
              value: /^[a-zA-Zа-яА-Я0-9_-]*$/,
              message: "URL slug может содержать только буквы, цифры, - и _",
            },
          }}
        />
        <Typography variant="subtitle2">
          *URL slug будет отображаться в строке браузера
        </Typography>

        <Button
          variant="contained"
          color="success"
          disabled={isLoading || upLoading}
          onClick={handleNewCustomer}
          endIcon={
            isLoading ? (
              <CircularProgress color="inherit" size={20} />
            ) : (
              <AddRoundedIcon />
            )
          }
        >
          Добавить
        </Button>
      </Box>
    </Container>
  );
};

const styles: Record<string, SxProps> = {
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "&>*": {
      mb: "6px!important",
    },
  },
  preview: {
    width: "100%",
    minHeight: "80px",
    position: "relative",
    display: "flex",
    flexWrap: "wrap",
  },
  imgitem: {
    width: "89px",
    height: "100px",
    m: "5px",
    position: "relative",
    borderRadius: "4px",
    overflow: "hidden",
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center",
    },
  },
  remove: {
    position: "absolute",
    top: "2px",
    right: "2px",
    backgroundColor: "#fff",
  },
  error: {
    width: "100%",
    height: "18px",
    pl: "14px",
    fontSize: "12px",
    color: "error.main",
  },
  input: {
    minHeight: "68px",
  },
  field: {
    height: "108px",
  },
};

export default AddProject;
