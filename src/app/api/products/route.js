import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("jersey_brother_bd");
    const products = db.collection("products");

    const allProducts = await products.find({}).toArray();

    return Response.json(allProducts, { status: 200 });
  } catch (error) {
    console.error("GET Error:", error);

    return Response.json(
      { message: "Error fetching products" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return Response.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const productData = await req.json();

    const client = await clientPromise;
    const db = client.db("jersey_brother_bd");
    const products = db.collection("products");

    const result = await products.insertOne({
      ...productData,
      reviews: [],
      createdAt: new Date(),
    });

    return Response.json(
      {
        message: "Product created",
        productId: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST Error:", error);

    return Response.json(
      { message: "Error creating product" },
      { status: 500 }
    );
  }
}