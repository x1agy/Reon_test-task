import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import './addTaskModal.css'
import { changeAlertState, fillAlert } from "../../state/alertSlice/alertSlice";
import { openModal } from "../../state/addTaskModal/addTaskModalSlice";

const AddTaskModal: React.FC = () => {
    const title = useSelector((state: RootState) => state.addTaskModal.title);
    const [desription, setDescription] = React.useState<string>();
    const [expectedCompletTime, setExpectedCompletTime] = React.useState<string>();
    const addTaskLink = 'http://localhost:5000/addTask';
    const [count, setCount] = React.useState(0);

    const timeRegexp = /(\d\d):(\d\d)/g

    const dispatch = useDispatch();

    const isOpen = useSelector((state: RootState) => state.addTaskModal.isOpen);

    React.useEffect(() => {
        setCount(prev => prev++)
    }, [isOpen])

    async function addNewTask(){
        const taskData = {
            title: title,
            description: desription ? desription : null,
            createdTime: new Date().getTime(),
            expectedCompletedTime: expectedCompletTime ? expectedCompletTime?.replace(timeRegexp, (match, p1, p2) => {return (Number(p1) * 3600 + Number(p2) * 60) + ''}) : null,
            isCompleted: false,
            id: Date.now(),
        }
        try{
            const response = await fetch(addTaskLink, {
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({
                    taskData
                })
            });
        }catch (e) {
            dispatch(fillAlert(`error while adding task ${e}`))
            dispatch(changeAlertState())
            setTimeout(() => {
                dispatch(changeAlertState())
            }, 5000)
        }
    }

    return(
        <div
            style={{
                display: isOpen ? 'flex' : 'none',
            }}
            className="AddTaskModalHolder"
        >
            <div
                className="AddTaskModalBackground"
            >
            </div>
            <div
                className="AddTaskModal"
            >
                <h1>what you need To Do?</h1>
                <input type="text" value={title} disabled placeholder="Task title"/>
                <input type="text" value={desription} onChange={(e) => setDescription(e.target.value)} placeholder="Task description"/>
                <input type="time" value={expectedCompletTime} onChange={(e) => setExpectedCompletTime(e.target.value)} />
                <button
                    onClick={() => {
                        addNewTask();
                        setDescription(undefined);
                        setExpectedCompletTime(undefined);
                        dispatch(openModal())
                    }}
                >done</button>
            </div>

        </div>
    )
}

export default AddTaskModal