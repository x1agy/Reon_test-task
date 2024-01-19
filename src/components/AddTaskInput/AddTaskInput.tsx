import React from "react";
import './addTaskInput.css';
import { BsArrowDown } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { changeTitle, openModal } from "../../state/addTaskModal/addTaskModalSlice";
import { changeAlertState, fillAlert } from "../../state/alertSlice/alertSlice";

const AddTaskInput = () => {

    const [isInputExpanded, setIsInputExpanded] = React.useState<boolean>(false)
    const [inputValue, setInputValue] = React.useState<string>('')
    const dispatch = useDispatch();

    return(
        <div
            className="AddTaskInputHolder"
        >
            <div
                className="AddTaskInput"
                style={{
                    height: isInputExpanded ? '40px' : '0px'
                }}
                
            >
                {inputValue}
                <input type="text" 
                    style={{
                        display: isInputExpanded ? 'block' : 'none'
                    }}
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                />
                <BsArrowDown 
                    className="addTaskInput_expandIcon"
                    style={{
                        rotate: isInputExpanded ? '0deg' : '180deg'
                    }}
                    onClick={() => setIsInputExpanded(prev => !prev)}
                />
            </div>
            <button
                onClick={() => {
                    if(inputValue.length < 3){
                        setIsInputExpanded(true)
                        dispatch(fillAlert('fill task title field'))
                        dispatch(changeAlertState())
                        setTimeout(() => {
                            dispatch(changeAlertState())
                        }, 3000)
                    }else{
                        dispatch(changeTitle(inputValue))
                        dispatch(openModal())
                        setInputValue('')
                        if(isInputExpanded){
                            setIsInputExpanded(false)
                        }
                    }
                }}
            >add new task</button>
        </div>
    )
}

export default AddTaskInput;