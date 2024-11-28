const roleMiddleware = (requiredRoles) => (req, res, next) => {
    if (!req.id || !requiredRoles.includes(parseInt(req.role))) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  }
  
  export default roleMiddleware;