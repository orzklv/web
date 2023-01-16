import type { NextApiRequest, NextApiResponse } from 'next'
import * as util from 'minecraft-server-util'

export default async function handler(
  // @ts-ignore
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  return await util
    .status('cxsmxs.space', 25565, {
      timeout: 1000 * 5,
      enableSRV: true,
    })
    .then((r) =>
      res.status(200).json({
        status: true,
        content: r,
      })
    )
    .catch((e) =>
      res.status(500).json({
        status: false,
        content: e,
      })
    )
}
