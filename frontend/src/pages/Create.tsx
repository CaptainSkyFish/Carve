import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../config"

export default function CreatePage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  
  const [alertVar, setAlert] = useState(false)
  const navigate = useNavigate()


  const handlePublish = async () => {
    setLoading(true)
    if (!title || !description || !content) {
      setLoading(false)
      setAlert(true)
      setTimeout(()=>{setAlert(false)}, 5000)
      return
    }

    try {
      const token = localStorage.getItem("token")
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        {
          title,
          description,
          content,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      const id = res.data.id
      alert("Blog published successfully!")
      navigate(`/blog/${id}`)
    } catch (error) {
      console.error("Error publishing blog:", error)
      alert("Failed to publish the blog. Please try again.")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey && e.key === "Enter") {
      handlePublish()
    }
  }

  if (loading) {
    return (
        <div className="relative">
          <div className=" top-0 left-0 w-full h-3 bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 animate-loading"></div>
          <div className="text-center mt-10"></div>
        </div>
      )
  }

  return (
    <div className="flex min-h-screen justify-center items-center mt-4">
    {alertVar ? 
    <div className="fixed font-extrabold bottom-1 right-1 bg-slate-900 rounded-md p-2 flex-col text-slate-200">
      <div className="pl-4">Alert!</div>
    <div className="p-4 font-bold text-red-600">All fields are required!</div></div> 
    : (null) }
    
    <div className="min-w-[210mm] bg-white/10 backdrop-blur-lg border border-gray-300/20 shadow-2xl rounded-xl flex flex-col p-6 space-y-6">
      <div className="w-full space-y-6" onKeyDown={handleKeyDown}>
      <textarea
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter the title"
          className="w-full text-5xl bg-transparent font-bold focus:outline-none resize-none overflow-hidden"
          style={{
            lineHeight: "1.2",
          }}
          onInput={(e) => {
            e.currentTarget.style.height = "auto"
            e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`
          }}          
          rows={1}
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter the description"
          className="w-full italic text-lg bg-transparent focus:outline-none resize-none overflow-hidden"
          style={{
            height: "auto",
            lineHeight: "1.2",
          }}
          onInput={(e) => {
            e.currentTarget.style.height = "auto"
            e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`
          }}
          rows={1}
        />


          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Tell Your Story"
            className="w-full min-h-screen text-lg h-full bg-transparent resize-none overflow-hidden outline-none"
            style={{
              height: "10%",
            }}
            onInput={(e) => {
              e.currentTarget.style.height = "auto"
              e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`
            }}
          />
        </div>

    <button
      onClick={handlePublish}
      className="max-w-fit relative inline-block p-px text-white bg-gray-600 shadow-2xl cursor-pointer rounded-full shadow-zinc-900 transition-transform duration-300 group ease-in-out hover:scale-105 active:scale-95"
    >
      <span
        className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[10px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      ></span>

      <span className="relative z-10 block px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-950">
          <span className="transition-all duration-500 group-hover:translate-x-1"
            >Publish</span>
      </span>
    </button>


      <div className="text-gray-500 text-sm">
        Tip: Press <kbd>Ctrl</kbd> + <kbd>Enter</kbd> to publish
      </div>
    </div></div>
  )
}
