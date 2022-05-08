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
      break;

    default:
      return;
  }

  setdispTaskForm({ display: false, action: "NONE" });
  setTaskFormTitle("");
  setTaskFormDesc("");
  setTaskFormTime(0);
};

const removeTaskFromTodDoTask = (todoTasksState, setTodoTasksState) => {
  setTodoTasksState({
    type: "UPDATE_TODO_LIST",
    data: todoTasksState.todoTasks.filter((task) => {
      return todoTask._id !== task._id;
    }),
  });
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
