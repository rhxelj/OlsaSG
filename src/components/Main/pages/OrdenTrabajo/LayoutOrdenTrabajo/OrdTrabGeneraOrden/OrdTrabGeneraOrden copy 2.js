import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
//import { useLocation } ver para usar
import { localization } from "../../../../../lib/material-table/localization";
import { tableIcons } from "../../../../../lib/material-table/tableIcons";
import { datoslonas } from "../FilasDatos/DatosLonas";
import { setCommentRange } from "typescript";
// import { fade, withStyles, useTheme } from '@material-ui/core/styles';
import { alpha } from '@material-ui/core/styles'

import { useContext } from "react";
import { OrdenTrabajoPantContext } from "../OrdTrabDatosPresup/OrdTrabDatosPresup";
// export default function OrdTrabGeneraOrden(props) {
export default function OrdTrabGeneraOrden() {
    const { tabladetalles, setTablaDetalles } = useContext(OrdenTrabajoPantContext);
    console.log('tabladetalles  ', tabladetalles)

    const { tabladetallesitem } = useContext(OrdenTrabajoPantContext);

    // var { Detalles } = props;
    // const [datostabladef, setDatosTabladef] = useState([Detalles])
    const [datostabladef, setDatosTabladef] = useState([tabladetalles[tabladetallesitem]])
    var columtabladef = []




    const buscadatos = () => {

        if (datostabladef[0].tipopresup === "CONFECCIONADA") {
            columtabladef = (datoslonas.cdatlonasconfeccion)
        }
        if (datostabladef[0].tipopresup === "LONAS ENROLLABLES") {
            columtabladef = (datoslonas.cdatlonasenrollables)
        }

    }




    return (
        <div>

            {buscadatos()}
            <MaterialTable
                title=""
                columns={columtabladef}
                data={datostabladef}
                icons={tableIcons}
                localization={localization}
                editable={{

                    onRowUpdate: (newData, oldData) =>

                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const dataUpdate = [...datostabladef];
                                const index = oldData.tableData.id;
                                dataUpdate[index] = newData;
                                setDatosTabladef([...dataUpdate]);
                                // Detalles = newData
                                tabladetalles[index] = newData;
                                resolve();
                            }, 1000);
                        }),
                }}



            ></MaterialTable>



        </div>)

}