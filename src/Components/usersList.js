import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  List,
  MenuItem,
  Popover,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hooks";

function UsersList() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [idActive, setIdActive] = useState(null);
  const { loading, request} = useHttp();
  const [data, setData] = useState(null);
  const [dataInfo, setDataInfo] = useState(null);

  useEffect(() => {
    const registerHandler = async() => {
      try {
        const data = await request(
          process.env.REACT_APP_NEWS_URL + "/users.json",
          "GET"
        );
        setData(data);
      } catch (e) {}
    };
    registerHandler();
  },[request]);

   async function registerHandler () {
    try {
      const data = await request(
        process.env.REACT_APP_NEWS_URL + `/${idActive.id}.json`,
        "GET"
      );
        setDataInfo(data);  
    } catch (e) {}
  };

  useEffect(() => {
    !loading && registerHandler();
  }, [idActive]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClick = (event) => {
    const element = event.currentTarget;
    setAnchorEl(element);
    setIdActive(element);
    element.style.background = "#4682B4";
  };

  const handleClose = () => {
    setAnchorEl(null);
    idActive.style.background = "none";
  };

  const open = Boolean(anchorEl);
  const pop = (value) => (
    <Popover
      style={{ cursor: "pointer" }}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "center",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "left",
      }}
    >
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="350"
            image={value.avatar}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {value.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            {value.details.city}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            {value.details.company}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            {value.details.position}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Popover>
  );

  return (
    <Box sx={{ width: 200 }}>
      <List>
        {data &&
          data.map((value) => {
            return (
                <MenuItem id={value.id} key={value.id} onClick={handleClick} style={{ cursor: "pointer", pointerEvents: loading ? "none" : "auto" }} >{value.name}</MenuItem>
            );
          })}
      </List>
      {dataInfo && pop(dataInfo)}
    </Box>
  );
}

export default UsersList;