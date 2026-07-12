import Task from "./Task"

const TaskList = ({ taskList, onToggle, onDelete }) => {
    return <ul>
        {taskList.map(t => {
            return <Task key={t.id}
                id={t.id}
                content={t.content}
                priority={t.priority}
                done={t.done}
                onToggle={onToggle}
                onDelete={onDelete}
            />
        })}
    </ul>
}

export default TaskList