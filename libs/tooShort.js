class TooShort extends Error {
  constructor(message) {
    super(message);
    this.name = 'TooShort';
    this.status = 403;
  }
}

module.exports = TooShort;
