import React from 'react';
import ReactDOM from 'react-dom';
import AdminSignIn from './AdminSignIn';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Ticket from './Ticket';

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
            onClick= {() => ReactDOM.render(
              <React.StrictMode>
                <Ticket />
              </React.StrictMode>,
              document.getElementById('root'))}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            User
          </Button>
          <Button
            onClick={() => ReactDOM.render(
              <React.StrictMode>
                <AdminSignIn />
              </React.StrictMode>,
              document.getElementById('root'))}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Admin
          </Button>
    </Container>
  );
  
}