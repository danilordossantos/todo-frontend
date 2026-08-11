import { useState } from "react"
import TaskList from "./components/TaskList"
import Notification from "./components/Notification"
import { useEffect } from "react"
import taskService from "./services/tasks"

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

    const [notification, setNotification] = useState(null
    )

    useEffect(() => {
        taskService.getAll().then(taskList => {
            setTaskList(taskList)
        })
    }, [])

    const showNotification = (message, type) => {
        setNotification({ message, type })
        setTimeout(() => setNotification(null), 3000)
    }

    const addTask = (e) => {
        e.preventDefault()
        const newTask = {
            content: content,
            done: false,
            priority: priority
        }

        if (content === '') {
            showNotification('Content cannot be empty', 'error')
            return
        }

        taskService.create(newTask).then(task => {
            setTaskList(taskList.concat(task))
        })

        showNotification('Task added', 'success')
        setContent('')
    }

    const toggleDone = (id) => {
        const findTask = taskList.find(t => t.id === id)
        if (!findTask.done) {
            showNotification('Task completed', 'success')
        } else {
            showNotification('Task reopened', 'error')
        }
        const updateDone = { ...findTask, done: !findTask.done }
        taskService.update(id, updateDone).then(updatedTask => setTaskList(taskList.map(t => t.id === updatedTask.id ? updatedTask : t)))

    }

    const deleteTask = (id) => {
        showNotification('Task Deleted', 'success')
        taskService.remove(id).then(() => setTaskList(taskList.filter(t =>
            t.id !== id)))
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
        <Notification message={notification?.message} type={notification?.type} />
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
