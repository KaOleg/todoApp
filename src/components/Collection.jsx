import React from 'react'
import Todos from './Todos'
function Collection(props) {
  return (
    <div className='collection'>
      <h2>My Todos</h2>
      <Todos updateTodo = {props.updateTodo} deleteTodo = {props.deleteTodo} doneToDo = {props.doneToDo} todos={props.todos}/>
    </div>
  )
}

export default Collection