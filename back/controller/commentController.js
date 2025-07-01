import Comment from '../models/comment.js';
import Hotel from '../models/hotel.js';

// Yeni yorum əlavə et
export const addComment = async (req, res) => {
  try {
    const { hotelId, userId, content, rating } = req.body;

    // 1. Comment yarat
    const newComment = await Comment.create({
      hotel: hotelId,
      user: userId,
      content,
      rating,
    });

    // 2. Otelin bütün yorumlarını tap
    const comments = await Comment.find({ hotel: hotelId });

    // 3. Ortalamanı hesabla
    const avgRating =
      comments.reduce((acc, c) => acc + c.rating, 0) / comments.length;

    // 4. Otelin ratingini yenilə
    await Hotel.findByIdAndUpdate(hotelId, { rating: avgRating.toFixed(1) });

    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ message: 'Yorum əlavə edilərkən xəta baş verdi', error: err.message });
  }
};

// Otelin bütün yorumlarını gətir
export const getCommentsByHotel = async (req, res) => {
  try {
    const hotelId = req.params.hotelId;

    const comments = await Comment.find({ hotel: hotelId })
      .populate('user', 'username') // username-ə görə doldurmaq üçün
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Yorumlar alınarkən xəta baş verdi', error: err.message });
  }
};
