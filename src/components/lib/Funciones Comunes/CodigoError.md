### Importar en cada componente ...Agregar la funcion CodigoError.js

```JavaScript
import CodigoError from '../../../lib/CodigoError'
```

### Agregar la siguiete linea en la funcion que necesito capturar el error

```JavaScript
.catch((err)=>CodigoError(err))
```

Listado de Errores

```
if (err.status === 409) 
if (err.status === 410) => 1406 => el campo  alfanumérico más grande de lo que corresponde 
if (err.status === 412) => 1264 => el campo numérico más grande de lo que corresponde
if (err.status === 411) => 1451 => Código  Usado no se puede borrar 
if (err.status === 413) => 1366 => Faltan datos para ingresar información en tabla
if (err.status === 414) => 1054 => Faltan datos para leer información en tabla
```