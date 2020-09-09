import React,{useState} from 'react'

export default function Input(props) {
    const [filtro,setFiltro]=useState(props.data)
    const [text,SetText]=useState()
    const [Clientes, SetAdd]=useState([])
    const Dropdown =()=>{
        document.querySelector(`.${props.name}`).classList.toggle('toggle')
        document.querySelector(`.${props.name}.dropdownCol-Cover`).classList.toggle('toggle')
   }
   const filter=(event)=>{
    var text = event.target.value
      const data = props.data
      const newData = data.filter(function(item){
          const itemDataTitle = item.nombre.toUpperCase()
          const itemDataDescp = item.empresa.toUpperCase()
          const campo = itemDataTitle+" "+itemDataDescp
          const textData = text.toUpperCase()
          return campo.indexOf(textData) > -1
      })
      setFiltro(newData)
      SetText(text)
   }
   const addSelect = (cliente)=>{
        Clientes.push(cliente)
        document.querySelector(`.${props.name}`).classList.toggle('toggle')
        document.querySelector(`.${props.name}.dropdownCol-Cover`).classList.toggle('toggle')
        setFiltro(filtro.filter(clientefil=>clientefil.telefono!==cliente.telefono))
        props.onSelect(Clientes)
   }
   const RemoveSelect=(cliente)=>{
        filtro.push(cliente)
        SetAdd(Clientes.filter(clientefil=>clientefil.telefono!==cliente.telefono))
        props.onSelect(Clientes)
   } 
    return (
    <React.Fragment>
        <div className="inputTexto">
            {Clientes.map(cliente=>
                <span key={cliente.empresa} className="badge badge-pill badge-light m-1">
                    <label htmlFor="" className="mt-1" >{cliente.nombre}</label>
                    <button className="btn btn-default btn-circle ml-1" onClick={()=>RemoveSelect(cliente)}>x</button>
                </span>
            )}
            <input className="inputSelect" value={text} onChange={(text) => filter(text)} onFocus={()=>Dropdown()} placeholder="" type="text"/>
        </div>
        <div className={`${props.name} dropdownCol shadow toggle`}>
            {filtro.map(cliente=>
              <div key={cliente.empresa} 
              className="col-12 btn btn-colaboradores"
              onClick={()=>addSelect(cliente)}
              >
                  <span className="title-colaborador">
                      {cliente.nombre} 
                      <small className="ml-1" >{cliente.empresa}</small>
                </span>
            </div>
            )}
        </div>
        <div onClick={()=>Dropdown()} className={`dropdownCol-Cover toggle ${props.name}`}></div>
    </React.Fragment>
    )
}
