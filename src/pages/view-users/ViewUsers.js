import React, { useEffect, useState, useCallback } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import { receiveData } from "../../utils/requests";

import {
  Select,
  FormControl,
  MenuItem,
  Button,
  InputLabel,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  TableHead,
  TableBody,
  Table,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  headerRowFont: {
    fontWeight: "bold",
  },
}));

export default function ViewUsers() {
  const [usersList, setUsersList] = useState([]);
  const [searchList, setSearchList] = useState(["ALL"]);
  const [currentOption, setCurrentOption] = useState("ALL");

  const classes = useStyles();

  const getUsersandPopulateOptions = useCallback(async () => {
    //getting users
    const response = await receiveData("ALL");

    //setting users
    setUsersList(response);

    //populating options
    populateDropDown(response);
  }, []);

  useEffect(() => {
    getUsersandPopulateOptions();
  }, [getUsersandPopulateOptions]);

  const populateDropDown = (users) => {
    let newSearchOptions = [];

    users.map((user) => newSearchOptions.push(user.name));

    setSearchList((prevState) => [...prevState, ...newSearchOptions]);
  };

  const handleSelectChange = (event) => {
    setCurrentOption(event.target.value);
  };

  const onSearchButtonClick = async () => {
    const response = await receiveData(currentOption);
    setUsersList(response);
  };

  const formatDate = (date) => {
    date = new Date(date);
    const formatedDate =
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    return formatedDate;
  };

  const checkExistanceInCollection = (email) => {
    const result = usersList.filter((user) => user.email === email);

    if (result) return true;
    else return false;
  };

  return (
    <>
      <PageTitle title="User Listing" />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "25%", marginRight: "5%" }}>
          <FormControl fullWidth>
            <InputLabel id="select-label">Option</InputLabel>
            <Select
              defaultValue={"ALL"}
              labelId="select-label"
              id="demo-simple-select"
              label="Option"
              onChange={handleSelectChange}
            >
              {searchList.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <Button
            onClick={onSearchButtonClick}
            variant="contained"
            color="primary"
            size="large"
          >
            Search
          </Button>
        </div>
      </div>
      <div style={{ marginTop: "5%" }}>
        <h1>User's</h1>
        <div>
          <TableContainer component={Paper}>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell align="center" className={classes.headerRowFont}>
                    ID
                  </TableCell>
                  <TableCell align="center" className={classes.headerRowFont}>
                    Name
                  </TableCell>
                  <TableCell align="center" className={classes.headerRowFont}>
                    Email
                  </TableCell>
                  <TableCell align="center" className={classes.headerRowFont}>
                    Cell
                  </TableCell>
                  <TableCell align="center" className={classes.headerRowFont}>
                    Created At
                  </TableCell>
                  <TableCell align="center" className={classes.headerRowFont}>
                    Is Deleted
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usersList.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell align="center">{row._id}</TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">{row.cell}</TableCell>
                    <TableCell align="center">
                      {formatDate(row.createdAt)}
                    </TableCell>
                    <TableCell align="center">
                      {checkExistanceInCollection(row.email) ? "No" : "Yes"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
}
