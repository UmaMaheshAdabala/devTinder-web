import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestsSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  console.log(requests);
  const handleRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error(err.message);
    }
  };
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      console.log(res?.data?.connectionRequests);
      dispatch(addRequests(res?.data?.connectionRequests));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);
  if (!requests) return;
  if (requests.length == 0)
    return (
      <h1 className="flex justify-center font-bold text-3xl">
        No Requests Found
      </h1>
    );
  return (
    <div>
      {requests.map((request) => {
        const { firstName, lastName, age, gender, about, photoUrl } =
          request.fromUserId;
        return (
          <div className="flex justify-center my-4" key={request._id}>
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
                  <button
                    className="btn bg-red-600 text-white"
                    onClick={() => handleRequest("rejected", request._id)}
                  >
                    Reject
                  </button>
                  <button
                    className="btn bg-green-600 text-white"
                    onClick={() => handleRequest("accepted", request._id)}
                  >
                    Accept
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

export default Requests;
