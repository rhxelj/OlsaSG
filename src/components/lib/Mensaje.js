import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
export default function Mensaje(type, message) {
  switch (type) {
    case "error": // default color red
      toast.error(message);
      break;
    case "success": // default color green
      toast.success(message);
      break;
  }
}
// para usar el componente Mensaje hay que agregar el tipo y el mensaje
// ej
// Mensaje("error","Aca va el mensaje..")
