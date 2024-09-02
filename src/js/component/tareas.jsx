import React, { useEffect, useState } from "react";
import { Container, Card, ListGroup } from "react-bootstrap";


export const Tareas = () => {

	const [addtarea, setAddtarea] = useState("Agrega una tarea");
	const [nuevalista, setNuevalista] = useState([]);
	const [deleteTarea, setDeleteTarea] =useState("No hay tareas por hacer");
	

	const handleChange = (event) => { setAddtarea(event.target.value); };
	const handleClick = () => {setNuevalista([...nuevalista, addtarea]);};
	const borrartarea = (index) => {
		const trashs = nuevalista.filter((list, i) => i !== index)
		setNuevalista(trashs);
	};
	const limpiarTareas = () => {
		setNuevalista([]);
	};

	useEffect(()=>{
		const sincronizarAgregarNuevaTarea = fetch('https://playground.4geeks.com/todo/todos/RossMarrLozz', {
			method: "PUT",	
			body: JSON.stringify(),
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
			  setAddtarea(data);
			  setDeleteTarea(data)
		  })
		  .catch(error => {
			  // Manejo de errores
			  console.log(error);
		  });
		  
	},[]);
	

	useEffect(()=>{
		const obtenerDatosApi = fetch('https://playground.4geeks.com/todo/todos/${user} ', {
			method: "GET",	
			body: JSON.stringify(),
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
			  setNuevalista(data)
			 
		  })
		  .catch(error => {
			  // Manejo de errores
			  console.log(error);
		  });
		  
	},[]);
	



	  


	return (
		<Container>
			<Card className="contenedorprincipal" style={{ width: '25rem', height: '18rem' }}>

				<Card.Header> <strong>Tareas del día</strong></Card.Header>

				<ListGroup variant="flush">
					<ListGroup.Item >
						<input type="text"
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
						{nuevalista.map((list, index) => (
							<li key={index}>
								{list}
								<button onClick={() => borrartarea(index)}>
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




