const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(bodyParser.json())

const allTasks = [{
    title: 'test',
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore et voluptatibus quidem possimus, beatae ad. Voluptatibus possimus, sequi expedita quod nam illo molestiae exercitationem, soluta perspiciatis harum ab. Officiis, corrupti?",
    createdTime: new Date().getDate(),
    expectedCompletedTime: new Date().getDate() + 3600,
    isCompleted: false,
    id: Date.now(),
}]

app.post('/addTask', (req, res) => {
    console.log(req.body)
    const { taskData } = req.body;

    allTasks.push(taskData);
    res.json({ status: 'completed' })
})

app.post('/editTask', (req, res) => {
    const { editedTaskData } = req.body;
    const taskIndex = allTasks.findIndex(item => item.id === editedTaskData.id)

    allTasks[taskIndex] = editedTaskData;
    res.json({ status: 'completed' })
})

app.delete('/deleteTask', (req, res) => {
    const { taskId } = req.body;
    console.log(req.body)

    const taskIndex = allTasks.findIndex(item => item.id === taskId)
    allTasks.splice(taskIndex, 1)
    res.json({ status: 'completed' })
})

app.get('/getTasks', (req, res) => {
    res.json({
        allTasks
    })
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})