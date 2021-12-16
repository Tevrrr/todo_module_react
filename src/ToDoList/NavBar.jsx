/** @format */

import React from 'react';
import styles from './styles.module.css';

const NavBar = ({ options, defaltValue, setFilter, filter }) => {
	return (
		<div className={styles.NavBar}>
			<select
				className={styles.TodoSelect}
				onChange={(e) =>
					setFilter({ ...filter, option: e.target.value })
				}
				value={filter.option}>
				<option value='' disabled>
					{defaltValue}
				</option>
				{options.map((item) => {
					return (
						<option value={item.value} key={item.value}>
							{item.text}
						</option>
					);
				})}
			</select>
			<input
				type='text'
				onChange={(e) =>
					setFilter({ ...filter, query: e.target.value })
				}
				value={filter.query}
			/>
		</div>
	);
};

export default NavBar;
