import React, { useState } from "react";
import { Container, Box, TextField, Button, Alert } from "@mui/material";
const AddAdmin = () => {
  const [email, setemail] = useState("");
  const [success, setsuccess] = useState(false);
  const handleAdmin = (e) => {
    e.preventDefault();
    const user = { email: email };

    fetch("https://arcane-river-87047.herokuapp.com/user/adminadd", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.matchedCount) {
          setsuccess(true);
          console.log(data);
        }
        setemail("");
      });
  };
  return (
    <div>
      <Container border={2}>
        <Box style={{ textAlign: "center", marginTop: "100px" }}>
          <form onSubmit="handleAdmin">
            <h1>Make Admin..</h1>
            <TextField
              value={email}
              onChange={(e) => setemail(e.target.value)}
              id="outlined-basic"
              label="Enter Email"
              variant="outlined"
              style={{ width: "50%" }}
            />{" "}
            <br />
            <Button
              onClick={handleAdmin}
              type="submit"
              variant="contained"
              sx={{ width: "40%", my: 2 }}
            >
              Add Admin
            </Button>
            {success && (
              <Alert severity="success">add admin successfully</Alert>
            )}
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default AddAdmin;
