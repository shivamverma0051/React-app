import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { Pencil, Eye, Trash, Clipboard, Share2 } from "lucide-react"; // Import icons

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes) || []; // Ensure pastes is an array
  const [searchTerm, setSearchTerm] = useState("");
  const [shareLinks, setShareLinks] = useState({});

  const dispatch = useDispatch();

  // ✅ Fix applied: Ensure title is not undefined before calling `.toLowerCase()`
    const filteredData = pastes.filter((paste) =>
    paste?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    if (window.confirm("Are you sure you want to delete this paste?")) {
      dispatch(removeFromPastes(pasteId));
      toast.success("Paste deleted successfully!");
    }
  }

  function handleShare(paste) {
    const shareLink = `${window.location.origin}/view/${paste._id}`;
    setShareLinks((prevLinks) => ({
      ...prevLinks,
      [paste._id]: shareLink,
    }));
    toast.success("Shareable link generated!");
  }

  return (
    <div className="p-5">
      {/* Search Bar */}
      <input
        className="p-2 border rounded-2xl w-full max-w-[600px] mt-5"
        type="search"
        placeholder="Search here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Paste List */}
      <div className="flex flex-col gap-5 mt-5">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div
  className="relative border p-10 rounded-lg shadow-md bg-gray-900 text-white w-[10cm] h-[4cm] mx-auto"
  key={paste._id}
>


              {/* Icons (Aligned at Upper Right) */}
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  className="text-blue-400 hover:text-blue-500"
                  title="Edit"
                >
                  <a href={paste?._id ? `/?pasteId=${paste._id}` : "#"}>
                    <Pencil size={18} />
                  </a>
                </button>
                <button
                  className="text-green-400 hover:text-green-500"
                  title="View"
                >
                  <a href={paste?._id ? `/pastes/${paste._id}` : "#"}>
                    <Eye size={18} />
                  </a>
                </button>
                <button
                  className="text-red-400 hover:text-red-500"
                  onClick={() => handleDelete(paste._id)}
                  title="Delete"
                >
                  <Trash size={18} />
                </button>
                <button
                  className="text-gray-400 hover:text-gray-500"
                  onClick={() => {
                    try {
                      navigator.clipboard.writeText(paste?.content || "");
                      toast.success("Copied to clipboard");
                    } catch (error) {
                      toast.error("Failed to copy!");
                    }
                  }}
                  title="Copy"
                >
                  <Clipboard size={18} />
                </button>
                <button
                  className="text-purple-400 hover:text-purple-500"
                  onClick={() => handleShare(paste)}
                  title="Share"
                >
                  <Share2 size={18} />
                </button>
              </div>

              {/* Paste Content */}
              <div className="font-bold text-lg">{paste?.title || "Untitled Paste"}</div>
              <p className="text-gray-300">{paste?.content || "No content available"}</p>

              {/* Display Shareable Link */}
              {shareLinks[paste._id] && (
                <div className="mt-3 bg-gray-700 p-2 rounded-md">
                  <p className="text-sm text-gray-300">Shareable Link:</p>
                  <input
                    type="text"
                    className="w-full bg-gray-600 p-1 rounded-md text-white"
                    value={shareLinks[paste._id]}
                    readOnly
                  />
                  <button
                    className="mt-2 bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => {
                      navigator.clipboard.writeText(shareLinks[paste._id]);
                      toast.success("Link copied!");
                    }}
                  >
                    Copy Link
                  </button>
                </div>
              )}

              <div className="text-sm text-gray-500">{paste.createdAt || "Unknown Date"}</div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No pastes found</p>
        )}
      </div>
    </div>
  );
};

export default Paste;




