import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";

const Premium = () => {
  const [PremiumUser, setPremiumUser] = useState(false);
  const verifyPremiumUser = async () => {
    const data = await axios.get(BASE_URL + "/premium/verify", {
      withCredentials: true,
    });
    if (data.data.isPremium) setPremiumUser(true);
  };
  const handleBuy = async (type) => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      {
        membershipType: type,
      },
      {
        withCredentials: true,
      }
    );
    const { amount, keyId, currency, notes, orderId } = order.data;

    const options = {
      key: keyId,
      amount,
      currency,
      name: "Dev Tinder",
      order_id: orderId,
      prefill: {
        name: notes.firstName + " " + notes.lastName,
      },
      theme: {
        color: "#F37254",
      },
      handler: verifyPremiumUser,
    };

    // open razorpay dialogue box
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return PremiumUser ? (
    <h2>You are a Premium User</h2>
  ) : (
    <div className="my-11 flex justify-center">
      <div className=" mx-10 bg-gray-700  text-white w-1/4 h-64  rounded-lg p-5">
        <p className="font-bold text-white justify-center text-3xl">Silver</p>
        <hr className="m-3"></hr>
        <p className="">- Blue Tick</p>
        <p>- Send Messages to Strangers</p>
        <p>- Send Request to 100 Users per day</p>
        <p>- 3 Months Validity</p>
        <button
          className="btn btn-info my-4 mx-20"
          onClick={() => handleBuy("silver")}
        >
          Buy Silver
        </button>
      </div>

      <div className=" mx-10 bg-gray-700  text-white w-1/4 h-64  rounded-lg p-5">
        <p className="font-bold text-white justify-center text-3xl">Gold</p>
        <hr className="m-3"></hr>
        <p className="">- Blue Tick</p>
        <p>- Send Messages to Strangers</p>
        <p>- Send Request to Infinite Users per day</p>
        <p>- 6 Months Validity</p>
        <button
          className="btn btn-accent  my-4 mx-20"
          onClick={() => handleBuy("gold")}
        >
          Buy Silver
        </button>
      </div>
    </div>
  );
};

export default Premium;
