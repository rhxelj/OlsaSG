
// import carpetaimppresup from '../../PathEspeciales'
// Lee Rubro por codigo de gupo
import React from 'react';
import { Dialog } from "@material-ui/core";
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import BCierraDialogo from '../../../../../Styles/Boton.module.css'
import { tableIcons } from '../../../../lib/material-table/tableIcons'



export const PresupPreview = (props) => {
    function cierradialogo() {
        props.setOpen({ ppreview: false });
    }

    return (
        <div>

            <Dialog
                fullScreen
                open={props.open}

            >
                <MuiDialogTitle>
                    <button
                        variant="contained"
                        onClick={cierradialogo}
                        className={BCierraDialogo.botoncierradialogo}
                    >
                        <div className={BCierraDialogo.iconocierradialogo}>
                            <tableIcons.Close />

                        </div>
                        Cerrar
                    </button>


                </MuiDialogTitle>

                <object
                    data={require('../static/media/basics.pdf')}
                    type="application/pdf"
                    width='100%'
                    height='100%'
                    cache='false'
                >
                </object>
            </Dialog>
        </div >
    );

}

