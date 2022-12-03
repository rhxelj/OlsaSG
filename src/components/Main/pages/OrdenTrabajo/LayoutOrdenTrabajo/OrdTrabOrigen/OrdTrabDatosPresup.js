import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import MaterialTable, { MTableToolbar } from "material-table";
import { localization } from "../../../../../lib/material-table/localization";
//import { tableIcons } from "../../../Monedas/Constants";
import { tableIcons } from "../../../../../lib/material-table/tableIcons";
import { OrdTrabColumn } from "./OrdTrabColumn";
import { DatosEncabPresupEleg } from './DatosEncabPresupEleg'
import { OrdTrabLeeItems } from "./OrdTrabLeeItems";
import { TextField } from "@material-ui/core";
import { initial_state } from "../../Initial_State";
import Grid from "@material-ui/core/Grid";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import {
    purple,
    teal,
} from "@material-ui/core/colors";
export default function OrdTrabDatosPresup(props) {
    const { DatosPresupEleg, open, handleClose } = props;
    const [state, setState] = useState(initial_state)
    const [totalciva, setTotalCiva] = useState(0);
    const [totalsiva, setTotalSiva] = useState(0);




    // const [renglot, setRenglot] = useState([ordtrabcantidad]);
    const [columns, setColumns] = useState([]);
    var datotraido = DatosPresupEleg
    var i = 0, j = 0
    var idPresupuesto = datotraido[0].PresupRenglonNroPresup
    var renglot1 = []
    const [datosrenglon, setDatosRenglon] = useState(renglot1)
    const [datosencab, setDatosEncab] = useState()
    // const [datositemsreng, setDatosItemsReng] = useState([])
    var datoselegidosaux = []
    // const [datoselegidos, setDatosElegidos] = useState(datoselegidosaux)

    // const [nuevodatoselegidos, setNuevoDatosElegidos] = useState({
    //     tipopresup: '',
    //     cantidad: 1,
    // })
    var indiceitem1 = 0



    // const [titulos, setTitulos] = useState(arreglotitulos)
    // var arreglotitulos = []
    var tabladatelegint = []
    // const [tabladateleg, setTablaDatEleg] = useState(tabladatelegint)
    const [indiceitem, setIndiceItem] = useState(0)


    async function columnsFetch() {

        const col = await OrdTrabColumn(state.datositems);
        setColumns(() => col);
    }

    async function buscadatosencab(idPresupuesto) {
        const result = await DatosEncabPresupEleg(idPresupuesto);
        setDatosEncab(result)
    }

    // async function leeitemsrubro(StkRubroAbr) {
    //     const result = await OrdTrabLeeItems(StkRubroAbr);
    //     setState({ ...state, datositems: result });
    // }

    // async function armatabla(datoselegidos) {
    //     const result = await OrdTabArmaTabla(datoselegidos);
    // }
    async function eligecolor(event, materialelegido) {
        const result = await OrdTrabLeeItems(materialelegido.ordtrabmaterial);
        setState({ ...state, datositems: result });
        indiceitem1 = materialelegido.ordtrabitem - 1
        setIndiceItem(indiceitem1)
    }

    useEffect(() => {
        preparadatos()
        columnsFetch();
        buscadatosencab(idPresupuesto)
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    const handleClose1 = () => {
        handleClose(false)
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
        // var l = renglot1.length + 1
        // renglot1[l] =
        // {
        //     "ordtrabcantidad": '',
        //     "ordtrabdescripcion": 'TOTAL',
        //     "ordtrablargo": '____________',
        //     "ordtrabancho": '____________',
        //     "ordtrabimpsiva": tototsiva,
        //     "ordtrabimpciva": tototciva,


        // }
        // setDatosRenglon([...datosrenglon, renglot1[l]]);
    }

    // var indice = 0
    const preparadatos = () => {
        var
            // resultado = [],
            // l = 0,
            impsiva = 0.00
        datotraido.map(() => {
            if (datotraido[i].tableData.checked === true) {
                datoselegidosaux = JSON.parse(datotraido[i].PresupRenglonParamInt)
                console.log('state.datositems.length  ', state.datositems.length)
                // leeitemsrubro(datoselegidosaux.StkRubroAbr)
                // console.log(' datositemsreng dd ', state.datositems)
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
                    "ordtrabimpsiva": impsiva,
                    "ordtrabimpciva": datotraido[i].PresupRenglonImpItem * 1,
                    "ordtrabmaterial": datoselegidosaux.StkRubroAbr,
                }

                tabladatelegint.push(datoselegidosaux)
                j++
            }


            i++

        })
        // setTablaDatEleg(tabladatelegint)
        // setTitulos(arreglotitulos)
        // setNuevoDatosElegidos(resultado)

    }

    const handleChange = (event) => {
        const id = event.target.id;
        setState({ ...state, [id]: event.target.value });
        if (id === 'StkItemsDesc') {

            datosrenglon[indiceitem].colorselec = event.target.value
        } else {

            datosrenglon[indiceitem].colorselec = ""
        }
    };


    const textdata = [
        {
            id: "StkItemsDesc",
            label: "Rubro",
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
        <div>
            <Dialog
                fullWidth={true}
                maxWidth={'xl'}
                // className={DialogoEstilo.dialogo}
                open={open}
                // TransitionComponent={Transition}
                keepMounted
                onClose={handleClose1}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <form>

                    {datosencab !== undefined &&
                        datosencab.map((encabezado, index) => (

                            <div
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

                    <MaterialTable
                        title=""
                        columns={columns}
                        data={datosrenglon}
                        icons={tableIcons}
                        localization={localization}

                        editable={{
                            onRowUpdate: (newData, oldData) =>

                                new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        const dataUpdate = [...datosrenglon];
                                        const index = oldData.tableData.id;
                                        dataUpdate[index] = newData;
                                        setDatosRenglon([...dataUpdate]);
                                        renglot1[index] = newData;
                                        resolve();
                                    }, 1000);
                                }),
                        }}
                        // cellEditable={{
                        //     // cellStyle: {},
                        //     onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
                        //         return new Promise((resolve, reject) => {
                        //             console.log('newValue: ' + newValue);
                        //             console.log('oldValue: ' + oldValue);
                        //             console.log('rowData: ' + rowData);
                        //             console.log('columnDef: ' + columnDef);
                        //             setTimeout(resolve, 1000);
                        //         });
                        //     }
                        // }}
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
                                    <tableIcons.Attachment style={{ color: purple[700] }} />
                                ),
                                tooltip: "Anexos",
                                onClick: (event, rowData) => (
                                    eligecolor(event, rowData)
                                    // {console.log('rowData  ', rowData)}
                                )
                            }]}
                        components={{
                            Toolbar: (props) => (
                                <div>
                                    <MTableToolbar {...props} />
                                </div>
                            ),
                        }}
                    />

                    <div>
                        <Grid container>
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
                            <Grid item xs={2}>
                                {textdata !== undefined &&
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
                            </Grid>

                        </Grid>

                    </div>




                </form>
            </Dialog>
        </div >
    )
    // return new Promise(resolve => {
    //     const url = IpServidor + '/datospresupeleg/?id=' + datotraido;

    //     request
    //         .get(url)
    //         .set('Content-Type', 'application/json')
    //         .then(res => {
    //             const datosordentrabajo = JSON.parse(res.text)
    //             resolve(datosordentrabajo);
    //         })
    // });

};


// if (datosencab !== undefined) {
//     datosencab.map((encabezado) => {

//         console.log('encabezado  ', encabezado)
//         // console.log( datosencab[0].idPresupEncab )
//         // console.log( datosencab[0].PresupEncabFecha )
//         // console.log( datosencab[0].PresupEncabCliente )
//         // console.log( datosencab[0].PresupEncabMayMin )
//         // console.log( datosencab[0].PresupEncabTotal )
//         // console.log( datosencab[0].PresupEncabExplic )
//     })
// }

// setDatosRenglon([datosrenglon,
//     'a']
// )
// console.log('renglot1  ', renglot1)

// async function dataFetch() {
//     console.log('renglond  ', renglot1)
// }

// datosencab.map((encabezado) => (
//     <div style={{ height: 250, width: '100%' }}>
//         <DataGrid
//             columns={[{ field: 'idPresupEncab', minWidth: 150 }, { field: 'PresupEncabFecha' }]}
//             rows={encabezado}
//         />
//     </div>))


// {datosnecesarios !== undefined &&
//                     <div>
//                     {console.log('state.datos datosnecesarios ', datosnecesarios)}
//                     <TextField value={datoselegidos.StkRubroAbr
//                     }></TextField>
//                         {console.log('renglot1  ', renglot1)}
//                     </div>}



// console.log( datosencab[0].idPresupEncab )
// console.log( datosencab[0].PresupEncabFecha )
// console.log( datosencab[0].PresupEncabCliente )
// console.log( datosencab[0].PresupEncabMayMin )
// console.log( datosencab[0].PresupEncabTotal )
// console.log( datosencab[0].PresupEncabExplic )

// const datoscargados = Object.assign(inforden.datlonasenrollables, datoselegidosaux);

// const object = datoscargados;
// for (const property in object) {
//     console.log(`${property}: ${object[property]}`);

// }

// datoselegidosarr.push(datoselegidosaux)

//   resultado = { ...inforden.datlonasenrollables, ...datoselegidosaux };

// titulos.map((tittabla, index) => (


// function showProps(obj, objName) {
//     var result = ``;
//     for (var i in obj) {
//         // obj.hasOwnProperty() se usa para filtrar propiedades de la cadena de prototipos del objeto
//         if (obj.hasOwnProperty(i)) {
//             result += `${objName}.${i} = ${obj[i]}\n`;
//         }
//     }
//     return result;
// }

// {titulos !== undefined &&
//                         < div >
//                             <MaterialTable
//                                 title=""
//                                 columns={titulos}
//                                 data={tabladateleg}
//                                 icons={tableIcons}
//                                 localization={localization}

//                                 editable={{
//                                     onRowUpdate: (newData, oldData) =>
//                                         new Promise((resolve, reject) => {
//                                             setTimeout(() => {
//                                                 const dataUpdate = [...tabladateleg];
//                                                 const index = oldData.tableData.id;
//                                                 dataUpdate[index] = newData;
//                                                 setTablaDatEleg([...dataUpdate]);
//                                                 tabladatelegint[index] = newData;
//                                                 resolve();
//                                             }, 1000);
//                                         }),
//                                 }}
//                             />
//                         </div>
//                     } 