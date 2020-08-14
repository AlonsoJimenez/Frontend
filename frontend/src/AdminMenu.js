import React from 'react';
import ReactDOM from 'react-dom';
import Typography from '@material-ui/core/Typography';
import Editor from './Editor'
import AddStop from './AddStop'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ViewTickets from './ViewTickets';

const useStyles = makeStyles((theme) => ({
 
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function App() {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
         <Typography component="h1" variant="h3" >
              Railspot
           </Typography>
         <Button
            onClick= {() => {ReactDOM.render(
                <React.StrictMode>
                  <AddStop />
                </React.StrictMode>,
                document.getElementById('root')
              )}}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Borrar parada
          </Button>
          <Button
            onClick={() => {ReactDOM.render(
                <React.StrictMode>
                  <AddStop />
                </React.StrictMode>,
                document.getElementById('root')
              )}}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Borrar estacion
          </Button>
          <Button
            onClick={() => {ReactDOM.render(
                <React.StrictMode>
                  <Editor />
                </React.StrictMode>,
                document.getElementById('root')
              )}}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Agregar
          </Button>
          <Button
            onClick={() => {ReactDOM.render(
                <React.StrictMode>
                  <ViewTickets />
                </React.StrictMode>,
                document.getElementById('root')
              )}}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Ver compras
          </Button>
    </Container>
  );
  
}