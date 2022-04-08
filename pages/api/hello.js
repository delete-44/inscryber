// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { generateUrl } from "utils/url-helper.js"

export default function handler(req, res) {
  res.status(200).json({ name: generateUrl() })
}
