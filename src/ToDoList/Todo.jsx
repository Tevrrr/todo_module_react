import React, { useState } from "react";
import Todoline from "./TodoLine";
import TodoAddline from "./TodoAddLine";
import styles from "./styles.module.css";

const Todo = ({ TodoList, Max_Width }) => {
  const [TodoList_, setTodoList_] = useState(
    TodoList.map((item,i) => {
    item.key = Date.now()-i*999;
    return item
  }));
  function remove(index) {
    setTodoList_(TodoList_.filter((p, i) =>i !==index));
  };
  function edit(index) {

  };
  function addLine(text) {
    setTodoList_([...TodoList_, {text: text, key: Date.now()}])
  }
  return (
    <div style={{ maxWidth: Max_Width + "px" }} className={styles.Todo}>
      {TodoList_.map((TodoItem, index) => (
        <Todoline
          index={index}
          textLine={TodoItem.text}
          key={TodoItem.key}
          remove={remove}
          edit={edit}
        />
      ))}
      <TodoAddline addLine={addLine}/>
    </div>
  );
};

export default Todo;
