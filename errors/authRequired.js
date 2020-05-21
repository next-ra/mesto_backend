class authRequired extends Error {
  constructor(message) {
    super(message);
    this.name = 'authRequired';
    this.status = 403;
  }
}
module.exports = authRequired;
