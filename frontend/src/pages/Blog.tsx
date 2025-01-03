import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { BlogCardSkeleton } from "../components/BlogCardSkeleton";
import BlogComponent from "../components/BlogComponent";

export default function Blog() {
  const { id } = useParams<{id: string}>() 
  const {loading, blog} = useBlog({id: id || ""})

  return (<div>
    <div className="flex justify-center">
    <div className="flex-shrink border-t-0 min-w-[50px] z-10 md:min-w-[100px] bg-transparent border border-slate-950" />

    <div className="max-w-8xl w-full">
                {loading ? (
                            <BlogCardSkeleton />
                        ) : blog? (
                            (
                                <BlogComponent
                                    id={blog.id}
                                    authorName={blog.author.name}  
                                    authorBio={blog.author.bio}   
                                    title={blog.title}
                                    content={blog.content}
                                    description={blog.description}
                                    createdOn={blog.createdAt}
                                />
                            )
                        ) : (
                          <div className="flex bg-slate-400 h-screen justify-center">
                            <p className="relative rounded-xl max-w-fit max-h-fit bg-gray-800 px-10 py-4 text-center text-xl font-bold text-red-700">Blog not found!</p>
                          </div>
                        )}
                </div>
                <div className="flex-shrink border-t-0 z-10 min-w-[50px] md:min-w-[100px] bg-transparent border border-slate-950" />
    </div>
  </div>
  );
}
