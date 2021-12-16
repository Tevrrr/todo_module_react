/** @format */

import React from 'react';
import styles from './styles.module.css';

const TodoAddline = ({ addLine, value, setTextLine }) => {
	function addNewLine(e) {
		e.preventDefault();
		if (value.length > 0 && value.length <= 100) {
			addLine(value);
			setTextLine('');
		}
	}
	return (
		<form className={styles.TodoAddLine}>
			<input
				placeholder='Новое задание'
				type='text'
				value={value}
				onChange={(e) => {
					setTextLine(e.target.value);
				}}
			/>
			<button onClick={addNewLine}>
				<i class='fa-solid fa-circle-plus'></i>
			</button>
		</form>
	);
};

export default TodoAddline;
