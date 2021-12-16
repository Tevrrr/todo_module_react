import React, { useState } from "react";
import Todo from "./ToDoList/Todo";
import "./App.css";

function App() {
    return (
        <div className="App">
            <Todo TodoList={[]} />
        </div>
    );
}

export default App;
