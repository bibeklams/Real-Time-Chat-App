import React from "react";
import { Formik, Form, Field } from "formik";
import toast from "react-hot-toast";
import { register } from "../../services/authService";
import { useNavigate, Link } from "react-router-dom";

function RegisterForm() {
  const navigate = useNavigate();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("image", values.image);

      const data = await register(formData);

      toast.success(data.message);
      resetForm();
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-2">Create Account</h1>

        <p className="text-center text-gray-500 mb-6">
          Join the chat community
        </p>

        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            image: null,
          }}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form className="space-y-4">
              <Field
                type="text"
                name="name"
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <Field
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <Field
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div>
                <label className="block text-sm font-medium mb-2">
                  Profile Picture
                </label>

                <input
                  type="file"
                  accept="image/*"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  onChange={(e) =>
                    setFieldValue("image", e.currentTarget.files[0])
                  }
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Create Account
              </button>

              <div className="text-center">
                <Link to="/login" className="text-blue-600 hover:underline">
                  Already have an account? Login
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default RegisterForm;
