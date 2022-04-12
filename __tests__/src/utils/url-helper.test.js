import { generateUrl } from "src/utils/url-helper";
import { CARD_BASE, CLOUDINARY_BASE } from "components/constants";

describe("generateUrl", () => {
  it("compiles strings from multiple transformation objects & orders them as per the transformationLayers constant", () => {
    const testData = {
      name: "TEST CARD",
      power: "0",
      health: "120",
      cost: { currency: "blood", value: "5" },
      sigils: ["test_sigil_1"],
      patches: ["test_patch_1"],
      tribes: ["test_tribe_1"],
      overlays: ["test_overlay_1"],
      portrait: {
        filename: "test_portrait_1",
        manipulations: ["test_manipulation_1"],
      },
    };

    const tfString = generateUrl(testData, "test_card_base");

    expect(tfString).toEqual(
      `${CLOUDINARY_BASE}` +
        "l_test_portrait_1/test_manipulation_1/t_portrait/" +
        "l_Inscryber:tribes:v1:test_tribe_1/t_tribe_1/" +
        "l_Inscryber:Costs:v2:blood_5/t_cost/" +
        "l_text:Inscryber:HEAVYWEIGHT.ttf_128:TEST%20CARD/t_name_short/" +
        "l_text:Inscryber:HEAVYWEIGHT.ttf_196:0,c_scale,w_65/t_power/" +
        "l_text:Inscryber:HEAVYWEIGHT.ttf_196:120,c_scale,w_100/t_health/" +
        "l_Inscryber:Sigils:v1:test_sigil_1/t_sigil/" +
        "l_Inscryber:overlays:v1:test_overlay_1/" +
        "l_Inscryber:patches:v1:test_patch_1/t_patch_1/" +
        `${CARD_BASE}test_card_base`
    );
  });

  it("defaults to the normal 'vladde' card base with no transformations", () => {
    const tfString = generateUrl();

    expect(tfString).toEqual(`${CLOUDINARY_BASE}${CARD_BASE}vladde`);
  });
});
