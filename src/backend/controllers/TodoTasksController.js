import { Response } from "miragejs";
import { requiresAuth } from "../utils/authUtils";

/**
 * All the routes related to Liked Videos are present here.
 * These are private routes.
 * Client needs to add "authorization" header with JWT token in it to access it.
 * */

/**
 * This handler handles getting videos from user's likes.
 * send GET Request at /api/user/likes
 * */
export const getTodoTasksHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    return new Response(200, {}, { todoTasks: user.todoTasks });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles adding videos to user's likes.
 * send POST Request at /api/user/likes
 * body contains {video}
 * */

export const addTodoTaskToTodoTasks = function (schema, request) {
  const user = requiresAuth.call(this, request);
  if (user) {
    const { todoTask } = JSON.parse(request.requestBody);
    if (user.todoTasks.some((item) => item._id === todoTask._id)) {
      return new Response(
        409,
        {},
        {
          errors: ["The todo task is already in your todo tasks"],
        }
      );
    }
    user.todoTasks.push(todoTask);
    return new Response(201, {}, { todoTasks: user.todoTasks });
  }
  return new Response(
    404,
    {},
    {
      errors: ["The email you entered is not Registered. Not Found error"],
    }
  );
};

/**
 * This handler handles removing videos from user's likes.
 * send DELETE Request at /api/user/likes/:videoId
 * */

export const removeTodoTaskFromTodoTasks = function (schema, request) {
  const user = requiresAuth.call(this, request);
  if (user) {
    const todoTaskId = request.params.todoTaskId;
    const filteredTodoTasks = user.todoTasks.filter(
      (item) => item._id !== todoTaskId
    );
    this.db.users.update({ todoTasks: filteredTodoTasks });
    return new Response(200, {}, { todoTasks: filteredTodoTasks });
  }
  return new Response(
    404,
    {},
    { errors: ["The user you request does not exist. Not Found error."] }
  );
};

/**
 * This handler handles removing videos from user's likes.
 * send DELETE Request at /api/user/likes/:videoId
 * */

export const updateTodoTaskFromTodoTasks = function (schema, request) {
  const user = requiresAuth.call(this, request);
  if (user) {
    const todoTaskId = request.params.todoTaskId;
    const { todoTask } = JSON.parse(request.requestBody);

    const updatedTodoTasks = user.todoTasks.map((item) => {
      if (item._id === todoTaskId) {
        return { ...item, ...todoTask };
      }
      return item;
    });
    this.db.users.update({ todoTasks: updatedTodoTasks });
    return new Response(200, {}, { todoTasks: updatedTodoTasks });
  }
  return new Response(
    404,
    {},
    { errors: ["The user you request does not exist. Not Found error."] }
  );
};
