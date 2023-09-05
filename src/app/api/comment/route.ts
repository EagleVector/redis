import { redis } from "@/lib/redis"
import { nanoid } from "nanoid"
import { NextRequest } from "next/server"

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json()
    const { text, tags } = body

    const commentId = nanoid()

    // Add Comment to List
    await redis.lpop('comments');

    //add tags to comment
    await redis.sadd(`tags:${commentId}`, tags)

    return new Response('OK')
  } catch (err) {
    console.log(err)
  }
}