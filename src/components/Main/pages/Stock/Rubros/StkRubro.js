import React, { Component } from "react";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper
} from "@material-ui/core";
import IpServidor from "../../VariablesDeEntorno";
import request from "superagent";
import "../../../../../Styles/TableHeader.css";
import { withStyles } from "@material-ui/core/styles";

import SelecCampos from "../../Impresion/SelecCampos";
import StkRubroAgregar from "./StkRubroAgregar";
import StkRubroBorrar from "./StkRubroBorrar";
import StkRubroModificar from "./StkRubroModificar";
import StkFab from "../../../../lib/StkFab";

// Estilo para el botón de borrar
const style = {
  marginLeft: "15px",
  padding: "0px",
  width: "100px"
};

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

class StkRubro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idStkRubro: "",
      StkMonedasDescripcion: "",
      StkMonedasCotizacion: 0,
      rubro: [],
      toggle: {
        agregar: false,
        busqueda: false,
        modificar: false,
        seleccampos: false
      },
      filtered: "",
      campo: "idStkRubro",
      direction: {
        // direccion del ordenamiento asc o des
      }
    };
  }

  //Read
  read = _ => {
    const url = IpServidor + "/stkrubroleermezcla";
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then(res => {
        const rubro = JSON.parse(res.text);
        this.setState({ rubro: rubro }, () => {
          console.log(`Rubro :`);
          console.log(this.state.rubro);
        });
      });
  };

  leegrupodesc(prop) {
    if (prop !== 0) {
      const url = IpServidor + "/stkgrupoleercod/" + prop;
      request
        .get(url)
        .set("Content-Type", "application/json")
        .then(res => {
          const grupo = JSON.parse(res.text);
          this.setState({ grupo: grupo });
          this.setState({ StkGrupoDesc: this.state.grupo[0].StkGrupoDesc });
        });
    }
  }

  // Cosas a agregar para la funcion de Ordenar (SortBy) Begin ***************************************************************************************************

  // Funcion ordernar - Begin

  sortBy(key) {
    this.setState({
      rubro: this.state.rubro.sort((a, b) =>
        this.state.direction[key] === "asc"
          ? a[key] < b[key]
            ? 1
            : -1
          : a[key] > b[key]
          ? 1
          : -1
      ),
      direction: { [key]: this.state.direction[key] === "asc" ? "desc" : "asc" }
    });
  }

  // Funcion ordernar - End

  // Cosas a agregar para la funcion de Ordenar (SortBy) End ******************************************************************************************************

  //******************************************* Habilita el contenido a mostrar en Pantalla - Begin *******************************************

  toggle = arg => {
    this.setState(prevState => ({
      toggle: { [arg]: !prevState.toggle[arg] }
    })); // estado inicial "FALSE" muestra la tabla de "..." en "TRUE" llama al componente <ComponenteParticular>
  };

  // Cosas a agregar para la funcion de Busqueda Begin **************************************************************************************************

  // Funcion De Busqueda - Begin

  search = event => {
    // Funcion de busqueda
    // var name  = event.target.name
    var value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    this.setState({ filtered: value });
  };

  // Funcion De Busqueda - End.

  // Opcion para borrar contenido del cuadro de busqueda - BEGIN

  borraFiltered = () => {
    this.setState({ filtered: "" });
  };

  // Opcion para borrar contenido del cuadro de busqueda - END

  // Cosas a agregar para la funcion de Busqueda End *******************

  //******************************************* Habilita el contenido a mostrar en Pantalla - End *******************************************

  componentWillUnmount() {
    this.setState({ state: this.state });
  }
  componentDidMount() {
    this.read();
  }

  render() {
    // Agrego el campo del Boton BORRAR
    // var rubro = this.state.rubro.map((rowData, index) =>
    this.state.rubro.map((rowData, index) =>
      Object.assign(rowData, {
        borrar: (
          <StkRubroBorrar
            idStkRubro={rowData.idStkRubro}
            StkRubroCodGrp={rowData.StkRubroCodGrp}
            read={() => this.read()}
          ></StkRubroBorrar>
        )
      })
    );

    // Filtrado de datos - Begin

    var rubro = this.state.rubro.filter(rbr => {
      return (
        rbr.StkGrupoDesc.toLowerCase().indexOf(
          this.state.filtered.toLowerCase()
        ) !== -1 ||
        rbr.StkRubroDesc.toLowerCase().indexOf(
          this.state.filtered.toLowerCase()
        ) !== -1 ||
        rbr.ProveedoresDesc.toLowerCase().indexOf(
          this.state.filtered.toLowerCase()
        ) !== -1
      );
    });
    // Filtrado de datos - End

    var columns = [
      {
        Header: "Rubro(ID)",
        accessor: "idStkRubro",
        tipo: "numero"
      },
      {
        Header: "Grupo",
        accessor: "StkGrupoDesc",
        tipo: "numero"
      },
      {
        Header: "Descripcion",
        accessor: "StkRubroDesc",
        tipo: "numero"
      },
      {
        Header: "Abreviatura",
        accessor: "StkRubroAbr",
        tipo: "numero"
      },
      {
        Header: "Proveedor",
        accessor: "ProveedoresDesc",
        tipo: "numero"
      },
      {
        Header: "Ancho",
        accessor: "StkRubroAncho",
        tipo: "numero"
      },
      {
        Header: "Presentacion",
        accessor: "StkRubroPresDes",
        tipo: "texto"
      },
      {
        Header: "Presentacion",
        accessor: "StkRubroPres",
        tipo: "numero"
      },
      {
        Header: "Unidad De Medida",
        accessor: "StkRubroUM",
        tipo: "numero"
      },
      {
        Header: "Costo",
        accessor: "StkRubroCosto",
        tipo: "numero"
      },
      {
        Header: "Moneda",
        accessor: "StkRubroTM",
        tipo: "numero"
      },
      {
        Header: "",
        accessor: "borrar",
        tipo: ""
      }
    ];
    return (
      <div>
        {/* <h1>ABM DE RUBRO</h1> */}
        <Grid container>
          <Grid item xs={4} sm={4} lg={4}></Grid>
          <Grid item xs={4} sm={4} lg={4}>
            <h1>ABM DE RUBRO</h1>
          </Grid>
          <Grid item xs={4} sm={4} lg={4}></Grid>
        </Grid>
        {/* <input onChange={this.search} type="text" value={this.state.filtered}/>  */}
        {this.state.toggle.agregar && (
          <div>
            <div className="row">
              <div className="col s12 ">
                <div className="">
                  <div className="card-content  black-text">
                    <StkRubroAgregar
                      toggleAgregar={() => this.toggle("agregar")}
                      read={() => this.read()}
                    >
                      {" "}
                    </StkRubroAgregar>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Muestro contenido */}
        {!this.state.toggle.agregar && (
          <Paper>
            <Table>
              <TableHead>
                {/* <TableRow>
                                        <CustomTableCell onClick={() => this.sortBy("idStkMonedas")} >Código</CustomTableCell>
                                        <CustomTableCell onClick={() => this.sortBy("StkMonedasDescripcion")} >Descripción</CustomTableCell>
                                        <CustomTableCell onClick={() => this.sortByNumero("StkMonedasCotizacion")} numeric>Cotización</CustomTableCell>
                                        <CustomTableCell ></CustomTableCell>
                                    </TableRow> */}
                <TableRow>
                  <CustomTableCell className="headerFijo"></CustomTableCell>
                  {columns.map((row, index) => {
                    return (
                      <CustomTableCell
                        className="headerFijo"
                        key={index}
                        onClick={() => this.sortBy(row.accessor, row.tipo)}
                      >
                        {row.Header}
                      </CustomTableCell>
                    );
                  })}
                </TableRow>
              </TableHead>

              <TableBody>
                {rubro.map(row => {
                  return (
                    // <TableRow key={row.idStkRubro}

                    <TableRow
                      key={row.StkRubroAbr}
                      onDoubleClick={() => {
                        this.setState({
                          idStkRubro: row.idStkRubro,
                          StkRubroCodGrp: row.StkRubroCodGrp,
                          StkRubroDesc: row.StkRubroDesc,
                          StkRubroAbr: row.StkRubroAbr,
                          StkRubroProv: row.StkRubroProv,
                          StkRubroAncho: row.StkRubroAncho,
                          StkRubroPresDes: row.StkRubroPresDes,
                          StkRubroPres: row.StkRubroPres,
                          StkRubroUM: row.StkRubroUM,
                          StkRubroCosto: row.StkRubroCosto,
                          StkRubroTM: row.StkRubroTM
                        });

                        this.toggle("modificar");
                      }}
                    >
                      <CustomTableCell style={style}>
                        {row.borrar}
                      </CustomTableCell>
                      <CustomTableCell>{row.idStkRubro}</CustomTableCell>
                      <CustomTableCell>{row.StkGrupoDesc}</CustomTableCell>
                      <CustomTableCell>{row.StkRubroDesc}</CustomTableCell>
                      <CustomTableCell>{row.StkRubroAbr}</CustomTableCell>
                      <CustomTableCell>{row.ProveedoresDesc}</CustomTableCell>
                      <CustomTableCell>{row.StkRubroAncho}</CustomTableCell>
                      <CustomTableCell>{row.StkRubroPresDes}</CustomTableCell>
                      <CustomTableCell>{row.StkRubroPres}</CustomTableCell>
                      <CustomTableCell>{row.StkRubroUM}</CustomTableCell>
                      <CustomTableCell>{row.StkRubroCosto}</CustomTableCell>
                      <CustomTableCell>{row.StkRubroTM}</CustomTableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        )}
        {this.state.toggle.modificar ? (
          <div>
            <div className="row">
              <div className="col s12 ">
                <div className="">
                  <div className="card-content  black-text">
                    <StkRubroModificar
                      toggleModificar={() => this.toggle("modificar")}
                      read={() => this.read()}
                      idStkRubro={this.state.idStkRubro}
                      StkRubroCodGrp={this.state.StkRubroCodGrp}
                      StkRubroDesc={this.state.StkRubroDesc}
                      StkRubroAbr={this.state.StkRubroAbr}
                      StkRubroProv={this.state.StkRubroProv}
                      StkRubroAncho={this.state.StkRubroAncho}
                      StkRubroPres={this.state.StkRubroPres}
                      StkRubroPresDes={this.state.StkRubroPresDes}
                      StkRubroUM={this.state.StkRubroUM}
                      StkRubroCosto={this.state.StkRubroCosto}
                      StkRubroTM={this.state.StkRubroTM}
                      //   borrar={this.state.borrar}
                      // ProveedoresDesc={this.state.ProveedoresDesc}
                      // StkGrupoDesc={this.state.StkGrupoDesc}
                    ></StkRubroModificar>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}

        {this.state.toggle.seleccampos && (
          <SelecCampos
            datos={rubro}
            toggleImprimir={() => this.toggle("seleccampos")}
            headerTabla={columns}
          />
        )}

        {/* Muesra los botones Flotantes en la parte inferior de la pantalla Agregar y Busqueda*/}

        <StkFab
          borraFiltered={this.borraFiltered}
          toggleAgregar={() => this.toggle("agregar")}
          toggleImprimir={() => this.toggle("seleccampos")}
          toggleBusqueda={() => this.toggle("busqueda")}
          toggle_busqueda={this.state.toggle.busqueda}
          search={this.search}
          filtered={this.state.filtered}
          agrega={true}
        />
      </div>
    );
  }
}

export default StkRubro;
