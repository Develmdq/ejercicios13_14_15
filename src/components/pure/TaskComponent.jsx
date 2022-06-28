import { useState, useEffect } from "react";
import PropTypes from "prop-types";

//Models
import { LEVELS } from "../../models/levels.enum";
import { Task } from "../../models/task.class";

//Importamos hoja de estilos
import "../../styles/task.scss";

const TaskComponent = ({ task, complete, remove }) => {
  //Control del cilo de vida
  useEffect(() => {
    console.log("Created Task");
    return () => console.log(`Task: ${task.name} is going to unmount`);
  }, [task]);

  /**
   * Function that returns a Badge
   * depending on the level of the task
   */
  const taskLevelBadge = () => {
    switch (task.level) {
      case LEVELS.NORMAL:
        return (
          <h6 className="mb-0">
            <span className="badge bg-primary">{task.level}</span>
          </h6>
        );
      case LEVELS.URGENT:
        return (
          <h6 className="mb-0">
            <span className="badge bg-warning">{task.level}</span>
          </h6>
        );
      case LEVELS.BLOCKING:
        return (
          <h6 className="mb-0">
            <span className="badge bg-danger">{task.level}</span>
          </h6>
        );
      default:
        break;
    }
  };

  /**
   * Function that returns icon depending on completion of the task
   */
  const taskCompletedIcon = () => {
    if (task.completed) {
      return (
        <i
          onClick={() => complete(task)}
          className="bi-toggle-on"
          style={{ color: "green" }}
        />
      );
    } else {
      return (
        <i
          onClick={() => complete(task)}
          className="bi-toggle-off"
          style={{ color: "grey" }}
        />
      );
    }
  };

  const taskCompleted = {
    color: "gray",
    fontWeight:'bold',
    textDecoration: "line-through",
  };

  const taskPending = {
    color: "tomato",
    fontWeight: "bold",
  };

  return (
    <tr
      className="fw-normal"
      style={task.completed ? taskCompleted : taskPending}
    >
      <th>
        <span className="ms-2"> {task.name}</span>
      </th>
      <td className="align-middle">
        <span> {task.description}</span>
      </td>
      <td className="align-middle">
        {/* Execution of function to return badge element */}
        {taskLevelBadge()}
      </td>
      <td className="align-middle">
        {/* Execution of function to return icon depending on completion */}
        {taskCompletedIcon()}
        <i
          onClick={() => remove(task)}
          className="bi-trash task-action"
          style={{ color: "tomato" }}
        />
      </td>
    </tr>
  );
};

TaskComponent.propTypes = {
  task: PropTypes.instanceOf(Task).isRequired,
  complete: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};

export default TaskComponent;
