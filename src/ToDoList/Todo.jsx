/** @format */

import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import styles from './styles.module.css';
import TodoAddline from './TodoAddLine';
import { useLines } from './hooks/useLines';
import axios from 'axios';
import useFeatch from './hooks/useFeatch';
import usePagination from './hooks/usePagination';
import TodoList from './TodoList';
import NavPages from './NavPages';

const Todo = ({ url, limit = 10 }) => {
	const [TodoList_, setTodoList_] = useState([]);

	const [filter, setFilter] = useState({ option: '', query: '' });

	const [editItem, setEditItem] = useState('');
	const [totalPages, setTotalPages] = useState(0);
	const [page, setPage] = useState(1);
	const sortedTodoList = useLines(
		TodoList_,
		filter.option,
		filter.query,
		(page - 1) * limit,
		page * limit
	);
	const Pages = usePagination(totalPages);

	const [featchTodos, isTodosLoading, TodosError] = useFeatch(async () => {
		const response = await axios.get(url);
		setTodoList_(
			response.data.map((item, i) => {
				return {
					checked: item.completed,
					title: item.title,
					key: Date.now() - (response.data.length - i + 1) * 1000,
				};
			})
		);
		setTotalPages(Math.ceil(response.headers['x-total-count'] / limit));
	});
	useEffect(() => {
		featchTodos();
	}, []);

	useEffect(() => {
		if (sortedTodoList.length <= 0 && page > 1) setPage(page - 1);
		setTotalPages(Math.ceil(TodoList_.length / limit));
	}, [sortedTodoList]);

	function addLine(text) {
		setTodoList_([
			...TodoList_,
			{ title: text, key: Date.now(), checked: false },
		]);
	}
	return (
		<div className={styles.Todo}>
			<NavBar
				defaltValue='Сортировать'
				options={[
					{ value: 'key', text: 'По id' },
					{ value: 'title', text: 'По алфавиту' },
					{ value: 'checked', text: 'По выполнению' },
				]}
				filter={filter}
				setFilter={setFilter}
            />
            
			{TodosError && (
				<h3 style={{ textAlign: 'center' }}>Ошибка: {TodosError}</h3>
			)}
			<TodoList
				isTodosLoading={isTodosLoading}
				sortedTodoList={sortedTodoList}
				TodoList={TodoList_}
				setTodoList={setTodoList_}
				setEditItem={setEditItem}
				startIndex={(page - 1) * limit}
			/>
			<NavPages Pages={Pages} setPage={setPage} page={page} />
			<TodoAddline
				addLine={addLine}
				value={editItem}
				setTextLine={setEditItem}
				setEditItem={setEditItem}
			/>
		</div>
	);
};

export default Todo;
