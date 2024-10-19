import React from "react";

const UserCard = ({ data }) => {
  const { firstName, lastName, age, about, photoUrl, gender } = data;
  console.log(data);
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
            <button className="btn bg-red-600 text-white">Ignore</button>
            <button className="btn bg-green-600 text-white">Interest</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
