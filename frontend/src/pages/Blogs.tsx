import BlogCard from "../components/BlogCard";
import { useBlogs } from "../hooks";
import { BlogsCardSkeleton } from "../components/BlogCardSkeleton";

export default function Blogs() {
    // const [currentPosts, setCurrentPosts] = useState({title: "", content:"", createdOn:"", })//lazy load more posts (10 posts per scroll)
    const {loading, blogs} = useBlogs();
    return (
        
        <div className="flex justify-center">
            <div className="flex-shrink border-t-0 min-w-[50px] z-10 md:min-w-[100px] bg-transparent border border-slate-950"></div>
            <div className="max-w-8xl bg-slate-300 w-full">
            {loading ? (
                        <BlogsCardSkeleton />
                    ) : (
                        blogs.map((blog) => (
                            <BlogCard
                                key={blog.id}
                                description={blog.description}
                                id={blog.id}
                                authorName={blog.author.name}      
                                title={blog.title}
                                content={blog.content}
                                createdOn={blog.createdAt}
                            />
                        ))
                    )}
            </div>
            <div className="flex-shrink border-t-0 z-10 min-w-[50px] md:min-w-[100px] bg-transparent border border-slate-950">
            </div>
        </div>
    );
}