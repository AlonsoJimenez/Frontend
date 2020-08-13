import React from 'react';
import './Ticket.css';

/*
Material-ui
*/
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    textfield: {
        margin: theme.spacing(4),
        backgroundColor: "#333333",
    },
    paper: {
        padding: theme.spacing(2),
        spacing: theme.spacing(2),
        color: theme.palette.text.secondary,
        backgroundColor: "#333333",
        //width: "62%"
    },
    container: {
        
    }
}));
  
export default function CenteredGrid() {
    const classes = useStyles();
  
    return (
        <React.Fragment>
            <Container className={classes.container}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <form className={classes.textfield} noValidate autoComplete="off">
                                Agregar Nueva Estación.
                                <TextField id="name" label="Nombre"  />
                                <TextField id="lat" label="Latitud (Google Maps)"  />
                                <TextField id="lng" label="Longitud (Google Maps)"  />
                                <Button variant="outlined" color="secondary" onClick={() => { alert('C mamut') }}>
                                        Agregar
                                </Button>
                            </form>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <form className={classes.textfield} noValidate autoComplete="off">
                                Agregar Nueva Ruta.
                                <TextField id="addIn" label="Estación de Salida"  />
                                <TextField id="addOut" label="Estación de Entrada"  />
                                <TextField id="addKm" label="Distancia (Km)"  />
                                <Button variant="outlined" color="secondary" onClick={() => { alert('C mamut') }}>
                                        Agregar
                                </Button>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    );
  }