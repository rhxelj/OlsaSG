import React, { Component} from 'react'
import request from 'superagent'
// import ReactTable from 'react-table'
// import 'react-table/react-table.css'

import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';

class StkMonedasBorrar extends Component {
    constructor(props){
        super(props)
        this.state = {
            url:'http://localhost:4000/stkgrupoborrar/',
            monedas:[],
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
    
    
    // //Delete
      borrarGrupo = (id)=> {
       
 //       const { moneda } = this.state;
        request
          .delete(this.state.url +id)
          .set('Content-Type', 'application/json')
          //.set('X-API-Key', 'foobar')
          .then(function(res) {
        // res.body, res.headers, res.status
          })
         
          .catch(err => {
            if (err.status === 411) 
                    {
                    alert('Código de Moneda Usado no se puede borrar  ') 
                    }
                })
                this.props.read()
                this.toggle()
          
        
      }
    
    
    componentDidMount(){
        // this.read()
    }

    render(){
        
        return( 
           
            <div>
                {/* <h1>Borrar Monedas</h1>
                <input onChange={this.search} type="text" value={this.state.filtered}/> 
                */}
                {this.state.toggle
                ?
                <div>
                    <button 
                        className=" red accent-4" 
                        onClick={()=>this.toggle()}
                        >
                        {/* Borrar */}
                        <DeleteIcon  />
                    </button>
                </div>
                :
                    <div className="center-align">
                        <p>Borrar ?</p>
                        {/* <button className="green "><i className="material-icons" onClick={()=>this.borrarGrupo(this.props.idStkGrupo)}>check</i></button>
                        <button className="red "><i className="material-icons" onClick={()=>this.toggle()}>cancel</i></button> */}
                        <Button color="primary" onClick={()=>this.borrarGrupo(this.props.idStkGrupo)}><DoneIcon/></Button>
                        <Button color="secondary" onClick={()=>this.toggle()}><ClearIcon/></Button>
                    </div>
                }
            </div>
        )
    }
}

export default StkMonedasBorrar