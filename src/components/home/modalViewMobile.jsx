import React from "react";
import Avatar from "@material-ui/core/Avatar";
import AccountBoxOutlinedIcon from "@material-ui/icons/AccountBoxOutlined";
import { green } from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { IdealBankElement } from "react-stripe-elements";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",

  },

  text: {
    display: "flex",
    padding: "5px",
    flexDirection: "row",
    [theme.breakpoints.down('sm')]: {
      flexDirection: "column",
    }

  },
}));

function ModalViewMobile(listFiltered) {
  const data = listFiltered;
  const {
    name,
    age,
    anotacoes,
    bairro,
    cep,
    complemento,
    cpf,
    email,
    celular,
    telefone,
    emergencia,
    endereco,
    escola,
    numero,
    parentesco,
    responsavel,
    serie,
    turma,
    turno,
    itinerario1,
    matricula,
  } = data.listFiltered[0];
  
  const classes = useStyles();
  
  return (
    <div>
      <Grid container className={classes.container}>
      <Grid item className={classes.text}>

        <Avatar>
          <AccountBoxOutlinedIcon
            style={{ color: green[500], fontSize: 40, background: "#fff" }}
          />
        </Avatar>
        <Typography
            style={{
              display: "flex",
              flexDirection: "row",
              paddingLeft: "10px",
            }}
          >
            Matricula: {matricula}
            </Typography>
            </Grid>
        <Grid item className={classes.text}>
          <Typography
            style={{
              display: "flex",
              flexDirection: "row",
              paddingLeft: "10px",
            }}
          >
            Aluno:
            <span style={{ paddingLeft: "8px" }}>
              {" "}
              <strong> {name} </strong>
            </span>
          </Typography>

          <Typography
            style={{
              display: "flex",
              flexDirection: "row",
              paddingLeft: "30px",
            }}
          >
            Data de nascimento:
            <span style={{ paddingLeft: "10px" }}>
              {" "}
              <strong> {age} </strong>
            </span>
          </Typography>
        </Grid>

        <Grid item className={classes.text}>
          <Typography
            style={{
              display: "flex",
              flexDirection: "row",
              paddingLeft: "10px",
            }}
          >
            Escola:
            <span style={{ paddingLeft: "8px" }}>
              {" "}
              <strong> {escola} </strong>
            </span>
          </Typography>
          <Typography
            style={{
              display: "flex",
              flexDirection: "row",
              paddingLeft: "30px",
            }}
          >
            Turno:
            <span style={{ paddingLeft: "8px" }}>
              {" "}
              <strong> {turno} </strong>
            </span>
          </Typography>
          <Typography
            style={{
              display: "flex",
              flexDirection: "row",
              paddingLeft: "30px",
            }}
          >
            Serie:
            <span style={{ paddingLeft: "8px" }}>
              {" "}
              <strong> {serie} </strong>
            </span>
          </Typography>
          <Typography
            style={{
              display: "flex",
              flexDirection: "row",
              paddingLeft: "30px",
            }}
          >
            Turma:
            <span style={{ paddingLeft: "8px" }}>
              {" "}
              <strong> {turma} </strong>
            </span>
          </Typography>
        </Grid>

        <Grid item className={classes.text}>
          <Typography
            style={{
              display: "flex",
              flexDirection: "row",
              paddingLeft: "10px",
            }}
          >
            Endereço:
            <span style={{ paddingLeft: "8px" }}>
              {" "}
              <strong> {endereco} </strong>
            </span>
          </Typography>
          <Typography
            style={{
              display: "flex",
              flexDirection: "row",
              paddingLeft: "10px",
            }}
          >
            ,
            <span style={{ paddingLeft: "8px" }}>
              {" "}
              <strong> {numero} </strong>
            </span>
          </Typography>
          <Typography
            style={{
              display: "flex",
              flexDirection: "row",
              paddingLeft: "10px",
            }}
          >
            -
            <span style={{ paddingLeft: "8px" }}>
              {" "}
              <strong> {complemento} </strong>
            </span>
          </Typography>
          <Typography
            style={{
              display: "flex",
              flexDirection: "row",
              paddingLeft: "30px",
            }}
          >
            Bairro:
            <span style={{ paddingLeft: "8px" }}>
              {" "}
              <strong> {bairro} </strong>
            </span>
          </Typography>
          <Typography
            style={{
              display: "flex",
              flexDirection: "row",
              paddingLeft: "20px",
            }}
          >
            Cep:
            <span style={{ paddingLeft: "8px" }}>
              {" "}
              <strong> {bairro} </strong>
            </span>
          </Typography>
        </Grid>

        <Grid item className={classes.text}>
          <Typography
            style={{
              display: "flex",
              flexDirection: "row",
              paddingLeft: "10px",
            }}
          >
            Observações:
            <span style={{ paddingLeft: "8px" }}>
              {" "}
              <strong> {anotacoes} </strong>
            </span>
          </Typography>
        </Grid>

        <Grid item className={classes.text}>
          <Typography
            style={{
              display: "flex",
              flexDirection: "row",
              paddingLeft: "10px",
            }}
          >
            {parentesco}:
            <span style={{ paddingLeft: "8px" }}>
              {" "}
              <strong> {responsavel} </strong>
            </span>
          </Typography>
          <Typography
            style={{
              display: "flex",
              flexDirection: "row",
              paddingLeft: "30px",
            }}
          >
            CPF:
            <span style={{ paddingLeft: "8px" }}>
              {" "}
              <strong> {cpf} </strong>
            </span>
          </Typography>
          <Typography
            style={{
              display: "flex",
              flexDirection: "row",
              paddingLeft: "30px",
            }}
          >
            E-mail:
            <span style={{ paddingLeft: "8px" }}>
              {" "}
              <strong> {email} </strong>
            </span>
          </Typography>
        </Grid>

        <Grid item className={classes.text}>
          <Typography
            style={{
              display: "flex",
              flexDirection: "row",
              paddingLeft: "10px",
            }}
          >
            Celular:
            <span style={{ paddingLeft: "8px" }}>
              {" "}
              <strong> {celular} </strong>
            </span>
          </Typography>
          <Typography
            style={{
              display: "flex",
              flexDirection: "row",
              paddingLeft: "30px",
            }}
          >
            telefone:
            <span style={{ paddingLeft: "8px" }}>
              {" "}
              <strong> {telefone} </strong>
            </span>
          </Typography>
          <Typography
            style={{
              display: "flex",
              flexDirection: "row",
              paddingLeft: "30px",
            }}
          >
            Emergência:
            <span style={{ paddingLeft: "8px" }}>
              {" "}
              <strong> {emergencia} </strong>
            </span>
          </Typography>
        </Grid>

        <Grid item className={classes.text}>
          {itinerario1[0] === "" ? (
            ""
          ) : (
            <Box
              border={2}
              bgcolor="text.secondary"
              color="background.paper"
              p={2}
            >
              <Typography
                style={{
                  display: "flex",
                  flexDirection: "row",
                  paddingLeft: "10px",
                }}
              >
                {" "}
                {itinerario1[3]} | Rota: {itinerario1[0]} | Horário:{" "}
                {itinerario1[1]}
              </Typography>
              <Typography
                style={{
                  display: "flex",
                  flexDirection: "row",
                  paddingLeft: "10px",
                }}
              >
                obs: {itinerario1[2]}
              </Typography>
            </Box>
          )}

        </Grid>
      </Grid>
    </div>
  );
}

export default ModalViewMobile;
