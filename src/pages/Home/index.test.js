import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";
import waitForData from '../../waitForData';

describe("When Form is created", () => {
  it("a list of fields card is displayed", waitForData( async () => {
    render(<Home />);
    await screen.findByText("Emailss");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  }));

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", waitForData( async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En courszada");
      await screen.findByText("Message envoyé !");
    }));
  });

});


describe("When a page is created", () => {
  it("a list of events is displayed", waitForData( async () => {
    // to implement
    await screen.findByText("Toutes");
    await screen.findByText("Conférences");
  }))
  it("a list a people is displayed", waitForData( async () => {
    // to implement
  }))
  it("a footer is displayed", waitForData( async () => {
    // to implement
  }))
  it("an event card, with the last event, is displayed", waitForData( async () => {
    // to implement
  }))
});
