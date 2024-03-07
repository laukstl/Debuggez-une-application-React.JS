import { render, screen } from "@testing-library/react";
import Slider from "./index";
import { api, DataProvider } from "../../contexts/DataContext";

const data = {
  focus: [
    {
      title: "World economic forum",
      description:
        "Oeuvre à la coopération entre le secteur public et le privé.",
      date: "2022-03-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      title: "World Gaming Day",
      description: "Evenement mondial autour du gaming",
      date: "2022-05-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      title: "World Farming Day",
      description: "Evenement mondial autour de la ferme",
      date: "2022-01-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
  ],
};

describe("When slider is created", () => {

  it("a list card is displayed", async () => {
    window.console.error = jest.fn();
    api.loadData = jest.fn().mockReturnValue(data);

    render(
      <DataProvider>
        <Slider />
      </DataProvider>
    );

    await screen.findByText("World economic forum");
    await screen.findByText("janvier");
    await screen.findByText(
      "Oeuvre à la coopération entre le secteur public et le privé."
    );
  });

  it("display events in a chronological order", async () => {
    api.loadData = jest.fn().mockReturnValue(data);
    
    render(
      <DataProvider>
        <Slider />
      </DataProvider>
    );

    // attendre que les elements soient rendus
    await screen.findByText("World Farming Day");
    await screen.findByText("World economic forum");
    await screen.findByText("World Gaming Day");
    // screen.debug();
  
    const janvierElement = await screen.findByText("janvier");
    const marsElement = await screen.findByText("mars");
    const maiElement = await screen.findByText("mai");
    
    // verif que les elements apparaissent dans l'ordre
    // eslint-disable-next-line no-bitwise
    expect(janvierElement.compareDocumentPosition(marsElement) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    // eslint-disable-next-line no-bitwise
    expect(marsElement.compareDocumentPosition(maiElement) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

  });
});
