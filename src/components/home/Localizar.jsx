import React, { useEffect, useState } from "react";
import firebase from "../../firebase";
import Spiner from "../../utils/spiner";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginLeft: "5%",
  },
  subTitle:{
    marginLeft: "5%",
  }

}))


export default function Localizar() {
  const classes = useStyles();
  const [list, setList] = useState([]);

  useEffect(() => {
    const dataRef = firebase.database().ref("clientes");
    dataRef.on("value", (snapshot) => {
      const data = snapshot.val();
      const arrayData = [];
      for (let id in data) {
        arrayData.push(data[id]);
      }
      setList(arrayData);
    });
  }, []);

  return (
    <div className={classes.root}>
    <h2>Localizar cadastros</h2>
    <p className={classes.subTitle}> Nome do Aluno | Sigla da Escola</p>
      {list ? (
        list.map((item) => (
          <div className={classes.root}>
            <Grid container spacing={1}>
              <Grid item xs={10}>
               <b> {item.name} | {item.escola}</b> <hr/>
              </Grid>
            </Grid>
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
