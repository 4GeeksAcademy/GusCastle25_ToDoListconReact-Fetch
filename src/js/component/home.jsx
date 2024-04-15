import React, { useEffect, useState } from "react";
//create your first component
function TodoItem({ label, is_done, delete_todo, toggle_todo }){
	return (
		<div className="container todo-item">
			<input type="checkbox" checked={is_done} onChange={toggle_todo}/>
			<span className="todo-text">{label}</span>
			<button type="button" className="btn btn-danger" onClick={delete_todo}><i className="fas fa-trash-alt"></i></button>
		</div>
	)
}

function Home () {
	const [todos, setTodos] = useState([]);
	const [todoInput, setTodoInput] = useState("");

	useEffect(()=>{
		fetch("https://playground.4geeks.com/todo/users/GusCastle25")
		.then (response=> response.json())
		.then (data => setTodos(data.todos))
		.catch (error => console.error(error))
	},[])

    // Crear usuario (POST)
    function createUser() {
        const requestOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
        };
        fetch(`https://playground.4geeks.com/todo/users/GusCastle25`, requestOptions)
            .then(response => response.json())
            .then(data => {
                // Actualiza el estado de usuarios con los nuevos datos
                setTodos([...todos, data]);
                setUserName("")
            })
            .catch(error => console.error('Error creating user:', error));
    }
    // Crear tarea (POST)
    function createTodo(newTask) {
        const requestOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newTask)
        };
        fetch(`https://playground.4geeks.com/todo/todos/GusCastle25`, requestOptions)
            .then(response => response.json())
            .then(data => { console.log(data)
            })
            .catch(error => console.error('Error creating user:', error));
    }
    // Función para eliminar una tarea
	const handleDeleteTask = (todosId) => {
   
		fetch(`https://playground.4geeks.com/todo/todos/${todosId}`, {
			method: 'DELETE'
		})
		.then(response => {
			if (response.ok) {
			} else {
				throw new Error('Failed to delete task');
			}
		})
		.catch(error => console.error('Error deleting task:', error));
	};

	return (
		<form onSubmit={e => {e.preventDefault();
			if (todoInput.length > 0) {
				const newTask = {
					label: todoInput,
					is_done: false}
				setTodos([newTask,...todos,]); createTodo(newTask);
				setTodoInput("");}}}
			className="text-center mt-5 d-flex flex-colum align-items-center justify-content-start">
			<div className="container">
				<h1>Todo list</h1>
				<input
					className="form-control form-control-lg" 
					type="text" 
					placeholder="Import Task" 
					aria-label="todo list input field"
					value={todoInput}
					onChange={e => setTodoInput(e.target.value.trimStart())}/>
				{todos.map((item, idx) => (<TodoItem
					key={idx}
					label={item.label} 
					is_done={item.is_done} 
					toggle_todo={() => setTodos(
						todos.toSpliced(idx, 1 , {
							label: item.label,
							is_done: !item.is_done,}))}
					delete_todo={()=> {
						handleDeleteTask (item.id)
						setTodos(todos.toSpliced(idx, 1));
					}}/>
				))}
				<small>{todos.filter((item) => !item.is_done).length} Tasks left to do!</small>
			</div>
		</form>
	);
};

export default Home;
