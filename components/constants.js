export const HEAVYWEIGHT = "Inscryption:HEAVYWEIGHT.ttf";
export const CLOUDINARY_BASE = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload/`;
export const CLOUDINARY_API_BASE = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`;
export const CARD_BASE = "Inscryption/blank_vladde";

export const SIGILS = [
  { filename: "airborne", label: "Airborne" },
  { filename: "ant_spawner", label: "Ant Spawner" },
  { filename: "bees_within", label: "Bees Within" },
  { filename: "bellist", label: "Bellist" },
  { filename: "bifurcated_strike", label: "Bifurcated Strike" },
  { filename: "bone_king", label: "Bone King" },
  { filename: "burrower", label: "Burrower" },
  { filename: "corpse_eater", label: "Corpse Eater" },
  { filename: "dam_builder", label: "Dam Builder" },
  { filename: "fecundity", label: "Fecundity" },
  { filename: "fledgeling", label: "Fledgeling" },
  { filename: "frozen_away", label: "Frozen Away" },
  { filename: "guardian", label: "Guardian" },
  { filename: "hefty", label: "Hefty" },
  { filename: "hoarder", label: "Hoarder" },
  { filename: "leader", label: "Leader" },
  { filename: "loose_tail", label: "Loose Tail" },
  { filename: "many_lives", label: "Many Lives" },
  { filename: "mighty_leap", label: "Mighty Leap" },
  { filename: "rabbithole", label: "Rabbithole" },
  { filename: "random", label: "Random" },
  { filename: "sharp_quills", label: "Sharp Quills" },
  { filename: "sprinter", label: "Sprinter" },
  { filename: "stinky", label: "Stinky" },
  { filename: "touch_of_death", label: "Touch of Death" },
  { filename: "trifurcated_strike", label: "Trifurcated Strike" },
  { filename: "trinket_bearer", label: "Trinket Bearer" },
  { filename: "unkillable", label: "Unkillable" },
  { filename: "waterborne", label: "Waterborne" },
  { filename: "worthy_sacrifice", label: "Worthy Sacrifice" },
];

export const LINKS = {
  delete44: "https://www.delete44.com/",
  delete44_twitter: "https://twitter.com/_delete44",
  vladde: "https://cards.vladde.me/",
  dmullins: "https://www.danielmullinsgames.com/",
  inscryption: "https://www.inscryption.com/",
  inscryber_github: "https://github.com/delete-44/inscryber",
  inscryber_trello: "https://trello.com/b/dBsycGJJ/inscryber",
};

export const SELECT_STYLES = {
  control: (defaultStyles) => {
    return {
      ...defaultStyles,
      fontSize: "1.5rem",
      borderBottom: "2px solid #cc6f33",
    };
  },
  singleValue: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "black",
    };
  },
};

export const SELECT_THEME = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: "#ffb583", // Hover colour
    primary: "#cc6f33", // Border & option highlight colour
    neutral0: "#fff1e7", // Background colour
    neutral10: "#ead7d1", // Multi-select selected options background
    neutral40: "#424242", // "No options" message colour
    neutral50: "#424242", // Placeholder colour
    neutral80: "#000000", // Multi-select selected options text
  },
});
