import { writeFileSync } from 'node:fs'
import path from 'node:path'
import { defineEventHandler, getQuery } from 'h3'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const prompt = query.prompt as string
  const size = (query.size as 'auto' | '1024x1024' | '1536x1024' | '1024x1536') || 'auto'
  const quality = (query.quality as 'auto' | 'low' | 'medium' | 'high') || 'auto'
  const background = (query.background as 'transparent' | 'opaque' | 'auto') || 'auto'
  const outputFormat = (query.outputFormat as 'png' | 'jpeg' | 'webp') || 'png'

  const result = await openai.images.generate({
    model: 'gpt-image-1',
    prompt,
    size,
    quality,
    background,
  })

  if (!result.data) {
    throw new Error('No image data returned from OpenAI API')
  }

  const image_base64 = result.data[0].b64_json as string
  const image_bytes = Buffer.from(image_base64, 'base64')
  const imageName = `${Date.now()}.${outputFormat}`
  const imagePath = path.join('public', 'gen-imgs', imageName)
  writeFileSync(imagePath, image_bytes)

  return {
    image: `/gen-imgs/${imageName}`,
  }
})
