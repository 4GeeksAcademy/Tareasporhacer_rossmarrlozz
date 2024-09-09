import React, { useEffect, useState } from "react";
import { Container, Card, ListGroup } from "react-bootstrap";
import "/src/styles/index.css"

export const Tareas = () => {

	const [addtarea, setAddtarea] = useState(""); /*Guarda el texto para una nueva tarea.*/
	const [nuevalista, setNuevalista] = useState([]); /*Guarda la lista de tareas*/

	const handleChange = (event) => { setAddtarea(event.target.value); };
	const handleClick = async () => {
		const response = await fetch("https://playground.4geeks.com/todo/todos/rossmarrlozz", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ label: addtarea, is_done: false })
		});
		const data = await response.json()
		setNuevalista([...nuevalista, data]);
		setAddtarea("")
	};
	const borrartarea = async (tarea) => {
		await fetch(`https://playground.4geeks.com/todo/todos/${tarea.id}`, {
			method: "DELETE"
		});
		sincronizar();
	};
	const limpiarTareas = async () => {
		await fetch("https://playground.4geeks.com/todo/users/rossmarrlozz", {
			method: "DELETE"
		});
		await fetch("https://playground.4geeks.com/todo/users/rossmarrlozz", {
			method: "POST"
		});
		setNuevalista([]);
	};

	const solicitarListaDeTareas = async () => {
		const response = await fetch("https://playground.4geeks.com/todo/users/rossmarrlozz", {
			method: "GET"
		});
		if (!response.ok) {
			createUser()
		} else {
			const data = await response.json();
			return data.todos;
		}
	};
	const createUser = async () => {
		const response = await fetch("https://playground.4geeks.com/todo/users/rossmarrlozz", {
			method: "POST"
		})
		if (response.ok) {
			sincronizar()
		}
	}


	const sincronizar = async () => {
		const listaDeTareas = await solicitarListaDeTareas();
		setNuevalista(listaDeTareas);
	};
	useEffect(() => {
		sincronizar();
	}, []);

	return (
		<Container>
			<Card className="contenedorprincipal" style={{ width: '25rem', height: '18rem' }}>

				<Card.Header> <strong>Tareas del día</strong></Card.Header>

				<ListGroup variant="flush">
					<ListGroup.Item >
						<input
							type="text"
							onChange={handleChange}
							placeholder="Agrega una tarea"
							value={addtarea}
							onKeyDown={(e) => {
								if (e.key == "Enter") {
									handleClick()
								}
							}}
						/>
						<button className='btn btn-info' onClick={handleClick}>
							<i className="fa fa-plus"></i>
						</button>
					</ListGroup.Item>
				</ListGroup>
				<div className="tareasContenedor">
					<ul >
						{nuevalista.map((tarea, index) => (
							<li key={index}>
								{tarea.label}
								<button onClick={() => borrartarea(tarea)}>
									<i className="fa fa-trash"></i></button>
							</li>
						))}
					</ul>
				</div>

				<Card.Footer className="text-muted">{nuevalista.length} tareas por hacer
					<button onClick={limpiarTareas} className='btn btn-info ml-3 limpiartareas'>
						<strong>Limpiar Todas</strong>
					</button>
				</Card.Footer>
			</Card>
		</Container>
	);
}




