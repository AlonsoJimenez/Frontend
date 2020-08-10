import React from 'react';
import Container from 'react-bootstrap/Container'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Row from 'react-bootstrap/Row'   
import Col from 'react-bootstrap/Col'

var select =[];

var selectTo =[];

const options = [createData("tres rios"),createData("cartago"), createData("sj")];

const optionsTo = [createData("tres rios"),createData("cartago"), createData("sj")];

function createData(name){
    return {name}
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    alignItems: 'center',
    width: '85%',
    marginTop: theme.spacing(1),
  },
  submit: {
    alignItems: 'center',
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function AddStop() {
  
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
          <Container>
           <Typography component="h1" variant="h3" >
                        Railspot
           </Typography>
          </Container>
        <Typography component="h1" variant="h4">
          Agregar parada
        </Typography>
        <form className={classes.paper} noValidate>
          <MenuFrom/>  
          <MenuTo/>     
        </form>
      </div>
    </Container>

  );

}

function MenuTo(){
  
    const [anchorEl, setAnchorEl] = React.useState(null);    
    const handleClick = (event) => {
      
      setAnchorEl(event.currentTarget);
    };
    
    const handleClose = (name) => {
      selectTo = [name]
      console.log(selectTo);
      setAnchorEl(null);
    };
      return(
              <Container>
                <Row>
                      <Col>
                          <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                            Estacion
                          </Button>
                          <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                          >
                          {optionsTo.map((option) => (
                            <MenuItem onClick={() =>handleClose(option.name)} key={option.name} >{option.name}</MenuItem>
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

function MenuFrom(){
  
  const [anchorEl, setAnchorEl] = React.useState(null);    
  const handleClick = (event) => {
    
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = (name) => {
    select = [name]
    console.log(select);
    setAnchorEl(null);
  };
    return(
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
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl)}
                          onClose={handleClose}
                        >
                        {options.map((option) => (
                          <MenuItem onClick={() =>handleClose(option.name)} key={option.name} >{option.name}</MenuItem>
                        ))}
                        </Menu>
                    </Col>
                    <Col><Typography component="h1" variant="h6">
                      Hasta
                    </Typography></Col>
              </Row>
              
          </Container> 
    )
}