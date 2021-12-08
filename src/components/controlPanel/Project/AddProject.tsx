import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  ListItemIcon,
  ListItemText,
  MenuItem,
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
import { useAddProjectMutation } from "../../../store/Project";
import { useGetAllCustomersQuery } from "../../../store/Customer";
import { useGetAllTagsQuery } from "../../../store/Tag";
import ImagesPreview from "../ImagesPreview";
import { SERVER_URL } from "../../../lib/constants";

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
      year: "" as unknown as number,
      slug: "",
      images: [],
      tags: [],
      customer: "",
    },
  });
  const [newProject, { isLoading }] = useAddProjectMutation();
  const { data: customers } = useGetAllCustomersQuery("");
  const { data: tags } = useGetAllTagsQuery("");

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
      if (data.customer) {
        sendData.append("customer", data.customer);
      }
      if (data.tags.length > 0) {
        data.tags.forEach((tag) => sendData.append("tags", tag));
      }
      const res = await newProject(sendData).unwrap();
      dispatch(showSuccessSnackbar(`Проект ${res.title} успешно создан`));
      setFiles([]);
      setPreviews([]);
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
          name="tags"
          control={control}
          defaultValue={[]}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              size="small"
              color={"warning"}
              tabIndex={1}
              sx={styles.input}
              label="Выбирите один или несколько тегов"
              fullWidth
              select
              SelectProps={{
                multiple: true,
                renderValue: (selected) => {
                  const print = (selected as string[])?.map((id) => {
                    return tags?.find((tag) => tag._id === id)?.name;
                  });
                  return <div>{print?.join(", ")}</div>;
                },
                MenuProps: {
                  PaperProps: { style: { maxHeight: 380, marginTop: 5 } },
                },
              }}
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
            >
              {tags?.map((tag, i) => (
                <MenuItem dense key={i} value={tag._id}>
                  <Checkbox size="small" checked={value?.includes(tag._id)} />
                  <ListItemText>{tag.name}</ListItemText>
                </MenuItem>
              )) || <p>wait...</p>}
            </TextField>
          )}
        />

        <Controller
          name="customer"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              size="small"
              color={"warning"}
              tabIndex={2}
              sx={styles.input}
              label="Выбирите Заказчика проекта"
              fullWidth
              select
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
            >
              <MenuItem dense value={undefined}></MenuItem>
              {customers?.map((customer, i) => (
                <MenuItem dense key={i} value={customer._id}>
                  <ListItemText>{customer.name}</ListItemText>
                  <ListItemIcon sx={styles.logo}>
                    {
                      <img
                        src={`${SERVER_URL}/${customer.logo}`}
                        alt={customer.name}
                      />
                    }
                  </ListItemIcon>
                </MenuItem>
              )) || <p>wait...</p>}
            </TextField>
          )}
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
  logo: {
    width: "60px",
    "& img": {
      width: "100%",
      objectFit: "contain",
    },
  },
};

export default AddProject;
