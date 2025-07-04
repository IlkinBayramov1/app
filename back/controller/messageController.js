import Message from '../models/message.js';

// Yeni mesaj göndər
export const sendMessage = async (req, res) => {
  try {
    const { receiver, content } = req.body;
    const sender = req.user.id; // token-dən gəlir

    const newMessage = await Message.create({ sender, receiver, content });
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ message: 'Mesaj göndərilərkən xəta baş verdi', error: err.message });
  }
};


// İki istifadəçi arasında mesajları gətir
export const getMessages = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const { otherUserId } = req.query;

    const messages = await Message.find({
      $or: [
        { sender: currentUserId, receiver: otherUserId },
        { sender: otherUserId, receiver: currentUserId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Mesajlar alınarkən xəta baş verdi', error: err.message });
  }
};

