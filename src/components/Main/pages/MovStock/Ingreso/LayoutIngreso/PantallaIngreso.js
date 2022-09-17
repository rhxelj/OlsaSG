import React, { useEffect, useState, useRef } from "react";
import Estilos from '../../Estilos.module.css'
import MaterialTable from "material-table";

import { tableIcons } from "../../../../../lib/material-table/tableIcons";
import { localization } from "../../../../../lib/material-table/localization";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { columnasdi } from "./columnasdi";
import { stkrubrolee } from './LeeRubro'
import { stkgrupoleer } from './LeeGrupos'
import { datosingreso } from "./DatosIngreso";
import { sumaingreso } from "./SumaIngreso";

import {
    Button,
    Grid,
    TextField,
} from "@material-ui/core";

// Context
import { useContext } from "react";
import { MovStockPantContext } from "../../MovStockPant";

export default function PantallaIngreso() {
    const { state, setState } = useContext(MovStockPantContext);
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([])
    const [selectedRow, setSelectedRow] = useState(null);
    const [indicetabla, setIndicetabla] = useState(-1);
    const [cantpres, setCantpres] = useState(0);
    const [canting, setCanting] = useState(0);
    const textInput = useRef(null);
    const textInput1 = useRef(null);
    const textInput2 = useRef(null);
    const [datoselegidos, setDatoselegidos] = useState('')
    const [anexos, setAnexos] = useState({ anexos: false });
    let abrrrubro
    async function leegrupos() {
        const result = await stkgrupoleer();
        setState({ ...state, stkgrupos: result });
    }


    async function leerubros(codigogrupo) {
        const result = await stkrubrolee(codigogrupo);
        setState({ ...state, stkrubro: result });
    }


    async function cambioingreso(event) {
        const id = event.target.id;
        if (id === 'cantpres') {
            setCantpres(event.target.value)
        } else {
            setCanting(event.target.value)
        }
        //   setState({ ...state, [id]: event.target.value });

    }
    async function handleChange(event) {
        const id = event.target.id;
        setState({ ...state, [id]: event.target.value });
        setIndicetabla(-1)
        if (id === 'StkRubroAbr') {
            abrrrubro = event.target.value;
            const result = await datosingreso(abrrrubro)
            setData(result)
            const col = await columnasdi();
            setColumns(() => col);


        }
    };
    async function dataFetch() {
        const data = await datosingreso(abrrrubro);
        setData(data);
    }

    useEffect(() => {
        if (state.idStkGrupo === "") {
            leegrupos();
        }
        if (state.idStkGrupo !== "") {
            leerubros(state.idStkGrupo);
        }

    }, [state.idStkGrupo])

    const miraitem = (indicetabla) => {
        setIndicetabla(indicetabla)
        setCantpres(0)
        setCanting(0)
        // setDatoselegidos(data[indicetabla].StkRubroPresDes +
        //     ' ' + data[indicetabla].StkRubroPres +
        //     ' ' + data[indicetabla].StkRubroUM +
        //     ' ' + data[indicetabla].StkRubroAncho)

    }

    // const informacion = () => {
    //     <TextField value={data[0].ProveedoresDesc} />
    // }
    async function cargamercadería() {

        setState({ ...state, totaling: cantpres * canting });
        //agregar mercadería en el grupo
        console.log('data[0].StkRubroPresDes  ', data[indicetabla].StkRubroPresDes)
        console.log('indicetabla  ', indicetabla)
        console.log('StkItemsCantDisp   ', data[indicetabla].StkItemsCantDisp)
        console.log('StkRubroAbr  ', state.StkRubroAbr)
        console.log('idStkItems  ', data[indicetabla].idStkItems)
        const agregaingreso = await sumaingreso(state.totaling, state.StkRubroAbr, data[indicetabla].idStkItems);

    }
    const textdata = [
        {
            id: "idStkGrupo",
            label: "Grupo",
            value: state.idStkGrupo,
            mapeo: (
                <>
                    <option></option>
                    {state.stkgrupos.map((option) => (
                        <option key={option.idStkGrupo} value={option.idStkGrupo}>
                            {option.StkGrupoDesc}
                        </option>
                    ))}

                </>
            ),
        },
        {
            id: "StkRubroAbr",
            label: "Rubro",
            value: state.StkRubroAbr,
            mapeo: (
                <>
                    <option></option>
                    {state.stkrubro.map((option) => (
                        <option key={option.StkRubroAbr} value={option.StkRubroAbr}>
                            {option.StkRubroDesc}
                        </option>
                    ))}

                </>
            ),
        },


    ];


    return (
        <div className={Estilos.contenedor}>
            <div className={Estilos.contenedor1}>

                {textdata.map((data) => (
                    <TextField
                        className={Estilos.selector}
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

                <MaterialTable
                    title="Items de Rubro"
                    columns={columns}
                    data={data}
                    icons={tableIcons}
                    localization={localization}


                    onRowClick={((evt, selectedRow) => {
                        setSelectedRow(selectedRow.tableData.id)
                        miraitem(selectedRow.tableData.id)
                        setTimeout(() => {
                            textInput.current.focus();
                        }, 100);
                    }
                    )
                    }

                    options={{
                        rowStyle: rowData => ({
                            backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
                        })
                    }}

                />
            </div>

            {/* <Grid xs={3}> */}
            <div className={Estilos.contenedor2}>
                {indicetabla !== -1 &&
                    <Card>

                        <CardContent className={Estilos.card1}>
                            <Grid container>
                                La presentación de la mercadería es :
                                <br></br>
                                {data[0].StkRubroPresDes} de  {data[0].StkRubroPres}  {data[0].StkRubroUM}
                                {(data[0].StkRubroAncho !== 0) && ' por ' + data[0].StkRubroAncho + ' ' + data[indicetabla].StkItemsDesc}

                            </Grid>
                            <br></br>

                            <Grid item xs={12} md={2} lg={12} >
                                <label> Ingresaron   </label>
                                <TextField
                                    inputProps={{ maxLength: 4 }}
                                    className={Estilos.input}
                                    inputRef={textInput}
                                    size="small"
                                    type="number"
                                    id="cantpres"
                                    onChange={cambioingreso}
                                    value={cantpres}
                                    autoFocus

                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            setTimeout(() => {
                                                textInput1.current.focus();
                                            }, 100);
                                        }
                                    }}
                                />
                                <label> de   </label>

                                <TextField
                                    inputProps={{ maxLength: 4 }}
                                    className={Estilos.input}
                                    inputRef={textInput1}
                                    size="small"
                                    type="number"
                                    id="canting"
                                    onChange={cambioingreso}
                                    value={canting}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            setTimeout(() => {
                                                textInput2.current.focus();
                                            }, 100);
                                        }
                                    }}
                                />

                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs>
                                    <Button className={Estilos.boton} buttonRef={textInput2} onClick={cargamercadería}>OK</Button>
                                </Grid>
                                <Grid item xs>
                                    <label>TOTAL INGRESADO : {state.totaling}</label>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>}
                {/* {indicetabla !== -1 &&
                    <form>
                        <label className={Estilos.label1}>La presentación de la mercadería es :
                            {data[0].StkRubroPresDes} de : {data[0].StkRubroPres}  {data[0].StkRubroUM} </label>
                        {data[0].StkRubroAncho !== 0 &&
                            <label>por {data[0].StkRubroAncho} de ancho </label>}
                        <br></br>
                        <TextField id="filled-basic" label="Ingresaron : " variant="filled" />
                        <label>  {data[0].StkRubroPresDes}/S {data[indicetabla].StkItemsDesc}</label>
                        <TextField id="cantidad" label="por : " value={data[0].StkRubroPres} variant="filled" />
                    </form>} */}
            </div>
            {/* </Grid>
                </Grid>
            </Grid> */}

        </div>
    );
}


