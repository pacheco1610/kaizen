import React,{useState} from 'react'

export default function input() {
    const DropdownColaborador =()=>{
        document.querySelector('.dropdownCol').classList.toggle('toggle')
        document.querySelector('.dropdownCol-Cover').classList.toggle('toggle')
   }
    return (
    <React.Fragment>
        <div className="TextResponsables" id="input">
            <input className="inputResponsables" onFocus={()=>DropdownColaborador()} placeholder="" type="text"/>
        </div>
        <div className="dropdownCol shadow toggle">
            {this.state.filter.map(colaborador=>
                <div key={colaborador.referencia} className="col-12 btn btn-colaboradores" onClick={()=>this.addResponsable(colaborador)}><span className="title-colaborador"><img src={colaborador.photoURL} alt="..." className="img-colaborador rounded-circle img-thumbnail mr-2" /> {colaborador.displayname} <small>{colaborador.puesto.Puesto}</small></span></div>
            )}
        </div>
        <div onClick={()=>DropdownColaborador()} className="dropdownCol-Cover toggle"></div>
    </React.Fragment>
    )
}
