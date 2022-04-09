import { generateUrl } from "src/utils/url-helper";
import { CARD_BASE, CLOUDINARY_BASE } from "components/constants";

describe("generateUrl", () => {
  it("compiles strings from multiple transformation objects", () => {
    const testData = {
      name: "TEST CARD",
      power: "0",
      health: "120",
    };
    const tfString = generateUrl(testData, "test_card_base");

    expect(tfString).toEqual(
      `${CLOUDINARY_BASE}` +
        `l_text:Inscryber:HEAVYWEIGHT.ttf_128:TEST%20CARD/t_name_short/` +
        `l_text:Inscryber:HEAVYWEIGHT.ttf_196:0,c_scale,w_65/t_power/` +
        `l_text:Inscryber:HEAVYWEIGHT.ttf_196:120,c_scale,w_100/t_health/` +
        `${CARD_BASE}test_card_base`
    );
  });

  it("defaults to the normal 'vladde' card base with no transformations", () => {
    const tfString = generateUrl();

    expect(tfString).toEqual(`${CLOUDINARY_BASE}${CARD_BASE}vladde`);
  });
});
