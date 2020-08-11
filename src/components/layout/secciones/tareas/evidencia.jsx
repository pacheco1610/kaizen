import React, { Component } from 'react'
import {connect} from 'react-redux'
import firebase from 'firebase'

class evidencia extends Component {
    constructor(props){
        super(props)
        this.state={
            nArray:''
        }
    }
    finaliarTarea(){
            firebase.database().ref('tareas/'+this.props.tarea.key+'/responsables').once("value").then((snapshot)=>{
                var tareaRemove = document.getElementById(this.props.tarea.key);
                tareaRemove.parentNode.removeChild(tareaRemove);
                firebase.database().ref('tareas/'+this.props.tarea.key+'/responsables/'+snapshot.val().findIndex(responsable => responsable.referencia === this.props.usuario.referencia)).update({estatustarea:'realizada'})
            }
            )
            
            
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
    infoUsuario: state.info,
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
