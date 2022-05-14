import axios from "axios";
import { v4 as uuid } from "uuid";

const onSubmitTaskForm = (
  e,
  taskFormTaskId,
  setTaskFormTaskId,
  taskFormTitle,
  setTaskFormTitle,
  taskFormDesc,
  setTaskFormDesc,
  taskFormTime,
  setTaskFormTime,
  todoTasksState,
  setTodoTasksState,
  dispTaskForm,
  setdispTaskForm
) => {
  e.preventDefault();

  let config = null;
  let payload = null;

  switch (dispTaskForm.action) {
    case "NEW_TASK":
      setTodoTasksState({
        type: "UPDATE_TODO_LIST",
        data: [
          ...todoTasksState.todoTasks,
          {
            _id: uuid(),
            title: taskFormTitle,
            description: taskFormDesc,
            time: taskFormTime,
          },
        ],
      });

      config = {
        headers: {
          Accept: "*/*",
          authorization: localStorage.getItem("token"),
        },
      };

      payload = {
        todoTask: {
          _id: uuid(),
          title: taskFormTitle,
          description: taskFormDesc,
          time: taskFormTime,
        },
      };
      (async () => {
        try {
          let res = await axios.post("/api/user/todotasks", payload, config);
          console.log(res);
          setTodoTasksState({
            type: "UPDATE_TODO_LIST",
            data: res.data.todoTasks,
          });
        } catch (err) {
          console.log(err);
        }
      })();

      break;
    case "EDIT_TASK":
      setTodoTasksState({
        type: "UPDATE_TODO_LIST",
        data: todoTasksState.todoTasks.map((todoTask) => {
          if (todoTask._id === taskFormTaskId) {
            return {
              ...todoTask,
              title: taskFormTitle,
              description: taskFormDesc,
              time: taskFormTime,
            };
          }
          return todoTask;
        }),
      });

      config = {
        headers: {
          Accept: "*/*",
          authorization: localStorage.getItem("token"),
        },
      };

      payload = {
        todoTask: {
          title: taskFormTitle,
          description: taskFormDesc,
          time: taskFormTime,
        },
      };
      (async () => {
        try {
          let res = await axios.post(
            `/api/user/todotasks/${taskFormTaskId}`,
            payload,
            config
          );
          console.log(res);
          setTodoTasksState({
            type: "UPDATE_TODO_LIST",
            data: res.data.todoTasks,
          });
        } catch (err) {
          console.log(err);
        }
      })();

      break;

    default:
      return;
  }

  setdispTaskForm({ display: false, action: "NONE" });
  setTaskFormTitle("");
  setTaskFormDesc("");
  setTaskFormTime(0);
};

const removeTaskFromTodDoTask = (
  todoTask,
  todoTasksState,
  setTodoTasksState
) => {
  setTodoTasksState({
    type: "UPDATE_TODO_LIST",
    data: todoTasksState.todoTasks.filter((task) => {
      return todoTask._id !== task._id;
    }),
  });

  let config = {
    headers: {
      Accept: "*/*",
      authorization: localStorage.getItem("token"),
    },
  };

  (async () => {
    try {
      let res = await axios.delete(
        "/api/user/todotasks/" + todoTask._id,
        config
      );
      console.log(res);
      setTodoTasksState({
        type: "UPDATE_TODO_LIST",
        data: res.data.todoTasks,
      });
    } catch (err) {
      console.log(err);
    }
  })();
};

const closeTaskForm = (
  setdispTaskForm,
  setTaskFormTitle,
  setTaskFormDesc,
  setTaskFormTime
) => {
  setdispTaskForm({ display: false, action: "NONE" });

  setTaskFormTitle("");
  setTaskFormDesc("");
  setTaskFormTime("");
};

export { onSubmitTaskForm, removeTaskFromTodDoTask, closeTaskForm };
