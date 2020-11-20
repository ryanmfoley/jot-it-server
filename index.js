const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, { cors: true })
const cors = require('cors')

const { addUser, getUser } = require('./users')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

//______________________________________________________________
// START CONTROLLERS HERE

app.get('/', (req, res) => {
	res.redirect('/api/projects-db')
})

const projectController = require('./controllers/projects')
app.use('/api/projects', projectController)

const taskController = require('./controllers/tasks')
app.use('/api/tasks', taskController)

//______________________________________________________________
// START SOCKET CONNECTION HERE

const onConnect = (socket) => {
	// Listen for name and room sent by client through the 'join' event
	socket.on('join', ({ name, room }) => {
		// Add user
		const user = addUser(socket.id, name, room)

		// Join socket to a given room
		socket.join(user.room)
	})

	// Listen for messages from client
	socket.on('message', (message, clearMessage) => {
		const user = getUser(socket.id)

		if (user.name) {
			io.in(user.room).emit('message', {
				user: user.name,
				message: user.message,
			})
		}

		clearMessage()
	})
}

// Listen for connection event
io.on('connection', onConnect)

//______________________________________________________________

// app.set('port', process.env.PORT || 8000)

const PORT = process.env.PORT || 8000

// app.listen(app.get('port'), () => {
// 	console.log(`Running PORT: ${app.get('port')}`)
// })

server.listen(PORT, () => console.log('Server running on port 8000'))
