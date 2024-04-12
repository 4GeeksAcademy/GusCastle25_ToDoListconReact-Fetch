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
		const local_todos = localStorage.getItem("todos");
		if (local_todos) {setTodos(JSON.parse(local_todos));}
	},[]);

	useEffect(()=>{
		if (todos.length) {
			localStorage.setItem("todos", JSON.stringify(todos));
		}
	}, [todos]);

	useEffect(()=>{
		fetch("https://playground.4geeks.com/todo/users/GusCastle25")
		.then (resp => resp.JSON())
		.then (data => setTodos(data.result))
		.catch (error => console.error(error))
	},[])

	const myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "label": "string",
  "is_done": true
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://playground.4geeks.com/todo/todos/GusCastle25", requestOptions)
	.then (resp => resp.JSON())
	.then (data => setTodos(data.result))
	.catch (error => console.error(error));
	
fetch('https://playground.4geeks.com/todo/todos/GusCastle25', {
      method: "PUT",
      body: JSON.stringify(todos),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
        console.log(resp.ok); // Será true si la respuesta es exitosa
        console.log(resp.status); // El código de estado 200, 300, 400, etc.
        console.log(resp.text()); // Intentará devolver el resultado exacto como string
        return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
    })
    .then(data => {
        // Aquí es donde debe comenzar tu código después de que finalice la búsqueda
        console.log(data); // Esto imprimirá en la consola el objeto exacto recibido del servidor
    })
    .catch(error => { // Manejo de errores
        console.log(error);
    });

	fetch('https://playground.4geeks.com/todo/todos/GusCastle25/${todo.id}', {
      method: "DELETE",
      body: JSON.stringify(todos),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
        console.log(resp.ok); // Será true si la respuesta es exitosa
        console.log(resp.status); // El código de estado 200, 300, 400, etc.
        console.log(resp.text()); // Intentará devolver el resultado exacto como string
        return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
    })
    .then(data => {
        // Aquí es donde debe comenzar tu código después de que finalice la búsqueda
        console.log(data); // Esto imprimirá en la consola el objeto exacto recibido del servidor
    })
    .catch(error => { // Manejo de errores
        console.log(error);
    });

	return (
		<form onSubmit={e => {e.preventDefault();
			if (todoInput.length > 0) {
				setTodos([{
					label: todoInput,
					is_done: false},...todos,]);
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
						setTodos(todos.toSpliced(idx, 1));
						localStorage.setItem("todos", JSON.stringify(todos.toSpliced(idx, 1)));
					}}/>
				))}
				<small>{todos.filter((item) => !item.is_done).length} Tasks left to do!</small>
			</div>
		</form>
	);
};

export default Home;
