import React from 'react';
import './Ticket.css';
import credentials from './credentials'
import Map from './Map'
import Graph from "react-graph-vis";
import * as nodeData from "./train-stations.json"
/*
Material-ui
*/
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const mapULR = "https://maps.googleapis.com/maps/api/js?v=3.exp&key=" + credentials.mapsKey;


const graph = {
    nodes: nodeData.trainStations.map((stations) => (
        {id: stations.data.NAME, label: stations.data.NAME, color: "#28def7"}
    )),
    edges: [],
};

const options = {
    layout: {
        hierarchical: false
    },
    edges: {
        color: "#000000"
    }
};

const events = {
    select: function (event) {
        var { nodes, edges } = event;
        console.log("Selected nodes:");
        console.log(nodes);
        console.log("Selected edges:");
        console.log(edges);
    }
};



function Ticket() {
    return (
        <div
        className={'background-color'}
        >
            <Map
                googleMapURL={mapULR}
                containerElement={<div style={{ height: '500px', width: "600px" }} />}
                mapElement={<div style={{ height: '100%' }} />}
                loadingElement={<p> Cargando </p>}
            />
            <Graph graph={graph} options={options} events={events} style={{ height: "500px", width: "600px" }} />
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      alignItems: 'center',
      backgroundColor: "#08304B",
    },
    textfield: {
        margin: theme.spacing(4),
        backgroundColor: "#333333",
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
      backgroundColor: "#333333",
      //width: "62%"
    },
    container: {
        margin: 0,
        padding: 0,
    },
    container_root: {
        padding: 32,
        backgroundColor: "#08304B",
        minheight: "100%",
        minWidth: "100%",
    },
    calculations: {
        backgroundColor: "#1E1E1E",
        minHeight: "15%",
        maxWidth: "10%",
    },
}));
  
export default function CenteredGrid() {
    const classes = useStyles();
  
    return (
      <Container className={classes.container_root}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
                <Container className={classes.container}>
                    <Map
                        googleMapURL={mapULR}
                        containerElement={<div style={{ height: '500px', width: "874px" }} />}
                        mapElement={<div style={{ height: '100%' }} />}
                        loadingElement={<p> Cargando </p>}
                    />
                </Container>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
                <Container className={classes.container}>
                    <Graph graph={graph} options={options} events={events} style={{ height: "500px", width: "874px" }} />
                </Container>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
                <form className={classes.textfield} noValidate autoComplete="off">
                    <TextField id="in" label="Estación Inicial" />
                    <Container className={classes.calculations}>
                        <p>
                           Precio 
                        </p>
                    </Container>
                    <TextField id="out" label="Estación Final"  />
                    <Container className={classes.calculations}>
                        <p>
                           Recorrido 
                        </p>
                    </Container>
                    <TextField id="date" label="Fecha"  />
                    <Container className={classes.calculations}>
                        <p>
                           Distancia (Km) 
                        </p>
                    </Container>
                    <Button variant="outlined" color="secondary" onClick={() => { alert('C mamut') }}>
                        Comprar Ticket
                    </Button>
                </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }
