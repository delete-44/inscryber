// Standard transformation utilities
export const HEAVYWEIGHT = "Inscryber:HEAVYWEIGHT.ttf";
export const VICIOUS_HUNGER = "Inscryber:VICIOUSHUNGER.ttf";
export const CLOUDINARY_BASE = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload/`;
export const CLOUDINARY_API_BASE = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`;
export const CARD_BASE = "Inscryber/blank_";

// The amount of time to wait after the user makes
// changes, in ms, before requesting a new image
export const DEBOUNCE_TIMER = 1000;

// The dimensions of the base cards
export const CARD_WIDTH = 691;
export const CARD_HEIGHT = 1050;

// Standard customisation options
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

export const BASES = [
  { filename: "vladde", label: "Normal" },
  { filename: "rare", label: "Rare" },
  { filename: "unsacrificable", label: "Unsacrificable" },
];

export const TRIBES = [
  { filename: "bird", label: "Bird" },
  { filename: "canine", label: "Canine" },
  { filename: "hooved", label: "Hooved" },
  { filename: "insect", label: "Insect" },
  { filename: "reptile", label: "Reptile" },
];

export const CURRENCIES = [
  { filename: "blood", label: "Blood" },
  { filename: "bone", label: "Bone" },
];

export const COSTS = [
  { filename: "blood_1", label: "1 Blood" },
  { filename: "blood_2", label: "2 Blood" },
  { filename: "blood_3", label: "3 Blood" },
  { filename: "blood_4", label: "4 Blood" },
  { filename: "bone_1", label: "1 Bone" },
  { filename: "bone_2", label: "2 Bones" },
  { filename: "bone_3", label: "3 Bones" },
  { filename: "bone_4", label: "4 Bones" },
  { filename: "bone_5", label: "5 Bones" },
  { filename: "bone_6", label: "6 Bones" },
  { filename: "bone_7", label: "7 Bones" },
  { filename: "bone_8", label: "8 Bones" },
  { filename: "bone_9", label: "9 Bones" },
  { filename: "bone_10", label: "10 Bones" },
];

// Links for the ABOUT page
export const LINKS = {
  delete44: "https://www.delete44.com/",
  delete44_twitter: "https://twitter.com/_delete44",
  vladde: "https://cards.vladde.me/",
  dmullins: "https://www.danielmullinsgames.com/",
  inscryption: "https://www.inscryption.com/",
  inscryber_github: "https://github.com/delete-44/inscryber",
  inscryber_trello: "https://trello.com/b/dBsycGJJ/inscryber",
};

// react-select styling config
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
