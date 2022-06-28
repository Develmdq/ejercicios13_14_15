import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";

//Models
import { Task } from "../../../models/task.class";
import { LEVELS } from "../../../models/levels.enum";

const taskSchema = yup.object().shape({
  name: yup.string().min(3, "Name too short").required("Name task is required"),
  description: yup.string().required("Description is required"),  
});

const TaskFormik = ({ add, length }) => {
  
    const initialTask = {
    name: "",
    description: "",
    completed : false,
    level: LEVELS.NORMAL,
  };
  return (
    <>
      <Formik
        initialValues={initialTask}
        validationSchema={taskSchema}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 1000));
          add(values);
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
        }) => (
          <Form className="d-flex justify-content-center aling-items-center mb-4">
            <div className="form-outline flex-fill">
              <Field
                className="form-control form-control-lg"
                id="name"
                name="name"
                placeholder="Task Name"
                type="text"
              />
              {errors.name && touched.name && (
                <ErrorMessage name="name" component="div" />
              )}
              <Field
                className="form-control form-control-lg"
                id="description"
                name="description"
                placeholder="Task Description"
                type="text"
              />
              {errors.description && touched.description && (
                <ErrorMessage name="description" component="div" />
              )}
              <Field
                className="form-control form-control-lg"
                id="level"
                name="level"
                as="select"
              >
                <option value={LEVELS.NORMAL}>Normal</option>
                <option value={LEVELS.URGENT}>Urgent</option>
                <option value={LEVELS.BLOCKING}>Blocking</option>
              </Field>
            </div>
            <button type="submit" className="btn btn-success btn-lg ms-2">
              {length > 0 ? "Add New Task" : "Create your First Task"}
            </button>
            {isSubmitting && <p>Sending your credentials...</p>}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default TaskFormik;
