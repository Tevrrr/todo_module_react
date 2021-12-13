import React, { useState, useMemo } from "react";
import Todoline from "./TodoLine";
import TodoAddline from "./TodoAddLine";
import NavBar from "./NavBar";
import styles from "./styles.module.css";

const Todo = ({ TodoList }) => {
  const [TodoList_, setTodoList_] = useState(
    TodoList.map((item,i) => {
    item.key = Date.now()-(TodoList.length-i+1)*1000;
    return item
  }));
  const [filter, setFilter] = useState({option: '', query: ''});


  const sortedTodoList = useMemo(() => {
      return [...TodoList_].sort((a,b) =>{
        if(typeof a[filter.option] == "string") return a[filter.option].localeCompare(b[filter.option]);
        else if(typeof a[filter.option]== "boolean"){
            if(!a[filter.option] && b[filter.option])return -1;
          } 
        else {
          if(a[filter.option] < b[filter.option]) return -1;
          else if(a[filter.option] > b[filter.option]) return 1;
          else return 0;
        }})
  }, [TodoList_, filter.option])

  const sortedAndSearchedTodoList = useMemo(() => {
      return sortedTodoList.filter(item => {
          if(!filter.query) return item;
          else if(item.text.toLowerCase().includes(filter.query.toLowerCase()))
            return item;
      })

  }, [sortedTodoList, filter.query])
  const [editItem, setEditItem] = useState("");
  function remove(index) {
    setTodoList_(TodoList_.filter((p, i) =>i !==index));
  };
  function edit(index) {
    remove(index);
    setEditItem(TodoList_[index].text);
  };
  function setChecked(id) {
    setTodoList_(TodoList_.map((item) =>{
      if(item.key ===id)  item.checked=!item.checked;
      console.log(id+':'+ item.checked)
      return item;
    }));
  }
  function addLine(text) {
    setTodoList_([...TodoList_, {text: text, key: Date.now(), checked: false}])
  }
  return (
    <div  className={styles.Todo}>
      <NavBar
        defaltValue = "Сортировать"
        options={[{value: "key", text: "По id"},
                  {value: "text", text: "По алфавиту"},
                  {value: "checked", text: "По выполнению"},]}
        filter={filter}
        setFilter={setFilter}
        />
      {sortedAndSearchedTodoList.map((TodoItem, index) => (
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
