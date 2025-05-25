import dbConnect from '@/lib/database/connnection/database-connection';
import { Todo } from '@/lib/database/models/Todo';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url); //  this works in App Router
  const userId = searchParams.get('userId');

  if (!userId) return NextResponse.json({ error: "Missing userId" }, { status: 400 });

  await dbConnect();
  const todos = await Todo.find({ userId }).sort({ addTime: -1 });
  return NextResponse.json(todos);
}
export async function POST(req: Request) {
  const { userId, text } = await req.json();

  if (!userId || !text) return NextResponse.json({ error: "Missing data" }, { status: 400 });

  await dbConnect();
  const todo = await Todo.create({ userId, text });
  return NextResponse.json(todo, { status: 201 });
}
