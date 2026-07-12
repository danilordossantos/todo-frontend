import { useState } from "react"

const App = () => {
    const [taskList, setTaskList] = useState([{
        id: 'xpto',
        content: 'whatever',
        done: false,
        priority: 'medium'
    }])

    return <></>
}

export default App
