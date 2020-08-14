import React from 'react';
import Typography from '@material-ui/core/Typography';
import './Ticket.css';
import credentials from './credentials'
import Map from './Map'
import { Graph } from "react-d3-graph";
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
import { keys } from 'd3';


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

const extractKey = (object) =>{
    var keys = [];
    for(var k in object) keys.push(k);
    return keys[0];
}



const createLinks = (object) =>{
    const m = object.map((node)=>({source: node.station.name, target: extractKey(node.adjacentNodes)}))
    return (m);
}

const createGraph = (object) =>{
    const m =  object.map((node) => ({id: node.station.name}))
    console.log(m);
    return(m);
}

export default class CenteredGrid extends React.Component {

    constructor() {
        super();
        this.state = {
            nodes: [{ id: "Harry" }, { id: "Sally" }, { id: "Alice" }],
            links:[
                { source: "Harry", target: "Sally" },
                { source: "Harry", target: "Alice" },
            ],
            //graph: graphAux,
            price: 0,
            ride: []
        }
    }
    
    
    componentDidMount() {
        apiGetList.get('/').then( (res) => { this.setState({ nodes: createGraph(res.data), links: createLinks(res.data) }) },
        )
        
    }
    

    render() {
        const takeAction = (fromS, toS, name, num) => {
    
            console.log("entramos")
            axios.post( URL='http://localhost:9080/BackEnd/rest/user/purchase?fromS='+fromS+'&toS='+toS+'&num='+num+'&email='+name).then((res) => {this.setState({price: res.data.price, ride: res.data.route})}, (error) =>{console.log(error)})
        }

        const data = {
            nodes: this.state.nodes ,
            links: this.state.links,
        };
        
        // the graph configuration, you only need to pass down properties
        // that you want to override, otherwise default ones will be used
        const myConfig = {
            nodeHighlightBehavior: true,
            node: {
                color: "lightgreen",
                size: 120,
                highlightStrokeColor: "blue",
            },
            link: {
                highlightColor: "lightblue",
            },
        };
        
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
                            
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper >
                            <Container >
                            <Graph id="graph-id" data={data} config={myConfig} />                            </Container>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper>
                            <form >
                                <p>De</p>
                                <MenuFrom />
                                <p>Hasta</p>
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
