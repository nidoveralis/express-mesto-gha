module.exports = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = status === 500 ? 'Насерверепроизошла ошибка' : err.message;

  res.status(status).send({ message });
  next();
};
