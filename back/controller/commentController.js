import Comment from '../models/comment.js';
import Hotel from '../models/hotel.js';

// Yeni yorum əlavə et
export const addComment = async (req, res) => {
  try {
    const { hotelId, content, rating } = req.body;
    const userId = req.user.id; // Token-dən gəlir, təhlükəsizdir

    const newComment = await Comment.create({
      hotel: hotelId,
      user: userId,
      content,
      rating,
    });

    const comments = await Comment.find({ hotel: hotelId });
    const avgRating =
      comments.reduce((acc, c) => acc + c.rating, 0) / comments.length;

    await Hotel.findByIdAndUpdate(hotelId, { rating: avgRating.toFixed(1) });

    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ message: 'Yorum əlavə edilərkən xəta baş verdi', error: err.message });
  }
};



// Yorum sil (yalnız öz şərhini silə bilər)
export const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const userId = req.user.id;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Yorum tapılmadı' });
    }

    if (comment.user.toString() !== userId) {
      return res.status(403).json({ message: 'Bu əməliyyatı etmək üçün səlahiyyətiniz yoxdur' });
    }

    await comment.deleteOne();

    res.status(200).json({ message: 'Yorum silindi' });
  } catch (err) {
    res.status(500).json({ message: 'Yorum silinərkən xəta baş verdi', error: err.message });
  }
};



// Yorum redaktə et (yalnız öz yorumunu redaktə edə bilər)
export const updateComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const userId = req.user.id;
    const { content, rating } = req.body;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Yorum tapılmadı' });
    }

    if (comment.user.toString() !== userId) {
      return res.status(403).json({ message: 'Bu əməliyyatı etmək üçün səlahiyyətiniz yoxdur' });
    }

    if (content) comment.content = content;
    if (rating) comment.rating = rating;

    await comment.save();

    // Yorum dəyişdi, otelin ortalama reytinqini yenilə
    const allComments = await Comment.find({ hotel: comment.hotel });
    const avgRating =
      allComments.reduce((acc, c) => acc + c.rating, 0) / allComments.length;
    await Hotel.findByIdAndUpdate(comment.hotel, { rating: avgRating.toFixed(1) });

    res.status(200).json({ message: 'Yorum yeniləndi', comment });
  } catch (err) {
    res.status(500).json({ message: 'Yorum yenilənərkən xəta baş verdi', error: err.message });
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
