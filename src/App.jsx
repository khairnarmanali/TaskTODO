import { useEffect, useState } from 'react'
import Navbar from "./components/Navbar"
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { v4 as uuidv4 } from 'uuid';



function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showFinished, setshowFinished] = useState(false)


  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
        let todos = JSON.parse(localStorage.getItem("todos"))
    settodos(todos)
  }
  
  }, [])

  const toggleFinished =(e) => {
    setshowFinished(!showFinished)
    
  }
  
  

  const SaveToLS = (params) => {
    localStorage.setItem("todos",JSON.stringify(todos))
    
  }
  

  const handleEdit = (e, id) => {
    let t = todos.filter(i=>i.id===id)
    settodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    settodos(newTodos)
    SaveToLS()




  }
  const handleDelete = (e, id) => {

    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    settodos(newTodos)
     SaveToLS()


  }
  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    settodo("")

     SaveToLS()

  }

  const handleChange = (e) => {
    settodo(e.target.value)

  }

  const handlecheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos)
     SaveToLS()
  }


  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-200 min-h-[85vh] md:w-1/2">
      <h1 className='font-bold text-center text-xl'>TaskTODO - Manage your TODOs and Task at one place</h1>
        <div className="addtodo my-5 flex flex-col gap-4">
          <h2 className='text-lg font-bold'>Add a TODO</h2>
          <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full p-2 py-2 border-2 border-violet-950 hover-border-violet-800' />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 disabled:bg-violet-950 hover:bg-violet-950 p-2 text-sm font-bold py-1 text-white rounded-md cursor-pointer'>SAVE</button>
        </div>
        <input className='my-4' onClick={toggleFinished} type="checkbox" checkhed={showFinished} />Show Finished Tasks
        <h2 className='text-xl font-bold'>YOUR TODOs</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-6'>  No Todos to Display</div>}
          {todos.map(item => {


        return (showFinished ? item.isCompleted : !item.isCompleted) && <div key={item.id} className="todo flex w-1/2 my-3 justify-between">
              <div className='flex gap-3'>
                <input name={item.id} onChange={handlecheckbox} type="checkbox" checked={item.isCompleted}  id="" />
                 <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div> 
              
             
              <div className="buttons flex h-full">
                <button onClick={(e) => {handleEdit(e,item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 text-sm font-bold py-1 text-white rounded-md mx-1'><FaEdit />
</button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-2 text-sm font-bold py-1 text-white rounded-md mx-1'><MdDelete />
</button>
              </div>
            </div>
          })}
        </div>
      </div>

    </>
  )
}

export default App
