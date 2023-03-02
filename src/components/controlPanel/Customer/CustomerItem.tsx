import {
  Button,
  CircularProgress,
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
} from "@mui/material";
import { memo, useCallback } from "react";
import { str2rusDate } from "../../../lib/Dates";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import {
  showErrorSnackbar,
  showSuccessSnackbar,
} from "../../../store/Notifications";
import { openModal } from "../../../store/ModalStack";
import { useAppDispatch } from "../../../store";
import CustomerItemDialog from "./CustomerItem.dialog";
import { SERVER_URL } from "../../../lib/constants";
import { useDeleteCustomerMutation } from "../../../store/Customer";

interface ICustomerItemProps {
  customer: ICustomerFull;
}

const UserItem = ({ customer }: ICustomerItemProps) => {
  const [removeCustomer, { isLoading }] = useDeleteCustomerMutation();
  const dispatch = useAppDispatch();

  const handleDeleteCustomer = useCallback(async () => {
    try {
      const res = await removeCustomer(customer._id).unwrap();
      dispatch(showSuccessSnackbar(res.message || "success"));
    } catch (e) {
      dispatch(showErrorSnackbar((e as IQueryError).data.message || "fail"));
    }
  }, [removeCustomer, customer, dispatch]);
  return (
    <TableRow>
      <TableCell>
        {customer.author != null ? customer.author.name : ""}
      </TableCell>
      <TableCell sx={styles.logo}>
        {<img src={`${SERVER_URL}/${customer.logo}`} alt="Лого" />}
      </TableCell>
      <TableCell>
        <Tooltip arrow title="Изменить">
          <Button
            size="small"
            color="info"
            onClick={() =>
              dispatch(
                openModal(
                  <CustomerItemDialog customer={customer} edit="name" />
                )
              )
            }
          >
            {customer.name}
          </Button>
        </Tooltip>
      </TableCell>
      <TableCell>
        <Tooltip arrow title="Изменить">
          <Button
            size="small"
            color="info"
            onClick={() =>
              dispatch(
                openModal(
                  <CustomerItemDialog customer={customer} edit="slug" />
                )
              )
            }
          >
            {customer.slug}
          </Button>
        </Tooltip>
      </TableCell>
      <TableCell>
        <Tooltip arrow title="Изменить">
          <Button
            sx={styles.long}
            size="small"
            color="info"
            onClick={() =>
              dispatch(
                openModal(
                  <CustomerItemDialog customer={customer} edit="description" />
                )
              )
            }
          >
            {customer.description ? customer.description : "Добавить"}
          </Button>
        </Tooltip>
      </TableCell>
      <TableCell>
        <Tooltip arrow title="Изменить">
          <Button
            sx={styles.long}
            size="small"
            color="info"
            onClick={() =>
              dispatch(
                openModal(
                  <CustomerItemDialog customer={customer} edit="order" />
                )
              )
            }
          >
            {customer.order ? customer.order : "Добавить"}
          </Button>
        </Tooltip>
      </TableCell>
      <TableCell>{str2rusDate(customer.createdAt)}</TableCell>
      <TableCell>{str2rusDate(customer.updatedAt)}</TableCell>
      <TableCell align="right">
        <IconButton
          color="error"
          onClick={handleDeleteCustomer}
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress color="inherit" size={20} />
          ) : (
            <DeleteForeverRoundedIcon />
          )}
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

const styles: TStyles = {
  long: {
    maxWidth: "200px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordBreak: "break-all",
    whiteSpace: "nowrap",
  },
  logo: {
    maxWidth: "300px",
    "& img": {
      width: "100%",
      objectFit: "contain",
      objectPosition: "center",
    },
  },
};

export default memo(UserItem);
