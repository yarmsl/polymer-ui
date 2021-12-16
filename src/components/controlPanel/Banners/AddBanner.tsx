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
import { useAddBannerMutation } from "../../../store/Banner";

const AddBanner = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [file, setFile] = useState<File | null>(null);
  const [upLoading, setUpLoading] = useState(false);
  const [preview, setPreview] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { handleSubmit, control, reset, setValue } = useForm<IAddBanner>({
    defaultValues: { text: "", image: "", order: "" as unknown as number },
  });
  const [newBanner, { isLoading }] = useAddBannerMutation();

  const fileUpload = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      try {
        setUpLoading(true);
        if (
          inputRef.current != null &&
          inputRef.current.files != null &&
          inputRef.current.files.length > 0
        ) {
          const res = await file2optiFile(
            inputRef.current.files[0],
            1920,
            0.75,
            "webp"
          );
          setFile(res);
          const prRes = await file2optiDataurl(
            inputRef.current.files[0],
            500,
            0.75,
            "webp"
          );
          setPreview(prRes);
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
      setValue("image", "file");
    } else {
      setValue("image", "");
    }
  }, [file, setValue]);

  const handleNewCustomer = handleSubmit(async (data) => {
    try {
      const sendData = new FormData();
      sendData.append("text", data.text);
      sendData.append("image", file as Blob);
      await newBanner(sendData).unwrap();
      dispatch(showSuccessSnackbar(`баннер успешно создан`));
      reset();
      setFile(null);
      setPreview("");
    } catch (e) {
      dispatch(
        showErrorSnackbar(
          (e as IQueryError)?.data?.message || "failed to add banner"
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
    setValue("image", "");
  }, [setValue]);

  return (
    <Container maxWidth={"xs"}>
      <Box sx={styles.root} component="form">
        <Typography variant="h6" sx={{ mb: "12px" }}>
          Добавление нового Баннера
        </Typography>
        <input
          onChange={fileUpload}
          style={{ display: "none" }}
          type="file"
          accept="image/*"
          ref={inputRef}
        />
        <Paper sx={styles.preview}>
          {file && (
            <IconButton onClick={clear} sx={styles.remove} size="small">
              <CloseRoundedIcon color="error" fontSize="small" />
            </IconButton>
          )}
          {preview && <img src={preview} alt="Баннер" />}
        </Paper>
        <Controller
          name="image"
          control={control}
          render={({ fieldState: { error } }) => (
            <Typography sx={styles.error}>{error?.message}</Typography>
          )}
          rules={{
            required: "Загрузите изображение",
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
          Загрузить изображение
        </Button>
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
              minRows={3}
              maxRows={8}
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
        <Controller
          name="order"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              size="small"
              color={"info"}
              tabIndex={1}
              sx={styles.input}
              label="Порядковый номер баннера"
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
            required: "Введите порядковый номер",
            pattern: {
              value: /^[0-9]*$/,
              message: "Только цифры",
            },
          }}
        />

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
  root: {
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
    height: "280px",
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
    height: "18px",
    pl: "14px",
    fontSize: "12px",
    color: "error.main",
  },
  input: {
    mt: "20px",
  },
};

export default AddBanner;
