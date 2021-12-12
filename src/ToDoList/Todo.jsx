import React, { useState } from "react";
import Todoline from "./TodoLine";
import TodoAddline from "./TodoAddLine";
import NavBar from "./NavBar";
import styles from "./styles.module.css";

const Todo = ({ TodoList }) => {
  const [TodoList_, setTodoList_] = useState(
    TodoList.map((item,i) => {
    item.key = Date.now()-(TodoList.length-i+1)*1000;
    if (typeof item.checked === undefined) item.checked = false;
    return item
  }));
  const [editItem, setEditItem] = useState("");
  function remove(index) {
    setTodoList_(TodoList_.filter((p, i) =>i !==index));
  };
  function edit(index) {
    remove(index);
    setEditItem(TodoList_[index].text);
  };
  function setChecked(index, value) {
    setTodoList_(TodoList_.map((item, i) =>{
      if(i ===index)  item.checked=value;
      return item;
    }));
  }
  function addLine(text) {
    setTodoList_([...TodoList_, {text: text, key: Date.now(), checked: false}])
  }
  function sortList(sort) {
    setTodoList_([...TodoList_].sort((a,b) =>{
      if(typeof a[sort] == "string") return a[sort].localeCompare(b[sort]);
      else if(typeof a[sort] == "boolean"){
          if(a[sort])return 1;
          else return -1
        } 
      else {
        if(a[sort] < b[sort]) return -1;
        else if(a[sort] > b[sort]) return 1;
        else return 0;
      }
      }
    ))
  }
  return (
    <div  className={styles.Todo}>
      <NavBar
        defaltValue = "Сортировать"
        options={[{value: "key", text: "По id"},
                  {value: "text", text: "По алфавиту"},
                  {value: "checked", text: "По выполнению"},]}
        onChange={sortList}
      />
      {TodoList_.map((TodoItem, index) => (
        <Todoline
          index={index}
          checked={TodoItem.checked}
          id={TodoItem.key}
          textLine={TodoItem.text}
          key={TodoItem.key}
          remove={remove}
          edit={edit}
          setChecked={setChecked}
        />
      ))}
      <TodoAddline 
        addLine={addLine} 
        value={editItem}
        setTextLine={setEditItem}/>
    </div>
  );
};

export default Todo;
