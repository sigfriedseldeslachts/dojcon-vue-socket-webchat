const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)

/**
 * Send webpage
 */
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
    console.log('A user has connected')

    socket.on('message', (message) => {
        console.log('Message: ', message)

        io.emit('message', message)
    })

    socket.on('disconnect', () => {
        console.log('A user has disconnected')
    })
})

http.listen(3333, () => {
    console.log('Listening on *:3333')
})