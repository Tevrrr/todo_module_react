import React, { useState } from "react";
import styles from "./styles.module.css";

const Todoline = ({
    index,
    textLine,
    checked,
    remove,
    edit,
    setChecked,
    id,
}) => {
    return (
        <div className={styles.TodoLine}>
            <label>
                <input
                    checked={checked}
                    type="checkbox"
                    className={styles.displayNone}
                />
                <div onClick={() => setChecked(id)}>
                    <i class="fa-solid fa-check"></i>
                    <p>
                        {index + 1 + ". "}
                        {textLine}
                    </p>
                </div>
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
};

export default Todoline;
