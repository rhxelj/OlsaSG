
// import carpetaimppresup from '../../PathEspeciales'
// Lee Rubro por codigo de gupo
import React from 'react';
import { Dialog } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography';

export const PresupPreviewMue = (props) => {
    const { open, handleClose } = props;
    console.log('props  ', props)
    // async function armanombre(Presup) {
    // if (Presup !== 0) {
    //     var nombrepresup = "Presupuesto\\ nro\\ " + Presup + "*.pdf";
    //     resultado = await PresupNombre(nombrepresup);
    //     Presup = 0
    //     console.log('resultado  ', resultado)
    //     // }
    // }

    // function cierradialogo() {
    //     setOpen({ preview: false });
    // }

    // useEffect(() => {
    //     console.log('Presup  ', Presup)
    //     if (Presup !== 0) {
    //         armanombre(Presup);
    //     }
    // }, [Presup]); // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <React.Fragment>

            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
            >
                <MuiDialogTitle >
                    <IconButton onClick={handleClose} color='primary' edge='start' size='small'>
                        <CloseIcon />
                        <Typography variant="subtitle2">Cierra Impresión</Typography>
                    </IconButton>

                </MuiDialogTitle>
                {console.log('esta antes del object  ')}
                <object
                    data={require('../static/media/basics.pdf')}
                    type="application/pdf"
                    width='80%'
                    height='80%'
                    cache='false'
                >
                </object>
                {console.log('esta fuera del object  ')}
            </Dialog>
        </React.Fragment >
    );

}

