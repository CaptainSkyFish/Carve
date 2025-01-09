import React, { useState } from "react";

interface Blog {
  id: number;
  title: string;
}

interface SearchBarProps {
  blogs: Blog[];
}

const SearchBar: React.FC<SearchBarProps> = ({ blogs }) => {
  const [query, setQuery] = useState<string>("");
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    if (searchQuery.trim() === "") {
      setFilteredBlogs([]);
      return;
    }

    const matches = blogs.filter((blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBlogs(matches);
  };

  return (
    <div style={styles.container}>
      <div style={styles.searchBarContainer}>
        <input
          type="text"
          placeholder="Search for blog titles..."
          value={query}
          onChange={handleSearch}
          style={styles.input}
        />
      </div>
      {query && (
        <div style={styles.resultsContainer}>
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <div key={blog.id} style={styles.resultItem}>
                {blog.title}
              </div>
            ))
          ) : (
            <div style={styles.noResults}>No matching blogs found</div>
          )}
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f5f5f7",
    padding: "1rem",
  },
  searchBarContainer: {
    position: "relative",
    width: "50%",
    maxWidth: "600px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    backgroundColor: "white",
    overflow: "hidden",
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    fontSize: "16px",
    border: "none",
    outline: "none",
  },
  resultsContainer: {
    marginTop: "1rem",
    width: "50%",
    maxWidth: "600px",
    backgroundColor: "white",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    overflow: "hidden",
  },
  resultItem: {
    padding: "12px 16px",
    fontSize: "16px",
    borderBottom: "1px solid #e5e5e5",
    cursor: "pointer",
  },
  noResults: {
    padding: "12px 16px",
    fontSize: "16px",
    color: "#999",
    textAlign: "center",
  },
};

export default SearchBar;
