import { useState, useEffect } from "react";
import { LEVELS } from "../../models/levels.enum";
import { Task } from "../../models/task.class";
import TaskComponent from "../pure/TaskComponent";
import "../../styles/task.scss";
import TaskFormik from "../pure/forms/TaskFormik";

const defaultTask1 = new Task(
  "Example1",
  "Default description1",
  true,
  LEVELS.NORMAL
);
const defaultTask2 = new Task(
  "Example2",
  "Default description2",
  false,
  LEVELS.URGENT
);
const defaultTask3 = new Task(
  "Example3",
  "Default description3",
  false,
  LEVELS.BLOCKING
);

const TaskListComponent = () => {
  //Estado del componente
  const [tasks, setTasks] = useState([
    defaultTask1,
    defaultTask2,
    defaultTask3,
  ]);
  const [loading, setLoading] = useState(true);

  //Control del cilo de vida
  useEffect(() => {
    console.log("Task State has been modified");
    setTimeout(() => setLoading(false), 2000);
    return () => console.log("TaskList component is going to unmont...");
  }, [tasks]);

  const completeTask = (task) => {
    console.log("Complete this Task:", task.name);
    const index = tasks.indexOf(task);
    const tempTasks = [...tasks];
    tempTasks[index].completed = !tempTasks[index].completed;
    // We update the state of the component and it will update the iteration
    // of the tasks in order to show the task update
    setTasks(tempTasks);
  };

  const removeTask = (task) => {
    console.log("Delete this Task:", task.name);
    const index = tasks.indexOf(task);
    const tempTasks = [...tasks];
    tempTasks.splice(index, 1);
    setTasks(tempTasks);
  };

  const addTask = (task) => {
    console.log("Add this Task:", task.name);
    const tempTasks = [...tasks];
    tempTasks.push(task);
    setTasks(tempTasks);
  };

  const Table = () => {
    return (<table>
       <thead>
         <tr>
           <th scope="col">Title</th>
           <th scope="col">Description</th>
           <th scope="col">Priority</th>
           <th scope="col">Actions</th>
         </tr>
       </thead>
       <tbody>
         {tasks.map((task, index) => {
           return (
             <TaskComponent
               key={index}
               task={task}
               complete={completeTask}
               remove={removeTask}
             />
           );
         })}
       </tbody>
     </table>)
  }

  let tasksTable = null
  
  if (tasks.length > 0) {
    tasksTable = <Table/>;
  } else {
    tasksTable = (
      <div>

        <h3>There are no tasks to show</h3>
        <h4>Please, create one.</h4>
      </div>
        )
  }

  const loadingStyle = {
    color: 'gray',
    fontSize: '30px',
    fontWeight: 'bold'
  }

  return (
    <>
      <div className="col-12">
        <div className="card">
          {/* Card Header (title) */}
          <div className="card-header p-3">
            <h5>Your Tasks</h5>
          </div>
          {/* Card Body (content) */}
          <div
            className="card-body"
            data-mdb-perfect-scrollbar="true"
            style={{ position: "relative", height: "400px" }}
          >
            {/* TODO: Add loading Spinner */}
            {loading ? (
              <p style={loadingStyle}>Loading Tasks...</p>
            ) : (
              tasksTable
            )}
          </div>
        </div>
        <TaskFormik add={addTask} length={tasks.length} />
      </div>
    </>
  );
};

export default TaskListComponent;
