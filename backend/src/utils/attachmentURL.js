import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const urlExpiration = parseInt(process.env.SIGNED_URL_EXPIRATION ?? "300", 10)
const bucket = process.env.TODOS_S3_BUCKET
const s3Client = new S3Client({})

export const getUrl = (id) => {
    return `https://${bucket}.s3.amazonaws.com/${id}`;
}

export const generateUrl = async (id) => {
    return await getSignedUrl(s3Client, new PutObjectCommand({
        Bucket: bucket,
        Key: id
    }), { expiresIn: urlExpiration })
}
