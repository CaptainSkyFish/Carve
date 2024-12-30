import Auth from "../components/Auth";
import Quote from "../components/Quote";

export default function SignUp() {
    return <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 bg-gradient-to-tr from-black to-[#190019]">
            <div className="hidden lg:block">
                <Quote />
            </div>
            <Auth type="signup" />
        </div>
    </div>
}