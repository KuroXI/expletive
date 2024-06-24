"use server";

import { groq } from "@/lib/groq";
import { redis } from "@/lib/redis";
import { prompt } from "@/lib/schema";

export async function POST(request: Request) {
  const body = await request.json();

  if (redis && (await redis.get(body.message))) {
    return new Response(await redis.get(body.message));
  }

  const result = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: prompt,
      },
      {
        role: "user",
        content: body.message,
      },
    ],
    model: "llama3-8b-8192",
    stream: false,
    response_format: { type: "json_object" },
  });

  if (result.choices[0].message.content) {
    await redis.set(body.message, result.choices[0].message.content);
  }

  return new Response(result.choices[0].message.content);
}
