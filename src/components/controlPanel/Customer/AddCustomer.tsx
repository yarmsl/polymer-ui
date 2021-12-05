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
import { useAddCustomerMutation } from "../../../store/Customer";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { file2img } from "../../../lib/imageOptimaze";

const AddCustomer = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [file, setFile] = useState<File | null>(null);
  const [upLoading, setUpLoading] = useState(false);
  const [preview, setPreview] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { handleSubmit, control, reset, setValue } = useForm<IAddCustomer>({
    defaultValues: { name: "", slug: "", logo: "", description: "" },
  });
  const [newCustomer, { isLoading }] = useAddCustomerMutation();

  const fileUpload = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      try {
        setUpLoading(true);
        if (
          inputRef.current != null &&
          inputRef.current.files != null &&
          inputRef.current.files.length > 0
        ) {
          setFile(inputRef.current.files[0]);
          const res = await file2img(inputRef.current.files[0]);
          setPreview(res);
          e.target.value = "";
        }
        setUpLoading(false);
      } catch (e) {
        setUpLoading(false);
        dispatch(showErrorSnackbar("ошибка загрузки файла"));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (file) {
      setValue("logo", "file");
    } else {
      setValue("logo", "");
    }
  }, [file, setValue]);

  const handleNewCustomer = handleSubmit(async (data) => {
    try {
      const sendData = new FormData();
      sendData.append("name", data.name);
      sendData.append("description", data.description);
      sendData.append("slug", data.slug);
      sendData.append("logo", file as Blob);
      const res = await newCustomer(sendData).unwrap();
      dispatch(showSuccessSnackbar(`Заказчик ${res.name} успешно создан`));
      reset();
      setFile(null);
      setPreview("");
    } catch (e) {
      dispatch(
        showErrorSnackbar(
          (e as IQueryError)?.data?.message || "failed to add customer"
        )
      );
    }
  });

  const clear = useCallback(() => {
    setFile(null);
    setPreview("");
    if (inputRef.current != null) {
      inputRef.current.files = null;
    }
    setValue("logo", "");
  }, [setValue]);

  return (
    <Container maxWidth={"xs"}>
      <Box sx={styles.form} component="form">
        <Typography variant="h6" sx={{ mb: "12px" }}>
          Добавление нового Заказчика
        </Typography>
        <input
          onChange={fileUpload}
          style={{ display: "none" }}
          type="file"
          accept="image/svg+xml"
          ref={inputRef}
        />
        <Paper sx={styles.preview}>
          {file && (
            <IconButton onClick={clear} sx={styles.remove} size="small">
              <CloseRoundedIcon color="error" fontSize="small" />
            </IconButton>
          )}
          {preview && <img src={preview as unknown as string} alt="Лого" />}
        </Paper>
        <Controller
          name="logo"
          control={control}
          render={({ fieldState: { error } }) => (
            <Typography sx={styles.error}>{error?.message}</Typography>
          )}
          rules={{
            required: "Загрузите лого",
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
          Загрузить лого (*.svg)
        </Button>
        <Controller
          name="name"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              size="small"
              color={"info"}
              tabIndex={1}
              sx={styles.input}
              label="Заказчик"
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
            required: "Введите наименование Заказчика",
          }}
        />
        <Controller
          name="description"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              size="small"
              color={"info"}
              tabIndex={1}
              sx={styles.field}
              label="Описание"
              fullWidth
              multiline
              minRows={3}
              maxRows={3}
              type="text"
              autoComplete="off"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
            />
          )}
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
          disabled={isLoading}
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
    height: "80px",
    position: "relative",
    "& img": {
      width: "100%",
      height: "100%",
      padding: "8px",
      objectFit: "contain",
    },
  },
  remove: {
    position: "absolute",
    top: "2px",
    right: "2px",
  },
  error: {
    width: "100%",
    height: '18px',
    pl: "14px",
    fontSize: "12px",
    color: "error.main",
  },
  input: {
    height: "68px",
  },
  field: {
    height: "108px",
  },
};

export default AddCustomer;
