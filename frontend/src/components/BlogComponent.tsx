import { useBlogs } from "../hooks"
import BlogCard, { Avatar } from "./BlogCard"
import { BlogsCardSkeleton } from "./BlogCardSkeleton"

interface Blog {
    id: string
    title: string
    content: string
    authorName: string
    createdOn: string
}

export default function BlogPage({id ,authorName, title, content, createdOn} : Blog) {
    const bio = "skdjflksj kljslkfj lkjfksj kslkf jlsdjfl kjfkjsk jk jkjkj ksljfk jkfsjkldfwiofjoijoi joiwj i"
    const {loading, blogs} = useBlogs();
    return (
        <div className="relative min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
                {/* Blog Content */}
                <div className="flex-1 bg-white rounded-lg shadow-md p-6 overflow-auto">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">{title}</h1>
                    <p className="text-gray-600 leading-relaxed">{content}</p>
                </div>

                {/* Author & Other Blogs */}
                <div className="w-full md:w-1/3 space-y-4">
                    {/* Author Box */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <Avatar authorName={authorName} size={3}/>
                        <h2 className="text-lg pt-5 font-bold text-gray-800">{authorName}</h2>
                        <p className="text-gray-600 mt-2">{bio}</p>
                    </div>

                    {/* Other Blogs */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Other Blogs</h3>
                        <ul className="space-y-2">
                            {loading ? (
                                                    <BlogsCardSkeleton />
                                                ) : (
                                                    blogs.map((blog) => (
                                                        <BlogCard
                                                            key={blog.id}
                                                            id={blog.id}
                                                            authorName={blog.author.name}      
                                                            title={blog.title}
                                                            content={blog.content}
                                                            createdOn={blog.createdAt}
                                                        />
                                                    ))
                                                )}
                            {/* {author.otherBlogs.map((otherBlog) => (
                                <li key={otherid} className="text-blue-500 hover:underline">
                                    {othertitle}
                                </li>
                            ))} */}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
