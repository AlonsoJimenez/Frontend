import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { BottomNavigation } from '@material-ui/core';
import SignIn from './AdminSignIn'




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
         <Button
            onClick= {() => Navigator.SignIn}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            User
          </Button>
          <Button
            onClick={() => Navigator.SignIn}
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

