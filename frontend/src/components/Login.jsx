import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PageContext } from "./pagecontext";
import axios from 'axios';
import { FaEyeSlash, FaEye } from "react-icons/fa";

function Login() {
  const { setPage, setLogged, logged,username,setUsername } = useContext(PageContext);
 
  const [password, setPassword] = useState("");
  const [popup, setPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'
  const navigate = useNavigate();
  const [Type, setType] = useState("password");

  // Handle form submission
  const handleFormData = async (e) => {
    e.preventDefault();

    if (username && password) {
      try {
        const res = await axios.post("http://localhost:5000/login", { username, password });

        if (res.status === 200) {
          setMessage("Successfully logged in");
          setMessageType("success");
          setPopup(true);
          setPassword("");
          setUsername("");

          setLogged(true)
          axios.put("http://localhost:5000/logged", { logged, username })
          .then(res => {
            if (res.status === 200) {
              const { LoggedIn } = res.data;  // 
              console.log("LoggedIn status:", LoggedIn);
             
              navigate("/logged"); 
            }
          })
          .catch(err => {
            console.log("Error updating logged status:", err);
          });
        
        

          // Close popup after 2 seconds
          setTimeout(() => setPopup(false), 2000);
        }
      } catch (err) {
        // Handle error response
        if (err.response && err.response.status === 401) {
          setMessage("Invalid credentials");
        } else {
          setMessage("An error occurred. Please try again.");
        }
        setMessageType("error");
        setPopup(true);

        // Hide popup after 3 seconds
        setTimeout(() => setPopup(false), 3000);
      }
    }
  };

  return (
    <>
      <div className="h-full flex justify-center w-full items-center mt-20 gap-4 ">
        <div className="flex flex-col justify-center rounded-lg border-black border-2 p-4">
          
          {/* Popup message */}
          <div className={popup ? `flex justify-end items-end text p-1 rounded-xl border-2 text-white font-bold px-5 text-sm text-center mb-3 w-full ${messageType === 'success' ? 'bg-green-500' : 'bg-red-500'}` : "hidden"}>
            <p>{message}</p>
          </div>

          <div className="flex justify-center">
            <h2 className="flex w-full justify-start mb-3 border-b-2 font-bold border-black">
              Log In
            </h2>
          </div>
          
          <form className="flex flex-col w-full gap-2" onSubmit={handleFormData}>
            {/* Username field */}
            <div className="flex flex-col">
              <label className="text-md font-semibold">Username:</label>
              <input
                type="text"
                required
                value={username}
                autoCapitalize="none"
                autoComplete="name"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border-2 border-black rounded-md p-1"
              />
            </div>

            {/* Password field with toggle visibility */}
            <div className="mb-2">
              <label className="font-semibold text-md">Password:</label>
              <div className="flex justify-center items-center gap-1 relative">
                <input
                  type={Type}
                  required
                  value={password}
                  autoComplete="current-password"
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

            {/* Submit button */}
            <button className="bg-black p-2 rounded-xl text-white font-bold" type="submit">
              Log In
            </button>

            {/* Signup link */}
            <p>
              Don't have an account?{" "}
              <Link className="font-bold" to="/signup" onClick={() => setPage("signup")}>
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
