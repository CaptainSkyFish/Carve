
export function BlogsCardSkeleton() {
    return (<div className="">
        {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="relative border border-slate-400 p-6 py-6 bg-gray-200 animate-pulse rounded-md">
            <div className="h-4 bg-gray-300 rounded w-1/3 mb-4"></div> 
            <div className="h-3 bg-gray-300 rounded w-1/2 mb-2"></div> 
            <div className="h-3 bg-gray-300 rounded w-full mb-2"></div> 
            <div className="h-3 bg-gray-300 rounded w-4/5"></div> 
        </div>))}
        </div>
    )
}


export const BlogCardSkeleton = () => {
    return <div className="bg-slate-400 h-screen rounded-lg"></div>
}