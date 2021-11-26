import React, { useEffect, useState } from "react";
import { Container, Box, Avatar, Typography } from "@mui/material";
import {} from "@mui/system";
import Comment from "./Comment";
import "./comment.css";
const CommentSection = () => {
  const [reviws, setreviw] = useState([]);

  useEffect(() => {
    fetch("https://arcane-river-87047.herokuapp.com/useer/reviw")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setreviw(data);
      });
  }, []);
  return (
    <>
      <Container className="" style={{}}>
        <h1>Customers Reviws ({reviws.length})</h1>
        <hr className="w-25" />
        <Box
          style={{
            maxHeight: "50vh",
            overflow: "hidden",
            overflowY: "scroll",
          }}
          className="scrolling"
        >
          {reviws.map((reviw) => (
            <Comment reviw={reviw}></Comment>
          ))}
        </Box>
      </Container>
    </>
  );
};

export default CommentSection;
