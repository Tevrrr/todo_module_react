import React, { useState } from 'react';
import styles from './styles.module.css';

const Todoline = ({index, textLine, checked, remove, edit, setChecked}) => {
    return (

        <div className={styles.TodoLine}>
            <label  onClick={() => setChecked(index)}>
                <input checked={checked} type="checkbox" className={styles.displayNone}/>
                <i class="fa-solid fa-check"></i>                
                {(index + 1) + ". "}<p>{ textLine}</p>
            </label>
            <div>
                <button onClick={() => edit(index)}>
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button onClick={() => remove(index)}>
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        </div>
    );
}

export default Todoline;


