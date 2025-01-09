import { useBlogs } from "../hooks"
import { Avatar, DatePublished } from "./BlogCard"
import { BlogsCardSkeleton } from "./BlogCardSkeleton"
import { timeElapsed } from "./TimeElapsed"

interface Blog {
    id: string
    title: string
    content: string
    description: string
    authorName: string
    authorBio: string
    createdOn: string
}

export default function BlogPage({authorName, title, content, description, authorBio, createdOn} : Blog) {
    const readTime = Math.floor(content.split(" ").length/60)
    const {loading, blogs} = useBlogs();
    return (
        <div className="relative min-h-screen p-6">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row space-y-4 md:space-y-0 md:space-x-6">
                {/* Blog Content */}
                <div className="flex-1 bg-gray-200/50 rounded-lg shadow-md p-6 overflow-auto">
                    <h1 className="text-[35px] lg:text-[42px] font-bold text-left text-gray-800 mb-4">{title}</h1>
                    <h2 className="text-[18px] lg:text-[22px] font-bold text-left text-gray-500 mb-4">{description}</h2>
                    <p className="text-gray-700 lg:text-md leading-relaxed">{content}</p>
                </div>

                {/* Author & Other Blogs */}
                <div className="w-full md:w-1/3 space-y-4">
                    {/* Author Box */}
                    <div className="bg-gray-200/50 rounded-lg shadow-md p-2">
                    <div className="font-bold text-gray-800 p-4 text-3xl">Author</div>
                    <div className="p-4 bg-gray-200/50 backdrop-blur-md shadow-sm rounded-lg hover:shadow-lg hover:backdrop-blur-xl hover:bg-gray-200/80 transition-all duration-300 ease-in-out">
                    <div className="flex-shrink-0 flex flex-row items-center">
                        <Avatar authorName={authorName} size={3.5} />
                        <h2 className="text-lg px-[3%] font-bold text-gray-800">{authorName}</h2>
                    </div>
                    <div>
                        <p className="text-gray-600 font-semibold text-md mt-1">{authorBio}</p>
                    </div>
                    </div>
                    
                    <div className="p-4">
                    <div className="text-md text-slate-800 flex items-center space-x-2 mt-2">
                    <DatePublished createdOn={createdOn} />
                    <span className="mx-2">•</span>
                    <span className="text-gray-500">({timeElapsed(createdOn)})</span>
                    </div>
                        <span className="text-gray-500">{readTime > 0 ? readTime : "less than 1"} min read</span>
                    </div></div>

                    {/* Other Blogs */}
                    <div className="bg-gray-200/50 rounded-lg shadow-md p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">More Blogs</h3>
                        <ul className="space-y-2">
                            {loading ? (
                                                    <BlogsCardSkeleton />
                                                ) : (
                                                    blogs.map((blog) => (
                                                            <li key={blog.id} className="text-l py-2 leading-tight font-bold pr-8 hover:underline text-gray-800 mt-2 text-pretty border-slate-950">
                                                                {blog.title}
                                                            </li>
                                                        )
                                                    ))
                                                }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
