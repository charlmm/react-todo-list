import React, { useEffect, useState} from 'react'

const TodoItem = ({ item, setTodoList, todoList, setPending}) => {
 const [checked, setChecked] = useState(null)

 useEffect(() => {
    setChecked(item.completed)
 }, [])
 
 const handleItemComplete = (item) => {
    item.completed = !item.completed
    setChecked(!checked)
    setTodoList([...todoList])
    setPending(todoList.filter((todo) => todo.completed != true).length)
  }
  return (
    <label>
        <input type="checkbox" className='rounded-full w-4 cursor-pointer' onChange={() => {handleItemComplete(item)}}  checked={checked ? 'checked': ''}/>
        <span className={`ml-2 cursor-default ${item.completed && 'line-through'}`}>{item.todo}</span>
    </label>
  )
}

export default TodoItem