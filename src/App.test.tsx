import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import HomePage from "./components/HomePage";

describe("HomePage", () => {
  it("check if loading spinner dissapear when data loaded", async () => {
    render(<HomePage />);
    let spinner = screen.getByTestId("spinner");
    expect(spinner).toBeInTheDocument();

    await waitFor(() => {
      screen.findByTestId("data-row").then(() => expect(spinner).not.toBeInTheDocument());
    });
  });
});
