import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import KanbanBoard from "./KanbanBoard";
import KanbanProvider from "../../context/KanbanContext";
import { KanbanColumn } from "../../utils/types";
import kanbanData from "../../data/testData/kanbanData.json";

describe("KanbanBoard Component", () => {

    const mockKanbanColumns: KanbanColumn[] = kanbanData as KanbanColumn[];

    jest.mock('../../hooks/useKanban', () => {
        return {
            __esModule: true,
            default: () => ({
                columns: [
                    { id: "1", title: "Todo" },
                    { id: "2", title: "In Progress" },
                    { id: "3", title: "Completed" }
                ],
            }),
        };
    });

    // jest.mock("../KanbanColumn/KanbanColumn", () => ({
    //     __esModule: true,
    //     default: ({ id, title }: KanbanColumn) => <div data-testid={`kanban-column-${id}`}>{title}</div>,
    // }));

    it("should render KanbanBoard component correctly", () => {
        const { container } = render(
            <KanbanProvider title="Test Kanban Board" columns={mockKanbanColumns}>
                <KanbanBoard />
            </KanbanProvider>
        );
        expect(container).toBeInTheDocument();
    });

    it("should displays all columns returned from useKanban hook", () => {
        render(
            <KanbanProvider title="Test Kanban Board" columns={mockKanbanColumns}>
                <KanbanBoard />
            </KanbanProvider>
        );
        const column = screen.getByTestId('kanban-column-container-col-1');
        const title = screen.getByTestId('kanban-column-title-col-1');
        expect(column).toBeInTheDocument();
        expect(title).toBeInTheDocument();
        expect(title).toHaveTextContent('To Do');
    });

    it("should render the correct number of KanbanColumn components" , () => {
         render(
            <KanbanProvider title="Test Kanban Board" columns={mockKanbanColumns}>
                <KanbanBoard />
            </KanbanProvider>
        );

        const columns = screen.getAllByTestId(/kanban-column-container-/);
        expect(columns.length).toBe(mockKanbanColumns.length);
    });
})