class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.name = BadRequest;
    this.status = 403;
  }
}
module.exports = BadRequest;
