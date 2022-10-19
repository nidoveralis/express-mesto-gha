class ErrorNotFound extends Error {
  constructor(text) {
    super(text);
    this.errorMessage = {message: text};
    console.log(this.errorMessage)
    this.statusCode = 404;
  }
}

module.exports = ErrorNotFound;