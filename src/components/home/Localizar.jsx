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
    marginLeft: "1%",
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
    border: "5px solid #3F51B5",
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
}));

export default function Localizar() {
  const classes = useStyles();
  const [list, setList] = useState([]);
  const [localizar, setLocalizar] = useState("");
  const [localizarId, setLocalizarId] = useState("");
  const [open, setOpen] = useState(false);
  const [del, setDel] = useState(false);
  const [snack, setSnack] = useState(false);
  const { edit, setEdit } = useContext(StoredContext);
  const [snackExport, setSnackExport] = useState(false);
  const [isLoading, setIsLoading ] = useState(false);

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

  const handleDelete = () => {
    const dataRef = firebase
      .database()
      .ref("clientes")
      .child(listFiltered[0].id);
    dataRef.remove();
    setDel(false);
    setLocalizar("");
    setLocalizarId("");
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

  const listFilteredId = list.filter((item) => {
    return item.id.toLowerCase().includes(localizarId.toLowerCase());
  });

  const handleSnackExportar = async () => {
    setIsLoading(true)
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
    const sheetData = listFiltered;
    await sheet.addRows(sheetData)
    setSnackExport(true);
    setIsLoading(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <h2>Localizar cadastro</h2>

      <div className={classes.searchBox}>
        <TextField
          className={classes.full}
          id="outlined-required"
          label="Busca por nome"
          variant="outlined"
          onChange={(e) => setLocalizar(e.target.value)}
          value={localizar}
          size={"small"}
        />

        <Button
          style={{ marginLeft: "5px" }}
          variant="outlined"
          size="large"
          color="primary"
          onClick={(e) => (setLocalizar(""), setLocalizarId(""), setEdit(""))}
        >
          Limpar
        </Button>
        <Button
          style={{ marginLeft: "80px" }}
          variant="outlined"
          size="large"
          color="default"
          onClick={handleSnackExportar}
        >
          Exportar
        </Button>
      </div>
      <div style={{display: "flex", justifyContent:"center"}} >
        {isLoading?<Spiner  />: ''}

      </div>
      <p className={classes.subTitle}> Nome do Aluno | Sigla da Escola</p>
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

      {!localizarId & !edit
        ? listFiltered.map((item, index) => (
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
                          setLocalizar(item.name), setLocalizarId(item.id)
                        )}
                      >
                        {item.name} | {item.escola}
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
                            {item.name} | {item.escola}
                          </Link>
                        </b>
                        <div style={{ display: "flex" }}>
                          <>
                            <Button
                              className={classes.button}
                              variant="outlined"
                              color="primary"
                              onClick={(e) => setOpen(true)}
                            >
                              Detalhes
                            </Button>
                            <Button
                              className={classes.button}
                              variant="outlined"
                              color="default"
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
                  color="primary"
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
