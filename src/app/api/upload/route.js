import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const formData = await req.formData();

    const files = formData.getAll('images');

    if (!files || files.length === 0) {
      return Response.json(
        { message: 'No images found' },
        { status: 400 }
      );
    }

    const uploadedImages = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();

      const buffer = Buffer.from(bytes);

      const result = await new Promise(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder: 'jersey_products',
              },
              (error, result) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(result);
                }
              }
            )
            .end(buffer);
        }
      );

      uploadedImages.push({
        url: result.secure_url,
        public_id: result.public_id,
      });
    }

    return Response.json(
      {
        success: true,
        images: uploadedImages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log('UPLOAD ERROR:', error);

    return Response.json(
      {
        success: false,
        message: error.message || 'Upload failed',
      },
      { status: 500 }
    );
  }
}