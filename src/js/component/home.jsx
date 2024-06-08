import React, { useEffect, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("")
	const [todoList, setTodoList] = useState([])
	const createUser = async () => {
		try {
			const response = await fetch("https://playground.4geeks.com/todo/users/AdriCabrera", {
				method: "POST"
			})
			if (!response.ok) {
				console.log("Error en la solicitud", response.status)
				return;
			}
			const data = await response.json()
			console.log(data)
		}
		catch (error) {
			console.log("Algo salio mal", error)
		}
	}


	const getTodo = async () => {
		try {
			const response = await fetch("https://playground.4geeks.com/todo/users/AdriCabrera", {
			})
			if (!response.ok) {
				console.log("Error!", response.status)
				return;
			}
			const data = await response.json()
			console.log(data)
			setTodoList(data.todos)

		}
		catch (error) {
			console.log("OMG! Error!", error)
		}
	}

	const addTodo = async () => {
		try {
			const response = await fetch("https://playground.4geeks.com/todo/todos/AdriCabrera", {
				method: "POST",
				body: JSON.stringify({
					"label": inputValue,
					"is_done": false
				}),
				headers: {
					"Content-Type": "application/json",
				}
			})
			if (!response.ok) {
				console.log("Error, no se agrego la tarea", response.status)
				return;
			}
			const data = await response.json()
			console.log(data)
			setTodoList([...todoList, data])
			setInputValue("")

		}
		catch (error) {
			console.log("Hay un error!", error)
		}
	}
	const deleteTodo = async (id) => {
		try {

			const response = await fetch("https://playground.4geeks.com/todo/todos/" + id, {
				method: "DELETE"
			})
			if (!response.ok) {
				console.log("No se pudo borrar la tarea", response.status)
				return;
			}
			const data = await response
			console.log(data)
			const newList = todoList.filter((item) => item.id != id)
			setTodoList(newList)

		} catch (error) {
			console.log("OMG! Error!", error)
		}
	}

	const deleteUser = async () => {
		try {
			const response = await fetch("https://playground.4geeks.com/todo/users/AdriCabrera", {
				method: "DELETE"
			})
			if (!response.ok) {
				console.log("No se pudo borrar el usuario", response.status)
				return;
			}
			const data = await response
			console.log(data)
			setTodoList([])
			createUser()

		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		createUser()
		getTodo()
	}, [])

	return (
		<div className="container">
			<h1>todos</h1>
			<ul>
				<li>
					<input type="text" placeholder="Agrega una tarea"
						onChange={e => setInputValue(e.target.value)}
						value={inputValue}
						onKeyDown={event => {
							if (event.key === "Enter") {
								if (inputValue.trim() !== "") {
									addTodo()
								}
							}
						}}
					></input>
				</li>
				{todoList.length === 0 ? (
					<li className="noTasks fst-italic fw-light">No hay tareas, añadir tareas</li>
				) : (
					todoList.map((inputValue) => (
						<li key={inputValue.id}>
							{inputValue.label} {" "}
							<i
								className="delete fa fa-xmark"
								onClick={() =>
									deleteTodo(inputValue.id)
								}
							></i>
						</li>
					))
				)
				}
			</ul>
			<div>{todoList.length} Items left</div>
			<div className="container d-flex justify-content-center">
				<button onClick={() => deleteUser()}>Delete User</button>
			</div>
		</div>
	);
};

export default Home;

