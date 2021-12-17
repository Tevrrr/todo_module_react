/** @format */

import React from 'react';
import Todoline from './TodoLine';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './CSSTransition.css';

const TodoList = (
	{setEditItem,
	TodoList,
	setTodoList,
	isTodosLoading,
    sortedTodoList,
    startIndex}
) => {
	function remove(index) {
		setTodoList(TodoList.filter((p, i) => i !== index));
	}
	function edit(index) {
		remove(index);
		setEditItem(TodoList[index].title);
	}
	function setChecked(id) {
		setTodoList(
			TodoList.map((item) => {
				if (item.key === id) item.completed = !item.completed;
				return item;
			})
		);
    }
	return (
		<div>
			{!isTodosLoading ? (
				<TransitionGroup>
					{sortedTodoList.map((TodoItem, index) => (
						<CSSTransition
							key={TodoItem.key}
							timeout={300}
							classNames='alert'>
							<Todoline
								index={startIndex+index}
								checked={TodoItem.checked}
								id={TodoItem.key}
								textLine={TodoItem.title}
								remove={remove}
								edit={edit}
								setChecked={setChecked}
							/>
						</CSSTransition>
					))}
				</TransitionGroup>
			) : (
				<h4 style={{ textAlign: 'center' }}>Загрузка...</h4>
			)}
		</div>
	);
};

export default TodoList;
