import React from 'react';
import Typography from '@material-ui/core/Typography';
import './Ticket.css';
import credentials from './credentials'
import Map from './Map'
import Graph from "react-graph-vis";
import * as nodeData from "./train-stations.json"
import './App.css';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Select } from '@material-ui/core';


const graphAux = {
    nodes: nodeData.trainStations.map((stations) => (
        { id: stations.data.NAME, label: stations.data.NAME, color: "#28def7" }
    )),
    edges: [],
};

var enter = false;

const apiGetList = axios.create({
    baseURL: 'http://localhost:9080/BackEnd/rest/user/stations'
})

const apiSendInfor = axios.create({

})

var textName= "";
var textQuantity= "";

var select = [];

var selectTo = [];

const mapULR = "https://maps.googleapis.com/maps/api/js?v=3.exp&key=" + credentials.mapsKey;



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

function createGraphAux(nodes, edges){
    return {nodes, edges};
}


function createData(id, label, color){
    return {id, label, color}
}

const createGraph = (object) =>{
    const m =  object.map((node) => createData(node.station.name, node.station.name, "#28def7"))
    console.log(m);
    console.log(graphAux);
    return(m);
}

export default class CenteredGrid extends React.Component {

    constructor() {
        super();
        this.state = {
            nodes: [],
            edges:[],
            //graph: graphAux,
            price: 0,
            ride: []
        }
    }
    
    /*
    componentDidMount() {
        apiGetList.get('/').then( (res) => { this.setState({ nodes: createGraph(res.data) }) },
        )
        
    }*/
    

    render() {
        const takeAction = (fromS, toS, name, num) => {
    
            console.log("entramos")
            axios.post( URL='http://localhost:9080/BackEnd/rest/user/purchase?fromS='+fromS+'&toS='+toS+'&num='+num+'&email='+name).then((res) => {this.setState({price: res.data.price, ride: res.data.route})}, (error) =>{console.log(error)})
        }
        
        return (
            <Container >
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Paper >
                        <Typography component="h1" variant="h3" >
              Railspot
           </Typography>
          
          <Typography component="h1" variant="h4">
            Compra  tu tiquete
        </Typography>
                            <Container>
                                <Map
                                    nodeData={nodeData}
                                    googleMapURL={mapULR}
                                    containerElement={<div style={{ height: '500px', width: "874px" }} />}
                                    mapElement={<div style={{ height: '100%' }} />}
                                    loadingElement={<p> Cargando </p>}
                                />
                            </Container>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper >
                            <Container >
                                <Graph graph= {createGraphAux(this.state.nodes, this.state.edges)} options={options} events={events} style={{ height: "500px", width: "874px" }} />
                            </Container>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper>
                            <form >
                                <MenuFrom />
                                <MenuTo />
                                <TextField value={this.state.textName} onChange={(event) =>textName = event.target.value} label="Nombre"/>
                                <TextField value={this.state.textQuantity} onChange={(event) =>textQuantity= event.target.value} label="Cantidad" />
                                <Container >
                                    <p>
                                        Precio: 
                                    </p>
                                    <p>{this.state.price} </p>
                                </Container>
                                <Container >
                                    <p>
                                        Recorrido: 
                                    </p>
                                    <p>{this.state.ride}</p>
                                </Container>
                                <Button variant="outlined" color="secondary" onClick={() => {takeAction(select[0], selectTo[0], textName, textQuantity)}}>
                                    Comprar Ticket
                                </Button>       
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
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
