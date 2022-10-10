import React from "react";
import { nanoid } from 'nanoid';

function App() {

  const [tarea, setTarea] = React.useState('')
  const [tareas, setTareas] = React.useState([])
  const [modoEdicion, setModoEdicion] = React.useState(false)
  const [id, setId] = React.useState('')


  const agregarTarea = e => {
    e.preventDefault()

    if(!tarea.trim()){
      console.log('Elemento vacío')
      return
    }
    console.log(tarea)

    setTareas([
      ...tareas,
      {id: nanoid(), NombreTarea: tarea}
    ])

    setTarea('')
  }

  const eliminarTarea = id => {
    // console.log(id)

    const arrayFiltrado = tareas.filter(item => item.id !== id)
    setTareas(arrayFiltrado)
  }

  const editar = item => {
    console.log(item)
    setModoEdicion(true)
    setTarea(item.NombreTarea)
    setId(item.id)
  }

  const editarTarea = (e) => {
    e.preventDefault()
    if(!tarea.trim()){
      console.log('Elemento vacío')
      return
    }

    const arrayEditado = tareas.map(
      item => item.id === id ? {id:id, nombreTarea:tarea} : item
      )
      setTareas(arrayEditado)
      setModoEdicion(false)
      setTarea('')
      setId('')
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center" >CRUD Simple</h1>
      <hr/>
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de tareas</h4>
          <ul className="list-group">
            {
              tareas.map(item => (
                <li className="list-group-item" key={item.id}>
                <span className="lead">{item.NombreTarea}</span>


                <button 
                  className="btn btn-danger btn-sm float-right mx-2"
                  onClick={() => eliminarTarea(item.id)}
                >
                  Eliminar
                </button>
                <button 
                  className="btn btn-warning btn-sm float-right"
                  onClick={() => editar(item)}
                >
                  Editar
                </button>
              </li>
              ))
            }
          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">
            {
              modoEdicion ? 'Editar tarea' : 'Agregar Tarea'
            }
          </h4>
          <form onSubmit={ modoEdicion ? editarTarea : agregarTarea }>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Añade tarea"
              onChange={ e => setTarea(e.target.value)}
              value={tarea}
            />
            {
              modoEdicion ? (
                <button className="btn btn-warning btn-block" type="submit">Editar</button>
              ) : (
                <button className="btn btn-dark btn-block" type="submit">Agregar</button>
              )
            }
          
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
