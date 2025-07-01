export const onlyOwner = (req, res, next) => {
  if (req.user.role !== 'owner') {
    return res.status(403).json({ message: 'Bu əməliyyatı yalnız otel sahibləri edə bilər' });
  }
  next();
};
