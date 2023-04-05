import React, { useEffect, useRef, useState } from 'react'
import './App.css'

function AddTodo() {
    const [todo, setTodo] = useState('')
    const [isEdit, setIsEdit] = useState(false)
    const [editIndex, setEditIndex] = useState(null)
    const [todoList, setTodoList] = useState(JSON.parse(localStorage.getItem('todos')) || [])
    const [filtertodo,setFilterTodo] = useState(todoList)
    const inputRef = useRef()
    const submitRef = useRef();

    useEffect(() => {
        JSON.parse(localStorage.getItem('todos'))
    }, [todoList])


    // Add Todo Function //

    function handleAddTodo(event) {
        event.preventDefault();
        if (isEdit) {
            setIsEdit(false)
            todoList[editIndex].todo = todo;
            inputRef.current.value = ""
            setTodoList(todoList);
        }
        else {
            if (todoList.length === 0) {
                setTodoList([{
                    id: Date.now(),
                    todo: todo,
                }])
            }
            else {
                let todoItem = {
                    id: Date.now(),
                    todo: todo,
                }
                setTodoList([...todoList, todoItem])
            }
            inputRef.current.value = ""
        }
    }
    localStorage.setItem('todos', JSON.stringify(todoList))

    // function for delete todo //

    function handleDelete(id) {
        setTodoList(todoList.filter((ele) => {
            return ele.id !== id
        }))
    }

    // function for Edit todo //
    function handleEdit(id) {
        todoList.find((ele, index) => {
            if (ele.id === id) {
                setEditIndex(index)
                inputRef.current.value = ele.todo;
                setIsEdit(true)
            };
            return ele.id === id
        })
        submitRef.current.value = 'Edit';
    }

    //function for search todo //

    const handleSearch = (search) => {
        let dataList = todoList
        setFilterTodo(dataList)
        let filteredTodo = todoList.filter((ele)=>{
            return ele.todo === search.toUpperCase()
        })
        setTodoList(filteredTodo)
        if(search === ""){
            setTodoList(filtertodo)
        }
        else{
            setTodoList(dataList)
        }
    }


    return (
        <div className='todo-cont'>
        <h1>List Out Your Todos</h1>
            <div className="addTodoCont">
                <form className='form' >
                    <input type="text" name="todo" id="todo" ref={inputRef} onChange={(e) => setTodo((inputRef.current.value).toUpperCase())} />
                    <input type="Submit" name="submit" id="submit" value="➕" ref={submitRef} onClick={(e) => handleAddTodo(e)} />
                </form>
            </div>

            <div className="renderTodoCont">
                <div>
                <div className="search">
                    <h2>Pending Todos</h2>
                    <input type="text"  placeholder='Search Your Todo...' onBlur={(e)=>handleSearch(e.target.value)}/>
                </div>
                    {
                        todoList.map((ele) => {
                            return (
                                <div className="singleTodo" key={ele.id}>
                                    <div className="todo">{ele.todo}</div>
                                    <div className="action">
                                        <span className='editTodo'><i className="fa-solid fa-pen-to-square" onClick={() => handleEdit(ele.id)} ></i></span>
                                        <span className='deleteTodo'><i className="fa-solid fa-trash-can" onClick={() => handleDelete(ele.id)}></i></span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default AddTodo