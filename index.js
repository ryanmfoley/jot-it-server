const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())


//______________________________________________________________
// START CONTROLLERS HERE

app.get('/', (req, res) => {
    res.redirect('/api/projects-db')
});

const projectController = require('./controllers/projects')
app.use('/api/projects', projectController)

// const taskController = require('./controllers/tasks')
// app.use('/api/tasks', taskController)



//______________________________________________________________

app.set('port', process.env.PORT || 8000)

app.listen(app.get('port'), () => {
    console.log(`Running PORT: ${app.get('port')}`);
})