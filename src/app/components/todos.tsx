"use client";
import { FC, useState } from "react";
import { todoType } from "@/app/types/todoType";
import Todo from "./todo";
import AddTodo from "./addTodo";
import { addTodo, deleteTodo, editTodo, toggleTodo } from "@/app/actions/todoAction";

interface Props {
  todos: todoType[];
}

const Todos: FC<Props> = ({ todos }) => {
  const [todoList, setTodoList] = useState<todoType[]>(todos);

  const changeTodoContent = async (id: number, content: string) => {
    await editTodo(id, content);
    setTodoList((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, content } : todo))
    );
  };

  const toggleIsTodoDone = async (id: number, completed: boolean) => {
    await toggleTodo(id, completed);
    setTodoList((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !completed } : todo
      )
    );
  };

  const deleteTodoItem = async (id: number) => {
    await deleteTodo(id);
    setTodoList((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleAddTodo = async (content: string) => {
    await addTodo(content);
    setTodoList((prev) => [
      ...prev,
      { id: Date.now(), content, completed: false, createdAt: new Date(), userId: "" },
    ]);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-start gap-4">
      <AddTodo addTodo={handleAddTodo} />
      {todoList.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          changeTodoContent={changeTodoContent}
          toggleIsTodoDone={toggleIsTodoDone}
          deleteTodoItem={deleteTodoItem}
        />
      ))}
    </div>
  );
};
export default Todos;
