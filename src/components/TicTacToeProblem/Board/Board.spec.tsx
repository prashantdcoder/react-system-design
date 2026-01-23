import { screen, render } from '@testing-library/react';
import React from 'react';
import Board from './Board';
import { Player } from '../../../utils/types';

const mockCellRender = jest.fn();
jest.mock("../Cell/Cell", () => (props: any) => {
    mockCellRender();
    return <div data-testid="cell" />;
});

describe(`Board component`, () => {
    const mockCellArray: (Player | null)[][] = [
        [Player.X, Player.O, Player.X],
        [Player.O, Player.X, Player.O],
        [Player.O, Player.X, Player.X]
    ]

    const mockSetNextPlayerTurn = jest.fn();

    beforeEach(() => {
        mockCellRender.mockClear();
    });

    it("should render component correctly", () => {
        const { container } = render(<Board cells={mockCellArray} setNextPlayerTurn={mockSetNextPlayerTurn} />);
        expect(container).toBeInTheDocument();
    });

    it("should render three rows and columns", () => {
        render(<Board cells={mockCellArray} setNextPlayerTurn={mockSetNextPlayerTurn} />);
        const boardElement = screen.getByTestId("board");
        expect(boardElement.children.length).toBe(9);
    });

    it("should not re-render when props have not changed", () => {
        const { rerender } = render(<Board cells={mockCellArray} setNextPlayerTurn={mockSetNextPlayerTurn} />);
        expect(mockCellRender).toHaveBeenCalledTimes(9);
        rerender(<Board cells={mockCellArray} setNextPlayerTurn={mockSetNextPlayerTurn} />);
        expect(mockCellRender).toHaveBeenCalledTimes(9);
    });
});