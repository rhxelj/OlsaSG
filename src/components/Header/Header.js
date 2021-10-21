import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { format } from "fecha";



const initial_state = {
  open: false,
  menutablas: null,
  menutablas1: null,
  menumov: null,
  top: false,
  left: false,
  bottom: false,
  right: false,
  setSelectedIndex: 0,
  showComponent: false
};


const useStyles = makeStyles((theme) => ({
  botonmenu: {
    background: 'linear-gradient(50deg, #00bfa5 20%, #0d47a1 70%)',
    border: 3,
    borderRadius: 3,
    boxShadow: '#004d40',
    color: 'white',
    height: 25,
    padding: '10 50px',
    marginRight: theme.spacing(2),

  },
  barra: {
    background: '#c5cae9',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(30, 106, 57, .3)',
    boxShadow: '#004d40',
    color: 'white',
    height: 40,
    padding: '0 30px',
  },
  barraherr: {
    background: '#c5cae9',
    color: 'blue',
    flexGrow: 1,
    minHeight: 40,
    padding: '0 30px',
  },
  root: {
    flexGrow: 1,
  },

  title: {
    flexGrow: 1,
    marginRight: theme.spacing(15),
    color: 'blue',
    marginLeft: theme.spacing(60),

  },
}));


function Header() {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const open1 = Boolean(anchorEl1);

  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl1(null);
  };


  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const open2 = Boolean(anchorEl2);

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const diafecha = format(new Date(), "DD-MM-YYYY");

  const [state, setState] = useState(initial_state);


  const classes = useStyles();
  return (
    <div>
      <AppBar position="static"
        // className={classes.root}>
        className={classes.barra}>
        <Toolbar className={classes.barraherr}>
          <Button
            // color="inherit"
            className={classes.botonmenu}
            id="basic-button"
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            Precios-Presup
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >

            <MenuItem component={Link} to="/PresupPant" onClick={handleClose}>Presupuesto</MenuItem>
            <MenuItem component={Link} to="/ListaPrecios" onClick={handleClose}>Lista de Precios</MenuItem>
            <MenuItem component={Link} to="/OrdenTrabajoPant" onClick={handleClose}>Orden de Trabajo</MenuItem>
            <MenuItem component={Link} to="/PresupMuestra" onClick={handleClose}>Muestra Presupuesto</MenuItem>
            <MenuItem component={Link} to="/ModPrecios" onClick={handleClose}>Modifica Precios</MenuItem>
          </Menu>

          <Button
            // color="inherit"
            className={classes.botonmenu}
            id="basic-button"
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={open1 ? 'true' : undefined}
            onClick={handleClick1}
          >
            Mercadería
          </Button>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl1}
            open={open1}
            onClose={handleClose1}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem component={Link} to="/StkMovEntrada" onClick={handleClose}>Entrada Mercadería</MenuItem>
            <MenuItem component={Link} to="/StkMovSalida" onClick={handleClose}>Salida de Disponible</MenuItem>
            <MenuItem component={Link} to="/StkMovSalidaFinal" onClick={handleClose}>Salida Final</MenuItem>

          </Menu>
          <Button
            variant="contained" color="secondary"
            id="basic-button"
            variant='button'
            className={classes.botonmenu}
            // color="inherit"
            size="large"
            // aria-controls="basic-menu"
            // aria-haspopup="open1"
            aria-expanded={open2 ? 'true' : undefined}
            onClick={handleClick2}
          >
            Tablas
          </Button>
          <Menu

            id="basic-menu"
            anchorEl={anchorEl2}
            open={open2}
            onClose={handleClose2}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem component={Link} to="/Proveedores" onClick={handleClose}>Proveedores</MenuItem>
            <MenuItem component={Link} to="/Clientes" onClick={handleClose}>Clientes</MenuItem>
            <MenuItem component={Link} to="/StkMonedas" onClick={handleClose}>Monedas</MenuItem>
            <MenuItem component={Link} to="/StkGrupo" onClick={handleClose}>Grupos</MenuItem>
            <MenuItem component={Link} to="/StkRubro" onClick={handleClose}>Rubros</MenuItem>
            <MenuItem component={Link} to="/StkItems" onClick={handleClose}>Items</MenuItem>
            <MenuItem component={Link} to="/StkUnMed" onClick={handleClose}>Unidad de Medidas</MenuItem>
            <MenuItem component={Link} to="/StkUbFisica" onClick={handleClose}>Ubicación Física</MenuItem>
            <MenuItem component={Link} to="/PresupConfTipo" onClick={handleClose}>Presupuesto Tipo</MenuItem>
            <MenuItem component={Link} to="/PresupDetPie" onClick={handleClose}>Pie de Presupuesto</MenuItem>

          </Menu>

          <Typography variant="h6" className={classes.title}>
            OlsaSG
          </Typography>
          <Typography variant="h6">{diafecha}</Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
  // }
}

export default Header;
