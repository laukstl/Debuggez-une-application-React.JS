import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from "./index";
import { api, DataProvider } from "../../contexts/DataContext";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      
      render(
        <Home />
      );

      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await waitFor(() => screen.findByText("Message envoyé !"), {timeout:1250}); // adaptation au mockContactApi de Form.js
    });
  });

});

const data = {
  events: [
    {
      id: 1,
      type: "soirée entreprise factice",
      date: "2022-05-29T20:28:45.744Z",
      title: "Conférence #productCON factice",
      cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
      description:
        "Présentation des outils analytics aux professionnels du secteur",
      nb_guesses: 1300,
      periode: "24-25-26 Février",
      prestations: [
        "1 espace d’exposition",
        "1 scéne principale",
        "2 espaces de restaurations",
        "1 site web dédié",
      ],
    },

    {
      id: 2,
      type: "forum",
      date: "2022-04-29T20:28:45.744Z",
      title: "Forum #productCON factice",
      cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
      description:
        "Présentation des outils analytics aux professionnels du secteur",
      nb_guesses: 1300,
      periode: "24-25-26 Février",
      prestations: ["1 espace d’exposition", "1 scéne principale"],
    },
  ],
};

describe("When a page is created", () => {

  it("a list of events is displayed", async () => {
      api.loadData = jest.fn().mockReturnValue(data);
        render(
          <DataProvider>
            <Home />
          </DataProvider>
        );
        // screen.debug();
      await screen.findByText("Forum #productCON factice", { selector: ".ListContainer .EventCard__title" });
      await screen.findByText("Conférence #productCON factice", { selector: ".ListContainer .EventCard__title" });
      await screen.findByText("mai", { selector: ".ListContainer .EventCard__month" });
  })

  it("a list a people is displayed", async () => {
    render(<Home />);
    await screen.findByText("Samira");
    await screen.findByText("Isabelle");
    await screen.findByText("Alice");
  })

  it("a footer is displayed", async () => {
    render(<Home />);
    await screen.findByText("Notre derniére prestation");
    await screen.findByText("Contactez-nous");
  })

  it("an event card, with the last event, is displayed", async () => {
    api.loadData = jest.fn().mockReturnValue(data);
      render(
        <DataProvider>
          <Home />
        </DataProvider>
      );
      // screen.debug();
    await screen.findByText("mai", { selector: ".presta .EventCard__month" });
    await screen.findByText("Conférence #productCON factice", { selector: ".presta .EventCard__title" });
    await screen.findByText("soirée entreprise factice", { selector: ".presta .EventCard__label" });
    })
});
