import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { todos } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function GET() {
  const { userId } = await auth();
  
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  
  const allTodos = await db
    .select()
    .from(todos)
    .where(eq(todos.userId, userId))
    .orderBy(todos.createdAt);
    
  return NextResponse.json(allTodos);
}

export async function POST(request: Request) {
  const { userId } = await auth();
  
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  
  const { content } = await request.json();
  
  const newTodos = await db
    .insert(todos)
    .values({ 
      content,
      userId 
    })
    .returning();
    
  return NextResponse.json(newTodos[0]);
}