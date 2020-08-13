import React from 'react';
import './AddStop.css';
import Container from 'react-bootstrap/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

const apiGetList = axios.create({
  baseURL: 'http://localhost:9080/BackEnd/rest/user/stations'
})

var select = [];

var selectTo = [];

export default class AddStop extends React.Component {


  

  render() {
    

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className = "AddStop">
          <Container>
            <Typography component="h1" variant="h3" >
              Railspot
           </Typography>
          </Container>
          <Typography component="h1" variant="h4">
            Agregar parada
        </Typography>
          
            <div>
            <MenuFrom/>
            </div>
            <div>
            <MenuTo/>
            </div>
          
        </div>
      </Container>

    );
  }

}

class MenuTo extends React.Component {

  constructor() {
    super();
    this.state = {
      optionsTo: [],
      anchorEl: null 
    }
    apiGetList.get('/').then(res => {
      console.log("listo")
      console.log(res.data)
    })
  }

  render(){
  const handleClick = (event) => {
    
    this.setState({anchorEl:event.currentTarget });
  };

  const handleClose = (name) => {
    selectTo = [name]
    console.log(selectTo);
    this.setState({anchorEl: null});
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
              <MenuItem onClick={() => handleClose(option.name)} key={option.name} >{option.name}</MenuItem>
            ))}
          </Menu>
        </Col>
      </Row>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
      >
        Aceptar
            </Button>
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
      this.setState({options: res.data})
    })
  }

  render(){
  const handleClick = (event) => {
    
    this.setState({anchorEl:event.currentTarget });
  };

  const handleClose = (name) => {
    select = [name]
    console.log(select);
    this.setState({anchorEl: null});
  };
  return (
    <Container>
      <Row>
        <Col><Typography component="h1" variant="h6">
          De
                    </Typography></Col>
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
        <Col><Typography component="h1" variant="h6">
          Hasta
                    </Typography></Col>
      </Row>

    </Container>
  )
            }
}