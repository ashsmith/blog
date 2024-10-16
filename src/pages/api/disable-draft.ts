import { NextApiRequest, NextApiResponse } from 'next'
export const runtime = 'edge'
export default function disable(
  req: NextApiRequest,
  res: NextApiResponse<string | void>,
) {
  res.setDraftMode({ enable: false })
  res.writeHead(307, { Location: '/' })
  res.end()
}
