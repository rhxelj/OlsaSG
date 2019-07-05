import React, { Component} from 'react'
import request from 'superagent'
// import ReactTable from 'react-table'
import 'react-table/react-table.css'

import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import IpServidor from '../VariablesDeEntorno'
import IconButton from '@material-ui/core/IconButton';

class ProveedoresBorrar extends Component {
    constructor(props){
        super(props)
        this.state = {
            proveedores:[],
            // filtrado:[],
            filtered:'',
            toggle: true,
            id:''
        }
       // this.search = this.search.bind(this)
        this.toggle = this.toggle.bind(this);
    }    
    

    toggle(event){
        this.setState(prevState => ({
            toggle: !prevState.toggle
          }))
    }
    
    // //Read
    // read = _ => {
    //     const url = IpServidor + '/proveedoresleer'; //'http://192.168.2.102:4000/indexprov'
    //     request
    //     .get(url)
    //     .set('Content-Type', 'application/json')
    //         .then(res=> {
    //         const proveedores = JSON.parse(res.text)
    //         this.setState({proveedores: proveedores})
    //         // this.setState({filtrado: proveedores})
    //         })
    // }

    // //Delete
      borrarProveedor = (id)=> {
        const url = IpServidor + '/proveedoresborrar/'+id 
        request
          .delete(url)
          .set('Content-Type', 'application/json')
          //.set('X-API-Key', 'foobar')
          .then(function(res) {
        // res.body, res.headers, res.status
          })
          //alert("Borrado")

          .catch(err => {
            if (err.status === 411) 
                    {
                    alert('Código de Proveedor Usado no se puede borrar  ') 
                    }
                })
                this.props.read()
                this.toggle()
      }
    

    // componentDidMount(){
    //      this.read()
    // }

    render(){
        
        return( 
            <div>
                {this.state.toggle 
            ?
            <div>
               <IconButton 
                        className=" red accent-4" 
                        onClick={()=>this.toggle()}
                        >
                        <DeleteIcon  />
                </IconButton>
            </div>
            :
                <div className="center-align">
                    <p>Esta seguro de "BORRAR" este Registro?</p>
                    <IconButton color="primary" onClick={()=>this.borrarProveedor(this.props.idProveedores)}><DoneIcon/></IconButton>
                    <IconButton color="secondary" onClick={()=>this.toggle()}><ClearIcon/></IconButton>
                </div>
            // </div> 
            }
        </div>
    )
    }
}

export default ProveedoresBorrar