import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
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
import ImagesPreview from "../ImagesPreview";
import { useAddArticleMutation } from "../../../store/Article";

const AddArticle = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [files, setFiles] = useState<File[]>([]);
  const [upLoading, setUpLoading] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const { handleSubmit, control, reset, setValue } = useForm<IArticle>({
    defaultValues: {
      title: "",
      content: "",
      images: [],
    },
  });
  const [newArticle, { isLoading }] = useAddArticleMutation();

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
            return file2optiFile(file, 800, 0.85, "webp");
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

  const handleNewArticle = handleSubmit(async (data) => {
    try {
      const sendData = new FormData();
      files?.forEach((file) => sendData.append("images", file as Blob));
      sendData.append("title", data.title);
      sendData.append("content", data.content);
      const res = await newArticle(sendData).unwrap();
      dispatch(showSuccessSnackbar(`Статья ${res.title} опубликована`));
      setFiles([]);
      setPreviews([]);
      reset();
    } catch (e) {
      dispatch(
        showErrorSnackbar(
          (e as IQueryError)?.data?.message || "fail"
        )
      );
    }
  });

  const remove = useCallback((n: number) => {
    setFiles((p) => p?.filter((fl, i) => i !== n));
    setPreviews((p) => p?.filter((fl, i) => i !== n));
  }, []);

  const toFirstPlace = useCallback((n: number) => {
    setFiles((p) => {
      p.sort((a, b) => (p.indexOf(a) === n ? -1 : p.indexOf(b) === n ? 1 : 0));
      return p;
    });
    setPreviews((p) => {
      p.sort((a, b) => (p.indexOf(a) === n ? -1 : p.indexOf(b) === n ? 1 : 0));
      return JSON.parse(JSON.stringify(p));
    });
  }, []);

  return (
    <Container maxWidth={"xs"}>
      <Box sx={styles.form} component="form">
        <Typography align='center' variant="h6" sx={{ mb: "12px" }}>
          Новая статья на странице Промышленный дизайн и инжиниринг
        </Typography>
        <input
          onChange={fileUpload}
          style={{ display: "none" }}
          type="file"
          accept="image/webp, image/jpg, image/jpeg, image/png"
          ref={inputRef}
          multiple
        />
        <ImagesPreview
          sources={previews}
          remove={remove}
          firstPlace={toFirstPlace}
        />
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
              label="Заголовок"
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
            required: "Введите заголовок статьи",
          }}
        />

        <Controller
          name="content"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              size="small"
              color={"info"}
              tabIndex={1}
              multiline
              minRows={3}
              maxRows={8}
              sx={styles.field}
              label="Статья"
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
            required: "Напишите статью",
          }}
        />

        <Button
          variant="contained"
          color="success"
          disabled={isLoading || upLoading}
          onClick={handleNewArticle}
          endIcon={
            isLoading ? (
              <CircularProgress color="inherit" size={20} />
            ) : (
              <AddRoundedIcon />
            )
          }
        >
          Опубликовать
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
    minHeight: '120px'
  }
};

export default AddArticle;
