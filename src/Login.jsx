import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const handleClick = async () => {
    try {
      const data = await axios.post(
        "http://localhost:7777/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };
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
