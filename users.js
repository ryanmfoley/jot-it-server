const users = []

const addUser = (id, name, room) => {
	const user = { id, name, room }

	users.push(user)

	return user
}

const getUser = (id) => users.find((user) => user.id === id)

// const removeUser = (id) => {
// 	if (users.length) {
// 		return users.filter((user) => user.id !== id)
// 	}
// }

module.exports = { addUser, getUser }
