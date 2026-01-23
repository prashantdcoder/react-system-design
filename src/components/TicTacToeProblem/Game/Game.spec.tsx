import { fireEvent, screen, render } from '@testing-library/react';
import React from 'react';
import { Game } from './Game';
import { BoardProps, CellProps } from '../../../utils/types';

/**
 * 🧪 Game Component – Test Case Headings
✅ Rendering & Basic UI
Should render Game component without crashing
Should render the Board component
Should not render Banner initially when there is no winner
Should render a 3x3 board initially with all empty cells

🎮 Gameplay & Turn Handling
Should start the game with no player selected initially
Should mark first clicked cell with Player.X
Should mark second clicked cell with Player.O
Should alternate turns between Player.X and Player.O
Should not allow overwriting an already filled cell
Should update board state after each valid move
Should not change turn when clicking on an already filled cell

🏆 Winner Calculation & Banner
Should detect winner when a row is completed
Should detect winner when a column is completed
Should detect winner when a diagonal is completed
Should render Banner when a winner is found
Should pass correct winner to Banner component
Should not allow further moves after winner is declared
Should not change board state after game is finished

🔁 State & Re-rendering Behavior
Should recalculate winner only when board state changes
Should not re-render Board unnecessarily when unrelated state changes
Should memoize winner calculation using useMemo
Should keep setNextPlayerTurn function reference stable using useCallback

🧱 Edge Cases & Stability
Should not throw error when clicking rapidly on multiple cells
Should handle invalid cellId format gracefully
Should not crash if cellId is out of bounds
Should not crash when cellArray is corrupted or partially null
Should not show Banner in a draw situation (if draw not implemented)

🔄 Integration Tests
Should correctly integrate Game → Board → Cell click flow
Should update UI correctly after a full winning scenario
Should show Banner only once per game
Should not allow any further state updates after game ends

🏎 Performance / Optimization (Advanced)
Should not recreate setNextPlayerTurn function unnecessarily
Should prevent unnecessary re-renders of Board using React.memo
Should not recalculate winner when clicking on already filled cell
 */

jest.mock('../Banner/Banner', () => {
    return {
        __esModule: true,
        default: ({ winner }: { winner: string }) => <div data-testid="banner-mock">Winner is: {winner}</div>
    };
});

jest.mock("../Cell/Cell", () => (props: CellProps) => {
    return <div
        data-testid="cell"
        data-value={props.value ?? ""}
        onClick={(e) => props.setNextPlayerTurn(e, props.cellId)}
    />;
});


describe(`Game component`, () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

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

    it("should start the game with no player selected initially", () => {
        render(<Game />);
        const cells = screen.getAllByTestId("cell") as HTMLDivElement[];
        cells.forEach(cell => {
            expect(cell.getAttribute("data-value")).toBe("");
        });
    });

    it("should mark first clicked cell with Player.X", () => {
        render(<Game />);
        const cells = screen.getAllByTestId("cell") as HTMLDivElement[];
        fireEvent.click(cells[0]);
        expect(cells[0].getAttribute("data-value")).toBe("X");
    });

    it("should mark second clicked cell with Player.O", () => {
        render(<Game />);
        const cells = screen.getAllByTestId("cell") as HTMLDivElement[];
        fireEvent.click(cells[0]);
        fireEvent.click(cells[1]);
        expect(cells[1].getAttribute("data-value")).toBe("O");
    });

    it("should not allow overwriting an already filled cell", () => {
        render(<Game />);
        const cells = screen.getAllByTestId("cell") as HTMLDivElement[];
        fireEvent.click(cells[0]);
        fireEvent.click(cells[1]);
        expect(cells[1].getAttribute("data-value")).toBe("O");
        fireEvent.click(cells[0]);
        expect(cells[0].getAttribute("data-value")).toBe("X");
    });

    it("should detect winner when a row is completed", () => {
        render(<Game />);
        const cells = screen.getAllByTestId("cell") as HTMLDivElement[];
        fireEvent.click(cells[0]); // X
        fireEvent.click(cells[3]); // O
        fireEvent.click(cells[1]); // X
        fireEvent.click(cells[4]); // O
        fireEvent.click(cells[2]); // X wins
        const bannerElement = screen.getByTestId("banner-mock") as HTMLDivElement;
        expect(bannerElement).toBeInTheDocument();
        expect(bannerElement.textContent).toBe("Winner is: X");
    });

    it("should detect winner when a column is completed", () => {
        render(<Game />);
        const cells = screen.getAllByTestId("cell") as HTMLDivElement[];
        fireEvent.click(cells[0]); //x
        fireEvent.click(cells[1]); //o
        fireEvent.click(cells[2]); //x
        fireEvent.click(cells[3]); //o
        fireEvent.click(cells[5]); //x
        fireEvent.click(cells[6]); //o
        fireEvent.click(cells[8]); //x wins   
        const bannerElement = screen.getByTestId("banner-mock") as HTMLDivElement;
        expect(bannerElement).toBeInTheDocument();
        expect(bannerElement.textContent).toBe("Winner is: X");
    });

    it("should detect winner when a diagonal is completed", () => {
        render(<Game />);
        const cells = screen.getAllByTestId("cell") as HTMLDivElement[];
        fireEvent.click(cells[0]); //x
        fireEvent.click(cells[1]); //o
        fireEvent.click(cells[4]); //x
        fireEvent.click(cells[3]); //o
        fireEvent.click(cells[8]);  //x wins  
        const bannerElement = screen.getByTestId("banner-mock") as HTMLDivElement;
        expect(bannerElement).toBeInTheDocument();
        expect(bannerElement.textContent).toBe("Winner is: X");
    });
});