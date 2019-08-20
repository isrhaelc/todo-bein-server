"use strict";

const Route = use("Route");

Route.post("/users", "UserController.create");
Route.post("/sessions", "SessionController.create");
Route.get("/sessions", "SessionController.getUser");
Route.resource("todos", "TodoController")
  .apiOnly()
  .middleware("auth");
