/** @format */

import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import styles from './styles.module.css';
import './CSSTransition.css';
import TodoAddline from './TodoAddLine';
import Todoline from './TodoLine';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useLines } from './hooks/useLines';
import axios from 'axios';
import useFeatch from './hooks/useFeatch';

const Todo = ({ url}) => {
	const [TodoList_, setTodoList_] = useState([]);
    
	const [filter, setFilter] = useState({ option: '', query: '' });
	const sortedTodoList = useLines(TodoList_, filter.option, filter.query);
	const [editItem, setEditItem] = useState('');
    const [featchTodos, isTodosLoading, TodosError] = useFeatch(async () => {
		const response = await axios.get(url);
		setTodoList_(
			response.data.map((item, i) => {
				item.key = Date.now() - (response.data.length - i + 1) * 1000;
				return item;
			})
		);
	});
    useEffect(() => {
        featchTodos();
        
    }, []);

	function remove(index) {
		setTodoList_(TodoList_.filter((p, i) => i !== index));
	}
	function edit(index) {
		remove(index);
		setEditItem(TodoList_[index].title);
	}
	function setChecked(id) {
		setTodoList_(
			TodoList_.map((item) => {
				if (item.key === id) item.completed = !item.completed;
				return item;
			})
		);
	}
	function addLine(text) {
		setTodoList_([
			...TodoList_,
			{ title: text, key: Date.now(), completed: false },
		]);
	}
	return (
		<div className={styles.Todo}>
			<NavBar
				defaltValue='Сортировать'
				options={[
					{ value: 'key', text: 'По id' },
					{ value: 'title', text: 'По алфавиту' },
					{ value: 'completed', text: 'По выполнению' },
				]}
				filter={filter}
				setFilter={setFilter}
			/>
			{TodosError && (
				<h3 style={{ textAlign: 'center' }}>Ошибка: {TodosError}</h3>
			)}
			<TransitionGroup>
				{!isTodosLoading ? (
					sortedTodoList.map((TodoItem, index) => (
						<CSSTransition
							key={TodoItem.key}
							timeout={300}
							classNames='alert'>
							<Todoline
								index={index}
								checked={TodoItem.checked}
								id={TodoItem.key}
								textLine={TodoItem.title}
								remove={remove}
								edit={edit}
								setChecked={setChecked}
							/>
						</CSSTransition>
					))
				) : (
					<h4 style={{ textAlign: 'center' }}>Загрузка...</h4>
				)}
			</TransitionGroup>
			<TodoAddline
				addLine={addLine}
				value={editItem}
				setTextLine={setEditItem}
			/>
		</div>
	);
};

export default Todo;
