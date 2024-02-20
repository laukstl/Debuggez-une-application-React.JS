import { waitFor, screen } from "@testing-library/react";

export default function waitForData(renderFn) {
    return async () => {
      renderFn();
      await waitFor(() => expect(screen.queryByText('En attente')).not.toBeInTheDocument());
    };
  }
