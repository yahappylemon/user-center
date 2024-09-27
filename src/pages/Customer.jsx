import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  TextField,
  CircularProgress,
  IconButton,
  InputAdornment,
  Button,
} from "@mui/material";
import NewCard from "../components/styledCard";
import Wrapper from "../components/Wrapper";
import { tableHead } from "../utils/options";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { getCustomerAPI, deleteCustomerAPI } from "../apis/customer";

export default function Customer() {
  const theme = useTheme();
  const [list, setList] = useState();
  const [total, setTotal] = useState();
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");

  // 獲取客戶
  async function fetchCustomer() {
    const res = await getCustomerAPI({
      pageNum: page,
      pageSize: 7,
      customerName: name,
    });
    console.log(res.data.data);
    setList(res.data.data.items);
    setTotal(res.data.data.total);
  }

  useEffect(() => {
    fetchCustomer();
  }, [page, name]);

  function handlePage(e, value) {
    setPage(value);
  }

  function handleSearch(name) {
    setName(name);
    setPage(1);
  }

  async function handleDelete(e) {
    const id = e.currentTarget.dataset.id;
    await deleteCustomerAPI({ id });
    await fetchCustomer();
  }

  function filterArrays(arr) {
    if (!arr) {
      return null;
    }
    const withoutOthers = arr.filter(
      (exercise) => exercise !== "其他" && exercise !== "Other"
    );
    withoutOthers.splice(3);
    return withoutOthers.toString();
  }

  return (
    <Wrapper>
      <NewCard sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <Typography variant="h5" component="h1">
            Customer
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 0.5,
            }}
          >
            <TextField
              hiddenLabel
              size={"small"}
              placeholder="Search by name…"
              variant="filled"
              value={name}
              onChange={(e) => handleSearch(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <i
                        className="fa-solid fa-magnifying-glass"
                        style={{
                          color: `${theme.palette.primary.contrastText}`,
                        }}
                      ></i>
                    </InputAdornment>
                  ),
                },
              }}
            ></TextField>
            {name && <Button onClick={() => handleSearch("")}>Clear</Button>}
          </Box>
        </Box>
        {!list ? (
          <CircularProgress sx={{ alignSelf: "center" }} />
        ) : (
          <>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="customer list table">
                <TableHead>
                  <TableRow>
                    {tableHead.map((head) => (
                      <TableCell
                        align={"center"}
                        sx={{
                          color: (theme) => theme.palette.primary.contrastText,
                        }}
                      >
                        {head}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {list.length === 0 ? (
                    <TableRow
                      sx={{
                        "&:last-child td": { border: 0 },
                      }}
                    >
                      <TableCell colSpan={6} align={"center"}>
                        No result
                      </TableCell>
                    </TableRow>
                  ) : (
                    list.map((customer) => (
                      <TableRow
                        key={customer.id}
                        sx={{
                          "&:last-child td": { border: 0 },
                        }}
                      >
                        <TableCell align={"center"} sx={{ p: "0" }}>
                          <IconButton
                            component={Link}
                            to={`/newCustomer?customerName=${customer.customerName}`}
                            data-name={customer.customerName}
                            aria-label="edit"
                            size="small"
                            sx={{ mr: 2 }}
                          >
                            <i
                              className="fa-solid fa-pen"
                              style={{
                                color: `${theme.palette.primary.contrastText}`,
                              }}
                            ></i>
                          </IconButton>
                          <IconButton
                            data-id={customer.id}
                            aria-label="delete"
                            size="small"
                            onClick={handleDelete}
                          >
                            <i
                              className="fa-solid fa-trash"
                              style={{
                                color: `${theme.palette.primary.contrastText}`,
                              }}
                            ></i>
                          </IconButton>
                        </TableCell>
                        <TableCell align={"center"}>
                          {customer.customerName}
                        </TableCell>
                        <TableCell align={"center"}>
                          {customer.gender}
                        </TableCell>
                        <TableCell align={"center"}>
                          {filterArrays(customer.regularExercises) ||
                            customer.otherExercises ||
                            "None"}
                        </TableCell>
                        <TableCell align={"center"}>
                          {filterArrays(customer.approaches) ||
                            customer.otherApproaches ||
                            "None"}
                        </TableCell>
                        <TableCell align={"center"}>
                          {customer.firstLesson}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <Pagination
              count={Math.ceil(total / 7)}
              page={page}
              sx={{ alignSelf: "center" }}
              onChange={handlePage}
              color="primary"
            />
          </>
        )}
      </NewCard>
    </Wrapper>
  );
}
