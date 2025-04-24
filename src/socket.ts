import { io } from '.'
import { Message } from './models/Message'

const getRoomId = ({ from, to }: { from: string; to: string }) => {
  return [from, to].sort().join('-')
}

io.on('connection', async (socket) => {
  socket.on('join', async ({ from, to }) => {
    const roomId = getRoomId({ from, to })

    socket.join(roomId)
    try {
      const messages = await Message.find({
        $or: [
          { from, to },
          { from: to, to: from },
        ],
      }).sort({ timestamp: 1 })

      socket.emit('previousMessages', messages)
    } catch (error) {
      console.log(error)
    }
  })

  socket.on('message', async ({ content, from, to }) => {
    try {
      const newMessage = new Message({
        content,
        from,
        to,
      })
      await newMessage.save()

      io.to(getRoomId({ from, to })).emit('message', newMessage)
    } catch (error) {
      console.log(error)
    }
  })

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id)
  })
})
