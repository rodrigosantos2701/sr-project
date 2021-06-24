import React, { useEffect, useState, useContext } from "react";
import firebase from "../../firebase";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import ModalView from "./modalView";
import Link from "@material-ui/core/Link";
import Editar from "./editar";
import Snackbar from "@material-ui/core/Snackbar";
import { StoredContext } from "../../providers/store";
import credential from "../../utils/relatorioclientesantarosa-a45ba7969463.json";
import { GoogleSpreadsheet } from "google-spreadsheet";
import Spiner from "../../utils/spiner";
import { green } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginLeft: "5%",
  },
  subTitle: {
    marginLeft: "5%",
  },
  searchBox: {
    marginLeft: "30%",
    marginBottom: "2%",
  },
  button: {
    marginLeft: "6%",
  },
  linhaLista: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "5px solid rgb(76 175 80)",
    borderRadius: "5px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "65%",
  },
  paperRed: {
    backgroundColor: theme.palette.background.paper,
    border: "5px solid #FF0000",
    borderRadius: "5px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "65%",
  },
  linkName: {
    fontSize: "18px",
  },
  full: {
    color: "primary",
  },

  
}));

export default function Localizar() {
  const classes = useStyles();
  const [list, setList] = useState([]);
  const [localizar, setLocalizar] = useState("");
  const [localizarId, setLocalizarId] = useState("");
  const [localizarMatricula, setLocalizarMatricula] = useState("");
  const [open, setOpen] = useState(false);
  const [del, setDel] = useState(false);
  const [snack, setSnack] = useState(false);
  const { edit, setEdit } = useContext(StoredContext);
  const [snackExport, setSnackExport] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [checkBoxValue, setCheckBoxValue] = React.useState('nome');

  useEffect(() => {
    const dataRef = firebase.database().ref("clientes");
    dataRef.on("value", (snapshot) => {
      const data = snapshot.val();
      const arrayData = [];
      for (let id in data) {
        arrayData.push({ id, ...data[id] });
      }
      setList(arrayData);
    });
  }, []);

  const handleChange = (event) => {
    setCheckBoxValue(event.target.value);
  };

  const handleDelete = () => {
    const dataRef = firebase
      .database()
      .ref("clientes")
      .child(listFiltered[0].id);
    dataRef.remove();
    setDel(false);
    setLocalizar("");
    setLocalizarId("");
    setLocalizarMatricula("");
    handleSnack();
    setEdit(false);
  };

  const handleSnack = () => {
    setSnack(true);
  };

  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnack(false);
    setSnackExport(false);
  };

  const listFiltered = list.filter((item) => {
    return item.name.toLowerCase().includes(localizar.toLowerCase());
  });

  const listFilteredMatricula = list.filter((item) => {
    if (!item.matricula) {return null}
    return item.matricula.toLowerCase().includes(localizarMatricula.toLowerCase());
  });

  const listFilteredId = list.filter((item) => {
    return item.id.toLowerCase().includes(localizarId.toLowerCase());
  });

  const handleSnackExportar = async () => {
    setIsLoading(true);
    const doc = new GoogleSpreadsheet(
      "1mqcc970ejWHqucUNaGkJyk9UjsiRgKeSMlxuZTfiDcY"
    );
    const client_email =
      "santarosa@relatorioclientesantarosa.iam.gserviceaccount.com";
    const { private_key } = credential;
    await doc.useServiceAccountAuth({
      client_email,
      private_key,
    });
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    const sheetData = list;
    await sheet.clear();
    await sheet.setHeaderRow({
      col1: "name",
      col3: "escola",
      col4: "turno",
      col2: "age",
      col5: "serie",
      col6: "turma",
      col8: "endereco",
      col9: "numero",
      col11: "complemento",
      col10: "bairro",
      col7: "cep",
      col13: "parentesco",
      col12: "responsavel",
      col14: "cpf",
      col15: "celular",
      col16: "telefone",
      col17: "emergencia",
      col18: "email",
      col31: "iti1",
      col19: "rota1",
      col23: "horario1",
      col27: "obs1",
      col32: "iti2",
      col20: "rota2",
      col24: "horario2",
      col28: "obs2",
      col33: "iti3",
      col21: "rota3",
      col25: "horario3",
      col29: "obs3",
      col34: "iti4",
      col22: "rota4",
      col26: "horario4",
      col30: "obs4",
      col35: "anotacoes",
    });

    await sheet.addRows(sheetData);
    await sheet.setHeaderRow({
      col1: "Nome",
      col3: "Escola",
      col4: "Turno",
      col2: "Data Nascimento",
      col5: "Serie",
      col6: "Turma",
      col8: "Endereco",
      col9: "Numero",
      col11: "Complemento",
      col10: "Bairro",
      col7: "CEP",
      col13: "Parentesco",
      col12: "Responsavel",
      col14: "CPF",
      col15: "Celular",
      col16: "Telefone",
      col17: "Emergencia",
      col18: "E-mail",
      col31: "1ºItinerario",
      col19: "1ºRota",
      col23: "1°Horario",
      col27: "1ºObs",
      col32: "2ºItinerario",
      col20: "2ºRota",
      col24: "2ºHorario",
      col28: "2ºObs",
      col33: "3ºItinerario",
      col21: "3ºRota",
      col25: "3ºHorario",
      col29: "3ºObs",
      col34: "4ºItinerario",
      col22: "4ºRota",
      col26: "4ºHorario",
      col30: "4ºObs",
      col35: "Anotacoes",
    });

    setSnackExport(true);
    setIsLoading(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <h2>Localizar cadastro</h2>

      <FormControl component="fieldset" style={{display: 'flex', flexDirection: 'row', }}>
      <h3 component="legend" style={{marginRight: '20px'}}>Por:</h3>
      <RadioGroup aria-label="select"  value={checkBoxValue} onChange={handleChange} style={{display: 'flex', flexDirection: 'row'}}>
        <FormControlLabel value="nome" control={<Radio />} label="Nome" />
        <FormControlLabel value="matricula" control={<Radio />} label="Matricula" />
      </RadioGroup>
    </FormControl>

    {localizarId?

      <div>
        <Button
          style={{ marginLeft: "5px" }}
          variant="outlined"
          size="large"
          color='primary'
          onClick={(e) => (setLocalizar(""), setLocalizarId(""), setEdit(""), setLocalizarMatricula(""))}
        >
          Nova Busca
        </Button>
      </div>

:

      <div className={classes.searchBox}>

        {checkBoxValue === 'nome' &&
        <TextField
          className={classes.full}
          id="outlined-required"
          label="Busca por nome"
          variant="outlined"
          onChange={(e) => setLocalizar(e.target.value)}
          onFocus={(e) => setLocalizarMatricula('')}
          value={localizar}
          size={"small"}
          color='primary'
        />
      }
        {checkBoxValue === 'matricula' &&
        <TextField
          className={classes.full}
          id="outlined-required"
          label="Busca por matricula"
          variant="outlined"
          onChange={(e) => setLocalizarMatricula(e.target.value)}
          onFocus={(e) => setLocalizar('')}
          value={localizarMatricula}
          size={"small"}
        />
      }

        <Button
          style={{ marginLeft: "80px" }}
          variant="outlined"
          size="large"
          color="secondary"
          onClick={handleSnackExportar}
          disabled={localizarMatricula !== '' || localizar !== '' ? true:false}
        >
          Exportar para google drive
        </Button>
      </div>
}
      <div style={{ display: "flex", justifyContent: "center" }}>
        {isLoading ? <Spiner /> : ""}
      </div>
      <p className={classes.subTitle}> Matricula | Nome do Aluno | Sigla da Escola</p>
      <hr
        style={{
          marginRight: "15%",
          marginLeft: "5%",
          border: "2px solid gray",
          borderRadius: "5px",
          marginBottom: "20px",
        }}
      />

      <div>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={snack}
          autoHideDuration={6000}
          onClose={handleSnackClose}
          message="Cadastro deletado!"
          action={
            <React.Fragment>
              <Button color="secondary" size="small" onClick={handleSnackClose}>
                Fechar
              </Button>
            </React.Fragment>
          }
        />
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={snackExport}
          autoHideDuration={6000}
          onClose={handleSnackClose}
          message="Exportado excel Online planilha - Clientes Santa Rosa "
          action={
            <React.Fragment>
              <Button color="secondary" size="small" onClick={handleSnackClose}>
                Fechar
              </Button>
            </React.Fragment>
          }
        />
      </div>

    {localizarMatricula & !localizarId? 
           listFilteredMatricula.map((item, index) => (
            <div className={classes.root}>
              <Grid container spacing={1}>
                <Grid item xs={10}>
                  <div className={classes.linhaLista}>
                    <b>
                      {" "}
                      <Link
                        key={index}
                        className={classes.linkName}
                        color="inherit"
                        underline="none"
                        component="button"
                        onClick={(e) => (
                           setLocalizarId(item.id), setLocalizarMatricula(item.matricula || '9999')
                        )}
                      >
                       {item.matricula} | {item.name} | {item.escola}
                      </Link>{" "}
                    </b>{" "}
                  </div>
                  <hr />
                </Grid>
              </Grid>
            </div>
          ))
:''  
  
  }

      {!localizarId & !edit & !localizarMatricula
        ?
         listFiltered.map((item, index) => (
            <div className={classes.root}>
              <Grid container spacing={1}>
                <Grid item xs={10}>
                  <div className={classes.linhaLista}>
                    <b>
                      {" "}
                      <Link
                        key={index}
                        className={classes.linkName}
                        color="inherit"
                        underline="none"
                        component="button"
                        onClick={(e) => (
                          setLocalizar(item.name), setLocalizarId(item.id), setLocalizarMatricula(item.matricula || '9999')
                        )}
                      >
                       {item.matricula} | {item.name} | {item.escola}
                      </Link>{" "}
                    </b>{" "}
                  </div>
                  <hr />
                </Grid>
              </Grid>
            </div>
          ))
        : listFilteredId.map((item, index) => (
            <div className={classes.root}>
              <Grid container spacing={1}>
                <Grid item xs={10}>
                  {edit ? (
                    ""
                  ) : (
                    <>
                      <div className={classes.linhaLista}>
                        <b>
                          <Link
                            key={index}
                            className={classes.linkName}
                            color="inherit"
                            underline="none"
                            component="button"
                            onClick={(e) => setLocalizarId(item.id)}
                          >
                           {item.matricula} | {item.name} | {item.escola}
                          </Link>
                        </b>
                        <div style={{ display: "flex" }}>
                          <>
                            <Button
                              className={classes.button}
                              variant="outlined"
                              style={{ color: green[800] }}
                              onClick={(e) => setOpen(true)}
                            >
                              Detalhes
                            </Button>
                            <Button
                              className={classes.button}
                              variant="outlined"
                              color="primary"
                              onClick={(e) => setEdit(true)}
                            >
                              Editar
                            </Button>
                            <Button
                              className={classes.button}
                              variant="outlined"
                              color="secondary"
                              onClick={(e) => setDel(true)}
                            >
                              Deletar
                            </Button>
                          </>
                        </div>
                      </div>
                      <hr />
                    </>
                  )}
                </Grid>
              </Grid>
            </div>
          ))}
        
      {open ? (
        <div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className={classes.paper}>
                <h2 id="transition-modal-title">Detalhes do cadastro</h2>
                <div
                  id="transition-modal-description"
                  style={{ marginLeft: "3%" }}
                >
                  <ModalView listFiltered={listFilteredId} />
                </div>
                <Button
                  className={classes.button}
                  variant="outlined"
                  style={{ color: green[800] }}
                  onClick={(e) => setOpen(false)}
                >
                  Fechar
                </Button>
              </div>
            </Fade>
          </Modal>
        </div>
      ) : (
        ""
      )}

      {del ? (
        <div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={del}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={del}>
              <div className={classes.paperRed}>
                <h2 id="transition-modal-title" style={{ color: "red" }}>
                  ATENÇÃO - Apos deletar o registro será apagado em definitivo
                </h2>
                <div
                  id="transition-modal-description"
                  style={{ marginLeft: "3%" }}
                >
                  <ModalView listFiltered={listFilteredId} />
                </div>
                <Button
                  className={classes.button}
                  variant="outlined"
                  color="default"
                  onClick={(e) => setDel(false)}
                >
                  Cancelar
                </Button>

                {/* botao delete */}

                <Button
                  className={classes.button}
                  variant="outlined"
                  color="secondary"
                  onClick={handleDelete}
                >
                  Deletar
                </Button>
              </div>
            </Fade>
          </Modal>
        </div>
      ) : (
        ""
      )}

      {edit ? (
        <>
          <Editar listFiltered={listFilteredId} />
        </>
      ) : (
        ""
      )}
    </div>
  );
}
