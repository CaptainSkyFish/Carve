import { useMemo } from "react";
import { timeElapsed } from "./TimeElapsed";
import { Link } from "react-router-dom";

interface BlogCardProps {
  id: string;
  authorName: string;
  content: string;
  title: string;
  createdOn: string;
  description: string;
}

export default function BlogCard({
  authorName,
  title,
  content,
  createdOn,
  id,
  description,
}: BlogCardProps) {
  const readTime = Math.floor(content.split(" ").length / 60);

  return (
    <Link to={`/blog/${id}`}>
      <div className="relative border border-slate-800 group rounded-md p-10 py-6 z-20 transition-all duration-300 ease-in-out transform hover:bg-[#f4f0e8c5] hover:backdrop-blur-xl hover:shadow-[inset_0_0_0_1px] hover:rounded-lg hover:shadow-slate-800">
        <div className="text-sm font-fjalla text-gray-700 flex items-center space-x-2">
          <DatePublished createdOn={createdOn} />
          <span className="text-gray-500">({timeElapsed(createdOn)})</span>
        </div>
        <div className="lg:grid grid-cols-2">
          <div>
            <h2 className="text-2xl py-2 font-anton pr-8 group-hover:underline text-gray-800 mt-2 text-pretty border-slate-950">
              {title}
            </h2>
            <div className="flex items-center text-sm text-gray-600 mt-2">
              <div className="flex font-fjalla items-center space-x-2">
                <Avatar size={2.5} authorName={authorName} />
                <span className="text-base">By {authorName}</span>
              </div>
              <span className="mx-2">•</span>
              <span className="font-dmserif">
                {readTime > 0 ? readTime : "less than 1"} min read
              </span>
            </div>
          </div>

          <p className="text-gray-500 text-pretty text-base font-bold mt-4 lg:px-20 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}

export const Avatar = ({
  authorName,
  size,
}: {
  authorName: string;
  size: string | number;
}) => {
  const backgroundColor = useMemo(() => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 85%)`;
  }, []);

  const avatarStyle = {
    backgroundColor,
    width: `${size}rem`,
    height: `${size}rem`,
  };

  return (
    <div
      className={`flex font-katros items-center justify-center rounded-full text-white text-lg font-bold`}
      style={avatarStyle}
    >
      {authorName.charAt(0).toUpperCase()}
    </div>
  );
};

// const contentPreview = (content: string) => {
//       const sentences = content.split('.').filter(Boolean)
//       const truncated = sentences.slice(0, 3).join('. ').slice(0, 150) + "..."
//       return truncated.trim()
//     }

export const DatePublished = ({ createdOn }: { createdOn: string }) => {
  return (
    <div className="font-fjalla space-x-2">
      <span>
        {new Date(createdOn).toLocaleString("en-US", { month: "long" })}
      </span>
      <span>{new Date(createdOn).getDate()},</span>
      <span>{new Date(createdOn).getFullYear()}</span>
    </div>
  );
};
