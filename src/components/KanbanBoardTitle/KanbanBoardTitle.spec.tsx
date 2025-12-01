import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import KanbanBoardTitle from "./KanbanBoardTitle";
import KanbanProvider from "../../context/KanbanContext";
import kanbanData from "../../data/testData/kanbanData.json";
import { KanbanColumn as KanbanCol } from "../../utils/types";
import useKanban from "../../hooks/useKanban";


jest.mock("../../hooks/useKanban", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("KanbanBoardTitle component", () => {

    const mockKanbanColumns: KanbanCol[] = kanbanData as KanbanCol[];

    it("should render KanbanBoardTitle component correctly", () => {
        (useKanban as jest.Mock).mockReturnValue({
            columns: [...mockKanbanColumns],
            title: "Project Alpha",
        });
        render(
            <KanbanProvider title="Project Alpha" columns={mockKanbanColumns}>
                <KanbanBoardTitle />
            </KanbanProvider>
        );
        expect(screen.getByTestId("board-title")).toBeInTheDocument();
    });

    it("should display the correct title", () => {
        (useKanban as jest.Mock).mockReturnValue({
            columns: [...mockKanbanColumns],
            title: "Project Alpha",
        });
        render(
            <KanbanProvider title="Project Alpha" columns={mockKanbanColumns}>
                <KanbanBoardTitle />
            </KanbanProvider>
        );
        const titleElement = screen.getByTestId("board-title");
        expect(titleElement).toHaveTextContent("Project Alpha");
    });
});