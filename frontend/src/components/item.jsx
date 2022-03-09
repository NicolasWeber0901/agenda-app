import {useState} from 'react'

function Item({ item, atualizarDoc, excluirDoc }) {

    const [tempText, setTempText] = useState("")

    return (
        <div className="row">
            <input type="checkbox" checked={!item.active} onClick={() => { atualizarDoc({ ...item, active: !item.active }) }} />

            {((item.edit) || (item.text === "")) ?
                (<input type="text" placeholder={item.text} 
                onChange={(e) => {setTempText(e.target.value)}}
                onBlur={() => {atualizarDoc({...item, text: tempText, edit: false})}}
                />) :
                <span onClick={() => { atualizarDoc({ ...item, edit: true }) }}
                style={item.active ? {} : {textDecoration: "line-through"}}
                >{item.text}</span>
            }


            <button onClick={() => { excluirDoc(item) }}>Excluir</button>
        </div>
    )


}

export default Item