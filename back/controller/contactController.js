import Contact from '../models/contact.js';

// ✅ Mesaj göndər (istifadəçi)
export const sendContactMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newMessage = new Contact({ name, email, message });
    await newMessage.save();

    res.status(201).json({ message: 'Mesaj uğurla göndərildi' });
  } catch (err) {
    res.status(500).json({ message: 'Mesaj göndərilə bilmədi', error: err.message });
  }
};

// ✅ Bütün mesajları al (admin panel üçün)
export const getAllMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Mesajlar alınmadı', error: err.message });
  }
};

// ✅ Mesajı “görülmüş” işarələ
export const markAsSeen = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { seen: true },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ message: 'Mesaj tapılmadı' });
    }

    res.status(200).json({ message: 'Mesaj görüldü olaraq işarələndi', contact });
  } catch (err) {
    res.status(500).json({ message: 'Xəta baş verdi', error: err.message });
  }
};
