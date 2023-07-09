import React from 'react'
import {useState, useEffect} from 'react'
const API_BASE = 'http://127.0.0.1:3010'


const App = () => {
  const [todos, setTodos] = useState([]);

  const [popupActive, setPopupActive] = useState(false);

  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {

    fetch(API_BASE + "/todos")
    .then(res => res.json())
    .then(data => setTodos(data))
    .catch(err => console.log("Error:" + err));

  }, []);

  const completeTodo = async (id) => {
    const data = await fetch((API_BASE + "/todos/update/" + id), {method: 'PUT'})
    .then(res => res.json());

    setTodos( todos => {
     return todos.map((todo) => {
        if(todo._id === id){
          todo.complete = data.complete;
        }
        return todo;
      })
    })
  }

  const deleteTodo = async (id) => {
    const deletedTodo = await fetch((API_BASE + "/todos/delete/" + id), {method: 'DELETE'})
    .then( res => res.json())

    setTodos( todos => {
      return todos.filter( todo => todo._id !== deletedTodo._id)
    })
  }

  const addTodo = async () => {

    const NewTodo = await fetch((API_BASE + "/todos/new"), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },      
      body: JSON.stringify({
        text: newTodo
      })
    })
    .then(res => res.json())
    .catch(err => console.log(err));

    setTodos( todos => [...todos, NewTodo])
    setPopupActive(false);
    setNewTodo("");

  }


  return (
    <div className='App'>
      <h1>Welcome, Ashutosh</h1>
      <h4>Your Tasks</h4>

      <div className='todos'>

        {todos.length === 0 ?

        <h2>No Tasks</h2> :
          
            (todos.map( todo => 
            (<div 
            className={'todo ' + (todo.complete ? 'is-complete' : '')} 
            key={todo._id}
            onClick={() => completeTodo(todo._id)}>
              <div className='checkbox'></div>
              <div className='text'>{todo.text}</div>
              <div className='delete-todo' onClick={
                  (event) => {
                    event.stopPropagation() //! To stop event bubbling
                    deleteTodo(todo._id)
                    }
                  }
                >x</div>    
            </div>)
          ))
        }

      </div>

      <div className='addPopup' onClick={() => setPopupActive(true)}>+</div>

    {popupActive 
      ? 
      (
        <div className='popup'>
          <div className='closePopup' onClick={() => setPopupActive(false)}>X</div>
          <div className='content'>
            <h3>Add Task</h3>
            <input 
            type="text" 
            className='add-todo-input' 
            onChange={ e => setNewTodo(e.target.value)}
            value={newTodo}
            />
            <button className='button' onClick={addTodo}>Add</button>
          </div>      
        </div>
      ) 
      : 
        ''}
    </div>
  )
}

export default App;


//# In React (JSX), we use curly braces {} to embed JavaScript expressions within the markup.
//# In plain JavaScript, parentheses () are commonly used to group and evaluate expressions in various contexts.