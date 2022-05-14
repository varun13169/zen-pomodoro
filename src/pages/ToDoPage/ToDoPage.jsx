import React from "react";
import { useState } from "react";
import { BinSVG, ClockSVG, PencilSVG } from "../../assets/svgReactComponents";
import { Navbar, PromodoroModal } from "../../components";
import { useAuth, useTodoTasks } from "../../contexts";
import {
  closeTaskForm,
  onSubmitTaskForm,
  removeTaskFromTodDoTask,
} from "./toDoPageUtils";
import styles from "./toDoPage.module.css";
import { useNavigate } from "react-router-dom";

export default function ToDoPage() {
  const navigate = useNavigate();
  const [dispTaskForm, setdispTaskForm] = useState({
    display: false,
    action: "none",
  });
  const [taskFormTaskId, setTaskFormTaskId] = useState("");
  const [taskFormTitle, setTaskFormTitle] = useState("");
  const [taskFormDesc, setTaskFormDesc] = useState("");
  const [taskFormTime, setTaskFormTime] = useState(0);

  const [dispPromodoroModal, setDispPromodoroModal] = useState({
    display: false,
    taskDetails: {},
  });

  const { todoTasksState, setTodoTasksState } = useTodoTasks();
  const { authState, checkValidTokenAndSetAuth } = useAuth();
  const { isSignnedIn } = authState;

  return (
    <section className={`${styles[`page-wrap`]}`}>
      <section className={`${styles[`page-nav`]}`}>
        <Navbar></Navbar>
      </section>

      <section className={`${styles["page-main"]}`}>
        <main className={`${styles["main-content"]}`}>
          <h3>Welcome</h3>
          <p>You have following task for today</p>

          <div className={`${styles["task-list-holder"]}`}>
            <div className={`${styles["task-list-holder--heading"]}`}>
              <p
                className={`${styles["task-list-holder--title"]} dui-util-fw-bld`}
              >
                To-Do List
              </p>
              <button
                className={`${styles["task-list-holder--add-task-btn"]}
                dui-btn dui-btn--primary dui-util-txt-sm dui-util-spc-pad-0_8rem-xs dui-util-fw-bld dui-util-bdr-radi-999px-mx reset-button-inherit-parent`}
                onClick={() => {
                  console.log(dispTaskForm);
                  if (isSignnedIn) {
                    setdispTaskForm({ display: true, action: "NEW_TASK" });
                  } else {
                    navigate("/signin");
                  }
                }}
              >
                +
              </button>
            </div>
            <table className={`${styles["todo-task-table"]}`}>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {todoTasksState.todoTasks.map((todoTask) => {
                  return (
                    <tr key={todoTask._id}>
                      <td className={`${styles["todo-task-table-title"]}`}>
                        {todoTask.title}
                      </td>
                      <td
                        className={`${styles["todo-task-table-description"]}`}
                      >
                        {todoTask.description}
                      </td>
                      <td className={`${styles["todo-task-table-time"]}`}>
                        {todoTask.time}
                      </td>
                      <td className={`${styles["todo-task-table-actions"]}`}>
                        <button
                          className={`reset-button-inherit-parent`}
                          onClick={() => {
                            setDispPromodoroModal({
                              display: true,
                              modalDetails: {
                                taskDetails: { ...todoTask },
                                actions: {
                                  modalCloseAction: () => {
                                    setDispPromodoroModal({
                                      display: false,
                                      taskDetails: {},
                                    });
                                  },
                                },
                              },
                            });
                          }}
                        >
                          <ClockSVG
                            stroke={"var(--dui-primary-color)"}
                            width="3rem"
                          />
                        </button>

                        <button
                          className={`reset-button-inherit-parent`}
                          onClick={() => {
                            setdispTaskForm({
                              display: true,
                              action: "EDIT_TASK",
                            });
                            setTaskFormTaskId(todoTask._id);
                            setTaskFormTitle(todoTask.title);
                            setTaskFormDesc(todoTask.description);
                            setTaskFormTime(todoTask.time);
                          }}
                        >
                          <PencilSVG
                            stroke={"var(--dui-primary-color)"}
                            width="3rem"
                          />
                        </button>

                        <button
                          className={`reset-button-inherit-parent`}
                          onClick={() =>
                            removeTaskFromTodDoTask(
                              todoTask,
                              todoTasksState,
                              setTodoTasksState
                            )
                          }
                        >
                          <BinSVG
                            stroke={"var(--dui-primary-color)"}
                            width="3rem"
                          />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </main>
      </section>

      {dispPromodoroModal.display === true && (
        <PromodoroModal modalDetails={dispPromodoroModal.modalDetails} />
      )}
      {dispTaskForm.display === true && (
        <div className="dui-modal" style={{ backgroundColor: "#c2c2c2db" }}>
          <form
            className="dui-modal__info-card dui-util-spc-pad-s"
            onSubmit={(e) =>
              onSubmitTaskForm(
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
              )
            }
            style={{
              width: "fit-content",
              height: "fit-content",
              backgroundColor: "var(--site-bg-color)",
            }}
          >
            <p
              className="dui-modal__close"
              onClick={() =>
                closeTaskForm(
                  setdispTaskForm,
                  setTaskFormTitle,
                  setTaskFormDesc,
                  setTaskFormTime
                )
              }
            >
              X
            </p>

            <label
              htmlFor="task-title"
              className="dui-util-txt-sm dui-util-fw-sbld"
            >
              <input
                id="task-title"
                className={`${styles["task-title"]} dui-inp-txt__input dui-util-txt-sm dui-util-spc-pad-0_8rem-xs reset-input-inherit-parent`}
                type="text"
                placeholder="Add Title"
                value={taskFormTitle}
                onChange={(e) =>
                  setTaskFormTitle((taskFormTitle) => e.target.value)
                }
              />
            </label>

            <label
              htmlFor="task-desc"
              className="dui-util-txt-sm dui-util-fw-sbld"
            >
              <textarea
                id="task-desc"
                className={`${styles["task-desc"]} dui-inp-txt-area__input dui-util-txt-sm dui-util-spc-pad-0_8rem-xs reset-input-inherit-parent`}
                rows="4"
                cols="19"
                type="text"
                placeholder="Add Description"
                value={taskFormDesc}
                onChange={(e) =>
                  setTaskFormDesc((taskFormDesc) => e.target.value)
                }
              />
            </label>

            <label
              htmlFor="task-time"
              className="dui-util-txt-sm dui-util-fw-sbld"
            >
              <input
                id="task-time"
                className={`${styles["task-time"]} dui-inp-txt__input dui-util-txt-sm dui-util-spc-pad-0_8rem-xs reset-input-inherit-parent`}
                type="number"
                placeholder="Add Time in Minutes"
                value={taskFormTime}
                onChange={(e) =>
                  setTaskFormTime((taskFormTime) => e.target.value)
                }
              />
            </label>

            <div className={`${styles["task-actions"]} `}>
              <button
                className={`${styles["task-action-cancel"]} dui-btn dui-btn--secondary dui-util-bdr-radi-5px-s dui-util-txt-sm dui-util-spc-pad-0_8rem-xs reset-button-inherit-parent`}
                onClick={() =>
                  closeTaskForm(
                    setdispTaskForm,
                    setTaskFormTitle,
                    setTaskFormDesc,
                    setTaskFormTime
                  )
                }
              >
                Cancel
              </button>

              <button
                type="submit"
                className={`${styles["task-action-add"]} dui-btn dui-btn--primary dui-util-bdr-radi-5px-s dui-util-txt-sm dui-util-spc-pad-0_8rem-xs reset-button-inherit-parent`}
              >
                Add
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}
