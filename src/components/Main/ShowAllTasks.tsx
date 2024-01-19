import React from "react";
import { TaskType } from "../../types/TaskType";
import Task from "./Task";
import './tasks.css'

const ShowAllTasks: React.FC<{tasks: TaskType[]}> = ({tasks}) => {

    return(
        <div
            className="TasksHolder"
        >
            {tasks.map(item => <Task task={item}/>)}
        </div>
    )
}

export default ShowAllTasks