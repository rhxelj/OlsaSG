import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
// import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteIcon from '@material-ui/icons/Delete';
import AssignmentRoundedIcon from '@material-ui/icons/AssignmentRounded';
// import { makeStyles } from '@material-ui/core/styles';
import { format } from "fecha";
import { tableIcons } from "../lib/material-table/tableIcons";
import Button from '@material-ui/core/Button';
import { useContext, useEffect } from "react";
import { globalContext } from "../App";

import { clientestraeNuevos } from '../Main/pages/Clientes/ClientesTraeNuevos'
import PropBarra from '../../Styles/Header.module.css'
import IconButton from '@material-ui/core/IconButton'
import WidgetsTwoToneIcon from '@material-ui/icons/WidgetsTwoTone';
import SendIcon from '@material-ui/icons/Send';

/*  OJO!!!!! cuando agrego una opción en el menú 
  no olvidar agregarla en 
/home/sandra/SistOLSA/OlsaSG/src/components/Main/index.js*/

// const useStyles = makeStyles((theme) => ({
// botonmenu: {
//   background: 'linear-gradient(50deg, #00bfa5 20%, #0d47a1 70%)',
//   border: 3,
//   borderRadius: 3,
//   boxShadow: '#004d40',
//   color: 'white',
//   height: 25,
//   padding: '10 50px',
//   marginRight: theme.spacing(2),
// },
//   botonmenu:hover {
//     background: 'black',
// },
// barra: {
//   background: '#c5cae9',
//   border: 0,
//   borderRadius: 3,
//   //  boxShadow: '0 3px 5px 2px rgba(30, 106, 57, .3)',
//   boxShadow: '#004d40',
//   color: 'white',
//   height: 40,
//   padding: '0 30px',
// },
// barraherr: {
//   background: '#c5cae9',
//   color: 'blue',
//   flexGrow: 1,
//   minHeight: 40,
//   padding: '0 30px',
// },
// root: {
//   flexGrow: 1,
// },

// title: {
//   flexGrow: 1,
//   marginRight: theme.spacing(15),
//   color: 'blue',
//   marginLeft: theme.spacing(60),

// },
// }));


function Header() {

  const { valor } = useContext(globalContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    console.log('vino a handleClose  ')
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


  const [anchorEl3, setAnchorEl3] = React.useState(null);
  const open3 = Boolean(anchorEl3);

  const handleClick3 = (event) => {
    setAnchorEl3(event.currentTarget);
  };
  const handleClose3 = () => {
    setAnchorEl3(null);
  };

  const diafecha = format(new Date(), "DD-MM-YYYY");


  // const [state, setState] = useState(initial_state);
  useEffect(() => {
    clientestraeNuevos()
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // const classes = useStyles();
  return (
    /*
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            // onClick={this.toggleDrawer("left", true)}
          >
            <MenuIcon onClick={toggleDrawer("left", true)}></MenuIcon>
          </IconButton>
          <Typography variant="h6" className={classes.title} noWrap>
            OlsaSG
          </Typography>
          <Typography variant="h6" className={classes.title} noWrap>
            {valor}
          </Typography>

          {newMethod(abrir_movimientos, abrir_tablas)}

          <Typography variant="h6">{diafecha}</Typography>
        </Toolbar>
      </AppBar>
    </div>
    */
    <div>
      <AppBar position="static"
      // className={classes.root}>
      // className={classes.barra}>
      // className={PropBarra.barra}

      >
        <Toolbar className={PropBarra.barraherr} >


          <Button
            // color="inherit"
            className={PropBarra.botonmenu}
            id="basic-button"
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            //  aria-expanded={open ? 'basic-menu' : undefined}
            onClick={handleClick}
            startIcon={<AssignmentRoundedIcon />}

          >
            Presup/Lista
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

            <MenuItem className={PropBarra.botonitem} component={Link} to="/PresupPant" onClick={handleClose}>Presupuesto</MenuItem>
            <MenuItem className={PropBarra.botonitem} component={Link} to="/ListaPrecios" onClick={handleClose}>Lista de Precios</MenuItem>
            <MenuItem className={PropBarra.botonitem} component={Link} to="/OrdenTrabajoPant" onClick={handleClose}>Orden de Trabajo</MenuItem>
            <MenuItem className={PropBarra.botonitem} component={Link} to="/PresupMuestra" onClick={handleClose}>Muestra Presupuesto</MenuItem>
            <MenuItem className={PropBarra.botonitem} component={Link} to="/ModPrecios" onClick={handleClose}>Modifica Precios</MenuItem>
          </Menu>

          <Button
            // color="inherit"
            className={PropBarra.botonmenu}
            id="basic-button"
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={open1 ? 'true' : undefined}
            onClick={handleClick1}
            startIcon={<WidgetsTwoToneIcon />}

          >
            Stock
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
            <MenuItem className={PropBarra.botonitem} component={Link} to="/MovStockPant" onClick={handleClose1}>Ingreso Mercadería</MenuItem>
            <MenuItem className={PropBarra.botonitem} component={Link} to="/StkMovEntrada" onClick={handleClose1}>Entrada Mercadería</MenuItem>
            <MenuItem className={PropBarra.botonitem} component={Link} to="/StkMovSalida" onClick={handleClose1}>Salida de Disponible</MenuItem>
            <MenuItem className={PropBarra.botonitem} component={Link} to="/ImprimeDisponible" onClick={handleClose1}>Impresión Mercadería Disponible</MenuItem>
            <MenuItem className={PropBarra.botonitem} component={Link} to="/StkMovSalidaFinal" onClick={handleClose1}>Salida Final</MenuItem>
            <MenuItem className={PropBarra.botonitem} component={Link} to="/ModPrecios" onClick={handleClose1}>Modifica Precios</MenuItem>

            <Button
              // className={classes.botonmenu}
              // className={PropBarra.botonmenu}
              id="basic-button"
              aria-controls="basic-menu"
              aria-haspopup="true"
              aria-expanded={open2 ? 'true' : undefined}
              onClick={handleClick2}
              startIcon={<SendIcon />}
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
              <div >
                <MenuItem component={Link} className={PropBarra.botonitem} to="/Proveedores" onClick={handleClose2}>Proveedores</MenuItem>
                <MenuItem component={Link} className={PropBarra.botonitem} to="/Clientes" onClick={handleClose2}>Clientes</MenuItem>
                <MenuItem component={Link} className={PropBarra.botonitem} to="/Transporte" onClick={handleClose2}>Transporte</MenuItem>
                <MenuItem component={Link} className={PropBarra.botonitem} to="/StkMonedas" onClick={handleClose2}>Monedas</MenuItem>
                <MenuItem component={Link} className={PropBarra.botonitem} to="/StkGrupo" onClick={handleClose2}>Grupos</MenuItem>
                <MenuItem component={Link} className={PropBarra.botonitem} to="/StkRubro" onClick={handleClose2}>Rubros</MenuItem>
                <MenuItem component={Link} className={PropBarra.botonitem} to="/StkItems" onClick={handleClose2}>Items</MenuItem>
                <MenuItem component={Link} className={PropBarra.botonitem} to="/StkUnMed" onClick={handleClose2}>Unidad de Medidas</MenuItem>
                <MenuItem component={Link} className={PropBarra.botonitem} to="/StkUbFisica" onClick={handleClose2}>Ubicación Física</MenuItem>
                <MenuItem component={Link} className={PropBarra.botonitem} to="/PresupConfTipo" onClick={handleClose2}>Presupuesto Tipo</MenuItem>
                <MenuItem component={Link} className={PropBarra.botonitem} to="/PresupDetPie" onClick={handleClose2}>Pie de Presupuesto</MenuItem>
              </div>
            </Menu>

          </Menu>
          <Typography variant="h6" className={PropBarra.title}  >
            {valor}
          </Typography>
          <Typography variant="h6" className={PropBarra.title}  >
            {diafecha}
          </Typography>

          <Typography variant="h6" className={PropBarra.title}  >
            <IconButton
              size="medium"
              edge="start"
              color="primary"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleClick3}
            >
              <tableIcons.MoreVert />
            </IconButton>


          </Typography>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl3}
            open={open3}
            onClose={handleClose3}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <div >
              <MenuItem component={Link} className={PropBarra.botonitem} to="/BackupDiario" onClick={handleClose3}>Backup Diario</MenuItem>
              <MenuItem component={Link} className={PropBarra.botonitem} to="/RecuperaDatos" onClick={handleClose3}>Recupera Datos</MenuItem>
            </div>


          </Menu>

        </Toolbar>
      </AppBar>
    </div >
  );
  // }
}

export default Header;

