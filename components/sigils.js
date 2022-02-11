import React, { useState, useEffect } from "react";
import Select from "react-select";

const Sigils = (props) => {
  const [sigil, setSigil] = useState("");
  const { setSigilsTF } = props;

  const options = [
    { value: "", label: "No sigils" },
    { value: "v1644605839:Inscryption:Sigils:airborne", label: "Airborne" },
    { value: "v1644619391:Inscryption:Sigils:ant_spawner", label: "Ant Spawner" },
    { value: "v1644619391:Inscryption:Sigils:bees_within", label: "Bees Within" },
    { value: "v1644619391:Inscryption:Sigils:bellist", label: "Bellist" },
    { value: "v1644605839:Inscryption:Sigils:bifurcated_strike", label: "Bifurcated Strike" },
    { value: "v1644619391:Inscryption:Sigils:bone_king", label: "Bone King" },
    { value: "v1644619391:Inscryption:Sigils:burrower", label: "Burrower" },
    { value: "v1644619389:Inscryption:Sigils:corpse_eater", label: "Corpse Eater" },
    { value: "v1644619389:Inscryption:Sigils:dam_builder", label: "Dam Builder" },
    { value: "v1644619389:Inscryption:Sigils:fecundity", label: "Fecundity" },
    { value: "v1644619389:Inscryption:Sigils:fledgeling", label: "Fledgeling" },
    { value: "v1644619389:Inscryption:Sigils:frozen_away", label: "Frozen Away" },
    { value: "v1644619389:Inscryption:Sigils:guardian", label: "Guardian" },
    { value: "v1644619390:Inscryption:Sigils:hefty", label: "Hefty" },
    { value: "v1644619390:Inscryption:Sigils:hoarder", label: "Hoarder" },
    { value: "v1644619390:Inscryption:Sigils:leader", label: "Leader" },
    { value: "v1644619390:Inscryption:Sigils:loose_tail", label: "Loose Tail" },
    { value: "v1644619390:Inscryption:Sigils:many_lives", label: "Many Lives" },
    { value: "v1644615059:Inscryption:Sigils:mighty_leap", label: "Mighty Leap" },
    { value: "v1644619390:Inscryption:Sigils:rabbithole", label: "Rabbithole" },
    { value: "v1644619390:Inscryption:Sigils:random", label: "Random" },
    { value: "v1644619390:Inscryption:Sigils:sharp_quills", label: "Sharp Quills" },
    { value: "v1644619390:Inscryption:Sigils:sprinter", label: "Sprinter" },
    { value: "v1644619390:Inscryption:Sigils:stinky", label: "Stinky" },
    { value: "v1644619390:Inscryption:Sigils:touch_of_death", label: "Touch of Death" },
    { value: "v1644613749:Inscryption:Sigils:trifurcated_strike", label: "Trifurcated Strike" },
    { value: "v1644619390:Inscryption:Sigils:trinket_bearer", label: "Trinket Bearer" },
    { value: "v1644619390:Inscryption:Sigils:unkillable", label: "Unkillable" },
    { value: "v1644619391:Inscryption:Sigils:waterborne", label: "Waterborne" },
    { value: "v1644619391:Inscryption:Sigils:worthy_sacrifice", label: "Worthy Sacrifice" },
  ];

  useEffect(() => {
    sigil === ""
      ? setSigilsTF("")
      : setSigilsTF(`l_${sigil}.png,g_south,y_64/`);
  }, [sigil]);

  return (
    <section className="mb-10">
      <p className="mb-3">
        Does this creature have any <label htmlFor="sigils">sigils</label>?
      </p>

      <Select
        instanceId="sigils-selector"
        aria-label="sigils"
        options={options}
        isSearchable
        onChange={(e) => {
          setSigil(e.value);
        }}
      />
    </section>
  );
};

export default Sigils;
