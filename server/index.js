import express from 'express'
import { Server } from 'socket.io'

const PORT = process.env.PORT || 3500

const app = express()

const expressServer = app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

const httpServer = createServer()
const io = new Server(httpServer, {
    cors: {
        origin: process.env.NODE_ENV === "production" ? false : ["http://localhost:5500", "http://127.0.0.1:5500"]
    }
})

io.on('connection', socket => {
    console.log(`User ${socket.id} connected`)

    socket.on('message', data => {
        console.log(`${data}`)
        io.emit('message', `${socket.id.substring(0, 5)}: ${data}`)
    })
})

