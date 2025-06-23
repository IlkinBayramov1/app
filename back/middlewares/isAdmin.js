export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next(); // icazə ver
  } else {
    res.status(403).json({ message: 'Bu əməliyyatı yalnız admin edə bilər' });
  }
};
