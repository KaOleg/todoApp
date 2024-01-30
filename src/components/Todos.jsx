import React from "react";
import Todoitem from "./Todoitem";

function Todos(props) {
    return (
        <div className="todos">
            {props.todos.map((todo) => (
                <Todoitem
                    key={todo.id}
                    doneToDo={props.doneToDo}
                    id={todo.id}
                    content={todo.content}
                    done={todo.done}
                    color={todo.color}
                    deleteTodo={props.deleteTodo}
                    updateTodo={props.updateTodo}
                />
            ))}
        </div>
    );
}

export default Todos;
