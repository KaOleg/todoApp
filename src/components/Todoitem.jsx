import React from "react";

function Todoitem(props) {
    return (
        <div style={{backgroundColor: props.color}} className={"toDoItem " + (props.done == true ? "done": "")}>
            <p>{props.content}</p>
            <div>
                <button onClick={()=>props.updateTodo(props.id)}>edit</button>
                <button onClick={()=>props.deleteTodo(props.id)}>delete</button>
                <button onClick={()=>props.doneToDo(props.id)}>done</button>
            </div>
        </div>
    );
}

export default Todoitem;
