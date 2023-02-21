import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
//import { useLocation } ver para usar
import { localization } from "../../../../../lib/material-table/localization";
import { tableIcons } from "../../../../../lib/material-table/tableIcons";
import { datoslonas } from "../FilasDatos/DatosLonas";
import { OTConfeccionCol } from "../ColumnasDatos/OTConfeccionCol";
import { OrdTrabLeeItems } from "../OrdTrabOrigen/OrdTrabLeeItems";

import { useContext } from "react";
import { OrdenTrabajoPantContext } from "../OrdTrabDatosPresup/OrdTrabDatosPresup";
import { OTEnrollableCol } from "../ColumnasDatos/OTEnrollableCol";
// export default function OrdTrabGeneraOrden(props) {
export default function OrdTrabGeneraOrden() {

    const { tabladetalles, setTablaDetalles } = useContext(OrdenTrabajoPantContext);
    const { tabladetallesitem } = useContext(OrdenTrabajoPantContext);
    const [datostabladef, setDatosTabladef] = useState([tabladetalles[tabladetallesitem]])
    const [columtabladef, setColumtabladef] = useState([]);



    async function buscadatos() {

        if (datostabladef[0].tipopresup === "CONFECCIONADA") {
            const col = await OTConfeccionCol();
            setColumtabladef(() => col);


            // columtabladef = (datoslonas.cdatlonasconfeccion)
        }
        if (datostabladef[0].tipopresup === "LONAS ENROLLABLES") {

            const col = await OTEnrollableCol(datostabladef[0].StkRubroAbr);
            setColumtabladef(() => col);


            // columtabladef = (datoslonas.cdatlonasenrollables)
        }

    }

    async function initialFetch() {
        buscadatos(); //lleno columns con los datos obtenidos

    }


    useEffect(() => {
        initialFetch();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            {/* <img
                style={{ height: 36, borderRadius: '50%' }}
                src={'/home/sandra/Imágenes/vivo1.jpg'}
            /> */}
            <MaterialTable
                title=""
                columns={columtabladef}
                data={datostabladef}
                icons={tableIcons}
                localization={localization}
                options={{
                    search: false
                }}
                editable={{

                    onRowUpdate: (newData, oldData) =>

                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const dataUpdate = [...datostabladef];
                                const index = oldData.tableData.id;
                                dataUpdate[index] = newData;
                                setDatosTabladef([...dataUpdate]);
                                tabladetalles[tabladetallesitem] = newData
                                resolve();
                            }, 1000);
                        }),

                }}



            ></MaterialTable>

        </div>)

}