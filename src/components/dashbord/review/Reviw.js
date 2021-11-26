import { Rating, TextField, Typography, Button, Alert } from "@mui/material";
import React from "react";
import { Container } from "react-bootstrap";
import useAuth from "../../../useHooks/useAuth";

const Reviw = () => {
  const [value, setValue] = React.useState(0);
  const [comment, setcomment] = React.useState("");
  const [success, setsuccess] = React.useState(false);
  const { user } = useAuth();

  const handleComment = (e) => {
    e.preventDefault();
    console.log(comment, value);
    const reviw = {
      name: user.displayName,
      comment: comment,
      rating: value,
    };
    fetch("https://arcane-river-87047.herokuapp.com/user/reviw", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(reviw),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log();
        setcomment("");
        setValue(0);
        setsuccess(true);
      });
  };
  return (
    <div>
      <Container style={{ textAlign: "center", marginTop: 100 }}>
        <h1>Give your Commment</h1>
        <TextField
          id="outlined-multiline-static"
          label="Your Comment "
          value={comment}
          onChange={(e) => setcomment(e.target.value)}
          multiline
          rows={4}
          style={{ width: "50%" }}
        />{" "}
        <br />
        <Typography component="legend">Your Rating</Typography>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          precision={0.5}
        />
        <br />
        <Button
          onClick={handleComment}
          variant="contained"
          style={{ width: "40%" }}
        >
          Submit
        </Button>
        {success && (
          <Alert severity="success">
            Your Comment Successfully Submited.....
          </Alert>
        )}
      </Container>
    </div>
  );
};

export default Reviw;
