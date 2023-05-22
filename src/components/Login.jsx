import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Api from "../api/Api";
import { updateLoginStatus } from "../store/slices/appSlice";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoging] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = async () => {
    if (email !== "" && password !== "") {
      try {
        setLoging(true);

        let userDetails = {
          email: email,
          password: password,
        };

        let result = await Api().post(
          "Api_controller/login_email",
          userDetails
        );
        let response = result.data;

        setLoging(false);

        if (response?.status === "fail") {
          setError(true);
          setMessage(response?.message);
        } else {
          const loginResponse = {
            isLogedIn: true,
            loginInfo: response.dataset,
          };
          dispatch(updateLoginStatus(loginResponse));
          navigate("/");
        }
      } catch {
        setLoging(false);
        setError(true);
      }
    } else {
      alert("Email or password should not be empty!");
    }
  };

  return (
    <div className="w-full  h-screen flex  justify-center items-center">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {error && (
          <div className="bg-red-500 text-center p-3 mb-2 text-white">
            {message !== "" ? (
              <h1>{message}</h1>
            ) : (
              <h1>Something went wrong!</h1>
            )}
          </div>
        )}

        <div className="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            placeholder="Email"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="******************"
          />
        </div>
        <div className="flex items-center justify-between">
          {loading ? (
            <button
              onClick={onLogin}
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Loading...
            </button>
          ) : (
            <button
              onClick={onLogin}
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Sign In
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
