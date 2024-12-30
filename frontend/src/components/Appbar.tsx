import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"
import {TextHover} from "../UI/TextHover"

export default function Appbar() {
    const [isCollapsed, setIsCollapsed] = useState(false)

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
            <div className="flex justify-center items-center">
                <TextHover content={'Carve'} fontSize={'3rem'} color={'#0D1116'} fontWeight={700} />
            </div>
            <div
                className={`fixed bottom-10 p-2 left-1/2 transform -translate-x-1/2 bg-transparent backdrop-blur-lg z-50 shadow-xl border border-gray-200 rounded-2xl transition-transform ${
                isCollapsed ? "translate-y-20" : ""
            }`}
            >
                <div className="flex justify-around items-center space-x-6">
                    <Link
                        to="/search"
                        className="flex pl-2 flex-col font-extrabold items-center text-gray-700 hover:text-gray-900"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-7 h-7"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M11.25 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.5 16.5L13.875 14"
                            />
                        </svg>
                    </Link>
                    <Link
                        to="/create"
                        className="flex flex-col items-center text-gray-700 hover:text-gray-900 "
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-7 h-7"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 20.25v-6m0 0v-6m0 6h6m-6 0H6"
                            />
                        </svg>
                    </Link>
                    <Link
                        to="/liked"
                        className="flex flex-col items-center text-gray-700 hover:text-gray-900"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-7 h-7"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 12l6 6L19.5 6"
                            />
                        </svg>
                    </Link>
                    <Link
                        to="/profile"
                        className="flex pr-2 flex-col items-center text-gray-700 hover:text-gray-900"
                    >
                        <Avatar size={2.5} authorName={"AJ"} />
                    </Link>
                </div>
            </div>
        </>
    )
}
