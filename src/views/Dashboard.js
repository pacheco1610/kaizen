import React, { useEffect, useContext ,useState} from "react";

import { Auth } from "../context/AuthContext";
import { withRouter } from "react-router";

import Dashboard1 from '../components/layout/Dashboard'



function Dashboard({history}){
    
    const { usuario } = useContext(Auth);
    const [photo, setphoto] = useState(null)
    const [nombre, setnombre] = useState(null)
    const [uid, setuid] = useState(null)

     useEffect(() => {
        if (usuario===null) {
            history.push("/login");
        }        

        usuario?usuario.photoURL?setphoto(usuario.photoURL):setphoto(usuario.photoURL):setphoto(null)
        usuario?usuario.displayName?setnombre(usuario.displayName):setnombre(usuario.displayName):setnombre(null)
        usuario?usuario.uid?setuid(usuario.uid):setuid(usuario.displayName):setuid(null)

    }, [ history,usuario]);

   
    let usuarioact={
        nombre:nombre,
        photo:photo,
        uid:uid
    } 
    if (usuario!=null) {
        return (
            <React.Fragment>
                <Dashboard1/>
            </React.Fragment>
        );
    }
    return(
        <p>Encontramos un error en tu plataforma, favor de ponerse en contacto con el administrador</p>
    )
       
    
}
export default withRouter(Dashboard);
