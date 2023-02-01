import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
//import { useLocation } ver para usar
import { localization } from "../../../../../lib/material-table/localization";
import { tableIcons } from "../../../../../lib/material-table/tableIcons";
import { datoslonas } from "../FilasDatos/DatosLonas";
import { setCommentRange } from "typescript";
// import { fade, withStyles, useTheme } from '@material-ui/core/styles';
import { alpha } from '@material-ui/core/styles'
export default function OrdTrabGeneraOrden(props) {


    var { Detalles } = props;
    const [datostabladef, setDatosTabladef] = useState([Detalles])
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
                                Detalles = newData;
                                resolve();
                            }, 1000);
                        }),
                }}



            ></MaterialTable>



        </div>)

}