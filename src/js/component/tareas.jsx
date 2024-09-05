import React, { useEffect, useState } from "react";
import { Container, Card, ListGroup } from "react-bootstrap";


export const Tareas = () => {

	const [addtarea, setAddtarea] = useState("Agrega una tarea");
	const [nuevalista, setNuevalista] = useState([]);
	const handleChange = (event) => { setAddtarea(event.target.value); };
	const handleClick = async () => {
		const response= await fetch("https://playground.4geeks.com/todo/todos/rossmarrlozz", {
			method:"POST",
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify({label:addtarea, is_done:false})
		});
		const data= await response.json()
		setNuevalista([...nuevalista, data]);
	};
	const borrartarea = async (tarea) => {
		await fetch( `https://playground.4geeks.com/todo/todos/${tarea.id}`,{
			method:"DELETE"
		});
		sincronizar();
			};
	const limpiarTareas = () => {
		setNuevalista([]);
	};

	const solicitarListaDeTareas= async ()=>{
		const response = await fetch("https://playground.4geeks.com/todo/users/rossmarrlozz",{
			method:"GET"
			});
			const data =await response.json();
			return data.todos;
	};
	const sincronizar=async()=>{
		const listaDeTareas= await solicitarListaDeTareas();
		setNuevalista(listaDeTareas);
	};
	useEffect(()=>{
		sincronizar();
	},[]);

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




