import BlogCard from "../components/BlogCard";
import Appbar from "../components/Appbar";

export default function Blogs() {
    // const [currentPosts, setCurrentPosts] = useState({title: "", content:"", createdOn:"", })//lazy load more posts (10 posts per scroll)
    
    return (<div className="">
        <div className="border-2 border-x-[51px] md:border-x-[101px] border-slate-950">
            <Appbar />
        </div>
        <div className="flex justify-center">
            <div className="flex-shrink min-w-[50px] z-10 md:min-w-[100px] bg-transparent border border-slate-950"></div>
            <div className="max-w-8xl w-full">
                <BlogCard 
                    authorName="Ajay"
                    title="Latency and throughput tradeoffs of ClickHouse Kafka Table Engine"
                    content={`SeaweedFS is a distributed storage inspired by Facebook’s Haystack photo storage system which is designed to store blobs, objects, and files with predictable low latency with O(1) disk seek (Single disk read operation required to read the requested data from the storage).\n\nHow Seaweedfs Store files\n\nIn the SeaweedFS cluster, files are stored in volumes located in a volume server and volume is just a large empty file with a predefined size that is used to store files. For instance, a 10 GB volume could store 10,000 files with an average size of 1 MB.`}
                    createdOn="2024-12-05T14:30:45.123Z" 
                />
                <BlogCard 
                    authorName="Ajay"
                    title="Latency and throughput tradeoffs of ClickHouse Kafka Table Engine"
                    content={`SeaweedFS is a distributed storage inspired by Facebook’s Haystack photo storage system which is designed to store blobs, objects, and files with predictable low latency with O(1) disk seek (Single disk read operation required to read the requested data from the storage).\n\nHow Seaweedfs Store files\n\nIn the SeaweedFS cluster, files are stored in volumes located in a volume server and volume is just a large empty file with a predefined size that is used to store files. For instance, a 10 GB volume could store 10,000 files with an average size of 1 MB.`}
                    createdOn="2024-12-05T14:30:45.123Z" 
                />
                <BlogCard 
                    authorName="Ajay"
                    title="Latency and throughput tradeoffs of ClickHouse Kafka Table Engine"
                    content={`SeaweedFS is a distributed storage inspired by Facebook’s Haystack photo storage system which is designed to store blobs, objects, and files with predictable low latency with O(1) disk seek (Single disk read operation required to read the requested data from the storage).\n\nHow Seaweedfs Store files\n\nIn the SeaweedFS cluster, files are stored in volumes located in a volume server and volume is just a large empty file with a predefined size that is used to store files. For instance, a 10 GB volume could store 10,000 files with an average size of 1 MB.`}
                    createdOn="2024-12-05T14:30:45.123Z" 
                />
                <BlogCard 
                    authorName="Ajay"
                    title="Latency and throughput tradeoffs of ClickHouse Kafka Table Engine"
                    content={`SeaweedFS is a distributed storage inspired by Facebook’s Haystack photo storage system which is designed to store blobs, objects, and files with predictable low latency with O(1) disk seek (Single disk read operation required to read the requested data from the storage).\n\nHow Seaweedfs Store files\n\nIn the SeaweedFS cluster, files are stored in volumes located in a volume server and volume is just a large empty file with a predefined size that is used to store files. For instance, a 10 GB volume could store 10,000 files with an average size of 1 MB.`}
                    createdOn="2024-12-05T14:30:45.123Z" 
                />
                <BlogCard 
                    authorName="Ajay"
                    title="Latency and throughput tradeoffs of ClickHouse Kafka Table Engine"
                    content={`SeaweedFS is a distributed storage inspired by Facebook’s Haystack photo storage system which is designed to store blobs, objects, and files with predictable low latency with O(1) disk seek (Single disk read operation required to read the requested data from the storage).\n\nHow Seaweedfs Store files\n\nIn the SeaweedFS cluster, files are stored in volumes located in a volume server and volume is just a large empty file with a predefined size that is used to store files. For instance, a 10 GB volume could store 10,000 files with an average size of 1 MB.`}
                    createdOn="2024-12-05T14:30:45.123Z" 
                />
            </div>
            <div className="flex-shrink z-10 min-w-[50px] md:min-w-[100px] bg-transparent border border-slate-950">
            </div>
        </div>
        </div>
    );
}
