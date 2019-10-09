# Implementar Impresion de Pantalla

para poder agregar la función de impresión de pantalla tengo que agregar en cada componente los siguiente

* Importo el componente de SelecCampos  
```javascript
import SelecCampos from '../Impresion/SelecCampos'
```
* Agrego la variable para mostrar o no el componente con valor false

```javascript

.
.
.
 // toggle_busqueda: false,
            // toggle_modificar: false,
            opcion: "",            
            toggle:{
                agregar: false,
                busqueda: false,
                modificar: false,
                seleccampos: false,  //<== Agrego esto
            }
            // targetname:"",
            // targetvalue:"
.
.
.
.

```

### **Agrego el componente de Seleccion de Campos al final antes de "<StkFab> ... </StkFab>"**

```javascript

    {this.state.toggle.seleccampos &&
        <SelecCampos 
            datos={filtrado} 
            toggleImprimir={()=>this.toggle("seleccampos")} 
            headerTabla={columns}
        />
    }
                

```

* Por ultimo agrego 

```javascript
    <StkFab 
        borraFiltered={this.borraFiltered} 
        toggleAgregar={()=>this.toggle("agregar")} 
        toggleImprimir={()=>this.toggle("seleccampos")} // <== Agrego esto 
        toggleBusqueda={()=>this.toggle("busqueda")} 
        toggle_busqueda={this.state.toggle.busqueda} 
        search={this.search} 
        filtered={this.state.filtered} 
    />

```