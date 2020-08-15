import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Container from 'react-bootstrap/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import AdminMenu from './AdminMenu'


const apiGetList = axios.create({
  baseURL: 'http://localhost:9080/BackEnd/rest/user/stations'
})



var select = [];

var selectTo = [];

export default class AddStop extends React.Component {


  render() {

    const handleAccept = async (stop1,stop2) =>{
      axios.delete('http://localhost:9080/BackEnd/rest/admin/deleteStop?user=admin&password=1234abc&origin='+stop1+'&destiny='+stop2).then(ReactDOM.render(
        <React.StrictMode>
          <AdminMenu />
        </React.StrictMode>,
        document.getElementById('root')))
    }

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="AddStop">
          <Container>
            <Typography component="h1" variant="h3" >
              Railspot
           </Typography>
          </Container>
          <Typography component="h1" variant="h4">
            Eliminar parada
        </Typography>
        <Typography component="h1" variant="h6">
            De
                    </Typography>
          <div>
            <MenuFrom />
          </div>
          <Typography component="h1" variant="h6">
            Hasta
                    </Typography>
          <div>
            <MenuTo />
          </div>
          <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick = {()=> {handleAccept(select[0], selectTo[0])}}
        >
          Aceptar
            </Button>
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
    /**
     * @param name
     * Maneja el caso donde quiere cerrar el menu
     */
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

