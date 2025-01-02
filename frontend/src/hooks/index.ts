import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config"

export const useBlog = ({id} : {id: string}) => {
    const [loading, setLoading] = useState(true)
    const [blog, setBlog] = useState<Blog>()

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(response => {
                setBlog(response.data)
                setLoading(false)
            })
            .catch((e) => {
                console.error("Error fetching blog:", e);
                setLoading(false);
            })
    }, [id])

    return { loading, blog }
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true)
    const [blogs, setBlogs] = useState<Blog[]>([])

    useEffect(()=> {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(response => {
                setBlogs(response.data.blogs)
                setLoading(false)
            })
            .catch((e) => {
                console.error("Error fetching blogs:", e);
                setLoading(false);
            })
    }, [])

    return { loading, blogs }
}

interface Blog {
    id: string
    title: string
    content: string
    author: {name: string}
    createdAt: string
}