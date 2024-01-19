import React from "react";
import { TaskType } from "../../types/TaskType";
import './tasks.css'
import { useDispatch } from "react-redux";
import { changeAlertState, fillAlert } from "../../state/alertSlice/alertSlice";

const Task: React.FC<{task: TaskType}> = ({task}) =>{
    const [isAccordionOpen, setIsAccordionOpen] = React.useState<boolean>(false);
    const isTaskExpired = new Date().getTime() > task.createdTime + Number(task.expectedCompletedTime) * 3600;
    const taskExpiresTime = (task.createdTime + Number(task.expectedCompletedTime) * 3600 - new Date().getTime()) / 3600 / 60 / 60;
    const dispatch = useDispatch()

    const deleteTask = () => {
        fetch('http://localhost:5000/deleteTask', {
            method: 'DELETE',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                taskId: task.id
            })
        }).then(response => response.json())
            .then(status => {
                dispatch(fillAlert(status.status))
                dispatch(changeAlertState())
                setTimeout(() => {
                    dispatch(changeAlertState())
                }, 3000)
            })
    }

    return(
        <div
            className="Task"
            onClick={() => setIsAccordionOpen(prev => !prev)}
        >
            <h1 className="taskTitle">{task.title} <small>{task.expectedCompletedTime !== null ? isTaskExpired ? 'that task expired :(' : `task expires after ${(taskExpiresTime + '').slice(0, 4)}h.` : ''}</small></h1>
            <div className="taskAccordion"
                style={{
                    display: isAccordionOpen ? 'flex' : 'none'
                }}
            >
                {task.description || 'task dont have description'}
                <div className="taskButtonsHolder">
                    <button
                        className="deleteButton"
                        onClick={() => deleteTask()}
                    >DELETE</button>
                    <button
                        className="closeButton"
                    >CLOSE</button>
                </div>
            </div>
        </div>
    )
}

export default Task