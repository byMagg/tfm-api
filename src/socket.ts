import { io } from '.'
import { Message } from './models/Message'

io.on('connection', async (socket) => {
  socket.on('join', async (userId) => {
    socket.join(userId)
    console.log(`Usuario ${userId} se unió a su sala privada`)
    try {
      const messages = await Message.find({
        $or: [{ from: userId }, { to: userId }],
      }).sort({ timestamp: 1 })
      socket.emit('previousMessages', messages)
    } catch (error) {}
  })

  socket.on('message', async ({ content, from, to }) => {
    try {
      const newMessage = new Message({
        content,
        from,
        to,
      })
      await newMessage.save()

      io.to(to).to(from).emit('message', newMessage)
    } catch (error) {
      console.log(error)
    }
  })

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id)
  })
})
