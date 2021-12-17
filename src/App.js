/** @format */

import React,{useState, useMemo} from 'react';
import Todo from './ToDoList/Todo';
import './App.css';

function App() {
   
    return (
		<div className='App'>
			<Todo url='https://jsonplaceholder.typicode.com/todos' />
		</div>
	);
}

export default App;
