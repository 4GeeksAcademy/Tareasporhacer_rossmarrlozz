//import react into the bundle
import React from "react";
import ReactDOM from "react-dom/client";

// include your styles into the webpack bundle
import "../styles/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'flowbite/dist/flowbite.min.css';

//import your own components
import Todo from "./component/todo.jsx";


//render your react application
ReactDOM.createRoot(document.getElementById('app')).render(<Todo/>);

