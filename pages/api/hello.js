// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { generateUrl } from "src/utils/url-helper.js";

export default function handler(_req, res) {
  res.status(200).json({
    url: generateUrl({
      name: "test name transformation",
      power: 100,
      health: "20",
      cost: {
        currency: "blood",
        value: 20,
      },
    }),
  });
}
