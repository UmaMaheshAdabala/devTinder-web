import React from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUserFromFeed } from "../utils/feedSlice";
import { useDispatch } from "react-redux";

const UserCard = ({ data }) => {
  const { firstName, lastName, age, about, photoUrl, gender, _id } = data;
  console.log(data);
  const dispatch = useDispatch();
  const handleRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + _id,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUserFromFeed(_id));
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="flex justify-center m-5">
      <div className="card card-compact bg-base-100 w-96 shadow-xl ">
        <figure>
          <img src={photoUrl} alt="Profile" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <p>{about}</p>
          <p>{"Age: " + age}</p>
          <p>{"Gender: " + gender}</p>
          <div className="card-actions justify-center">
            <button
              className="btn bg-red-600 text-white"
              onClick={() => handleRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn bg-green-600 text-white"
              onClick={() => handleRequest("interested", _id)}
            >
              Interest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
