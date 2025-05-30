"use client";
import { ChangeEvent, FC, useState } from "react";

interface Props {
  addTodo: (content: string) => void;
}

const AddTodo: FC<Props> = ({ addTodo }) => {
  const [content, setContent] = useState("");

  const handleContentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleAddClick = () => {
    if (content.trim() !== "") {
      addTodo(content);
      setContent("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddClick();
    }
  };

  return (
    <div className="flex items-center gap-2 p-4 bg-[#4F5D75] rounded-md shadow-lg w-full max-w-md">
      <input
        type="text"
        value={content}
        onChange={handleContentChange}
        onKeyDown={handleKeyDown}
        placeholder="Add a new todo"
        className="bg-[#666666] p-2 rounded-md w-full text-white focus:outline-none focus:ring-2 focus:ring-[#EF8354] font-semibold"
      />
      <button
        onClick={handleAddClick}
        className="bg-[#EF8354] text-white font-semibold py-2 rounded-md w-[8rem] cursor-pointer hover:bg-[#D65A31] transition-colors duration-200"
      >
        Add Todo
      </button>
    </div>
  );
};
export default AddTodo;
