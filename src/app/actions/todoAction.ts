"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/db";
import { todos } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";

export const getTodos = async () => {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("User not authenticated");
    }
    const allTodos = await db
        .select()
        .from(todos)
        .where(eq(todos.userId, userId))
        .orderBy(todos.createdAt);
    return allTodos;
};

export const addTodo = async (content: string) => {
    if (!content || content.trim() === "") {
        throw new Error("Content cannot be empty");
    }
    const { userId } = await auth();

    if (!userId) {
        throw new Error("User not authenticated");
    }

    await db.insert(todos).values({
        content,
        userId: userId,
        completed: false,
    });

    revalidatePath("/todos");
}

export const toggleTodo = async (id: number, completed: boolean) => {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("User not authenticated");
    }

    await db
        .update(todos)
        .set({ completed: !completed })
        .where(eq(todos.id, id) && eq(todos.userId, userId));

    revalidatePath("/todos");
};

export const deleteTodo = async (id: number) => {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("User not authenticated");
    }

    await db
        .delete(todos)
        .where(eq(todos.id, id) && eq(todos.userId, userId));

    revalidatePath("/todos");
};

export const editTodo = async (id: number, content: string) => {
    if (!content || content.trim() === "") {
        throw new Error("Content cannot be empty");
    }

    const { userId } = await auth();

    if (!userId) {
        throw new Error("User not authenticated");
    }

    await db
        .update(todos)
        .set({ content })
        .where(eq(todos.id, id) && eq(todos.userId, userId));

    revalidatePath("/todos");
}