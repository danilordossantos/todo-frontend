import { useState } from "react"
import TaskList from "./components/TaskList"

const App = () => {
    const [taskList, setTaskList] = useState([{
        id: 'xpto',
        content: 'whatever',
        done: false,
        priority: 'medium'
    }])

    const [content, setContent] = useState('')

    const [priority, setPriority] = useState('medium')

    const [filter, setFilter] = useState('all')

    const addTask = (e) => {
        e.preventDefault()
        const task = {
            id: Date.now(),
            content: content,
            done: false,
            priority: priority
        }
        setTaskList([...taskList, task])
        setContent('')
    }

    const toggleDone = (id) => {
        const toggleTask = taskList.map(t => {
            if (t.id === id) {
                return { ...t, done: !t.done }
            } else {
                return t
            }
        })
        setTaskList(toggleTask)
    }

    const deleteTask = (id) => {
        const delTask = taskList.filter(t =>
            t.id !== id
        )
        setTaskList(delTask)
    }

    const tasksToShow = taskList.filter(t => {
        if (filter === 'all') {
            return true
        }
        if (filter === 'pending') {
            return t.done === false
        }
        if (filter === 'done') {
            return t.done === true
        }
    }
    )

    return <>
    <button type="button" onClick={() => {
        setFilter('all')
    }}>All</button>
    <button type="button" onClick={() => {
        setFilter('pending')
    }}>Pending</button>
    <button type="button" onClick={() => {
        setFilter('done')
    }}>Done</button>
        <TaskList taskList={tasksToShow}
            onToggle={toggleDone}
            onDelete={deleteTask} />
        <form action="" onSubmit={addTask}>
            <input type="text" value={content} name="content" id="content" onChange={(e) => {
                setContent(e.target.value)
            }} />

            <select name="priority" id="priority" value={priority} onChange={(e) => {
                setPriority(e.target.value)
            }}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>

            <button type="submit">Adicionar tarefa</button>
        </form>
    </>
}

export default App
