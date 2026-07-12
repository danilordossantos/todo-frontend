const Task = ({ id, content, done, priority, onToggle, onDelete }) => {
    return <li>
        content: {content},
        priority: {priority}
        <input type="checkbox" name="done" id="" checked={done} onChange={() => onToggle(id)}/>
        <input type="button" value="delete" onClick={()=> onDelete(id)}/>
    </li>
}

export default Task