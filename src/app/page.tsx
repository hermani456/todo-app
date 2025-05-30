import { getTodos } from "@/app/actions/todoAction";
import Todos from "@/app/components/todos";
  
export default async function Home() {
  const todos = await getTodos();

  return (
    <main className="flex min-h-screen flex-col items-center p-5 bg-[#2D3142]">
      <h1 className="text-4xl font-bold mb-8">Todo List</h1>
      <Todos todos={todos} />
    </main>
  );
}