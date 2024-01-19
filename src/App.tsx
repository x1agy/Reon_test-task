import React from 'react';
import Header from './components/Header/Header';
import { TaskType } from './types/TaskType';
import './assest/app.css'
import AddTaskInput from './components/AddTaskInput/AddTaskInput';
import AddTaskModal from './components/AddTaskModal/AddTaskModal';
import Alert from './components/Alert/Alert';
import { useSelector } from 'react-redux';
import { RootState } from './state/store';
import ShowAllTasks from './components/Main/ShowAllTasks';

function App() {

  const [allTasks, setAllTasks] = React.useState<TaskType[]>([]);
  const [tasksData, setTasksData] = React.useState<any>();
  const fetchNewData = useSelector((state: RootState) => state.addTaskModal.isOpen);
  const isAlertOpen = useSelector((state: RootState) => state.alert.isOpen)

  React.useEffect(() => {
    fetch('http://localhost:5000/getTasks')
      .then(response => response.json())
      .then((data) => {
        setAllTasks(data.allTasks);
        //@ts-ignore
        let expiredTasks = 0 
        data.allTasks.map((task: TaskType) => {
          if(new Date().getTime() > (task.createdTime + Number(task.expectedCompletedTime) * 3600)){
            if(task.expectedCompletedTime !== null){
              return expiredTasks++
            }
          }
        })
        setTasksData({
          tasksCount: data.allTasks.length,
          expiredTasks: expiredTasks
        })
      })
  }, [fetchNewData, isAlertOpen])
  console.log(allTasks)

  return (
    <div className="App">
      <Header 
        //@ts-ignore
        tasksData={tasksData}
      />
      <AddTaskInput />
      <AddTaskModal />
      <Alert />
      <ShowAllTasks 
        tasks={allTasks}
      />
    </div>
  );
}

export default App;
