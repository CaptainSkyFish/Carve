import React, { useState } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

// ErrorBoundary for RichTextPlugin
function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      {children}
    </React.Suspense>
  );
}

// Custom plugin to capture content updates
function OnChangePlugin({ setContent }: { setContent: (content: string) => void }) {
  const [editor] = useLexicalComposerContext();

  React.useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const serializedContent = JSON.stringify(editorState.toJSON());
        setContent(serializedContent);
      });
    });
  }, [editor, setContent]);

  return null;
}

export default function CreatePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handlePublish = async () => {
    if (!title || !description || !content) {
      alert("All fields are required.");
      return;
    }

    try {
      await axios.post(`${BACKEND_URL}/api/v1/blog/create`, {
        title,
        description,
        content,
      });
      alert("Blog published successfully!");
      navigate("/blogs"); // Redirect to blogs page
    } catch (error) {
      console.error("Error publishing blog:", error);
      alert("Failed to publish the blog. Please try again.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey && e.key === "Enter") {
      handlePublish();
    }
  };

  return (
    <div className="relative p-6 space-y-6" onKeyDown={handleKeyDown}>
      {/* Title Input */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter the title"
        className="w-full text-3xl font-bold border-b border-gray-300 focus:outline-none focus:border-gray-500"
      />

      {/* Description Input */}
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter the description"
        className="w-full text-lg border-b border-gray-300 focus:outline-none focus:border-gray-500"
        rows={2}
      />

      {/* Content Editor */}
      <LexicalComposer
        initialConfig={{
          namespace: "BlogEditor",
          onError: (error) => {
            console.error("Lexical error:", error);
          },
        }}
      >
        <div className="border border-gray-300 rounded-md p-4">
          <RichTextPlugin
            contentEditable={<ContentEditable className="min-h-[200px] outline-none" />}
            placeholder={<div className="text-gray-400">Start writing your blog...</div>}
            ErrorBoundary={ErrorBoundary}
          />
          <OnChangePlugin setContent={setContent} />
        </div>
      </LexicalComposer>

      {/* Publish Button */}
      <button
        onClick={handlePublish}
        className="px-4 py-2 bg-[#0000ff80] text-white font-bold rounded hover:bg-blue-700"
      >
        Publish
      </button>

      {/* Shortcut Hint */}
      <div className="text-gray-500 text-sm">
        Tip: Press <kbd>Ctrl</kbd> + <kbd>Enter</kbd> to publish
      </div>
    </div>
  );
}
