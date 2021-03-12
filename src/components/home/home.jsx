import React, { useState }from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Cadastrar from "./cadastrar";
import BuscarNome from "./Localizar";
import Rotas from "./Rotas";
import LogOut from "./logout";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      {/* <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '} */}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = useState(2);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Cadastrar" {...a11yProps(0)} />
            <Tab label="Localizar" {...a11yProps(1)} />
            <Tab label="Rotas" {...a11yProps(2)} />
            <Tab label="LogOut" {...a11yProps(3)} />

          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <Cadastrar />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <BuscarNome />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Rotas />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <LogOut />
        </TabPanel>

        <div>
          <Copyright />
        </div>
      </div>
    </>
  );
}
