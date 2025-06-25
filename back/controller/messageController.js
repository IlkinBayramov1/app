import Message from '../models/message.js';

// Yeni mesaj göndər
export const sendMessage = async (req, res) => {
  try {
    const { sender, receiver, content } = req.body;

    const newMessage = await Message.create({ sender, receiver, content });
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ message: 'Mesaj göndərilərkən xəta baş verdi' });
  }
};

// İki istifadəçi arasında mesajları gətir
export const getMessages = async (req, res) => {
  try {
    const { senderId, receiverId } = req.query;

    const messages = await Message.find({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Mesajlar alınarkən xəta baş verdi' });
  }
};
