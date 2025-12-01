import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import KanbanProvider from "../../context/KanbanContext";
import kanbanData from "../../data/testData/kanbanData.json";
import { KanbanColumn as KanbanCol } from "../../utils/types";
import useKanban from "../../hooks/useKanban";
import KanbanBoard from "../KanbanBoard/KanbanBoard";


jest.mock("../../hooks/useKanban", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("KanbanColumnItem component", () => {

    const mockKanbanColumns: KanbanCol[] = kanbanData as KanbanCol[];

    it("should render KanbanColumnItem component correctly", () => {
        (useKanban as jest.Mock).mockReturnValue({
            columns: [...mockKanbanColumns],
            title: "Project Alpha",
        });
        render(
            <KanbanProvider title="Project Alpha" columns={kanbanData as KanbanCol[]}>
                <KanbanBoard />
            </KanbanProvider>
        );
        for (let col of mockKanbanColumns) {
            for (let item of col.items) {
                const itemElement = screen.getByTestId(`kanban-column-item-${item.id}`);
                expect(itemElement).toBeInTheDocument();
            }
        }
    });

    it("should render the KanbanColumnItem with correct title and content", () => {
        const colum = mockKanbanColumns[0];
        (useKanban as jest.Mock).mockReturnValue({
            columns: [colum],
            title: "Project Alpha",
        });
        render(
            <KanbanProvider title="Project Alpha" columns={[colum]}>
                <KanbanBoard />
            </KanbanProvider>
        );
        for (let item of colum.items) {
            const itemElement = screen.getByTestId(`kanban-column-item-title-${item.id}`);
            expect(itemElement).toHaveTextContent(item.heading);
            const itemContent = screen.getByTestId(`kanban-column-item-content-${item.id}`);
            expect(itemContent).toHaveTextContent(item.content);
        }
    });

    it("should call onDragStart with event and correct columnId when dragging starts", () => {
        const mockOnDragStart = jest.fn();
        const colum = mockKanbanColumns[0];
        (useKanban as jest.Mock).mockReturnValue({
            columns: [colum],
            title: "Project Alpha",
            onDragStart: mockOnDragStart,
        });
        render(
            <KanbanProvider title="Project Alpha" columns={[colum]}>
                <KanbanBoard />
            </KanbanProvider>
        );
        const dragEvent = {
            onDragStart: mockOnDragStart
        }
        fireEvent.dragStart(screen.getByTestId(`kanban-column-item-${colum.items[0].id}`), dragEvent);
        expect(dragEvent.onDragStart).toHaveBeenCalledTimes(1);
        expect(dragEvent.onDragStart).toHaveBeenCalledWith(expect.any(Object), colum.id);
    });
});