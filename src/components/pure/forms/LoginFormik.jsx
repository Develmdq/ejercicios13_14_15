import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const LoginFormik = () => {
  const initalCredentials = {
    email: "",
    password: "",
  };
  return (
    <>
      <Formik
        // *** Initial values that the form will take
        initialValues={initalCredentials}
        // *** Yup Validation Schema
        validationSchema={loginSchema}
        // *** onSubmit Event
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 1000));
          alert(JSON.stringify(values, null, 2));
          // We save the data in the localStorage
          localStorage.setItem("credentials", JSON.stringify(values));
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
          <Form>
            <label htmlFor="email">Email</label>
            <Field
              id="email"
              name="email"
              placeholder="example@email.com"
              type="email"
            />
            {/* Email errors */}
            {errors.email && touched.email && (
              <ErrorMessage name="email" component="div" />
            )}
            <label htmlFor="password">Password</label>
            <Field
              id="password"
              name="password"
              placeholder="password"
              type="password"
            />
            {/* Password errors */}
            {errors.password && touched.password && (
              <ErrorMessage name="password" component="div" />
            )}
            <button type="submit">Login</button>
            {isSubmitting && <p>Login your credentials...</p>}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginFormik;
