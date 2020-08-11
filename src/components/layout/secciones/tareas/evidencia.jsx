import React, { Component } from 'react'
import {connect} from 'react-redux'
import firebase from 'firebase'
import moment from "moment";

class evidencia extends Component {
    constructor(props){
        super(props)
        this.state={
            nArray:''
        }
    }
    finaliarTarea(){
            const historial=[]
            firebase.database().ref('tareas/'+this.props.tarea.key+'/responsables').once("value").then((snapshot)=>{
                firebase.database().ref('tareas/'+this.props.tarea.key+'/responsables/'+snapshot.val().findIndex(responsable => responsable.referencia === this.props.usuario.referencia)).update({estatustarea:'realizada'})
                historial.push(
                    {
                        photoURL:this.props.usuario.photoURL,
                        displayname:this.props.usuario.displayname,
                        texto:'termino la tarea',
                        fecha:moment().format('YYYY-MM-DD')
                    }
                )
                firebase.database().ref('tareas/'+this.props.tarea.key).update({historial:historial})
            }
        )
        document.getElementById('wrapper-Container').classList.toggle('toggled')
            
    }
    render() {
        return (
            <div>
                Finalizaste tu tarea, ¿deseas agregar una evidencia?
                <button onClick={()=>this.evidenciar()} className="btn text-white"><u>Si</u></button><button onClick={()=>this.finaliarTarea()} className="btn text-white"><u>No</u></button>
            </div>
        )
    }
}
const mapStateProps = state =>({
    usuario:state.info,
})
const mapDispatchToprops = dispatch =>({
    UpdateShow(show){
        dispatch({
          type:'Show',
          show
        })
      },
      tareadetalles(tareadetalles){
        dispatch({
          type:'Tarea',
          tareadetalles
        })
      },
})
export default connect(mapStateProps,mapDispatchToprops)(evidencia)
