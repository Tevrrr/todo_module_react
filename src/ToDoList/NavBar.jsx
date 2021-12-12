import React from 'react';
import styles from "./styles.module.css";

const NavBar = ({options, defaltValue, onChange}) => {
    return (
        <select className={styles.TodoSelect} onChange={e => onChange(e.target.value)}>
            <option value="" disabled>{defaltValue}</option>
            {options.map(item => {
                return <option value={item.value} key={item.value}>
                    {item.text}
                </option>
            })}
        </select>
    );
}

export default NavBar;
