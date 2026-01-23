import { fireEvent, screen, render } from "@testing-library/react";
import React from "react";
import Cell from "./Cell";
import { Player } from "../../../utils/types";

describe("Cell Component", () => {

    it("should render component correctly", () => {
        const mockSetNextPlayerTurn = jest.fn();
        const { container } = render(<Cell setNextPlayerTurn={mockSetNextPlayerTurn} cellId={'0'} value={Player.X} />);
        expect(container).toBeInTheDocument();
    });

    it("should apply X player CSS class when value is Player.X", () => {
        const mockSetNextPlayerTurn = jest.fn();
        render(<Cell setNextPlayerTurn={mockSetNextPlayerTurn} cellId={'0'} value={Player.X} />);
        const element = screen.getByTestId('tic-tac-toe-cell-0') as HTMLDivElement;
        expect(element).toBeInTheDocument();
        expect(element.className).toContain('tic-tac-toe-cell-x');
    });


    it("should apply O player CSS class when value is Player.O", () => {
        const mockSetNextPlayerTurn = jest.fn();
        render(<Cell setNextPlayerTurn={mockSetNextPlayerTurn} cellId={'0'} value={Player.O} />);
        const element = screen.getByTestId('tic-tac-toe-cell-0') as HTMLDivElement;
        expect(element).toBeInTheDocument();
        expect(element.className).toContain('tic-tac-toe-cell-o');
    });

    it("should apply empty CSS class when no player has started", () => {
        const mockSetNextPlayerTurn = jest.fn();
        render(<Cell setNextPlayerTurn={mockSetNextPlayerTurn} cellId={'0'} value={null} />);
        const element = screen.getByTestId('tic-tac-toe-cell-0') as HTMLDivElement;
        expect(element).toBeInTheDocument();
        expect(element.className).toContain('tic-tac-toe-cell-empty');
    });

    it("should call setNextPlayerTurn when cell is clicked", () => {
        const mockSetNextPlayerTurn = jest.fn();
        render(<Cell setNextPlayerTurn={mockSetNextPlayerTurn} cellId={'0'} value={null} />);
        const element = screen.getByTestId('tic-tac-toe-cell-0') as HTMLDivElement;
        fireEvent.click(element);
        expect(mockSetNextPlayerTurn).toHaveBeenCalledTimes(1);
        expect(mockSetNextPlayerTurn).toHaveBeenCalledWith(expect.any(Object), '0');
    });
});