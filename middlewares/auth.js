const jwt = require('jsonwebtoken');
const userAuthToken = process.env.ZAHRA_SECRET_TOKEN;

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, userAuthToken);
    req.userData = { userId: decodedToken.userId, role: decodedToken.role };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentification échouée !' });
  }
};

module.exports.checkAdmin = (req, res, next) => {
  if (req.userData.role !== 'admin') {
    return res.status(403).json({ message: 'Accès interdit, administrateurs uniquement !' });
  }
  next();
};
