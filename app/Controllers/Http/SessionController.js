"use strict";

class SessionController {
  async create({ request, auth }) {
    const { email, password } = request.all();

    const token = await auth.attempt(email, password);

    return token;
  }

  async getUser({ auth, response }) {
    try {
      return await auth.getUser();
    } catch (error) {
      response.send("Missing or invalid jwt token");
    }
  }
}

module.exports = SessionController;
