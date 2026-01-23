import { fireEvent, screen, render } from '@testing-library/react';
import React from 'react';
import { Game } from './Game';
import { BoardProps } from '../../../utils/types';

jest.mock('../Banner/Banner', () => {
    return {
        __esModule: true,
        default: ({ winner }: { winner: string }) => <div data-testid="banner-mock">{winner}</div>
    };
});

// jest.mock('../Board/Board', () => {
//     return {
//         __esModule: true,
//         default: ({ cells, setNextPlayerTurn }: BoardProps) => <div data-testid="board-mock">{JSON.stringify(cells)}</div>
//     };
// });

jest.mock("../Cell/Cell", () => (props: any) => {
    return <div data-testid="cell" data-value={props.value ?? ""} />;
});


describe(`Game component`, () => {

    it("should render component correctly", () => {
        const { container } = render(<Game />);
        expect(container).toBeInTheDocument();
    });

    it("should render Board component", () => {
        render(<Game />);
        const boardElement = screen.getByTestId("board");
        expect(boardElement).toBeInTheDocument();
    });

    it("should not render Banner initially when there is no winner", () => {
        render(<Game />);
        const bannerElement = screen.queryByTestId("banner") as HTMLDivElement;
        expect(bannerElement).not.toBeInTheDocument();
    });

    it("should render a 3x3 board initially with all empty cells", () => {
        render(<Game />);
        const boardElement = screen.getByTestId("board") as HTMLDivElement;
        expect(boardElement).toBeInTheDocument();
        const cells = screen.getAllByTestId("cell") as HTMLDivElement[];
        expect(cells.length).toBe(9);
    });
});