import React, { useState, useEffect } from "react";
import request from "superagent";
import IpServidor from "../../../VariablesDeEntorno";
import Dialog from "@material-ui/core/Dialog";
import MaterialTable, { MTableToolbar } from "material-table";
import { localization } from "../../../../../lib/material-table/localization";
import { tableIcons } from "../../../Monedas/Constants";
import { OrdTrabColumn } from "./OrdTrabColumn";
import { DatosEncabPresupEleg } from './DatosEncabPresupEleg'
import { OrdTrabLeeItems } from "./OrdTrabLeeItems";
import { TextField } from "@material-ui/core";
import estilos from '../../OrdenTrabajo.module.css'
import { initial_state } from "../../Initial_State";
import { datoslonas } from "../FilasDatos/DatosLonas";
import { OrdTabArmaTabla } from "./OrdTabArmaTabla";
import FilaEnrollables from "../FilasDatos/FilaEnrollables";

export default function OrdTrabDatosPresup(props) {
    const { DatosPresupEleg, open, handleClose } = props;
    const [state, setState] = useState(initial_state)
    const [inforden, setInfOrden] = useState(datoslonas)
    // const [renglot, setRenglot] = useState([ordtrabcantidad]);
    const [columns, setColumns] = useState([]);
    var datotraido = DatosPresupEleg
    var i = 0, j = 0
    var idPresupuesto = datotraido[0].PresupRenglonNroPresup
    var renglot1 = []
    const [datosrenglon, setDatosRenglon] = useState(renglot1)
    const [datosencab, setDatosEncab] = useState()
    const [datositems, setDatosItems] = useState()

    var datoselegidosaux = []
    // var datoselegidosarr = []
    const [datoselegidos, setDatosElegidos] = useState(datoselegidosaux)

    // const [nuevodatoselegidos, setNuevoDatosElegidos] = useState([])
    var indice = 0



    const [titulos, setTitulos] = useState(arreglotitulos)
    var arreglotitulos = []
    // const [titulost, setTitulost] = useState()
    // var arreglotitulostot = []
    var tabladatelegint = []
    const [tabladateleg, setTablaDatEleg] = useState(tabladatelegint)

    // var tittabla, dattabla


    async function columnsFetch() {
        const col = await OrdTrabColumn();
        setColumns(() => col);
    }

    async function buscadatosencab(idPresupuesto) {
        const result = await DatosEncabPresupEleg(idPresupuesto);
        setDatosEncab(result)
    }

    async function leeitemsrubro(StkRubroAbr) {
        const result = await OrdTrabLeeItems(StkRubroAbr);
        setDatosItems(result)
    }

    async function armatabla(datoselegidos) {
        const result = await OrdTabArmaTabla(datoselegidos);
    }


    useEffect(() => {
        preparadatos()
        columnsFetch();


        buscadatosencab(idPresupuesto)
        // console.log('datositems ll  ', datositems)
        // arreglotitulos.push({ title: "Colores", field: 'StkItemsDesc', lookup: datositems })
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    const handleClose1 = () => {
        handleClose(false)
    };


    indice = 0
    const preparadatos = () => {
        var resultado = []
        datotraido.map(() => {
            if (datotraido[i].tableData.checked === true) {
                datoselegidosaux = JSON.parse(datotraido[i].PresupRenglonParamInt)
                leeitemsrubro(datoselegidosaux.StkRubroAbr)


                if (datoselegidosaux.tipopresup === "LONAS ENROLLABLES") {
                    arreglotitulos = inforden.cdatlonasenrollables

                }
                if (datoselegidosaux.tipopresup === "UNIDAD") {
                    arreglotitulos = inforden.cdatunidad


                }
                renglot1[j] =
                {
                    "ordtrabcantidad": datotraido[i].PresupRenglonCant,
                    "ordtrabdescripcion": datotraido[i].PresupRenglonDesc,
                    "ordtrablargo": datotraido[i].PresupRenglonLargo,
                    "ordtrabancho": datotraido[i].PresupRenglonAncho,
                    "ordtrabivasn": datoselegidosaux.ivasn,
                    "ordtrabimporte": datotraido[i].PresupRenglonImpItem,
                }

                tabladatelegint.push(datoselegidosaux)
                j++
            }

            // setDatosElegidos(datoselegidosarr)

            i++

            // setNuevoDatosElegidos(nuevodatoselegidos)
        })
        setTablaDatEleg(tabladatelegint)
        setTitulos(arreglotitulos)


    }


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
                        datosencab.map(encabezado => (

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
                    />

                    {titulos !== undefined &&
                        < div >
                            <MaterialTable
                                title=""
                                columns={titulos}
                                data={tabladateleg}
                                icons={tableIcons}
                                localization={localization}

                                editable={{
                                    onRowUpdate: (newData, oldData) =>
                                        new Promise((resolve, reject) => {
                                            setTimeout(() => {
                                                const dataUpdate = [...tabladateleg];
                                                const index = oldData.tableData.id;
                                                dataUpdate[index] = newData;
                                                setTablaDatEleg([...dataUpdate]);
                                                tabladatelegint[index] = newData;
                                                resolve();
                                            }, 1000);
                                        }),
                                }}
                            />
                        </div>
                    }


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


{/* {datosnecesarios !== undefined &&
                    <div>
                    {console.log('state.datos datosnecesarios ', datosnecesarios)}
                    <TextField value={datoselegidos.StkRubroAbr
                    }></TextField>
                        {console.log('renglot1  ', renglot1)}
                    </div>} */}



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
