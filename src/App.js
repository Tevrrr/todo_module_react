/** @format */

import React,{useState, useMemo} from 'react';
import Todo from './ToDoList/Todo';
import './App.css';
import axios from 'axios';

function App() {

    
   
    return (
		<div className='App'>
			<Todo TodoList={[]} />
		</div>
	);
}

export default App;
