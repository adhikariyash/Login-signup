import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PageContext } from "./pagecontext";
import axios from "axios";

import { FaEyeSlash, FaEye } from "react-icons/fa";

function Signup() {
  const { setLogged,logged } = useContext(PageContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [popup, setPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const navigate = useNavigate();
  const [Type, setType] = useState("password");

  const handleFormData = async (e) => {
    e.preventDefault();

    try {
      if (username && email && password) {
        // Make signup request
        const signupRes = await axios.post("http://localhost:5000/signup", {
          username,
          email,
          password
        });

        // Handle success response
        setMessage(signupRes.data.message);
        setMessageType("success");
        setPopup(true);
        setPassword("");
        setEmail("");
        setUsername("");
        setLogged(true);
        setTimeout(() => {
          setPopup(false);
          navigate("/logged");
        }, 2000);
      }
    } catch (error) {
      // Handle error response
      if (error.response && error.response.data) {
        setMessage(error.response.data.message);
      } else {
        setMessage("An unexpected error occurred");
      }
      setMessageType("error");
      setPopup(true);
      setTimeout(() => setPopup(false), 3000);
    }
  };

  return (
    <>
      <div className="h-full flex justify-center w-full items-center mt-20 gap-4">
        <div className="flex flex-col justify-center rounded-lg border-black border-2 p-4">
          <div className={popup ? `flex justify-end items-end text-end ${messageType === "success" ? "bg-green-500" : "bg-red-500"} p-1 rounded-xl border-2 text-white font-bold px-5 text-xl mb-3 w-full` : "hidden"}>
            <p>{message}</p>
          </div>

          <div className="flex justify-center">
            <h2 className="flex w-full justify-start mb-3 border-b-2 font-bold border-black">Sign Up</h2>
          </div>

          <form className="flex flex-col w-full gap-2" onSubmit={handleFormData}>
            <div className="flex flex-col">
              <label className="text-md font-semibold">Username:</label>
              <input
                type="text"
                required
                autoCapitalize="none"
                autoComplete="name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full border-2 border-black rounded-md p-1"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-md font-semibold">Email:</label>
              <input
                type="email"
                required
                value={email}
                autoComplete="email"
                autoCapitalize="none"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full border-2 border-black rounded-md p-1"
              />
            </div>
            <div className="mb-2">
              <label className="font-semibold text-md">Password:</label>
              <div className="flex justify-center items-center gap-1 relative">
                <input
                  type={Type}
                  required
                  value={password}
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full border-2 border-black rounded-md p-1 min-w-[16rem]"
                />
                <div className="absolute translate-x-28 cursor-pointer">
                  {Type === "password" ? (
                    <FaEyeSlash size={20} onClick={() => setType("text")} />
                  ) : (
                    <FaEye size={20} onClick={() => setType("password")} />
                  )}
                </div>
              </div>
            </div>


            <button type="submit" className="bg-black p-2 rounded-xl text-white font-bold">Sign up</button>

            <p>
              Have an account? <Link to="/login" className="font-bold">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
