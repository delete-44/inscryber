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
  { value: "airborne", label: "Airborne" },
  { value: "ant_spawner", label: "Ant Spawner" },
  { value: "bees_within", label: "Bees Within" },
  { value: "bellist", label: "Bellist" },
  { value: "bifurcated_strike", label: "Bifurcated Strike" },
  { value: "bone_king", label: "Bone King" },
  { value: "burrower", label: "Burrower" },
  { value: "corpse_eater", label: "Corpse Eater" },
  { value: "dam_builder", label: "Dam Builder" },
  { value: "fecundity", label: "Fecundity" },
  { value: "fledgeling", label: "Fledgeling" },
  { value: "frozen_away", label: "Frozen Away" },
  { value: "guardian", label: "Guardian" },
  { value: "hefty", label: "Hefty" },
  { value: "hoarder", label: "Hoarder" },
  { value: "leader", label: "Leader" },
  { value: "loose_tail", label: "Loose Tail" },
  { value: "many_lives", label: "Many Lives" },
  { value: "mighty_leap", label: "Mighty Leap" },
  { value: "moon_strike", label: "Moon Strike" },
  { value: "rabbithole", label: "Rabbithole" },
  { value: "random", label: "Random" },
  { value: "repulsive", label: "Repulsive" },
  { value: "sharp_quills", label: "Sharp Quills" },
  { value: "sprinter", label: "Sprinter" },
  { value: "steel_trap", label: "Steel Trap" },
  { value: "stinky", label: "Stinky" },
  { value: "tidal_lock", label: "Tidal Lock" },
  { value: "touch_of_death", label: "Touch of Death" },
  { value: "trifurcated_strike", label: "Trifurcated Strike" },
  { value: "trinket_bearer", label: "Trinket Bearer" },
  { value: "unkillable", label: "Unkillable" },
  { value: "waterborne", label: "Waterborne" },
  { value: "worthy_sacrifice", label: "Worthy Sacrifice" },
];

export const GRIMORA_SIGILS = [
  { value: "Grimora:apparition", label: "Apparition" },
  { value: "Grimora:bloodguzzler", label: "Bloodguzzler" },
  { value: "Grimora:bonedigger", label: "Bonedigger" },
  { value: "Grimora:brittle", label: "Brittle" },
  { value: "Grimora:exploding_corpse", label: "Exploding Corpse" },
  { value: "Grimora:haunter", label: "Haunter" },
];

export const MAGNIFICUS_SIGILS = [
  { value: "Magnificus:arms_of_edaxio", label: "Arms of Edaxio" },
  { value: "Magnificus:head_of_edaxio", label: "Head of Edaxio" },
  { value: "Magnificus:legs_of_edaxio", label: "Legs of Edaxio" },
  { value: "Magnificus:torso_of_edaxio", label: "Torso of Edaxio" },
  { value: "Magnificus:gem_animator", label: "Gem Animator" },
  { value: "Magnificus:gem_dependant", label: "Gem Dependant" },
  { value: "Magnificus:gem_guardian", label: "Gem Guardian" },
  { value: "Magnificus:mental_gemnastics", label: "Mental Gemnastics" },
  { value: "Magnificus:blue_mox", label: "Blue Mox" },
  { value: "Magnificus:green_mox", label: "Green Mox" },
  { value: "Magnificus:orange_mox", label: "Orange Mox" },
  { value: "Magnificus:ruby_heart", label: "Ruby Heart" },
  { value: "Magnificus:virtual_realist", label: "Virtual Realist" },
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
