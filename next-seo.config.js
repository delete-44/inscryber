export default {
  defaultTitle: "Inscryber | Inscryption Card Generator",
  description:
    "Inscryber is a fan-made project celebrating Daniel Mullins' Inscryption. " +
    "Generate custom cards quickly and, hopefully, painlessly. " +
    "Become the newest Scrybe.",
  canonical: "https://www.inscryber.delete44.com",
  twitter: {
    cardType: "summary",
    handle: "@_delete44",
  },
  openGraph: {
    type: "website",
    url: "https://www.inscryber.delete44.com",
    title: "Inscryber | Inscryption Card Generator",
    description:
      "Generate your own custom Inscryption cards. " +
      "This is your chance to become the newest scrybe (citation needed). " +
      "Celebrating Daniel Mullins' Inscryption.",
    images: [
      {
        url: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload/c_scale,w_600/v1644341775/Inscryber/demo_card.png`,
        width: 600,
        height: 600,
        alt: "A blank Inscryption card",
      },
    ],
  },
  additionalLinkTags: [
    {
      rel: "icon",
      href: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload/c_crop,g_face:auto,h_237,w_237/c_scale,w_16/v1645197267/Inscryber/demo_card.png`,
    },
  ],
  additionalMetaTags: [
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
  ],
};
