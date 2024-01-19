import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import './alert.css'

const Alert = () => {

    const isOpen = useSelector((state: RootState) => state.alert.isOpen);
    const alertBody = useSelector((state: RootState) => state.alert.alertMessage)

    return(
        <div
            className="Alert"
            style={{
                opacity: isOpen ? '100%' : '0%'
            }}
        >
            {alertBody}
        </div>
    )
}

export default Alert