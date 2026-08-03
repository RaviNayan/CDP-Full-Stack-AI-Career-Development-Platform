"use client";

import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";

const CoverLetterPreview = ({ content }) => {
  const [letter, setLetter] = useState(content);

  return (
    <div className="py-4">
      <MDEditor
        value={letter}
        onChange={setLetter}
        preview="edit"
        height={700}
      />
    </div>
  );
};

export default CoverLetterPreview;