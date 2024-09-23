import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { PageContext } from "./components/pagecontext";
function Nav() {
  const {page,setPage,logged} = useContext(PageContext)
  return (
    <nav className="py-3 fixed w-full top-0 right-0 border-2 flex justify-end px-10">
    <div className="flex justify-center translate-x-4">
    {(logged)?<p className=" translate-x-32 px-8 text-end  font-bold bg-black rounded-lg rounded-b-none text-white py-2 flex justify-center items-end " >Logged</p> :  <div className="flex pl-32 justify-center">
        <button
          className={
            page === "signup"
              ? "font-bold bg-black rounded-lg rounded-b-none text-white px-2 py-1"
              : "font-bold rounded-lg text-black  px-3 py-1 rounded-b-none rounded-l-lg border-b-2 border-black"
          }
          onClick={() => {
            setPage("signup");
          }}
        >
         <Link to='/signup'> Sign up</Link>
        </button>
        <button
          className={
            page === "Login"
              ? "font-bold  bg-black rounded-lg rounded-b-none text-white px-3 py-1"
              : "font-bold rounded-lg text-black px-2 border-b-2 border-b-black   rounded-b-none py-1 rounded-r-lg"
          }
          onClick={() => {
           setPage("Login")
          }}
        >
                 <Link to='/login'>Log In</Link>
        </button>
      </div>}
    </div>
     
    </nav>
  );
}

export default Nav;
