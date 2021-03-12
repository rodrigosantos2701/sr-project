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
  },
  searchBox: {
    marginLeft: "30%",
    marginBottom: "2%",
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
  const [rota, setRota] = useState(0);

  useEffect(() => {
    const dataRef = firebase.database().ref("clientes");
    dataRef.on("value", (snapshot) => {
      const data = snapshot.val();
      let arrayData = [];

      for (let id in data) {
        arrayData.push(data[id]);
      }

      const arrayDataFiltered = arrayData.filter(
        (item) =>
          item.itinerario1[0] === rota ||
          item.itinerario2[0] === rota ||
          item.itinerario3[0] === rota ||
          item.itinerario4[0] === rota
      );

      setList(arrayDataFiltered);
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
      {list ? (
        list.map((item) => (
          <div className={classes.root}>
            <Grid container spacing={1} direction="row" xs={12}>
              <Grid item xs={2}>
                <Typography variant="subtitle1">{item.name}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="subtitle1">{item.endereco}</Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography variant="subtitle1">{item.complemento}</Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography variant="subtitle1">{item.turno}</Typography>
              </Grid>

              <Grid item xs={6}>
                    {item.itinerario1[0] === rota ? (
                <Grid container spacing={1} direction="row" xs={8}>
                  <Grid item xs={2}>
                        <Typography variant="body1">
                          {item.itinerario1[1]}
                        </Typography>
                  </Grid>
                  <Grid item xs={10}>
                        <Typography variant="body1">
                          {item.itinerario1[2]}
                        </Typography>
                  </Grid>
                      </Grid>
                    ) : (
                      ""
                      )}
                {item.itinerario2[0] === rota
                  ? item.itinerario2.map((item) => (
                      <Typography variant="body1">{item}</Typography>
                    ))
                  : ""}
                {item.itinerario3[0] === rota
                  ? item.itinerario3.map((item) => (
                      <Typography variant="body1">{item}</Typography>
                    ))
                  : ""}
                {item.itinerario4[0] === rota
                  ? item.itinerario4.map((item) => (
                      <Typography variant="body1">{item}</Typography>
                    ))
                  : ""}
              </Grid>
            </Grid>
            <hr style={{marginRight: "10%"}}/>
          </div>
        ))
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spiner />
        </div>
      )}
    </div>
  );
}
