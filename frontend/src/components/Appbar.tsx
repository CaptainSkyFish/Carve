import { useState, useEffect, useMemo } from "react"
import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"
import { TextHover } from "../UI/TextHover"
import { useBlogs } from "../hooks/useBlogs" // Assuming the hook is imported here

export default function Appbar() {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [authorName, setAuthorName] = useState<string>("")
    const [searchOpen, setSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [filteredBlogs, setFilteredBlogs] = useState([])

    const { blogs, loading } = useBlogs()

    useEffect(() => {
        const token = localStorage.getItem("token")

        if (token) {
            const cachedName = localStorage.getItem("username")
            if (cachedName) {
                setAuthorName(cachedName)
            }
        }
    }, [])

    useEffect(() => {
        if (searchQuery.trim() !== "") {
            const filtered = blogs.filter(blog =>
                blog.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
            setFilteredBlogs(filtered)
        } else {
            setFilteredBlogs([])
        }
    }, [searchQuery, blogs])

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY
            setIsCollapsed(scrollY > 200)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <>
            <div className="flex justify-center items-center overflow-hidden">
                <div className="circle one"></div>
                <div className="circle two"></div>
                <Link to={"/blogs"}>
                    <TextHover
                        font={"katros"}
                        content={"CARVE"}
                        fontSize={"3rem"}
                        color={"#0D1116"}
                        fontWeight={700}
                    />
                </Link>
            </div>

            <div
                className={`fixed bottom-10 p-2 left-1/2 transform -translate-x-1/2 bg-transparent backdrop-blur-lg z-50 shadow-md hover:shadow-[#0000ff17] border border-gray-200 rounded-2xl transition-transform ${
                    isCollapsed ? "translate-y-10" : ""
                }`}
            >
                <div className="flex justify-around items-center space-x-6">
                    <Link
                        to="/search"
                        className="relative flex flex-col items-center text-gray-700 hover:text-gray-900 group"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-8 h-8 transition-transform ease-in-out duration-200 hover:scale-[1.2]"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M7.30524 15.7137C6.4404 14.8306 5.85381 13.7131 5.61824 12.4997C5.38072 11.2829 5.50269 10.0233 5.96924 8.87469C6.43181 7.73253 7.22153 6.75251 8.23924 6.05769C10.3041 4.64744 13.0224 4.64744 15.0872 6.05769C16.105 6.75251 16.8947 7.73253 17.3572 8.87469C17.8238 10.0233 17.9458 11.2829 17.7082 12.4997C17.4727 13.7131 16.8861 14.8306 16.0212 15.7137C14.8759 16.889 13.3044 17.5519 11.6632 17.5519C10.0221 17.5519 8.45059 16.889 7.30524 15.7137V15.7137Z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M11.6702 7.20292C11.2583 7.24656 10.9598 7.61586 11.0034 8.02777C11.0471 8.43968 11.4164 8.73821 11.8283 8.69457L11.6702 7.20292ZM13.5216 9.69213C13.6831 10.0736 14.1232 10.2519 14.5047 10.0904C14.8861 9.92892 15.0644 9.4888 14.9029 9.10736L13.5216 9.69213ZM16.6421 15.0869C16.349 14.7943 15.8741 14.7947 15.5815 15.0879C15.2888 15.381 15.2893 15.8559 15.5824 16.1485L16.6421 15.0869ZM18.9704 19.5305C19.2636 19.8232 19.7384 19.8228 20.0311 19.5296C20.3237 19.2364 20.3233 18.7616 20.0301 18.4689L18.9704 19.5305ZM11.8283 8.69457C12.5508 8.61801 13.2384 9.02306 13.5216 9.69213L14.9029 9.10736C14.3622 7.83005 13.0496 7.05676 11.6702 7.20292L11.8283 8.69457ZM15.5824 16.1485L18.9704 19.5305L20.0301 18.4689L16.6421 15.0869L15.5824 16.1485Z" fill="#000000" />
                        </svg>
                        <span className="absolute -top-8 flex justify-center opacity-0 group-hover:opacity-100 text-xs transition-opacity bg-gray-800 text-white px-2 py-1 rounded shadow-md">
                            Search
                        </span>
                    </Link>
                    <Link
                        to="/create"
                        className="relative flex flex-col items-center text-gray-700 hover:text-black group"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth="1"
                            stroke="currentColor"
                            className="w-6 h-6 transition-all ease-in-out duration-200 hover:scale-[1.2]"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M21.289.98l.59.59c.813.814.69 2.257-.277 3.223L9.435 16.96l-3.942 1.442c-.495.182-.977-.054-1.075-.525a.928.928 0 0 1 .045-.51l1.47-3.976L18.066 1.257c.967-.966 2.41-1.09 3.223-.276zM8.904 2.19a1 1 0 1 1 0 2h-4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4a1 1 0 0 1 2 0v4a4 4 0 0 1-4 4h-12a4 4 0 0 1-4-4v-12a4 4 0 0 1 4-4h4z"
                            />
                        </svg>
                        <span className="absolute -top-8 opacity-0 group-hover:opacity-100 text-xs transition-opacity bg-gray-800 text-white px-2 py-1 rounded shadow-md">
                            Create
                        </span>
                    </Link>
                    <Link
                        to="/liked"
                        className="relative flex flex-col items-center text-gray-700 hover:text-gray-900 group"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-7 h-7 transition-transform ease-in-out duration-200 hover:scale-[1.2]"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12 6.00019C10.2006 3.90317 7.19377 2.25509 4 2.00019C2.01904 2.00019 .276809 3.74117 .276809 5.71219C.276809 7.24359 1.5577 8.49449 2.98448 9.36329L12 17.0002L21.0155 9.36329C22.4423 8.49449 23.7232 7.24359 23.7232 5.71219C23.7232 3.74117 21.9809 2.00019 20 2.00019C16.8062 2.25509 13.7994 3.90317 12 6.00019Z"
                            />
                        </svg>
                        <span className="absolute -top-8 opacity-0 group-hover:opacity-100 text-xs transition-opacity bg-gray-800 text-white px-2 py-1 rounded shadow-md">
                            Liked
                        </span>
                    </Link>
                    {authorName && (
                        <Link
                            to="/author"
                            className="relative flex flex-col items-center text-gray-700 hover:text-gray-900 group"
                        >
                            <Avatar />
                            <span className="absolute -top-8 opacity-0 group-hover:opacity-100 text-xs transition-opacity bg-gray-800 text-white px-2 py-1 rounded shadow-md">
                                Profile
                            </span>
                        </Link>
                    )}
                </div>
            </div>
        </>
    )
}
