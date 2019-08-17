"use strict";

const Todo = use("App/Models/Todo");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with todos
 */
class TodoController {
  /**
   * Show a list of all todos.
   * GET todos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index() {
    const todos = Todo.all();

    return todos;
  }

  /**
   * Create/save a new todo.
   * POST todos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ auth, request, response }) {
    const { id } = auth.user;

    const data = request.only(["title", "description", "state"]);

    const todo = await Todo.create({ ...data, user_id: id });

    return todo;
  }

  /**
   * Display a single todo.
   * GET todos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params }) {
    const todo = await Todo.findOrFail(params.id);

    return todo;
  }

  /**
   * Update todo details.
   * PUT or PATCH todos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const todo = await Todo.findOrFail(params.id);

    const data = request.only(["title", "description", "state"]);

    todo.merge(data);

    await todo.save();

    return todo;
  }

  /**
   * Delete a todo with id.
   * DELETE todos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, auth, response }) {
    const todo = await Todo.findOrFail(params.id);

    if (todo.user_id !== auth.user.id) {
      return response.status(401).send({ error: "Not authorized" });
    }
    await todo.delete();
  }
}

module.exports = TodoController;
