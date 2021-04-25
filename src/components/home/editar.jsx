import React, { useState, useContext } from "react";
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


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginLeft: "5%",
  },
  full: {
    width: "47%",
    marginRight: "10px",
  },

  large: {
    width: "31%",
    marginRight: "10px",
  },
  medium: {
    width: "15%",
    marginRight: "10px",
  },
  mediumCustom: {
    width: "15%",
    marginRight: "6px",
  },
  buttonBotton: {
    marginTop: "30px",
    marginLeft: "10px",
  },
  buttonMinimizar: {
    marginTop: "30px",
  },
}));

export default function Editar({ listFiltered }) {
  const data = listFiltered[0];
  console.log("==>", data);
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
  const [obs1, setObs1] = useState(data.itinerario1[2]);
  const [rota1, setRota1] = useState(data.itinerario1[0]);
  const [horario1, setHorario1] = useState(data.itinerario1[1]);
  const [obs2, setObs2] = useState(data.itinerario2[2]);
  const [rota2, setRota2] = useState(data.itinerario2[0]);
  const [horario2, setHorario2] = useState(data.itinerario2[1]);
  const [obs3, setObs3] = useState(data.itinerario3[2]);
  const [rota3, setRota3] = useState(data.itinerario3[0]);
  const [horario3, setHorario3] = useState(data.itinerario3[1]);
  const [obs4, setObs4] = useState(data.itinerario4[2]);
  const [rota4, setRota4] = useState(data.itinerario4[0]);
  const [horario4, setHorario4] = useState(data.itinerario4[1]);
  const [anotacoes, setAnotacoes] = useState(data.anotacoes);
  const [itinerario1, setItinerario1] = useState(data.itinerario1[3]);
  const [itinerario2, setItinerario2] = useState(data.itinerario2[3]);
  const [itinerario3, setItinerario3] = useState(data.itinerario3[3]);
  const [itinerario4, setItinerario4] = useState(data.itinerario4[3]);
  const [snack, setSnack] = useState(false);
  const [matricula, setMatricula ] = useState(data.matricula);
  const { edit, setEdit } = useContext(StoredContext)


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
        itinerario1: [rota1, horario1, obs1, itinerario1],
        itinerario2: [rota2, horario2, obs2, itinerario2],
        itinerario3: [rota3, horario3, obs3, itinerario3],
        itinerario4: [rota4, horario4, obs4, itinerario4],
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

  return (
    <div className={classes.root}>
      <h2>Cadastro de clientes</h2>

      <form className={classes.root} noValidate autoComplete="off">
        <Grid container spacing={1}>
          <Grid item xs={12}>
          <TextField
              className={classes.medium}
              id="outlined-required"
              label="Matricula"
              variant="outlined"
              onChange={(e) => setMatricula(e.target.value)}
              value={matricula}
            />

            <TextField
              className={classes.large}
              required
              id="outlined-required"
              label="Nome do aluno"
              variant="outlined"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <TextField
              id="date"
              label="Data de nascimento"
              type="date"
              defaultValue="aaaa-mm-aa"
              className={classes.textField}
              variant="outlined"
              onChange={(e) => setAge(e.target.value)}
              value={age}
              InputLabelProps={{
                shrink: true,
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
                onChange={(e) => setEscola(e.target.value)}
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
                onChange={(e) => setTurno(e.target.value)}
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
              onChange={(e) => setSerie(e.target.value)}
              value={serie}
            />
            <TextField
              className={classes.medium}
              id="outlined-required"
              label="Turma"
              variant="outlined"
              onChange={(e) => setTurma(e.target.value)}
              value={turma}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              className={classes.medium}
              id="outlined-required"
              label="CEP"
              variant="outlined"
              onChange={(e) => setCep(e.target.value)}
              value={cep}
            />

            <TextField
              className={classes.large}
              id="outlined-required"
              label="Endereço"
              variant="outlined"
              onChange={(e) => setEndereco(e.target.value)}
              value={endereco}
            />
            <TextField
              className={classes.medium}
              id="outlined-required"
              label="Numero"
              variant="outlined"
              onChange={(e) => setNumero(e.target.value)}
              value={numero}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              className={classes.medium}
              id="outlined-required"
              label="Bairro"
              variant="outlined"
              onChange={(e) => setBairro(e.target.value)}
              value={bairro}
            />

            <TextField
              className={classes.full}
              id="outlined-required"
              label="Complemento | ponto de referência | etc"
              variant="outlined"
              onChange={(e) => setComplemento(e.target.value)}
              value={complemento}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              className={classes.large}
              id="outlined-required"
              label="Responsável"
              variant="outlined"
              onChange={(e) => setResponsavel(e.target.value)}
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
                onChange={(e) => setParenstesco(e.target.value)}
              >
                <MenuItem value={"pai"}>Pai</MenuItem>
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
              onChange={(e) => setCpf(e.target.value)}
              value={cpf}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              className={classes.full}
              id="outlined-required"
              label="E-mail"
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              className={classes.medium}
              id="outlined-required"
              label="Telefone"
              variant="outlined"
              onChange={(e) => setTelefone(e.target.value)}
              value={telefone}
            />
            <TextField
              className={classes.medium}
              id="outlined-required"
              label="Celular"
              variant="outlined"
              onChange={(e) => setCelular(e.target.value)}
              value={celular}
            />
            <TextField
              className={classes.medium}
              id="outlined-required"
              label="Emergência"
              variant="outlined"
              onChange={(e) => setEmergencia(e.target.value)}
              value={emergencia}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl variant="outlined" className={classes.medium}>
              <InputLabel id="demo-simple-select-outlined-label">
                Itinerário
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={itinerario1}
                label="Itinerario"
                onChange={(e) => setItinerario1(e.target.value)}
              >
                <MenuItem value="">{/* <em>None</em> */}</MenuItem>
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
                value={rota1}
                label="Itinerario"
                onChange={(e) => setRota1(e.target.value)}
              >
                <MenuItem value="">{/* <em>None</em> */}</MenuItem>
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
              type="time"
              defaultValue="00:00"
              className={classes.textField}
              variant="outlined"
              onChange={(e) => setHorario1(e.target.value)}
              value={horario1}
              InputLabelProps={{
                shrink: true,
              }}
            />{" "}
            <TextField
              className={classes.large}
              id="outlined-required"
              label="Observações"
              variant="outlined"
              onChange={(e) => setObs1(e.target.value)}
              value={obs1}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl variant="outlined" className={classes.medium}>
              <InputLabel id="demo-simple-select-outlined-label">
                Itinerário
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={itinerario2}
                label="Itinerario"
                onChange={(e) => setItinerario2(e.target.value)}
              >
                <MenuItem value="">{/* <em>None</em> */}</MenuItem>
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
                value={rota2}
                label="Itinerario"
                onChange={(e) => setRota2(e.target.value)}
              >
                <MenuItem value="">{/* <em>None</em> */}</MenuItem>
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
              type="time"
              defaultValue="00:00"
              className={classes.textField}
              variant="outlined"
              onChange={(e) => setHorario2(e.target.value)}
              value={horario2}
              InputLabelProps={{
                shrink: true,
              }}
            />{" "}
            <TextField
              className={classes.large}
              id="outlined-required"
              label="Observações"
              variant="outlined"
              onChange={(e) => setObs2(e.target.value)}
              value={obs2}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl variant="outlined" className={classes.medium}>
              <InputLabel id="demo-simple-select-outlined-label">
                Itinerário
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={itinerario3}
                label="Itinerario"
                onChange={(e) => setItinerario3(e.target.value)}
              >
                <MenuItem value="">{/* <em>None</em> */}</MenuItem>
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
                value={rota3}
                label="Itinerario"
                onChange={(e) => setRota3(e.target.value)}
              >
                <MenuItem value="">{/* <em>None</em> */}</MenuItem>
                <MenuItem value={"1"}>1</MenuItem>
                <MenuItem value={"2"}>2</MenuItem>
                <MenuItem value={"3"}>3</MenuItem>
              </Select>
            </FormControl>{" "}
            <TextField
              id="time"
              label="Horário"
              type="time"
              defaultValue="00:00"
              className={classes.textField}
              variant="outlined"
              onChange={(e) => setHorario3(e.target.value)}
              value={horario3}
              InputLabelProps={{
                shrink: true,
              }}
            />{" "}
            <TextField
              className={classes.large}
              id="outlined-required"
              label="Observações"
              variant="outlined"
              onChange={(e) => setObs3(e.target.value)}
              value={obs3}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl variant="outlined" className={classes.medium}>
              <InputLabel id="demo-simple-select-outlined-label">
                Itinerário
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={itinerario4}
                label="Itinerario"
                onChange={(e) => setItinerario4(e.target.value)}
              >
                <MenuItem value="">{/* <em>None</em> */}</MenuItem>
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
                value={rota4}
                label="Itinerario"
                onChange={(e) => setRota4(e.target.value)}
              >
                <MenuItem value="">{/* <em>None</em> */}</MenuItem>
                <MenuItem value={"1"}>1</MenuItem>
                <MenuItem value={"2"}>2</MenuItem>
                <MenuItem value={"3"}>3</MenuItem>
              </Select>
            </FormControl>{" "}
            <TextField
              id="time"
              label="Horário"
              type="time"
              defaultValue="00:00"
              className={classes.textField}
              variant="outlined"
              onChange={(e) => setHorario4(e.target.value)}
              value={horario4}
              InputLabelProps={{
                shrink: true,
              }}
            />{" "}
            <TextField
              className={classes.large}
              id="outlined-required"
              label="Observações"
              variant="outlined"
              onChange={(e) => setObs4(e.target.value)}
              value={obs4}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              className={classes.full}
              id="outlined-required"
              label="Anotações"
              variant="outlined"
              onChange={(e) => setAnotacoes(e.target.value)}
              value={anotacoes}
            />
          </Grid>
          <Button
            className={classes.buttonBotton}
            variant="outlined"
            color="primary"
            onClick={handleUpdate}
          >
            {" "}
            Salvar
          </Button>
          <Button
            className={classes.buttonBotton}
            variant="outlined"
            color="secondary"
            onClick={(e)=> setEdit(false)}
          >
            {" "}
            Cancelar
          </Button>
        </Grid>
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
