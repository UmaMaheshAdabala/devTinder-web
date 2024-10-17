import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const user = useSelector((store) => store.data);
  const handleClick = async () => {
    try {
      const data = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(data.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data);
      console.error(err);
    }
  };
  useEffect(() => {
    if (user) {
      return navigate("/");
    }
  }, []);
  return (
    <div className="justify-center flex m-7">
      <div className="card bg-base-300 w-96 shadow-xl ">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <label className="form-control w-full max-w-xs py-4">
            <div className="label">
              <span className="label-text">Email ID :</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
            <div className="label">
              <span className="label-text-alt">Password :</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <p className="text-red-800">{error}</p>
          <div className="card-actions justify-center">
            <button
              className="btn btn-primary justify-center"
              onClick={handleClick}
            >
              login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
