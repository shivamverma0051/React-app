import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);

  // Use find() to get a single object instead of filter()
  const paste = allPastes.find((p) => p._id === id);

  console.log("Final Paste:", paste);

  return (
    <div >
      <div className="flex flex-row gap-7 place-content-between">
        {/* Title Input */}
        <input
          className="p-2 rounded-5xl mt-2 w-[66%] pl-5"
          type="text"
          placeholder="Enter title here"
          value={paste?.title || ""} // Safe access
          disabled
        />
      </div>

      <div className="mt-8">
        {/* Content Textarea */}
        <textarea
          className="rounded-2xl mt-4 min-w-[500px] p-4"
          placeholder="Enter content here"
          disabled
          value={paste?.content || ""} // Safe access
          rows={20}
        />
      </div>
    </div>
  );
};

export default ViewPaste;