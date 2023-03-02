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
import { Controller, useForm } from "react-hook-form";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import { memo, useState, useCallback, ChangeEvent, useRef } from "react";
import { useAppDispatch } from "../../../store";
import {
  showErrorSnackbar,
  showSuccessSnackbar,
} from "../../../store/Notifications";
import { closeModalAction } from "../../../store/ModalStack";
import { useEditProjectMutation } from "../../../store/Project";
import { useGetAllTagsQuery } from "../../../store/Tag";
import { useGetAllCustomersQuery } from "../../../store/Customer";
import { SERVER_URL } from "../../../lib/constants";
import ImagesPreview from "../ImagesPreview";
import { file2optiDataurl, file2optiFile } from "../../../lib/imageOptimaze";

export type projEditTypes =
  | "title"
  | "tags"
  | "slug"
  | "done"
  | "year"
  | "customer"
  | "addImgs"
  | "editImgs"
  | "order";

interface IProjectDialogProps {
  project: IProjectFull;
  edit: projEditTypes;
}

const ProjectItemDialog = ({
  project,
  edit,
}: IProjectDialogProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const [editProject, { isLoading }] = useEditProjectMutation();
  const { handleSubmit, control } = useForm<ISendProjectData>();
  const { data: tags } = useGetAllTagsQuery("");
  const { data: customers } = useGetAllCustomersQuery("");
  const [sources, serSources] = useState(project.images);
  const [files, setFiles] = useState<File[]>([]);
  const [upLoading, setUpLoading] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const handleEditCustomer = handleSubmit(async (data) => {
    try {
      const formData = new FormData();
      files?.forEach((file) => formData.append("images", file as Blob));
      const sendData =
        edit === "editImgs"
          ? { id: project._id, data: { images: sources } }
          : edit === "addImgs"
          ? { id: project._id, data: formData }
          : { id: project._id, data };
      const res = await editProject(sendData).unwrap();
      dispatch(showSuccessSnackbar(`Проект ${res.title} успешно изменён`));
    } catch (e) {
      dispatch(showErrorSnackbar((e as IQueryError)?.data?.message || "fail"));
    }
  });

  const validObj = () => {
    switch (edit) {
      case "year":
        return { required: "Введите год" };
      case "done":
        return { required: "Что было сделано по проекту" };
      case "slug":
        return {
          required: "Введите url slug",
          pattern: {
            value: /^[a-zA-Zа-яА-Я0-9_-]*$/,
            message: "URL slug может содержать только буквы, цифры, - и _",
          },
        };
      case "order":
        return {
          required: "Введите порядковый номер",
          pattern: {
            value: /^[0-9]*$/,
            message: "Только цифры",
          },
        };
      default:
        return undefined;
    }
  };

  const removeSource = useCallback((n: number) => {
    serSources((p) => p.filter((src, i) => i !== n));
  }, []);

  const toFirstPlace = useCallback((n: number) => {
    serSources((p) => {
      p = [...p].sort((a, b) =>
        p.indexOf(a) === n ? -1 : p.indexOf(b) === n ? 1 : 0
      );
      return JSON.parse(JSON.stringify(p));
    });
  }, []);

  const removeUploaded = useCallback((n: number) => {
    setFiles((p) => p?.filter((fl, i) => i !== n));
    setPreviews((p) => p?.filter((fl, i) => i !== n));
  }, []);

  const toFirstPlaceUploaded = useCallback((n: number) => {
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
    <Container sx={styles.dialog}>
      <Box sx={styles.form} component="form">
        <Typography>Редактирование Проекта</Typography>

        {(edit === "title" ||
          edit === "done" ||
          edit === "year" ||
          edit === "slug" ||
          edit === "order") && (
          <Controller
            name={edit}
            control={control}
            defaultValue={project[edit]}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                size="small"
                tabIndex={1}
                sx={styles.input}
                label={edit}
                fullWidth
                multiline={edit === "done"}
                minRows={5}
                maxRows={12}
                type="text"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
            rules={validObj()}
          />
        )}

        {edit === "tags" && (
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
                label="Выберите один или несколько тегов"
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
        )}

        {edit === "customer" && (
          <Controller
            name="customer"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                size="small"
                color={"warning"}
                tabIndex={2}
                sx={styles.input}
                label="Выберите Заказчика проекта"
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
        )}

        {edit === "editImgs" && (
          <ImagesPreview
            sources={sources}
            path
            remove={removeSource}
            firstPlace={toFirstPlace}
          />
        )}

        {edit === "addImgs" && (
          <>
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
              remove={removeUploaded}
              firstPlace={toFirstPlaceUploaded}
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
          </>
        )}

        <Box sx={styles.actions}>
          <Button
            variant="contained"
            color="success"
            endIcon={
              isLoading ? (
                <CircularProgress color="inherit" size={20} />
              ) : (
                <SaveRoundedIcon />
              )
            }
            onClick={handleEditCustomer}
            disabled={isLoading}
          >
            Сохранить
          </Button>
          <Button
            variant="contained"
            onClick={() => dispatch(closeModalAction())}
          >
            Закрыть
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

const styles: TStyles = {
  actions: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  dialog: {
    padding: "24px",
  },
  form: {
    width: { sm: "300px", md: "600px" },
    "&>*:not(:last-child)": {
      mb: "12px",
    },
  },
  input: {
    minHeight: "60px",
  },
  logo: {
    width: "60px",
    "& img": {
      width: "100%",
      objectFit: "contain",
    },
  },
};

export default memo(ProjectItemDialog);
