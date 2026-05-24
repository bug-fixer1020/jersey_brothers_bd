import { getCollection } from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    const users = await getCollection('all_users');

    const allUsers = await users.find({}).toArray();

    return Response.json(allUsers, {
      status: 200
    });
  } catch (error) {
    console.log(error);

    return Response.json(
      { message: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { name, email, password, role } =
      await req.json();

    const users = await getCollection('all_users');

    const existingUser = await users.findOne({
      email
    });

    if (existingUser) {
      return Response.json(
        { message: 'User already exists' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const result = await users.insertOne({
      name,
      email,
      password: hashedPassword,
      role: role || 'user',
      favorites: [],
      orders: [],
      createdAt: new Date()
    });

    return Response.json(
      {
        message: 'User created successfully',
        insertedId: result.insertedId
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);

    return Response.json(
      { message: 'Error creating user' },
      { status: 500 }
    );
  }
}