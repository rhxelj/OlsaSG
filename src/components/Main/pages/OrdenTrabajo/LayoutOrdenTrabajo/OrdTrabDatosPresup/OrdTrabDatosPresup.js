import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import MaterialTable from "material-table";
import { localization } from "../../../../../lib/material-table/localization";
import { tableIcons } from "../../../../../lib/material-table/tableIcons";
import { OrdTrabColumn } from "../OrdTrabOrigen/OrdTrabColumn";
import { DatosEncabPresupEleg } from '../OrdTrabOrigen/DatosEncabPresupEleg'
import { OrdTrabLeeItems } from "../OrdTrabOrigen/OrdTrabLeeItems";
import { Button, TextField } from "@material-ui/core";
import { initial_state } from "../../Initial_State";
// import { datoslonas } from "../FilasDatos/DatosLonas";
import Grid from "@material-ui/core/Grid";
import estilosot from "../../../OrdenTrabajo/OrdenTrabajo.module.css"
import CurrencyTextField from "@unicef/material-ui-currency-textfield";

// import { fade, withStyles, useTheme } from '@material-ui/core/styles';
// import { alpha } from '@material-ui/core/styles'
import { makeStyles } from "@material-ui/core/styles";
import {
    blue,
    teal,
    orange
} from "@material-ui/core/colors";
import OrdTrabGeneraOrden from "../OrdTrabGeneraOrden/OrdTrabGeneraOrden";




const useStyles = makeStyles({
    root: {
        width: "100%",
    },
    container: {
        maxHeight: 440,
    },
});


export default function OrdTrabDatosPresup(props) {
    // const { state, setState } = useContext(OrdenTrabajoPantContext);

    const { DatosPresupEleg, open, handleClose } = props;
    const [state, setState] = useState(initial_state)
    const [totalciva, setTotalCiva] = useState(0);
    const [totalsiva, setTotalSiva] = useState(0);
    const [abrecolor, setAbreColor] = useState(false)
    const [abredetalles, setAbreDetalles] = useState(false)


    const classes = useStyles();


    const [columns, setColumns] = useState([]);
    var datotraido = DatosPresupEleg
    var i = 0, j = 0
    var idPresupuesto = datotraido[0].PresupRenglonNroPresup
    var renglot1 = []
    const [datosrenglon, setDatosRenglon] = useState(renglot1)
    const [datosencab, setDatosEncab] = useState()
    var datoselegidosaux = []
    var indiceitem1 = 0
    var tabladatelegint = []
    const [tabladetalles, setTablaDetalles] = useState(tabladatelegint)
    // const [tabladetallesitem, setTablaDetallesItem] = useState(0)
    // const [detallerenglon, setDetalleRenglon] = useState([])
    const [indiceitem, setIndiceItem] = useState(0)
    var tabladetallesitem = 0
    var detallerenglon = []
    async function columnsFetch() {
        const col = await OrdTrabColumn(renglot1);

        setColumns(() => col);
    }

    async function buscadatosencab(idPresupuesto) {
        const result = await DatosEncabPresupEleg(idPresupuesto);
        setDatosEncab(result)
    }

    async function eligecolor(event, materialelegido) {
        const result = await OrdTrabLeeItems(materialelegido.ordtrabmaterial);
        setState({ ...state, datositems: result });
        indiceitem1 = materialelegido.ordtrabitem - 1
        setIndiceItem(indiceitem1)
        abrecierracolor()
    }

    useEffect(() => {
        preparadatos()
        columnsFetch();
        buscadatosencab(idPresupuesto)
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    const handleClose1 = () => {
        handleClose(false)
    };

    const abrecierracolor = () => {
        setAbreColor(!abrecolor)
    };

    const abrecierradetalles = () => {
        setAbreDetalles(!abredetalles)
        // console.log('state.nuevascolumnas  ', state.nuevascolumnas)
    };
    function sumar() {
        var tototciva = 0,
            tototsiva = 0,
            i = 0;
        while (i < datosrenglon.length) {
            tototciva = tototciva * 1 + datosrenglon[i].ordtrabimpciva * 1;
            tototsiva = tototsiva * 1 + datosrenglon[i].ordtrabimpsiva * 1;
            i++;
        }
        setTotalCiva(tototciva);
        setTotalSiva(tototsiva);

    }

    const preparadatos = () => {
        var impsiva = 0.00
        datotraido.map(() => {
            if (datotraido[i].tableData.checked === true) {
                datoselegidosaux = JSON.parse(datotraido[i].PresupRenglonParamInt)
                // leeitemsrubro(datoselegidosaux.StkRubroAbr)
                // resultado = { ...inforden.datlonasenrollables, ...datoselegidosaux };
                if (datoselegidosaux.ivasn === 'CIVA') {
                    impsiva = datotraido[i].PresupRenglonImpItem * 1 / 1.21
                }
                else {
                    impsiva = datotraido[i].PresupRenglonImpItem * 1
                }

                renglot1[j] =
                {
                    "ordtrabitem": j + 1,
                    "ordtrabcantidad": datotraido[i].PresupRenglonCant,
                    "ordtrabdescripcion": datotraido[i].PresupRenglonDesc,
                    "colorselec": '',
                    "ordtrablargo": datotraido[i].PresupRenglonLargo * 1,
                    "ordtrabancho": datotraido[i].PresupRenglonAncho * 1,
                    "ordtrabimpitemsiva": datotraido[i].PresupRenglonImpUnit * 1 / 1.21,
                    "ordtrabimpitemciva": datotraido[i].PresupRenglonImpUnit * 1,
                    "ordtrabimpsiva": impsiva,
                    "ordtrabimpciva": datotraido[i].PresupRenglonImpItem * 1,
                    "ordtrabmaterial": datoselegidosaux.StkRubroAbr,
                    // "ordtrabtipopresup": datoselegidosaux.tipopresup,
                    "ordtrabparametros": datoselegidosaux,
                }

                tabladatelegint.push(datoselegidosaux)
                j++

            }
            i++

        })

        setTablaDetalles(tabladatelegint)
    }

    const handleChange = (event) => {
        const id = event.target.id;
        setState({ ...state, [id]: event.target.value });
        if (id === 'StkItemsDesc') {
            if (event.target.value) {
                datosrenglon[indiceitem].colorselec = event.target.value
                abrecierracolor()
            }
        } else {

            datosrenglon[indiceitem].colorselec = ""
        }
    };

    const actualizadatos = (newData, id) => {
        var datosnuevos = Object.values(newData);
        var datosoriginales = Object.values(datosrenglon[id]);

        var i = 0
        for (i; i <= datosoriginales.length - 2; i++) {

            if (datosoriginales[i] !== datosnuevos[i]) {
                if (i === 1) {
                    newData.ordtrabimpsiva = datosoriginales[6] * datosnuevos[1]
                    newData.ordtrabimpciva = datosoriginales[7] * datosnuevos[1]

                }
                if (i === 7) {
                    newData.ordtrabimpitemsiva = datosnuevos[7] / 1.21
                    newData.ordtrabimpsiva = newData.ordtrabimpitemsiva * datosnuevos[1]
                    newData.ordtrabimpciva = datosnuevos[7] * datosnuevos[1]
                }
                if (i === 9) {
                    newData.ordtrabimpitemciva = datosnuevos[9] / datosnuevos[1]
                    newData.ordtrabimpitemsiva = newData.ordtrabimpitemciva / 1.21
                    newData.ordtrabimpsiva = newData.ordtrabimpitemsiva * datosnuevos[1]
                    newData.ordtrabimpciva = newData.ordtrabimpitemciva * datosnuevos[1]
                }

            }
        }
    }

    const generaorden = (detallerengloneleg) => {
        tabladetallesitem = detallerengloneleg.ordtrabitem - 1
        detallerenglon = detallerengloneleg
    }



    const textdata = [
        {
            id: "StkItemsDesc",
            label: "Color",
            value: state.StkItemsDesc,
            mapeo: (
                <>
                    <option></option>
                    {state.datositems.map((option) => (
                        <option key={option.StkItemsDesc} value={option.StkItemsDesc}>
                            {option.StkItemsDesc}
                        </option>
                    ))}

                </>
            ),
        },
    ];
    return (
        <div className={classes.root}>
            <Dialog
                fullWidth={true}
                maxWidth={'xl'}
                open={open}
                keepMounted
                onClose={handleClose1}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <form>

                    {datosencab !== undefined &&
                        datosencab.map((encabezado, index) => (

                            <div className={estilosot.divestilo1}
                                key={encabezado.idPresupEncab}>
                                <TextField label="Nro Presup" value={encabezado.idPresupEncab} inputProps={{ maxLength: 8 }} />
                                <TextField label="Fecha" value={encabezado.PresupEncabFecha} inputProps={{ maxLength: 10 }} />
                                <TextField label="Cliente" value={encabezado.PresupEncabCliente} inputProps={{ maxLength: 10 }} />
                                <TextField label="May/Min" value={encabezado.PresupEncabMayMin} inputProps={{ maxLength: 10 }} />
                                <TextField label="Total" value={encabezado.PresupEncabTotal} inputProps={{ maxLength: 10 }} />
                                <TextField label="Explicación" value={encabezado.PresupEncabExplic} inputProps={{ maxLength: 10 }} />

                            </div>)
                        )

                    }


                    <div className={estilosot.divestilo2}>
                        <Grid container >
                            <Grid item xs={2}>
                                <CurrencyTextField
                                    size="small"
                                    variant="outlined"
                                    id="Suma"
                                    label="Total c/IVA : "
                                    value={totalciva}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <CurrencyTextField
                                    size="small"
                                    variant="outlined"
                                    id="Suma"
                                    label="Total s/IVA : "
                                    value={totalsiva}
                                />
                            </Grid>

                            <Grid item xs={2}>
                                <TextField
                                    size="small"
                                    variant="outlined"
                                    id="nrofact"
                                    label="N° Factura"
                                    value={state.nrofact}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField
                                    size="small"
                                    variant="outlined"
                                    id="impsenia"
                                    label="Seña"
                                    type="number"
                                    value={state.impsenia}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>

                    </div>
                    <Grid >
                        <MaterialTable
                            title=""
                            columns={columns}
                            data={datosrenglon}
                            icons={tableIcons}
                            localization={localization}

                            options={{
                                search: false
                            }}
                            editable={{

                                onRowUpdate: (newData, oldData) =>

                                    new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            actualizadatos(newData, oldData.tableData.id)
                                            const dataUpdate = [...datosrenglon];
                                            const index = oldData.tableData.id;
                                            dataUpdate[index] = newData;
                                            setDatosRenglon([...dataUpdate]);
                                            renglot1[index] = newData;
                                            resolve();
                                        }, 1000);
                                    }),
                            }}

                            actions={[
                                {
                                    icon: () => (
                                        <tableIcons.AddShoppingCart style={{ color: teal[500] }} />
                                    ),
                                    tooltip: "Suma",
                                    isFreeAction: true,
                                    onClick: () => sumar(),
                                },
                                {
                                    icon: () => (
                                        <tableIcons.Palette
                                            style={{ color: orange[500], fontSize: 40 }} />
                                    ),
                                    tooltip: "Colores",
                                    onClick: (event, rowData) => (
                                        eligecolor(event, rowData)
                                    )
                                },
                            ]}
                            detailPanel={[
                                {
                                    tooltip: 'Muestra datos',
                                    render: rowData => {
                                        return (
                                            <div >
                                                {generaorden(rowData)}
                                                {detallerenglon &&
                                                    <OrdTrabGeneraOrden
                                                        Detalles={tabladetalles[tabladetallesitem]}
                                                    // idTablaDetalles={tabladetallesitem}
                                                    ></OrdTrabGeneraOrden>
                                                }
                                            </div>
                                        )
                                    },
                                }]}

                        />
                    </Grid>
                    <Dialog
                        maxWidth={'xl'}
                        open={abrecolor}
                        onClose={abrecierracolor}

                    >
                        {!!textdata &&
                            textdata.map((data) => (
                                <TextField
                                    key={data.id}
                                    id={data.id}
                                    size="small"
                                    inputProps={{ maxLength: 3 }}
                                    select
                                    label={data.label}
                                    value={data.value}
                                    onChange={handleChange}
                                    SelectProps={{ native: true }}
                                    variant="outlined"
                                    margin="dense"
                                >
                                    {data.mapeo}
                                </TextField>
                            ))}
                    </Dialog>


                </form >
            </Dialog >
        </div >
    )


};


/*    // const generaorden = (event, detallerengloneleg) => {
    //     setTablaDetallesItem(detallerengloneleg.tableData.id)
    //     setDetalleRenglon(detallerengloneleg)


    //     //setState({ ...state, nuevascolumnas: columtabladef[0] });

    //     setColumns(datoslonas.cdatlonasconfeccion);
    //     //  console.log('columtabladef en ordtrabdatos  ', columtabladef)
    //     //     setAbreDetalles(!abredetalles)
    // }
    // const generaorden = (event, detallerengloneleg) => {
    const generaorden = (detallerengloneleg) => {
        // setTablaDetallesItem(detallerengloneleg.ordtrabitem - 1)
        tabladetallesitem = detallerengloneleg.ordtrabitem - 1
        // setTablaDetallesItem(detallerengloneleg.tableData.id)
        // setDetalleRenglon(detallerengloneleg)
        detallerenglon = detallerengloneleg
        //  console.log('columtabladef en ordtrabdatos  ', columtabladef)
        //   setAbreDetalles(!abredetalles)
    }

*/