var express = require('express')
var socket = require('socket.io')

var app = express()

var server = app.listen(4000, function() {
    console.log('Listening to requests on port 4000')
})

app.use(express.static('public'))

//socket setup
var io = socket(server)

io.on('connection', function(socket) {
    console.log('socket connected')

    //socket listens on 'chat' sent from UI 
    socket.on('chat', function(data) {
        io.sockets.emit('chat', data)
    })
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data)
    })
})
