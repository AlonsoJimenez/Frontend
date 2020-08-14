import React from 'react';
import ReactDOM from 'react-dom';
import AdminMenu from './AdminMenu'
import './Ticket.css';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

var distance= "";

var name = "";

var select = [];

var selectTo = [];

const apiGetList = axios.create({
    baseURL: 'http://localhost:9080/BackEnd/rest/user/stations'
})

  
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
                                <TextField id="name" label="Nombre"  value={name} onChange={(event)=>{name= event.target.value}}/>
                                <Button variant="outlined" color="secondary" onClick={() => {addStation(name)}}>
                                        Agregar
                                </Button>
                            </form>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper >
                            <form  noValidate autoComplete="off">
                                Agregar Nueva Ruta.
                                <p>De</p>
                                <MenuFrom/>
                                <p>Hasta</p>
                                <MenuTo/>
                                <TextField id="addKm" label="Distancia (Km)" value={distance} onChange={(event)=>{distance=event.target.value}} />
                                <Button variant="outlined" color="secondary" onClick={() => {addStop(select[0],selectTo[0], distance )}}>
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

  const addStop = (fromS, toS, distance)=>{
    axios.post('http://localhost:9080/BackEnd/rest/admin/newStop?user=admin&password=1234abc&origin='+fromS+'&destiny='+toS+'&distance='+distance).then(ReactDOM.render(
        <React.StrictMode>
          <AdminMenu />
        </React.StrictMode>,
        document.getElementById('root')))
  }

  const addStation = (name)=>{
    axios.post('http://localhost:9080/BackEnd/rest/admin/newStop?user=admin&password=1234abc&name='+name).then(ReactDOM.render(
        <React.StrictMode>
          <AdminMenu />
        </React.StrictMode>,
        document.getElementById('root')))
  }

  
class MenuTo extends React.Component {

    constructor() {
      super();
      this.state = {
        optionsTo: [],
        anchorEl: null
      }
      apiGetList.get('/').then(res => {
        this.setState({ optionsTo: res.data })
      })
    }
  
    render() {
      const handleClick = (event) => {
  
        this.setState({ anchorEl: event.currentTarget });
      };
  
      const handleClose = (name) => {
        selectTo = [name]
        console.log(selectTo);
        this.setState({ anchorEl: null });
      };
      return (
        <Container>
          <Row>
            <Col>
              <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                Estacion
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={this.state.anchorEl}
                open={Boolean(this.state.anchorEl)}
                onClose={handleClose}
              >
                {this.state.optionsTo.map((option) => (
                  <MenuItem onClick={() => handleClose(option.station.name)} key={option.station.name} >{option.station.name}</MenuItem>
                ))}
              </Menu>
            </Col>
          </Row>
        </Container>
      )
    }
  }
  
  class MenuFrom extends React.Component {
  
    constructor() {
      super();
      this.state = {
        options: [],
        anchorEl: null
      }
      apiGetList.get('/').then(res => {
        this.setState({ options: res.data })
      })
    }
  
    render() {
      const handleClick = (event) => {
  
        this.setState({ anchorEl: event.currentTarget });
      };
  
      const handleClose = (name) => {
        select = [name]
        console.log(select);
        this.setState({ anchorEl: null });
      };
      return (
        <Container>
          <Row>
            <Col>
              <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                Estacion
                          </Button>
              <Menu
                id="simple-menu"
                anchorEl={this.state.anchorEl}
                open={Boolean(this.state.anchorEl)}
                onClose={handleClose}
              >
                {this.state.options.map((option) =>
                  <MenuItem onClick={() => handleClose(option.station.name)} key={option.station.name} >{option.station.name}</MenuItem>
                )}
              </Menu>
            </Col>
          </Row>
  
        </Container>
      )
    }
  }
  
  