import { createContext, useReducer, useContext } from "react";

const TodoTasksContext = createContext();

const TodoTasksContextProvider = ({ children }) => {
  const reducer = (state, action) => {
    const actionType = action.type;

    switch (actionType) {
      case "UPDATE_TODO_LIST":
        return { ...state, todoTasks: action.data };
      default:
        return { ...state };
    }
  };
  const [todoTasksState, setTodoTasksState] = useReducer(reducer, {
    todoTasks: [],
  });

  return (
    <TodoTasksContext.Provider value={{ todoTasksState, setTodoTasksState }}>
      {children}
    </TodoTasksContext.Provider>
  );
};

const useTodoTasks = () => useContext(TodoTasksContext);

export { useTodoTasks, TodoTasksContextProvider };
