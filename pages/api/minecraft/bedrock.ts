import type { NextApiRequest, NextApiResponse } from 'next'
import * as util from 'minecraft-server-util'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  return await util
    .statusBedrock('cxsmxs.space', 19132, {
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
