import React from 'react';
import TodoListItem from '../todo-list-item/todo-list-item';
import './todo-list.css'

const TodoList = ({todos, onAppDeleted, onToggleImportant, onToggleDone}) => {

    return (
        <ul className='list-group todo-list'>
            {todos.map(function (item) {
                const {id, ...itemProps} = item;
                return <li key={id} className='list-group-items'>
                    <TodoListItem {...itemProps}
                                   onDeleted = {()=>onAppDeleted (id)}
                                  onTogImportant={()=>onToggleImportant(id)}
                                  onTogDone={()=>onToggleDone(id)}
                    />
                </li>
            })}
        </ul>
    )
};
export default TodoList;

