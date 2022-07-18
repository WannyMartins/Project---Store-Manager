const middlewareError = (err, _req, res, _next) => {
  const { message } = err;
  if (err) return res.status(err.status).json({ message });
  res.status(500).json(' Internal Server Error');
};

module.exports = middlewareError; 