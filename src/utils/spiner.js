import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function Spiner() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h3>Aguarde, conectando ao Google Sheets ...</h3>
      <CircularProgress color="primary"/>
    </div>
  );
}