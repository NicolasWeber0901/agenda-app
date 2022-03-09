import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react'
import Item from './components/item'

function App() {

  const [itens, setItens] = useState([])
  const [filterItens, setFilterItens] = useState({ filter: false, active: true })

  function getDados() {
    fetch('http://localhost:3000/todo/list', { method: "GET" })
      .then(response => response.json())
      .then(data => setItens(data))
  }

  useEffect(() => {
    getDados()
  }, [])

  const itensMostrados = filterItens.filter ? itens.filter(item => item.active === filterItens.active) : itens

  function inserirDoc() {
    fetch('http://localhost:3000/todo/add',
      {
        method: "POST",
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify({ "text": "", "active": true })
      })
      .then(response => response.json())
      .then(() => getDados())
  }

  function atualizarDoc(item) {
    fetch('http://localhost:3000/todo/update',
      {
        method: "PATCH",
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify(item)
      })
      .then(response => response.json())
      .then(() => getDados())
  }

  function excluirDoc(item) {
    fetch('http://localhost:3000/todo/delete',
      {
        method: "DELETE",
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify(item)
      })
      .then(response => response.json())
      .then(() => getDados())
  }


  return (
    //só retorna um elemento por componente
    <div className="wrapper">
      <div className="to-do">
        <h1>App Agenda</h1>

        {itensMostrados.map(item => {
          return (<Item item={item} atualizarDoc={atualizarDoc} excluirDoc={excluirDoc} />)
        })}

        <div className="buttonRow">
          <button 
          onClick={() => setFilterItens({ filter: false })}
          style={filterItens.filter ?  {} : {fontWeight: "bold"}}
          >Todos</button>

          <button 
          onClick={() => setFilterItens({ filter: true, active: true })}
          style={((filterItens.filter) && (filterItens.active === true)) ?  {fontWeight: "bold"} : {}}
          >Pendentes</button>

          <button 
          onClick={() => setFilterItens({ filter: true, active: false })}
          style={ ((filterItens.filter) && (filterItens.filter === false)) ?  {fontWeight: "bold"} : {}}
          >Concluídos</button>

        </div>

        <div className="buttonRow">
          <button onClick={inserirDoc}>Adioconar tarefa</button>
        </div>


      </div>


    </div>
  );
}

export default App;
