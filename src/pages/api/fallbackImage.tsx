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
  if (!title) {
    return new ImageResponse(<>{'Visit with "?username=vercel"'}</>, {
      width,
      height,
    })
  }

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          color: 'black',
          background: '#f6f6f6',
          textAlign: 'center',
          width: '100%',
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
        }}
      >
        <p style={{ textAlign: 'center', padding: 10 }}>
          {title.substring(0, 100)}
        </p>
      </div>
    ),
    {
      width,
      height,
    },
  )
}
