import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/database/connnection/database-connection';
import { Todo } from '@/lib/database/models/Todo';

// UPDATE a Todo
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const data = await req.json();

  await dbConnect();

  const updatedTodo = await Todo.findByIdAndUpdate(id, data, { new: true });

  if (!updatedTodo) {
    return NextResponse.json({ message: 'Todo not found' }, { status: 404 });
  }

  return NextResponse.json(updatedTodo);
}

// DELETE a Todo
export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  await dbConnect();

  const deletedTodo = await Todo.findByIdAndDelete(id);

  if (!deletedTodo) {
    return NextResponse.json({ message: 'Todo not found' }, { status: 404 });
  }

  return NextResponse.json({ message: 'Todo deleted successfully' });
}
