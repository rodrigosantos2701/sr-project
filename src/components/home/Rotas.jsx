import React, { useEffect, useState } from "react";
import firebase from "../../firebase";
import Spiner from "../../utils/spiner";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginLeft: "5%",
  },
  subTitle: {
    marginLeft: "5%",
  },
  medium: {
    width: "25%",
    [theme.breakpoints.down('sm')]: {
      width: "100%",
    }

  },
  searchBox: {
    marginLeft: "30%",
    marginBottom: "2%",
    [theme.breakpoints.down('sm')]: {
      marginLeft: "0px",
      width: "100%"
    }


  },
  listOfRotas: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  listOfRotasTitle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
}));

export default function Rotas() {
  const classes = useStyles();
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  const [rota, setRota] = useState('0');

  useEffect(() => {

    // Carregando Dados do FireBase
    const dataRef = firebase.database().ref("clientes");
    dataRef.on("value", (snapshot) => {
      const data = snapshot.val();
      let arrayData = [];

      for (let id in data) {
        arrayData.push(data[id]);
      }
      // ---------

      // DADOS
      const dadosArray = []
      const arrayDataFilteredTotal = arrayData
        .map((item) => item.itinerario
          .sort((a, b) => (
            a.rota === rota ? -1 : b.rota === rota ? 1 : 0
          ))
          .map((i) => { if (i.rota === rota ) 
            return dadosArray.push(item)
          })  
      
        )
        
        dadosArray
        .sort((a, b) => (
          a.itinerario[0].horario > b.itinerario[0].horario ? 1 : b.itinerario[0].horario > a.itinerario[0].horario ? -1 : 0 
        ))
          
      setList(dadosArray)
    });
  }, [rota]);

  return (
    <div className={classes.root}>
      <h2>Rotas </h2>
      <div className={classes.searchBox}>
        <FormControl
          variant="outlined"
          className={classes.medium}
          color="primary"
        >
          <InputLabel id="demo-simple-select-outlined-label">
            Selecionar Rota
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={rota}
            label="Selecionar Rota"
            onChange={(e) => setRota(e.target.value)}
          >
            <MenuItem value={"1"}>1</MenuItem>
            <MenuItem value={"2"}>2</MenuItem>
            <MenuItem value={"3"}>3</MenuItem>
            <MenuItem value={"4"}>4</MenuItem>
            <MenuItem value={"5"}>5</MenuItem>
          </Select>
        </FormControl>{" "}
      </div>
      <div className={classes.root}>

        {!rota ? (
          ""
        ) : (
          <Grid container spacing={1} direction="row" xs={12}>
            <Grid item xm={2}>
              <Typography variant="subtitle1">[Matricula] - Nome</Typography>
            </Grid>
            <Grid item xm={2}>
              <Typography variant="subtitle1">Endere??o</Typography>
            </Grid>
            <Grid item xm={2}>
              <Typography variant="subtitle1">Complemento</Typography>
            </Grid>
            <Grid item xm={1}>
              <Typography variant="subtitle1">Turno</Typography>
            </Grid>
            <Grid item xm={5}>
              <Typography variant="subtitle1">Hor??rio</Typography>
            </Grid>
          </Grid>
        )}
        {!rota ? (
          ""
        ) : (
          <hr
            style={{
              marginRight: "10%",
              border: "2px solid gray",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
          />
        )}
      </div>
      {list ? (
        list.map((item) => (
          <div className={classes.root}>
            <Grid container spacing={1} direction="row" xs={12}>
              <Grid item xs={12} sm={2}>
                <Typography variant="subtitle1">[{item.matricula}] - {item.name}</Typography>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Typography variant="subtitle1">
                  {item.endereco},{item.numero} - {item.bairro}
                </Typography>
              </Grid>
              <Grid item xs={4} sm={2}>
                <Typography variant="subtitle1">{item.complemento}</Typography>
              </Grid>
              <Grid item xs={4} sm={1}>
                <Typography variant="subtitle1">{item.turno}</Typography>
              </Grid>
              <Grid item xs={4}>
                {item.itinerario
                  .map((i) => {
                    if (i.rota === rota)
                      return (
                        <Grid container spacing={1} direction="row" xs={8}>
                          <Grid item xs={12}>
                            <Typography variant="body1">
                              {i.itinerario}
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant="body1">
                              {i.horario}
                            </Typography>
                          </Grid>
                        </Grid>

                      )
                  })}

              </Grid>
            </Grid>
            <hr style={{ marginRight: "15%" }} />
          </div>
        ))
      ) : ("")}
    </div>
  );
}
