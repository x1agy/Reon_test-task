import React, { useState } from "react";
import './header.css'

const Header: React.FC<{tasksData: {tasksCount: number, expiredTasks: number}}> = ({tasksData}) => {
    
    const tasksCount = tasksData?.tasksCount;
    const expiredTasksCount = tasksData?.expiredTasks;
    const activeTasksCount = tasksCount - expiredTasksCount;

    return(
        <div
            className="Header"
        >
            <h1>To Do App</h1>
            <div className="statHolder">
                <p>tasks count: {tasksCount}</p>
                <p>expired tasks count: {expiredTasksCount}</p>
                <p>active tasks count: {activeTasksCount}</p>
            </div>
        </div>
    )
}

export default Header;