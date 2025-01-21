import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Avatar } from "../components/BlogCard";

type Blog = {
  id: string;
  title: string;
  description: string;
};

type Profile = {
  username: string;
  bio: string;
  blogs: Blog[];
};

export default function Profile() {
  //   const { username } = useParams<{ username: string }>()
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const location = useLocation();
  const username = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${BACKEND_URL}/api/v1/user/profile/${username}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setProfile(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load profile. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  if (loading) {
    return (
      <div className="relative">
        <div className=" top-0 left-0 w-full h-3 bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 animate-loading"></div>
        <div className="text-center mt-10"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative text-center mt-10 text-red-500">{error}</div>
    );
  }

  if (!profile) {
    return <div className="relative text-center mt-10">Profile not found.</div>;
  }

  return (
    <div className="relative p-6 justify-center flex flex-col md:flex-row">
      {/* User Info */}
      <div className="bg-gray-200/40 md:w-[35%] p-8 max-h-fit rounded-lg shadow-md">
        <Avatar size={7} authorName={profile.username} />
        <div>
          <h1 className="text-3xl pl-0 p-4 font-bold text-gray-800">
            {profile.username}
          </h1>
          <p className="text-gray-600 leading-5 text-justify">
            {profile.bio || "This user has no bio."}
          </p>
        </div>
      </div>

      {/* Blogs */}
      <div className="mt-8 md:mt-0 md:m-8">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Blogs</h2>
        {profile.blogs.length > 0 ? (
          <div className="space-y-4">
            {profile.blogs.map((blog) => (
              <div
                key={blog.id}
                className="p-4 bg-slate-200/60 shadow-md rounded-lg hover:shadow-lg transition"
              >
                <h3 className="text-xl font-bold text-gray-800">
                  {blog.title}
                </h3>
                <p className="text-gray-600">{blog.description}</p>
                <a
                  href={`/blog/${blog.id}`}
                  className="text-blue-600 hover:underline mt-2 inline-block"
                >
                  Read More
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">
            This user has not published any blogs yet.
          </p>
        )}
      </div>
    </div>
  );
}
