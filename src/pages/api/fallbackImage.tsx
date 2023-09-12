import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const config = {
  runtime: 'edge',
}

export default async function handler(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const title = searchParams.get('title')
  const width = parseInt(searchParams.get('w')) || 500
  const height = parseInt(searchParams.get('h')) || 300
  return new ImageResponse(
    (
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center w-full h-full">
        {title && <p className="text-white text-center p-5">{title}</p>}
      </div>
    ),
    {
      width,
      height,
    },
  )
}
