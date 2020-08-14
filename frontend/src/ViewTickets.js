import React from 'react';
import Container from 'react-bootstrap/Container'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import EnhancedTable from './TableTickets'



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
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

export default function ViewTickets() {
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
          Compras de usuario
        </Typography>
        <form className={classes.form} noValidate>
          <EnhancedTable/>         
        </form>
      </div>
    </Container>

  );

}