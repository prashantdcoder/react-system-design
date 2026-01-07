import { render } from "@testing-library/react";
import React from "react";
import Banner from "./Banner";
import { Player } from "../../../utils/types";

describe("Banner Component", () => {

    it("should render correctly with given winner", () => {
        const { container } = render(<Banner winner={Player.X} />);
        expect(container).toBeInTheDocument();
    });

    it("should display the correct title and description", () => {
        const { getByTestId } = render(<Banner winner={Player.O} />);
        const titleElement = getByTestId("banner-title") as HTMLElement;
        const descriptionElement = getByTestId("banner-description") as HTMLElement;
        expect(titleElement).toBeInTheDocument();
        expect(titleElement.textContent).toBe("Congratulations!");
        expect(descriptionElement).toBeInTheDocument();
        expect(descriptionElement.textContent).toBe("The winner of Tic Tac Toe Game is player  O");
    });
});  