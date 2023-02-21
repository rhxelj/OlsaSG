import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import MaterialTable, { MTableToolbar } from "material-table";
import { localization } from "../../../../../lib/material-table/localization";
import { tableIcons } from "../../../../../lib/material-table/tableIcons";
import { OrdTrabColumn } from "../OrdTrabOrigen/OrdTrabColumn";
import { DatosEncabPresupEleg } from '../OrdTrabOrigen/DatosEncabPresupEleg'
import { OrdTrabLeeItems } from "../OrdTrabOrigen/OrdTrabLeeItems";
import { Button, TextField } from "@material-ui/core";
import { stkrubroleeconf } from '../../../Stock/Rubros/StkRubroLeeConf'
import { leeStkItemsDesc } from "../../../Stock/Items/leeStkitemsDesc";
import OrdTrabArmaImpresion from "../OrdTrabDatosPresup/OrdTrabArmaImpresion"
import { initial_state } from "../../Initial_State";
// import { datoslonas } from "../FilasDatos/DatosLonas";
import Grid from "@material-ui/core/Grid";
import estilosot from "../../../OrdenTrabajo/OrdenTrabajo.module.css"
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import { useSumar } from "../../hooks/useSumar";
// import { fade, withStyles, useTheme } from '@material-ui/core/styles';
// import { alpha } from '@material-ui/core/styles'
import { makeStyles } from "@material-ui/core/styles";
import {
    blue,
    teal,
    orange
} from "@material-ui/core/colors";
import OrdTrabGeneraOrden from "../OrdTrabGeneraOrden/OrdTrabGeneraOrden";


export const OrdenTrabajoPantContext = React.createContext();

const useStyles = makeStyles({
    root: {
        width: "100%",
    },
    container: {
        maxHeight: 440,
    },
});


export default function OrdTrabDatosPresup(props) {
    const { DatosPresupEleg, open, handleClose } = props;
    const [state, setState] = useState(initial_state)
    // const [totalciva, setTotalCiva] = useState(0);
    // const [totalsiva, setTotalSiva] = useState(0);
    const classes = useStyles();

    const [otarmaimp, setOtArmaImp] = useState(false);



    const [columns, setColumns] = useState([]);
    var datotraido = DatosPresupEleg
    var i = 0, j = 0
    var idPresupuesto = datotraido[0].PresupRenglonNroPresup
    var renglot1 = []

    const [datosrenglon, setDatosRenglon] = useState(renglot1)
    const [datosencab, setDatosEncab] = useState()
    var datoselegidosaux = []
    var tabladatelegint = []
    const [tabladetalles, setTablaDetalles] = useState(tabladatelegint)
    const [indiceitem, setIndiceItem] = useState(0)
    var tabladetallesitem = 0
    var detallerenglon = []


    async function leerubrosconfeccion() {
        const result = await stkrubroleeconf('S');
        setState({ ...state, rubrosconf: result });

    }


    async function leeitemscolores(ordtrabmaterial) {
        const result = await leeStkItemsDesc(ordtrabmaterial);
        setState({ ...state, itemsrubros: result });

    }

    async function columnsFetch() {
        const col = await OrdTrabColumn(renglot1);
        setColumns(() => col);
    }


    async function buscadatosencab(idPresupuesto) {
        const result = await DatosEncabPresupEleg(idPresupuesto);
        setDatosEncab(result)
    }




    const handleClose1 = () => {
        handleClose(false)
    };


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
                    "materialselec": '',
                    "colorselec": '',
                    "ordtrablargo": datotraido[i].PresupRenglonLargo * 1,
                    "ordtrabancho": datotraido[i].PresupRenglonAncho * 1,
                    "ordtrabimpitemsiva": datotraido[i].PresupRenglonImpUnit * 1 / 1.21,
                    "ordtrabimpitemciva": datotraido[i].PresupRenglonImpUnit * 1,
                    "ordtrabimpsiva": impsiva,
                    "ordtrabimpciva": datotraido[i].PresupRenglonImpItem * 1,
                    "ordtrabmaterial": datoselegidosaux.StkRubroAbr,
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
        console.log('id  ', id)
        console.log('event.target.value  ', event.target.value)
        if (id === 'StkItemsDesc') {
            if (event.target.value) {
                datosrenglon[indiceitem].colorselec = event.target.value
            }
        } else {

            datosrenglon[indiceitem].colorselec = ""
        }
        if (id === 'StkRubroAbr') {
            if (event.target.value) {
                datosrenglon[indiceitem].materialselec = event.target.value


            }
            else {

                datosrenglon[indiceitem].materialselec = ""
            }
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
                if (i === 8) {
                    newData.ordtrabimpitemsiva = datosnuevos[8] / 1.21
                    newData.ordtrabimpsiva = newData.ordtrabimpitemsiva * datosnuevos[1]
                    newData.ordtrabimpciva = datosnuevos[8] * datosnuevos[1]
                }
                if (i === 10) {
                    newData.ordtrabimpitemciva = datosnuevos[10] / datosnuevos[1]
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
        console.log('detallerenglon  ', detallerenglon)
    }

    // const ArmaImpresion = () => {
    //     console.log('esta en ArmaImpresion  ')
    //     console.log('tabladetalles  ', tabladetalles)
    //     console.log('tabladetallesitem  ', tabladetallesitem)
    //     console.log('datosrenglon  ', datosrenglon)
    // }

    async function ArmaOrdenTrabajo() {
        console.log('tabladetalles ArmaOrdenTrabajo ', tabladetalles)
        // console.log('tabladetallesitem  ', tabladetallesitem)
        // console.log('datosrenglon  ', datosrenglon)
        OrdTrabArmaImpS();
    }
    const OrdTrabArmaImpS = () => {
        setOtArmaImp(true);
    };

    const OrdTrabArmaImpN = () => {
        setOtArmaImp(false);
    };

    const textdata = [
        {
            id: "StkRubroAbr",
            label: "Rubro",
            value: state.StkRubroAbr,
            mapeo: (
                <>
                    <option></option>
                    {state.rubrosconf.map((option) => (
                        <option key={option.StkRubroAbr} value={option.StkRubroAbr}>
                            {option.StkRubroDesc}
                        </option>
                    ))}

                </>
            ),
        },

        {
            id: "StkItemsDesc",
            label: "Color",
            value: state.StkItemsDesc,
            mapeo: (
                <>
                    <option></option>
                    {state.itemsrubros.map((option) => (
                        <option key={option.StkItemsDesc} value={option.StkItemsDesc}>
                            {option.StkItemsDesc}
                        </option>
                    ))}

                </>
            ),
        },
    ];


    useEffect(() => {
        preparadatos()
        columnsFetch();
        buscadatosencab(idPresupuesto)
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    useEffect(() => {
        leerubrosconfeccion()
        if (state.StkRubroAbr !== "") {
            leeitemscolores(state.StkRubroAbr);
        }

    }, [state.StkRubroAbr]) // eslint-disable-line react-hooks/exhaustive-deps


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
                                    value={state.totalciva}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <CurrencyTextField
                                    size="small"
                                    variant="outlined"
                                    id="Suma"
                                    label="Total s/IVA : "
                                    value={state.totalsiva}
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

                            <Grid item xs={2}>
                                <Button onClick={() => ArmaOrdenTrabajo()}>Final</Button>
                            </Grid>
                            <Grid item xs={12}>
                                {!!textdata &&
                                    textdata.map((data) => (

                                        <TextField
                                            key={data.id}
                                            id={data.id}
                                            size="small"
                                            // inputProps={{ maxLength: 3 }}
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
                                    onClick: () => {
                                        const { totalordciva, totalordsiva } = useSumar(datosrenglon)
                                        setState({ ...state, totalordciva: totalordciva, totalordsiva: totalordsiva });
                                    }

                                },


                            ]}
                            detailPanel={[
                                {
                                    tooltip: 'Carga Detalles',
                                    render: rowData => {
                                        return (
                                            <div >
                                                {generaorden(rowData)}
                                                <OrdenTrabajoPantContext.Provider
                                                    value={{
                                                        tabladetalles: tabladetalles,
                                                        setTablaDetalles: setTablaDetalles,
                                                        tabladetallesitem: tabladetallesitem,
                                                        // nuevascolumnas: nuevascolumnas,
                                                        // setNuevasColumnas: setNuevasColumnas,
                                                        state: state,
                                                        useState: useState
                                                    }}
                                                >

                                                    {detallerenglon &&
                                                        <OrdTrabGeneraOrden
                                                        ></OrdTrabGeneraOrden>
                                                    }
                                                </OrdenTrabajoPantContext.Provider>
                                            </div>
                                        )
                                    },
                                }]}

                        />
                    </Grid>


                </form >
            </Dialog >


            <OrdenTrabajoPantContext.Provider
                value={{
                    tabladetalles: tabladetalles,
                    setTablaDetalles: setTablaDetalles,
                    datosencab: datosencab,
                    datosrenglon: datosrenglon,
                    state: state,
                    useState: useState
                }}
            >
                {otarmaimp &&
                    <OrdTrabArmaImpresion open={otarmaimp} handleClose={OrdTrabArmaImpN}></OrdTrabArmaImpresion>}
            </OrdenTrabajoPantContext.Provider>


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
   async function eligecolor(event, materialelegido) {
        console.log('materialelegido  ', materialelegido)
        // const result = await OrdTrabLeeItems(materialelegido.ordtrabmaterial);
        const result = await OrdTrabLeeItems(materialelegido.materialselec);


        setState({ ...state, datositems: result });
        indiceitem1 = materialelegido.ordtrabitem - 1
        setIndiceItem(indiceitem1)
        abrecierracolor()
    }

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

*/