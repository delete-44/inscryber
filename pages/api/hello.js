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
      sigils: ["Kaycee:double_strike", "PO3:dead_byte"],
      patches: [
        "PO3:null_conduit",
        "Additional:blank",
        "Magnificus:blue_mox",
        "loose_tail",
      ],
      tribes: ["bird", "reptile"],
      overlays: ["blood_1", "fungus", "stitches"],
      portrait: {
        filename: "Inscryber:Uploads:fypni5svl58dcrxke5oc",
        manipulations: ["t_bleach_colour", "t_distort_edges"],
      },
    }),
  });
}
