import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import { BsFillMoonFill, BsMoonFill, BsSunFill } from 'react-icons/bs'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import './index.css'
import TodoItem from './components/TodoItem'

function App() {
  var storedNames = JSON.parse(localStorage.getItem("names")) || null;
  const initialList = [
    {
      "id": "0",
      "todo": "cook",
      "completed": false
    },
    {
      "id": "1",
      "todo": "bake",
      "completed": false
    },
    {
      "id": "2",
      "todo": "code",
      "completed": false
    },
    {
      "id": "3",
      "todo": "call",
      "completed": false
    },
    {
      "id": "4",
      "todo": "prep",
      "completed": false
    }
  ]

  const [theme, setTheme] = useState(null)
  const [todoList, setTodoList] = useState(initialList)
  const [pending, setPending] = useState(null)
  const [listState, setListState] = useState('all')
  const [showList, setShowList] = useState([])
  const [inputValue, setInputValue] = useState({
    "id": todoList.length,
    "todo": "",
    "completed": false
  })

  useEffect(() => {
      if(window.matchMedia('(prefers-color-scheme: dark)')
      .matches) {
          setTheme('dark')
      } else {
          setTheme('light')
      }
      if (storedNames) {
        setTodoList(storedNames)
        setPending(todoList.filter((todo) => todo.completed == false).length)
      } else {
        localStorage.setItem("names", JSON.stringify(initialList))
      }
  }, [])

  useEffect(() => {
      if(theme === 'dark') {
          document.documentElement.classList.add('dark')
      } else {
          document.documentElement.classList.remove('dark')
      }
  },[theme])



  useEffect(() => {
    if (listState == 'all'){
      setShowList(todoList)
    } else if (listState == 'active') {
      setShowList(todoList.filter(todo => todo.completed == false))
    } else {
      setShowList(todoList.filter(todo => todo.completed == true))
    }
    setPending(todoList.filter((todo) => todo.completed == false).length)
  }, [listState, todoList])
  
  

  const handleDrop = (droppedItem) => {
    if (!droppedItem.destination) return;
    var updatedList = [...todoList];
    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
    updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
    setTodoList(updatedList);
  };

  const handleThemeSwitch = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const handleInputstate = (e) => {
    setInputValue({...inputValue, completed: e.target.checked})
  }
  const handleInput = (e) => {
    setInputValue({...inputValue, todo: e.target.value})
  }

  const handleKeyEnter = (e) => {
    if (e.key == 'Enter') {
      console.log(inputValue)
      setTodoList([...todoList, inputValue])
      }
  }

  return (
    <div className='h-screen bg-lightGray dark:bg-darkGrayish justify-start items-center text-white m-auto'>
      <div className="md:bg-bgLight bg-bgLightM dark:bg-bgDarkM dark:md:bg-bgDark h-[35vh] md:h-[40vh] bg-cover w-full justify-start items-start"/>
      <div className='flex flex-col mx-auto mt-[-35vh] md:mt-[-40vh] w-5/6 md:w-5/12 pt-10 md:pt-20 bg-transparent'>
          <div className='flex justify-between text-white mb-6'>
            <h2 className='text-2xl  font-normal'>TODO</h2>
            <button type='button' onClick={handleThemeSwitch}>
              {theme == 'dark' ? <BsSunFill />  : <BsMoonFill /> }
            </button>
          </div>
          <div className='w-full rounded-md p-2 bg-white dark:bg-slate-600 h-8 md:h-10 mb-6 flex items-center text-gray-700 dark:text-gray-100'>
            <input type="checkbox" className='rounded-full w-4 cursor-pointer' onChange={handleInputstate}/>
            <input type="text" className='w-full rounded-md  dark:bg-slate-600 pl-2 outline-none' placeholder='Create your Todo' onChange={handleInput} onKeyDown={handleKeyEnter}/>
          </div>
          <div className=' flex flex-col rounded-md text-gray-700 dark:text-gray-100 h-[50vh] md:h-[55vh] mt-2 justify-between dark:bg-slate-600 bg-white '>
            <div>
              
              <DragDropContext onDragEnd={handleDrop}>
                <Droppable droppableId="list-container">
                  {(provided) => (
                    <div
                    className="list-container h-[45vh] md:h-[50vh] overflow-auto"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    > 
                      
                      {showList.map((item, index) => (
                        <Draggable key={item.todo+index} draggableId={item.todo+index} index={index}>
                          {(provided) => (
                            <div
                              className="item-container py-4 px-4 hover:cursor-pointer"
                              ref={provided.innerRef}
                              {...provided.dragHandleProps}
                              {...provided.draggableProps}
                            >
                              <TodoItem item={item} todoList={todoList} setTodoList={setTodoList} setPending={setPending}/>
                              {provided.placeholder}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
            <div className='hidden md:flex  text-xs justify-between items-center py-2'>
              <div className=' px-2'>{pending} left</div>
              <div className=' flex px-2 justify-start'>
                <button className='px-2' onClick={() => setListState('all')}>All</button>
                <button className='px-2' onClick={() => setListState('active')}>Active</button>
                <button className='px-2' onClick={() => setListState('completed')}>Completed</button>
              </div>
              <div className=' px-2'>
                <button onClick={() => {
                  const newTodo = todoList.filter((todo) => todo.completed != true)
                  setTodoList(newTodo)
                }}>Clear completed</button>
              </div>
            </div>
          </div>
          <div className='flex md:hidden justify-center text-xs md:text-sm text-slate-600 dark:text-white mt-1 p-2'>
            <p className=' p-1'>{pending} left</p>
            <div className=' flex p-1 px-2 mx-1 justify-start'>
              <button className='px-1' onClick={() => setListState('all')}>All</button>
              <button className='px-1' onClick={() => setListState('active')}>Active</button>
              <button className='px-1' onClick={() => setListState('completed')}>Completed</button>
            </div>
            <p className=' p-1'>
                <button onClick={() => {
                  const newTodo = todoList.filter((todo) => todo.completed != true)
                  setTodoList(newTodo)
                }}>Clear completed</button>
              </p>
          </div>
          <p className=' flex text-xs md:text-sm w-full my-auto justify-center py-4'>Drag and drop to reorder list</p>
        </div>
    </div>
  )
}

export default App
