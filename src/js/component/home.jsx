import React, { useEffect, useState } from "react";
//create your first component

function Home () {
	const [todos, setTodos] = useState([]);
	const [todoInput, setTodoInput] = useState("");
	const [editTask, setEditTask] = useState(null);

	useEffect(()=>{
		getTodos()
	},[])
	console.log(todos)
	function getTodos() {
		fetch("https://playground.4geeks.com/todo/users/GusCastle25")
		.then (response=> response.json())
		.then (data => setTodos(data.todos))
		.catch (error => console.error(error))
	}
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
            .then(data => {setTodos([...todos, data])})
            .catch(error => console.error('Error creating user:', error));
    }

	const editarTodo = (editTask) => {
        setEditTask(editTask);
        setTodoInput(editTask.label); // Establecer el valor de entrada como la tarea actual
    };
	function putTask() {
        const requestOptions = {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				label: todoInput,
				is_done: editTask.is_done
			})
        };
        fetch(`https://playground.4geeks.com/todo/todos/${editTask.id}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                // Actualiza el estado de usuarios con los nuevos datos
                setTodos([...todos, data]);
                setUserName("")
				setEditTask(null)
            })
            .catch(error => console.error('Error creating user:', error));
    }
    // Función para eliminar una tarea
	const handleDeleteTask = (todosId) => {
		console.log(todosId)
		fetch(`https://playground.4geeks.com/todo/todos/${todosId}`, {
			method: 'DELETE'
		})
		.then(response => {
			if (response.ok) {
				setTodos(todos.filter(item => item.id !== todosId))
			} else {
				throw new Error('Failed to delete task');
			}
		})
		.catch(error => console.error('Error deleting task:', error));
	};
	function handleSubmit (e) {
		e.preventDefault()
		if (todoInput.length > 0) {
			const newTask = {
				label: todoInput,
				is_done: false}
			//setTodos([newTask,...todos,]); 
			createTodo(newTask);
			setTodoInput("");}}
	
	return (
		<form onSubmit={ e => handleSubmit (e)}
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
				{todos?.map((item) => (
					<div className="container todo-item" key={item.id}>
					<input type="checkbox" checked={item.is_done} onChange={() => setTodos(
							todos.toSpliced(item.id, 1 , {
								label: item.label,
								is_done: !item.is_done,}))}/>
					<span className="todo-text">{item.label}</span>
					<button type="button" className="btn btn-danger" onClick={()=> {
						handleDeleteTask (item.id)
					}}><i className="fas fa-trash-alt"></i></button>
					<button type="button" className="btn btn-primary" onClick={()=> {
						editarTodo (item.id)
					}}>
					<i className="fas fa-edit"></i>
					</button>
				</div>
				
				))}
				<small>{todos?.filter((item) => !item.is_done).length} Tasks left to do!</small>
			</div>
		</form>
	);
};

export default Home;
