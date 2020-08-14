import React from 'react';
import './Ticket.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


  
export default class CenteredGrid extends React.Component{
    render(){
    return (
        <React.Fragment>
            <Container >
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper >
                            <form  noValidate autoComplete="off">
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
                        <Paper >
                            <form  noValidate autoComplete="off">
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
  }