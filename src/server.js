import { Server, Model, RestSerializer } from "miragejs";
import {
  loginHandler,
  signupHandler,
} from "./backend/controllers/AuthController";
import {
  addTodoTaskToTodoTasks,
  getTodoTasksHandler,
  removeTodoTaskFromTodoTasks,
  updateTodoTaskFromTodoTasks,
} from "./backend/controllers/TodoTasksController";
import { users } from "./backend/db/users";

export function makeServer({ environment = "development" } = {}) {
  return new Server({
    serializers: {
      application: RestSerializer,
    },
    environment,
    // TODO: Use Relationships to have named relational Data
    models: {
      todoTask: Model,
      user: Model,
    },

    // Runs on the start of the server
    seeds(server) {
      server.logging = false;
      users.forEach((item) =>
        server.create("user", {
          ...item,
          todoTasks: [],
        })
      );
    },

    routes() {
      this.namespace = "api";
      // auth routes (public)
      this.post("/auth/signup", signupHandler.bind(this));
      this.post("/auth/login", loginHandler.bind(this));

      // todo-tasks routes (private)
      this.get("/user/todotasks", getTodoTasksHandler.bind(this));
      this.post("/user/todotasks", addTodoTaskToTodoTasks.bind(this));
      this.post(
        "/user/todotasks/:todoTaskId",
        updateTodoTaskFromTodoTasks.bind(this)
      );
      this.delete(
        "/user/todotasks/:todoTaskId",
        removeTodoTaskFromTodoTasks.bind(this)
      );
    },
  });
}
