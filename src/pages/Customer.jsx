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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPen,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
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
    // console.log(res.data.data);
    setList(res.data.data.items);
    setTotal(res.data.data.total);
  }

  // 獲取當前客戶列表
  useEffect(() => {
    fetchCustomer();
  }, [page, name]);

  //依據頁碼更新當前客戶列表
  function handlePage(e, value) {
    setPage(value);
  }

  // 依據客戶名稱更新當前客戶列表
  function handleSearch(name) {
    setName(name);
    setPage(1);
  }

  // 刪除用戶資料
  async function handleDelete(e) {
    const id = e.currentTarget.dataset.id;
    await deleteCustomerAPI({ id });
    await fetchCustomer();
  }

  // 篩濾用戶運動習慣資訊
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
          {/* 搜尋框 */}
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
                      <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        style={{
                          color: `${theme.palette.primary.contrastText}`,
                        }}
                      />
                    </InputAdornment>
                  ),
                },
              }}
            ></TextField>
            {name && <Button onClick={() => handleSearch("")}>Clear</Button>}
          </Box>
          {/* 用戶資訊列表 */}
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
                        sx={(theme) => ({
                          color: theme.palette.primary.contrastText,
                        })}
                        key={head}
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
                            to={`/newCustomer?id=${customer.id}`}
                            data-id={customer.id}
                            aria-label="edit"
                            size="small"
                            sx={{ mr: 2 }}
                          >
                            <FontAwesomeIcon
                              icon={faPen}
                              style={{
                                color: `${theme.palette.primary.contrastText}`,
                              }}
                            />
                          </IconButton>
                          <IconButton
                            data-id={customer.id}
                            aria-label="delete"
                            size="small"
                            onClick={handleDelete}
                          >
                            <FontAwesomeIcon
                              icon={faTrash}
                              style={{
                                color: `${theme.palette.primary.contrastText}`,
                              }}
                            />
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
            {/* 頁碼 */}
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
