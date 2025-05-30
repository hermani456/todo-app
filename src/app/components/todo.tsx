"use client";

import { ChangeEvent, FC, useState } from "react";
import { todoType } from "@/app/types/todoType";

interface props {
  todo: todoType;
  changeTodoContent: (id: number, content: string) => void;
  toggleIsTodoDone: (id: number, completed: boolean) => void;
  deleteTodoItem: (id: number) => void;
}

const Todo: FC<props> = ({
  todo,
  changeTodoContent,
  toggleIsTodoDone,
  deleteTodoItem,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(todo.content);

  const handleContentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewContent(e.target.value);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    changeTodoContent(todo.id, newContent);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col gap-2 p-4 bg-[#4F5D75] text-white rounded-lg shadow-sm w-full">
      <div className="flex items-center flex-1">
        {isEditing ? (
          <input
            type="text"
            value={newContent}
            onChange={handleContentChange}
            onBlur={handleSaveClick}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
        ) : (
          <span 
            className={` font-semibold ${
              todo.completed 
                ? "line-through text-gray-400" 
                : "text-white"
            }`}
          >
            {todo.content}
          </span>
        )}
      </div>
      <div className="flex items-center justify-start space-x-2">
        <button 
          onClick={() => toggleIsTodoDone(todo.id, todo.completed)}
          className={`px-3 py-1 text-sm rounded-md ${
            todo.completed
              ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
              : "bg-green-100 text-green-700 hover:bg-green-200"
          }`}
        >
          {todo.completed ? "Undo" : "Complete"}
        </button>
        
        {isEditing ? (
          <button 
            onClick={handleSaveClick}
            className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
          >
            Save
          </button>
        ) : (
          <button 
            onClick={handleEditClick}
            className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
          >
            Edit
          </button>
        )}
        
        <button 
          onClick={() => deleteTodoItem(todo.id)}
          className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Todo;