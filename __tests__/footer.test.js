import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from "components/footer";
import { LINKS } from "components/constants";

describe("Footer", () => {
  beforeEach(() => {
    render(<Footer />);
  });

  it("renders a semantic footer", () => {
    const footer = screen.getByRole("contentinfo");

    expect(footer).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    const navigation = screen.getByRole("navigation");
    const homeLink = screen.getByRole("link", { name: "Inscryber" });
    const aboutLink = screen.getByRole("link", { name: "About" });

    expect(navigation).toBeInTheDocument();

    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");

    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveAttribute("href", "/about");
  });

  it("renders copyright info", () => {
    const copyright = screen.getByRole("list");

    const vladdeLink = screen.getByRole("link", { name: "vladdeSV" });
    const avgUserLink = screen.getByRole("link", {
      name: "anAverageUsersName",
    });
    const dmullinsLink = screen.getByRole("link", {
      name: "Daniel Mullins Games",
    });
    const delete44Link = screen.getByRole("link", { name: "delete44" });

    const vladdeText = screen.getByText('© ["normal" card base asset]');
    const avgUserText = screen.getByText(
      "© [additional cost assets, including the blood font type]"
    );
    const annieplyerText = screen.getByText(
      "© Annieplyer[act 1 themed energy assets]"
    );
    const dmullinsText = screen.getByText(
      "© [designs, IP. Used & distributed with permission]"
    );
    const delete44Text = screen.getByText("© [this website]");

    expect(copyright).toBeInTheDocument();

    expect(vladdeLink).toBeInTheDocument();
    expect(vladdeText).toBeInTheDocument();
    expect(vladdeLink).toHaveAttribute("href", LINKS.vladde);

    expect(avgUserLink).toBeInTheDocument();
    expect(avgUserText).toBeInTheDocument();
    expect(avgUserLink).toHaveAttribute("href", LINKS.avgUser);

    expect(annieplyerText).toBeInTheDocument();

    expect(dmullinsLink).toBeInTheDocument();
    expect(dmullinsText).toBeInTheDocument();
    expect(dmullinsLink).toHaveAttribute("href", LINKS.dmullins);

    expect(delete44Link).toBeInTheDocument();
    expect(delete44Text).toBeInTheDocument();
    expect(delete44Link).toHaveAttribute("href", LINKS.delete44);
  });
});
