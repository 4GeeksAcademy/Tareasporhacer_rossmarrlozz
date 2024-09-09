import React from "react";
import { Tareas } from "./tareas";




const Todo = () => {
	return (
		<div className="text-center">
			<h1 className="tituloprincipal text-center mt-5">¡Que no se me olvide nada!</h1>
			<Tareas/>	
		</div>
		
	);
};

export default Todo;
