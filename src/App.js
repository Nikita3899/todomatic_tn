import './App.css';
import React,{useState, useEffect} from 'react';


// maintaing local storage
const getLocalItems = () => {
  let todos = localStorage.getItem('todos');
  if(todos){
    return JSON.parse(localStorage.getItem('todos'));
  }else{
    return [];
  }
}

function App() {

  const [todos, setTodos] = useState(getLocalItems());
  const [todo,setTodo] = useState("");
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");
  
  useEffect(() => {
    const json = JSON.stringify(todos);
    localStorage.setItem("todos", json);
  }, [todos]);
   
  // handling form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // creating todos
    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false
    }
    setTodos([...todos].concat(newTodo));
    setTodo("");
  }

  //Deleting todos
  const deleteTodo = (id) =>{
    let updatedTodos = [...todos].filter(
      (todo) => todo.id !== id
    )
    setTodos(updatedTodos);
  }

  // if checked todo move at the bottom of list 
  const toggleCompleted = (id) =>{
    let temp;
    [...todos].map((todo) => {
      if(todo.id === id){

        temp = todo;
      }
      
      return;
    })
    let todo2 = [...todos].filter((el)=>{
      return el.id !== id;
    })
    temp.completed = true;
    todo2.push(temp);
    setTodos(todo2);
  }

  //Editing Todos
  const submitEdits = (id) => {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id){
        todo.text = editingText;
      }
      return todo;
    })
    setTodos(updatedTodos);
    setTodoEditing(null);

  }
  
  // Reset Todos
  const reset = () =>{
    setTodos([]);
  }

  
  return (
    <div className="mainContainer">
      <header id='head'>
      <h1>Todo Matic</h1>
    
      <form id="new-task-form" onSubmit={handleSubmit}>
     <input type ="text"
      required='required'
      id="new-task-input"
      onChange={(e)=>setTodo(e.target.value)}
      value={todo}/>


     <button type = "submit" id="new-task-submit">+</button>
     <button type = "reset" id="new-task-submit" onClick={(reset)}>Reset</button>

     </form>
     </header>

  <main>
    <section className='task-list'>
    <h2>What needs to be done?</h2>
    <div>
      
        {todos.map((todo)=>(
      <div key={todo.id} id="tasks">
        <div className='task'>
          <div className='content'>
          <li>
          <input type="checkbox"
          id = "completed"
          checked = {todo.completed}
          onChange={()=>toggleCompleted(todo.id)}/>
         

          {todo.id === todoEditing ? (<input id="new-task-input2" type="text"
          
          onChange={(e)=> setEditingText(e.target.value)}/>
          ):(
            <div id="final-text">{todo.text}</div>
          )
          }
    
      <div className='actions'>
        {
          todo.id === todoEditing ? (
            <button className='edit' onClick={() => submitEdits(todo.id)}> Save</button>
          ):(
            <button className="edit" onClick={() => setTodoEditing(todo.id)}>Edit</button>
          )
        }
        <button className="delete" onClick={() => deleteTodo(todo.id)}>Delete</button>
      </div>
      </li>
      </div>
      </div>
      </div>
     ))
    }
    
    </div>

    </section>
    </main>
   </div>
  );
}

export default App;

//Corner case: when list is above 4 items doesnt show up on the UI