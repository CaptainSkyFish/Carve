import { SignInInput, SignUpInput } from "@cpt_skyfish_/carve-common";
import React, { ChangeEvent, useState } from "react";
import AuthHeader from "./AuthHeader";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

type RequestType = "signin" | "signup"

interface AuthProps {
  type : RequestType
}

export default function Auth( {type} : AuthProps ) {
    const navigate = useNavigate()
    const [signupCredentials, setSignupCredentials] = useState<SignUpInput>({
        username: "",
        email: "",
        password: "",
    })

    const [signinCredentials, setSigninCredentials] = useState<SignInInput>({
      email: "",
      password: "",
    })
    
    async function getToken(event: React.MouseEvent<HTMLButtonElement>) {
      event.preventDefault();
      try {        
        const credentials = type === "signin" ? signinCredentials : signupCredentials
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type}`, credentials)
          const { token } = response.data
          localStorage.setItem("token", token);
          navigate("/blogs")
          console.log("Token successfully saved!")
          return token
      } catch (error) {
        console.error("Error occurred during authentication:", error)
        return () => {"authentication failed"}
      }
    }
    
    
   return( <div className="flex justify-center items-center h-screen p-4">
    <div className="w-full max-w-sm bg-white shadow-lg rounded-xl p-8">
      <AuthHeader type={type} />
      <form className="mt-6">
      {type==="signup" ?
      <LabelledInput
          label="Username"
          type="text"
          onChange={(e) =>
            setSignupCredentials({
              ...signupCredentials,
              username: e.target.value,
            })
          }
        /> : null}
        <LabelledInput
          label="Email"
          type="email"
          onChange={(e) =>
            type === "signup"?  
            setSignupCredentials({
              ...signupCredentials,
              email: e.target.value,
            }) :
            setSigninCredentials({
              ...signinCredentials,
              email: e.target.value,
            })
          }
        />
        <LabelledInput
          label="Password"
          type="password"
          onChange={(e) =>
            type === "signup"?  
            setSignupCredentials({
              ...signupCredentials,
              password: e.target.value,
            }) :
            setSigninCredentials({
              ...signinCredentials,
              password: e.target.value,
            })
          }
        />
        <button
          type="submit"
          onClick={(e) => getToken(e)}
          className="mt-4 w-full bg-[#2b124c] text-white py-2 rounded-xl hover:bg-[#522b5b] transition duration-200 shadow-md"
        >
          {type === "signup" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  </div>
);
}

interface LabelledInputProps {
    label: string
    type? : string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const LabelledInput = React.memo(function LabelledInput({
    label,
    onChange,
    type,
  }: LabelledInputProps) {
    return (
      <div className="relative m-4">
        <input
          className="peer w-full mt-1 px-4 py-2 text-base text-gray-700 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b124c] focus:border-[#2b124c]"
          type={type || "text"}
          placeholder=" "
          required
          onChange={onChange}
        />
        <label className="absolute left-4 top-0 transform -translate-y-1/2 bg-gray-50 px-1 text-sm text-gray-500 transition-all duration-150 pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-sm peer-focus:text-[#522b5b]">
          {label}
        </label>
      </div>
    );
  })
  