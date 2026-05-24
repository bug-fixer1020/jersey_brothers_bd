
import { getCollection } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function PUT(req, { params }) {
  try {
    const users = await getCollection('all_users');

    const body = await req.json();

    await users.updateOne(
      {
        _id: new ObjectId(params.id),
      },
      {
        $set: {
          role: body.role,
        },
      }
    );

    return Response.json({
      message: 'User updated',
    });
  } catch (error) {
    return Response.json(
      {
        message: 'Update failed',
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const users = await getCollection('all_users');

    await users.deleteOne({
      _id: new ObjectId(params.id),
    });

    return Response.json({
      message: 'User deleted',
    });
  } catch (error) {
    return Response.json(
      {
        message: 'Delete failed',
      },
      {
        status: 500,
      }
    );
  }
}
