import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { getCollection } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(req) {
  try {
    const session =
      await getServerSession(
        authOptions
      );

    if (!session) {
      return Response.json(
        {
          message:
            'Please login first',
        },
        {
          status: 401,
        }
      );
    }

    const { productId } =
      await req.json();

    const users =
      await getCollection(
        'all_users'
      );

    await users.updateOne(
      {
        email:
          session.user.email,
      },
      {
        $addToSet: {
          cart: new ObjectId(
            productId
          ),
        },
      }
    );

    return Response.json({
      message:
        'Added to cart',
    });
  } catch (error) {
    console.log(error);

    return Response.json(
      {
        message: 'Error',
      },
      {
        status: 500,
      }
    );
  }
}