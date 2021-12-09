import React, { useState } from "react";
import Todo from "./ToDoList/Todo";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Todo
        TodoList={[{ text: "Купить чива" }, { text: "Купить пипсов" }]}
        Max_Width="600"
      />
    </div>
  );
}

export default App;
