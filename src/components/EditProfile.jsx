import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = () => {
  const userData = useSelector((store) => store.user);
  // const { firstName, lastName, age, emailId, about, photoUrl } = userData;
  const [firstName, setFName] = useState(userData.firstName);
  const [lastName, setLName] = useState(userData.lastName);
  const [age, setAge] = useState(userData.age);
  const [about, setAbout] = useState(userData.about);
  const [photoUrl, setPhotoUrl] = useState(userData.photoUrl);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const handleEditProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          about,
          photoUrl,
        },
        {
          withCredentials: true,
        }
      );
      // console.log(res?.data?.loggedInUser);
      dispatch(addUser(res?.data?.loggedInUser));
      setError("");
    } catch (err) {
      console.error(err);
      setError(err?.response?.data);
    }
  };
  return (
    <div>
      <div className="justify-center flex m-7">
        <div className="card bg-base-300 w-96 shadow-xl ">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit</h2>
            <label className="form-control w-full max-w-xs py-4">
              <div className="label">
                <span className="label-text">First Name :</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                value={firstName}
                onChange={(e) => setFName(e.target.value)}
              />
              <div className="label">
                <span className="label-text">Last Name :</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                value={lastName}
                onChange={(e) => setLName(e.target.value)}
              />
              <div className="label">
                <span className="label-text">Email ID :</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                value={userData.emailId}
                disabled
              />
              <div className="label">
                <span className="label-text">Age:</span>
              </div>
              <input
                type="number"
                className="input input-bordered w-full max-w-xs"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              <div className="label">
                <span className="label-text">About:</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
              <div className="label">
                <span className="label-text">Photo :</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </label>
            <p className="text-red-800">{error}</p>
            <div className="card-actions justify-center">
              <button
                className="btn btn-primary justify-center"
                onClick={handleEditProfile}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
