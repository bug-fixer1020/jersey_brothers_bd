import { ObjectId } from 'mongodb';
import { getCollection } from '@/lib/mongodb';

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    const products = await getCollection('products');

    const product = await products.findOne({
      _id: new ObjectId(id),
    });

    if (!product) {
      return Response.json(
        { message: 'Product not found' },
        { status: 404 }
      );
    }

    return Response.json(product);
  } catch (error) {
    console.log(error);

    return Response.json(
      { message: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = await params;

    const body = await req.json();

    delete body._id;

    const products = await getCollection('products');

    await products.updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          ...body,
          updatedAt: new Date(),
        },
      }
    );

    return Response.json({
      message: 'Product updated',
    });
  } catch (error) {
    console.log(error);

    return Response.json(
      { message: 'Update failed' },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    const products = await getCollection('products');

    await products.deleteOne({
      _id: new ObjectId(id),
    });

    return Response.json({
      message: 'Product deleted',
    });
  } catch (error) {
    console.log(error);

    return Response.json(
      { message: 'Delete failed' },
      { status: 500 }
    );
  }
}