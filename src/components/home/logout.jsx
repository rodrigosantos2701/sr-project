import React from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useAuth } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";



const useStyles = makeStyles((theme) => ({
  paper: {
    // marginTop: theme.spacing(8),
    // display: "flex",
    // flexDirection: "column",
    alignItems: "end",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    // marginTop: theme.spacing(1),
  },
  submit: {
    // margin: theme.spacing(3, 0, 2),
  },
}));

export default function LogOut() {
  const classes = useStyles();

  const { logout } = useAuth();
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    await logout();
    history.push("/");
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Button
          type="link"
          color="secondary"
          className={classes.submit}
          onClick={handleSubmit}
        >
          Sair? Clique para confirmar.
        </Button>

      </div>
      <Box mt={8}>
      </Box>
    </Container>
  );
}
