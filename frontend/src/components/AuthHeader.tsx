import { Link } from "react-router-dom";

export default function AuthHeader( {type} : {type : "signup" | "signin"} ){
    return <div className="text-center">
            <h1 className="font-extrabold text-3xl mb-2">{ type === "signup" ? "Welcome!" : "Welcome Back!" }</h1>
            <p className="text-slate-500 text-sm">
            {type === "signup" ? (
                <>
                Already have an account?{" "}
                <Link
                    className="text-[#2b124c] underline hover:text-[#522b5b]"
                    to="/signin"
                >
                    Login
                </Link>
                </>
            ) : (
                <>
                New here?{" "}
                <Link
                    className="text-[#2b124c] underline hover:text-[#522b5b]"
                    to="/signup"
                >
                    Create Account
                </Link>
                </>
            )}
            </p>
        </div>
}