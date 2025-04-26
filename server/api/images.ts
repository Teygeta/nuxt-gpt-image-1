import { readdirSync } from 'node:fs'
import path from 'node:path'
import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  const imagesDirectory = path.join('public', 'gen-imgs');
  const imageFiles = readdirSync(imagesDirectory);

  const images = imageFiles.map(file => `/gen-imgs/${file}`);

  return {
    images
  }
})