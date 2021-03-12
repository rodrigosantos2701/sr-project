import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "../../firebase";
import { Button } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";

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
    marginTop: "60px",
  },
  buttonMinimizar: {
    marginTop: "30px",
  },
}));

export default function Cadastrar() {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [escola, setEscola] = useState("");
  const [turno, setTurno] = useState("");
  const [serie, setSerie] = useState("");
  const [turma, setTurma] = useState("");
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [parentesco, setParenstesco] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [celular, setCelular] = useState("");
  const [emergencia, setEmergencia] = useState("");
  const [obs1, setObs1] = useState("");
  const [itinerario1, setItinerario1] = useState("");
  const [rota1, setRota1] = useState("");
  const [horario1, setHorario1] = useState("");
  const [obs2, setObs2] = useState("");
  const [itinerario2, setItinerario2] = useState("");
  const [rota2, setRota2] = useState("");
  const [horario2, setHorario2] = useState("");
  const [obs3, setObs3] = useState("");
  const [itinerario3, setItinerario3] = useState("");
  const [rota3, setRota3] = useState("");
  const [horario3, setHorario3] = useState("");
  const [obs4, setObs4] = useState("");
  const [itinerario4, setItinerario4] = useState("");
  const [rota4, setRota4] = useState("");
  const [horario4, setHorario4] = useState("");
  const [anotacoes, setAnotacoes] = useState("");

  const createData = () => {
    if (name) {
      const dataRef = firebase.database().ref("clientes");
      const clientes = {
        name,
        age,
        escola,
        turno,
        serie,
        turma,
        cep,
        endereco,
        numero,
        complemento,
        responsavel,
        parentesco,
        cpf,
        email,
        itinerario1:[
          rota1,
          horario1,
          obs1
        ],
        itinerario2:[
          rota2,
          horario2,
          obs2
        ],
        itinerario3:[
          rota3,
          horario3,
          obs3
        ],
        itinerario4:[
          rota4,
          horario4,
          obs4
        ],

        anotacoes
      };

      dataRef.push(clientes);
      alert("Salvo com sucesso");
      window.location.reload();
    } else {
      alert("Nome é obrigatório");
    }
  };

  return (
    <div className={classes.root}>
      <h2>Cadastrar novo</h2>

      <form className={classes.root} noValidate autoComplete="off">
        <Grid container spacing={1}>
          <Grid item xs={12}>
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
                <MenuItem value={"PA"}>Escola Parque</MenuItem>
                <MenuItem value={"EA"}>Escola Americana</MenuItem>
                <MenuItem value={"FB"}>Colégio Franco-brasileiro</MenuItem>
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
        </Grid>

        <Button
          className={classes.buttonBotton}
          variant="outlined"
          color="primary"
          onClick={createData}
        >
          {" "}
          Add Cadastro
        </Button>
      </form>
    </div>
  );
}
