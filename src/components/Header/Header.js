import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
// import AssignmentRoundedIcon from '@material-ui/icons/AssignmentRounded';
import { format } from "fecha";
import { tableIcons } from "../lib/material-table/tableIcons";
import Button from '@material-ui/core/Button';
import { useContext, useEffect } from "react";
import { globalContext } from "../App";

import { clientestraeNuevos } from '../Main/pages/Clientes/ClientesTraeNuevos'
import PropBarra from '../../Styles/Header.module.css'
import IconButton from '@material-ui/core/IconButton'
import WidgetsTwoToneIcon from '@material-ui/icons/WidgetsTwoTone';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import TableChartIcon from '@material-ui/icons/TableChart';


/*  OJO!!!!! cuando agrego una opción en el menú 
  no olvidar agregarla en 
/home/sandra/SistOLSA/OlsaSG/src/components/Main/index.js*/

function Header() {

  const { valor } = useContext(globalContext);
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

  return (

    <div>
      <AppBar position="static"
      >
        <Toolbar className={PropBarra.barraherr} >


          <Button
            className={PropBarra.botonmenu}
            id="basic-button"
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            startIcon={<LocalAtmIcon />}
          >
            Presup/Lista/OT.
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

            <MenuItem
              className={PropBarra.botonitem}
              component={Link}
              to="/MovStockPant"
              onClick={handleClose1}>Movimiento Stock</MenuItem>

            {/* <MenuItem
              className={PropBarra.botonitem}
              component={Link}
              to="/ModPrecios"
              onClick={handleClose1}>Modifica Precios</MenuItem> */}

          </Menu>

          <Button
            className={PropBarra.botonmenu}
            id="basic-button"
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={open2 ? 'true' : undefined}
            onClick={handleClick2}
            startIcon={<TableChartIcon />}
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

