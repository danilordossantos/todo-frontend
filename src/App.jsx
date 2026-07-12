import { useState } from "react"

const App = () => {
    const [taskList, setTaskList] = useState([{
        id: 'xpto',
        content: 'whatever',
        done: false,
        priority: 'medium'
    }])

    const [content, setContent] = useState('')

    const [priority, setPriority] = useState('medium')

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

    return <>
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
