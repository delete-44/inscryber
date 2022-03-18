import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import About from "pages/about";
import { LINKS } from "components/constants";

describe("About", () => {
  beforeEach(async () => {
    render(<About />);
  });

  it("renders headers & footer", () => {
    const h1 = screen.getByRole("heading", { name: "About Inscryber" });
    const overview = screen.getByRole("heading", { name: "Overview" });
    const privacy = screen.getByRole("heading", { name: "Privacy" });
    const getInvolved = screen.getByRole("heading", { name: "Get Involved" });
    const ownership = screen.getByRole("heading", { name: "Ownership" });

    expect(h1).toBeInTheDocument();
    expect(overview).toBeInTheDocument();
    expect(privacy).toBeInTheDocument();
    expect(getInvolved).toBeInTheDocument();
    expect(ownership).toBeInTheDocument();

    const footer = screen.getByRole("contentinfo");
    const footerNav = screen.getByRole("navigation");

    expect(footer).toBeInTheDocument();
    expect(footerNav).toBeInTheDocument();
  });

  it("renders links to different sources", () => {
    const inscryptionLink = screen.getByRole("link", { name: "Inscryption" });
    const twitterLink = screen.getByRole("link", { name: "Twitter" });
    const githubLink = screen.getByRole("link", { name: "GitHub" });
    const trelloLink = screen.getByRole("link", { name: "Trello" });
    const vladdeLink = screen.getByRole("link", { name: "@vladdeSV" });
    const avgUserLink = screen.getByRole("link", {
      name: "@anAverageUsersName",
    });
    const dmullinsLink = screen.getByRole("link", { name: "Daniel Mullins" });

    expect(inscryptionLink).toBeInTheDocument();
    expect(inscryptionLink).toHaveAttribute("href", LINKS.inscryption);

    expect(twitterLink).toBeInTheDocument();
    expect(twitterLink).toHaveAttribute("href", LINKS.delete44_twitter);

    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute("href", LINKS.inscryber_github);

    expect(trelloLink).toBeInTheDocument();
    expect(trelloLink).toHaveAttribute("href", LINKS.inscryber_trello);

    expect(vladdeLink).toBeInTheDocument();
    expect(vladdeLink).toHaveAttribute("href", LINKS.vladde);

    expect(avgUserLink).toBeInTheDocument();
    expect(avgUserLink).toHaveAttribute("href", LINKS.avgUser);

    expect(dmullinsLink).toBeInTheDocument();
    expect(dmullinsLink).toHaveAttribute("href", LINKS.dmullins);
  });
});
