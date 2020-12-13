const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, { cors: true })
const cors = require('cors')

const {
	User,
	addUser,
	getCurrentUser,
	removeUser,
	getUsersInRoom,
} = require('./users')

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
	socket.on('joinRoom', async ({ name, room }) => {
		// const newName = name.trim().toLowerCase()
		// const newRoom = room.trim().toLowerCase()

		// if (name && room) {
		// Create User
		let user = await new User(socket.id, name, room)
		console.log('user', user)

		// Add user to list or users
		addUser(user)
		// Join socket to a given room
		socket.join(user.room)

		// Welcome current user
		socket.emit('chat-message', {
			user: 'admin',
			text: 'Welcome to ProjectChat!',
		})

		// // Notify other clients a new user has joined
		socket.broadcast.to(user.room).emit('chat-message', {
			user: 'admin',
			text: `${user.name} has joined!`,
		})

		const users = await getUsersInRoom(user.room)
		console.log('users', users)

		// Send room info to the channel that the client is in
		io.to(user.room).emit('usersInRoom', { users })
		// }
	})

	// Listen for messages from client
	socket.on('send-chat-message', async (message, clearMessage) => {
		const user = await getCurrentUser(socket.id)
		// console.log(user)
		if (user) {
			// Send messages to current users room
			io.to(user.room).emit('chat-message', {
				user: user.name,
				text: message,
			})
		}

		clearMessage()
	})

	// Runs when client disconnects
	socket.on('user-disconnected', () => {
		const user = removeUser(socket.id)

		if (user) {
			socket.broadcast.to(user.room).emit('chat-message', {
				user: 'admin',
				text: `${user.name} has left the chatroom`,
			})

			const users = getUsersInRoom(user.room)

			// Send users and room info to client
			io.to(user.room).emit('user-disconnected', users)
		}
	})
}

// Run when client connects
io.on('connection', onConnect)

//______________________________________________________________

const PORT = process.env.PORT || 8000

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
