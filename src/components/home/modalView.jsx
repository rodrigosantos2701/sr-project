import React, { useState, useContext, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "../../firebase";
import { Button } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
import { StoredContext } from '../../providers/store';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginLeft: "5%",
    [theme.breakpoints.down('sm')]: {
      marginLeft: "0px",
    }


  },
  full: {
    width: "47%",
    marginRight: "10px",
    [theme.breakpoints.down('sm')]: {
      width: "100%",
      marginBottom: "7px"
    }

  },

  large: {
    width: "31%",
    marginRight: "10px",
    [theme.breakpoints.down('sm')]: {
      width: "100%",
      marginBottom: "7px"

    }

  },
  medium: {
    width: "15%",
    marginRight: "10px",
    [theme.breakpoints.down('sm')]: {
      width: "100%",
      marginBottom: "7px"

    }
  },
  mediumCustom: {
    width: "15%",
    marginRight: "6px",
    [theme.breakpoints.down('sm')]: {
      width: "100%",
      marginBottom: "7px"

    }

  },
  buttonBotton: {
    marginTop: "30px",
    marginRight: "10px"
  },
  textField: {
    [theme.breakpoints.down('sm')]: {
      width: "100%",
      marginBottom: "7px"
    }
  },
  buttonMinimizar: {
    marginTop: "30px",
  },
}));

export default function ModalView({ listFiltered }) {
  const data = listFiltered[0];
  const classes = useStyles();
  const [name, setName] = useState(data.name);
  const [age, setAge] = useState(data.age);
  const [escola, setEscola] = useState(data.escola);
  const [turno, setTurno] = useState(data.turno);
  const [serie, setSerie] = useState(data.serie);
  const [turma, setTurma] = useState(data.turma);
  const [cep, setCep] = useState(data.cep);
  const [endereco, setEndereco] = useState(data.endereco);
  const [numero, setNumero] = useState(data.numero);
  const [bairro, setBairro] = useState(data.bairro);
  const [complemento, setComplemento] = useState(data.complemento);
  const [responsavel, setResponsavel] = useState(data.responsavel);
  const [parentesco, setParenstesco] = useState(data.parentesco);
  const [cpf, setCpf] = useState(data.cpf);
  const [email, setEmail] = useState(data.email);
  const [telefone, setTelefone] = useState(data.telefone);
  const [celular, setCelular] = useState(data.celular);
  const [emergencia, setEmergencia] = useState(data.emergencia);
  const [anotacoes, setAnotacoes] = useState(data.anotacoes);
  const [itinerario, setItinerario] = useState(data.itinerario);
  const [snack, setSnack] = useState(false);
  const [matricula, setMatricula] = useState(data.matricula);
  const { edit, setEdit } = useContext(StoredContext)
  const [toogleCliente, setToogleCliente] = useState(false);
  const [toogleItinerario, setToogleItinerario] = useState(false);



  const handleUpdate = () => {
    if (name) {
      const dataRef = firebase.database().ref("clientes").child(data.id);

      dataRef.update({
        name,
        age,
        escola,
        turno,
        serie,
        turma,
        cep,
        celular,
        telefone,
        emergencia,
        endereco,
        numero,
        bairro,
        complemento,
        responsavel,
        parentesco,
        cpf,
        email,
        itinerario,
        anotacoes,
        matricula,
      });

      handleSnack();
      setEdit(false);
    }
  };


  const handleSnack = () => {
    setSnack(true);
  };

  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnack(false);
  };

  const addItinerario = (index, e) => {
    setItinerario([...itinerario, { itinerario: '', rota: '', horario: '' }])
  }

  const removeItinerario = (index) => {
    let arrayItinerario = []
    arrayItinerario = [...itinerario]
    arrayItinerario.splice(index, 1)
    setItinerario(arrayItinerario)
  }

  const handleItinerario = (index, event) => {
    const values = [...itinerario]
    values[index][event.target.name] = event.target.value
    setItinerario(values)
  }



  return (
    <div className={classes.root}>

      <form className={classes.root} noValidate autoComplete="off">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h3>Cadastro de clientes </h3>
          <IconButton onClick={() => setToogleCliente(!toogleCliente)}>
            {toogleCliente ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          </IconButton>
        </div>
        {toogleCliente ?

          <Grid container spacing={1}>

            {/* DADOS CLIENTE */}
            <Grid item xs={12}>
              <TextField
                className={classes.medium}
                id="outlined-required"
                label="Matricula"
                variant="outlined"
                value={matricula}
                inputProps={
                  { readOnly: true, }
                }

              />
              <TextField
                className={classes.large}
                required
                id="outlined-required"
                label="Nome do aluno"
                variant="outlined"
                value={name}
                inputProps={
                  { readOnly: true, }
                }

              />
              <TextField
                id="date"
                label="Data de nascimento"
                type="date"
                defaultValue="aaaa-mm-aa"
                className={classes.textField}
                variant="outlined"
                value={age}
                InputLabelProps={{
                  shrink: true,
                  readOnly: true
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl variant="outlined" className={classes.medium}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Escola
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={escola}
                  label="Escola"
                >
                  <MenuItem value={"Escola Parque"}>Escola Parque</MenuItem>
                  <MenuItem value={"Escola Americana"}>Escola Americana</MenuItem>
                  <MenuItem value={"Liceu Franco-Brasileiro"}>
                    Colégio Franco-brasileiro
                  </MenuItem>
                </Select>
              </FormControl>{" "}
              <FormControl variant="outlined" className={classes.medium}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Turno
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={turno}
                  label="Turno"
                >
                  <MenuItem value={"manha"}>Manhã</MenuItem>
                  <MenuItem value={"tarde"}>Tarde </MenuItem>
                  <MenuItem value={"integral"}>Integral</MenuItem>
                </Select>
              </FormControl>{" "}
              <TextField
                className={classes.medium}
                id="outlined-required"
                label="Série"
                variant="outlined"
                value={serie}
              />
              <TextField
                className={classes.medium}
                id="outlined-required"
                label="Turma"
                variant="outlined"
                value={turma}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                className={classes.medium}
                id="outlined-required"
                label="CEP"
                variant="outlined"
                value={cep}
              />

              <TextField
                className={classes.large}
                id="outlined-required"
                label="Endereço"
                variant="outlined"
                value={endereco}
              />
              <TextField
                className={classes.medium}
                id="outlined-required"
                label="Numero"
                variant="outlined"
                value={numero}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                className={classes.medium}
                id="outlined-required"
                label="Bairro"
                variant="outlined"
                value={bairro}
              />

              <TextField
                className={classes.full}
                id="outlined-required"
                label="Complemento | ponto de referência | etc"
                variant="outlined"
                value={complemento}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                className={classes.large}
                id="outlined-required"
                label="Responsável"
                variant="outlined"
                value={responsavel}
              />
              <FormControl variant="outlined" className={classes.medium}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Parentesco
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={parentesco}
                  label="Escola"
                >
                  <MenuItem value={"Pai"}>Pai</MenuItem>
                  <MenuItem value={"Mãe"}>Mãe</MenuItem>
                  <MenuItem value={"Responsável"}>Responsável</MenuItem>
                  <MenuItem value={"Avô"}>Avô</MenuItem>
                  <MenuItem value={"Avó"}>Avó</MenuItem>
                  <MenuItem value={"Outro"}>Outro</MenuItem>
                </Select>
              </FormControl>{" "}
            </Grid>

            <Grid item xs={12}>
              <TextField
                className={classes.large}
                id="outlined-required"
                label="CPF"
                variant="outlined"
                value={cpf}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                className={classes.full}
                id="outlined-required"
                label="E-mail"
                variant="outlined"
                value={email}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                className={classes.medium}
                id="outlined-required"
                label="Telefone"
                variant="outlined"
                value={telefone}
              />
              <TextField
                className={classes.medium}
                id="outlined-required"
                label="Celular"
                variant="outlined"
                value={celular}
              />
              <TextField
                className={classes.medium}
                id="outlined-required"
                label="Emergência"
                variant="outlined"
                value={emergencia}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                className={classes.full}
                id="outlined-required"
                label="Anotações"
                variant="outlined"
                value={anotacoes}
              />
            </Grid>


          </Grid>
          : ''}

        {/* ITINERARIO */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h3>Itinerário</h3>

          <IconButton onClick={() => setToogleItinerario(!toogleItinerario)}>
            {toogleItinerario ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          </IconButton>
          <IconButton onClick={addItinerario}>

          </IconButton>

        </div>

        {toogleItinerario ?

          <Grid container spacing={1} >
            {itinerario.map((item, index) =>
              <Grid item xs={12} alignItems="center" >
                <FormControl variant="outlined" className={classes.medium}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Itinerário
                  </InputLabel>

                  <Select
                    className={classes.select}
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={item.itinerario}
                    label="Itinerario"
                    name="itinerario"
                  >
                    <MenuItem value="">{"Vazio"}</MenuItem>
                    <MenuItem value={"Ida"}>Ida</MenuItem>
                    <MenuItem value={"Volta"}>Volta</MenuItem>
                  </Select>

                </FormControl>{" "}
                <FormControl variant="outlined" className={classes.mediumCustom}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Rota
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={item.rota}
                    label="rota"
                    name="rota"
                  >

                    <MenuItem value="">{"Vazio"}</MenuItem>
                    <MenuItem value={"1"}>1</MenuItem>
                    <MenuItem value={"2"}>2</MenuItem>
                    <MenuItem value={"3"}>3</MenuItem>
                    <MenuItem value={"4"}>4</MenuItem>
                    <MenuItem value={"5"}>5</MenuItem>
                  </Select>

                </FormControl>{" "}
                <TextField
                  id="time"
                  label="Horário"
                  name="horario"
                  type="time"
                  defaultValue="00:00"
                  className={classes.textField}
                  variant="outlined"
                  value={item.horario}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />{" "}
                <hr
                  style={{
                    border: "1px solid gray",
                    borderRadius: "5px",
                    margin: "20px -10px",
                  }}
                />

              </Grid>

            )}
          </Grid>
          : ''}

      </form>

      <div>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={snack}
          autoHideDuration={6000}
          onClose={handleSnackClose}
          message="Cadastro Atualizado!"
          action={
            <React.Fragment>
              <Button color="secondary" size="small" onClick={handleSnackClose}>
                Fechar
              </Button>
            </React.Fragment>
          }
        />
      </div>
    </div>
  );
}
