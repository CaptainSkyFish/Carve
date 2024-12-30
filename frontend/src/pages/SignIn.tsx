import Auth from "../components/Auth";
import Quote from "../components/Quote";

export default function SignIn() {
    return <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 bg-gradient-to-tr from-black to-[#190019]">
            <Quote />
            <Auth type="signin" />
        </div>
    </div>
}