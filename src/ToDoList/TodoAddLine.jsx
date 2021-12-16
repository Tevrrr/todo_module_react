import React, { useState } from "react";
import styles from "./styles.module.css";

const TodoAddline = ({ addLine, value, setTextLine }) => {
    function addNewLine(e) {
        e.preventDefault();
        addLine(value);
        setTextLine("");
    }
    function editLine(params) {}
    return (
        <form className={styles.TodoAddLine}>
            <input
                type="text"
                value={value}
                onChange={(e) => {
                    setTextLine(e.target.value);
                }}
            />
            <button onClick={addNewLine}>
                <i class="fa-solid fa-circle-plus"></i>
            </button>
        </form>
    );
};

export default TodoAddline;
