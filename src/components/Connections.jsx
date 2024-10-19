import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { addConnections } from "../utils/connectionsSlice";
import { useDispatch, useSelector } from "react-redux";
const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
      //   console.log(res?.data?.data);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0)
    return (
      <h1 className="flex justify-center font-bold text-3xl">
        No Connections Found
      </h1>
    );
  return (
    <div>
      <div className="items-center flex justify-center my-2">Connections</div>
      {connections.map((connection) => {
        const { firstName, lastName, age, gender, about, photoUrl, _id } =
          connection;
        return (
          <div className="flex justify-center my-4" key={_id}>
            <div className="card card-compact bg-base-100 w-96 shadow-xl">
              <figure>
                <img src={photoUrl} alt="Profile" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{firstName + "  " + lastName}</h2>
                <p>{about}</p>
                {age && <p>{"Age: " + age}</p>}
                {gender && <p>{"Gender: " + gender}</p>}
                <div className="card-actions justify-center">
                  <button className="btn bg-red-600 text-white">Block</button>
                  <button className="btn bg-green-600 text-white">
                    Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
