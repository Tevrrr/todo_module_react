/** @format */

import React from 'react';
import styles from './styles.module.css';

const NavPages = ({ Pages, setPage, page }) => {
	function printButton(item) {
		return (
			<button
				onClick={() => {
					setPage(item);
				}}
				className={page == item ? styles.activ : {}}>
				{item}
			</button>
		);
	}
	return (
		<div className={styles.NavPages}>
			{printButton(Pages[0])}
			{page - 2 <= 2 ? '' : <p>...</p>}
			{Pages.map((item) => {
				if (
					item != 1 &&
					item != Pages.length &&
					item >= page - 2 &&
					item <= page + 2
				)
					return printButton(item);
			})}
			{page + 2 >= Pages.length - 1 ? '' : <p>...</p>}

			{printButton(Pages[Pages.length - 1])}
		</div>
	);
};

export default NavPages;
