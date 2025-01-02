import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { BlogCardSkeleton } from "../components/BlogCardSkeleton";
import BlogComponent from "../components/BlogComponent";

export default function Blog() {
  const { id } = useParams()
  const {loading, blog} = useBlog({id: id || ""})

  return (<div>
    <div className="flex justify-center">
    <div className="flex-shrink min-w-[50px] z-10 md:min-w-[100px] bg-transparent border border-slate-950" />

    <div className="max-w-8xl w-full">
                {loading ? (
                            <BlogCardSkeleton />
                        ) : (
                            (
                                <BlogComponent
                                    authorName={blog.author.name}      
                                    title={blog.title}
                                    content={blog.content}
                                    createdOn={blog.createdAt}
                                />
                            )
                        )}
                </div>
                <div className="flex-shrink z-10 min-w-[50px] md:min-w-[100px] bg-transparent border border-slate-950" />
    </div>
  </div>
  );
}
