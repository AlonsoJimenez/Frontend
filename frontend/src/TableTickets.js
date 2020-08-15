import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AdminMenu from './AdminMenu'
import PropTypes from 'prop-types';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const apiGetPurchase = axios.create({
    baseURL: 'http://localhost:9080/BackEnd/rest/admin/reservations?user=admin&password=1234abc',
})

/**
     * Crea el JSON donde  van a ir la informacion de los tiquetes
     */
function createData(user, from, to, number) {
  return { user, from, to, number};
}

/**
     * Compara a y b para poder ordenar la tabla
     */
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

/**
     * Funcion auxiliar par acomparacion de tabla
     */
function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

/**
       * Funcion para acomodar de manera distita numericamente la tabla,
       *  en teoria no se utiliza ya que el unico valor numerico es la cantidad de tiquetes
     */
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}


function EnhancedTableHead(props) {
  

  return (
    <TableHead>
          <TableRow>
            <TableCell>Expirar</TableCell>
            <TableCell align="right">Usuario</TableCell>
            <TableCell align="right">Partida</TableCell>
            <TableCell align="right">Llegada</TableCell>
            <TableCell align="right">Cantidad</TableCell>
          </TableRow>
        </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

/**
       * Crea las listas JSON para utlizar como filas en las tablas
     */
const createRows = (object) =>{
    const tr = object.map((data) => createData(data.email, data.startPoint, data.endPoint, data.numberOf))
    return tr;
}

/**
       * Funcion asincronica para expirar las compras de los usuarios
     */
const expirate  = (eliminationList) =>{
    axios({method: 'delete',url:'http://localhost:9080/BackEnd/rest/admin/expirate?user=admin&password=1234abc',data:eliminationList,headers: {'Content-Type': 'application/json'}}).then(ReactDOM.render(
        <React.StrictMode>
          <AdminMenu />
        </React.StrictMode>,
        document.getElementById('root')))

}


export default class EnhancedTable extends React.Component {
  constructor(){
      super();
      this.state = {
          order : 'asc',
          orderBy : 'name',
          selected : [],
          page : 0,
          dense : false,
          rowsPerPage : 5,
          rows : []
      }

  }

  componentDidMount(){
      apiGetPurchase.get().then((res) =>{this.setState({rows: createRows(res.data)})})
  }

  render(){  
  

  const handleRequestSort = (event, property) => {
    const isAsc = this.state.orderBy === property && this.state.order === 'asc';
    this.setState({ order: isAsc ? 'desc' : 'asc'});
    this.setState({ orderBy: property});
  };

  const handleNewRows = () => {
    console.log(this.state.selected)
    expirate(this.state.selected);
  }


  /**
       * Maneja el click para las casillas
     */
  const handleClick = (event, user) => {
    const selectedIndex = this.state.selected.indexOf(user);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(this.state.selected, user);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(this.state.selected.slice(1));
    } else if (selectedIndex === this.state.selected.length - 1) {
      newSelected = newSelected.concat(this.state.selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        this.state.selected.slice(0, selectedIndex),
        this.state.selected.slice(selectedIndex + 1),
      );
    }

    this.setState({selected:newSelected});
  };

  /**
       * Maneja evento para cambiar de pagina en la tabla
     */
  const handleChangePage = (event, newPage) => {
    this.setState({page:newPage });
  };

  /**
       * Maneja eventos para cambiar la cantidad de elementos en la tabla
     */
  const handleChangeRowsPerPage = (event) => {
    this.setState({rowsPerPage: parseInt(event.target.value, 10)});
    this.setState({page:0 });
  };

  /**
       * Maneja evento para cambio de densidad de forma visual
     */
  const handleChangeDense = (event) => {
    this.setState({dense: event.target.checked});
  };

  const isSelected = (user) => this.state.selected.indexOf(user) !== -1;

  const emptyRows = this.state.rowsPerPage - Math.min(this.state.rowsPerPage, this.state.rows.length - this.state.page * this.state.rowsPerPage);

  return (
    <div >
      <Paper >
        <TableContainer>
          <Table
            
            aria-labelledby="tableTitle"
            size={this.state.dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              
              numSelected={this.state.selected.length}
              order={this.state.order}
              orderBy={this.state.orderBy}
              onRequestSort={handleRequestSort}
              rowCount={this.state.rows.length}
            />
            <TableBody>
              {stableSort(this.state.rows, getComparator(this.state.order, this.state.orderBy))
                .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.user);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.user}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          onClick={(event) => handleClick(event, row.user)}
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell align="right">{row.user}</TableCell>
                      <TableCell align="right">{row.from}</TableCell>
                      <TableCell align="right">{row.to}</TableCell>
                      <TableCell align="right">{row.number}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (this.state.dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={this.state.rows.length}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={this.state.dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
      <Box  alignItems="center">
          <Button
            alignItems='center'
            variant="contained"
            color="primary"
            onClick={()=> handleNewRows()}
          >
            Aceptar
          </Button>
          </Box> 
    </div>
  );
}
}
