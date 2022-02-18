export default {
  defaultTitle: "Inscryber | Inscryption Card Generator",
  description:
    "Inscryber is a fan-made project celebrating Daniel Mullins' Inscryption. " +
    "Generate custom cards quickly and, hopefully, painlessly. " +
    "Become the newest Scrybe",
  canonical: "https://www.inscryber.delete44.com",
  twitter: {
    cardType: "summary",
    handle: "@_delete44",
  },
  openGraph: {
    type: "website",
    url: "https://www.inscryber.delete44.com",
    title: "Inscryber",
    description:
      "Generate your own custom Inscryption cards. " +
      "This is your chance to become the newest scrybe (citation needed) . " +
      "Celebrating Daniel Mullins' Inscryption.",
    images: [
      {
        url: `https://res.cloudinary.com/delete-44/image/upload/c_scale,w_600/v1644341775/Inscryption/blank_vladde.png`,
        width: 600,
        height: 600,
        alt: "A blank Inscryption card",
      },
    ],
  },
  additionalLinkTags: [
    {
      rel: "icon",
      href: `https://res.cloudinary.com/delete-44/image/upload/c_scale,w_16/v1644341775/Inscryption/blank_vladde.png`,
    },
  ],
  additionalMetaTags: [
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
  ],
};
