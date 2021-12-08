import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import { memo } from "react";
import { useAppDispatch } from "../../../store";
import {
  showErrorSnackbar,
  showSuccessSnackbar,
} from "../../../store/Notifications";
import { closeModalAction } from "../../../store/ModalStack";
import { SxProps } from "@mui/system";
import { useEditCustomerMutation } from "../../../store/Customer";

interface ITagItemDialogProps {
  customer: ICustomerFull;
  edit: "name" | "slug" | "description";
}

const CustomerItemDialog = ({
  customer,
  edit,
}: ITagItemDialogProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const [editCustomer, { isLoading }] = useEditCustomerMutation()
  const { handleSubmit, control } = useForm<IEditCustomerData>();

  const handleEditCustomer = handleSubmit(async (data) => {
    try {
      const sendData = { id: customer._id, data };
      const res = await editCustomer(sendData).unwrap();
      dispatch(showSuccessSnackbar(`Заказчик ${res.name} успешно изменён`));
    } catch (e) {
      dispatch(showErrorSnackbar((e as IQueryError)?.data?.message || "fail"));
    }
  });

  const validObj = () => {
    switch (edit) {
      case "name":
        return { required: "Введите наименование Заказчика" };
      case "slug":
        return {
          required: "Введите url slug",
          pattern: {
            value: /^[a-zA-Zа-яА-Я0-9_-]*$/,
            message: "URL slug может содержать только буквы, цифры, - и _",
          },
        };
      default:
        return undefined;
    }
  };

  return (
    <Container sx={styles.dialog}>
      <Box sx={styles.form} component="form">
        <Typography>Редактирование Заказчика</Typography>

        <Controller
          name={edit}
          control={control}
          defaultValue={customer[edit]}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              size="small"
              tabIndex={1}
              sx={styles.input}
              label={edit}
              fullWidth
              multiline={edit === 'description'}
              maxRows={3}
              type="text"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
            />
          )}
          rules={validObj()}
        />

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

const styles: Record<string, SxProps> = {
  actions: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  dialog: {
    padding: "24px",
  },
  form: {
    width: "300px",
    "&>*:not(:last-child)": {
      mb: "12px",
    },
  },
  input: {
    minHeight: "60px",
  },
};

export default memo(CustomerItemDialog);
