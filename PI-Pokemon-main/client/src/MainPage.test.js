import { render } from "@testing-library/react";
import MainPage from "./components/MainPage/MainPage";
import { BrowserRouter } from "react-router-dom";

describe(MainPage, () => {
  it("Element displays correct initial words", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    );
    const mainValue = getByTestId("main").textContent;
    expect(mainValue).toBe(
      "WELCOME TO THE MOST  EXCITING UNIVERSE WHERE  EVERYTHING COMES TRUE   "
    );
  });

  it("Button clicked", () => {
    const { getByRole } = render(
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    );
    getByRole("button", { name: "Press Start" });
  });
});
