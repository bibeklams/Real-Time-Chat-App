import React from "react";
import { Formik, Form, Field } from "formik";
import { login } from "../../services/authService";
import { loginSuccess } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const data = await login(values);

      dispatch(
        loginSuccess({
          user: data.user,
        }),
      );

      toast.success(data.message);
      resetForm();
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-2">Welcome Back</h1>

        <p className="text-gray-500 text-center mb-6">Login to continue</p>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-4">
            <Field
              type="email"
              name="email"
              placeholder="Enter Email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <Field
              type="password"
              name="password"
              placeholder="Enter Password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Login
            </button>

            <div className="text-center">
              <Link to="/register" className="text-blue-600 hover:underline">
                Don't have an account? Register
              </Link>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default LoginForm;
