import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import KanbanProvider from "../../context/KanbanContext";
import kanbanData from "../../data/testData/kanbanData.json";
import { KanbanColumn as KanbanCol } from "../../utils/types";
import KanbanColumn from "./KanbanColumn";
import KanbanBoard from "../KanbanBoard/KanbanBoard";
import useKanban from "../../hooks/useKanban";


jest.mock("../../hooks/useKanban", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("KanbanColumn Component", () => {
    const mockKanbanColumns: KanbanCol[] = kanbanData as KanbanCol[];

    beforeEach(() => {
        jest.clearAllMocks();
    })

    it("should render KanbanColumn component correctly", () => {
        const column = mockKanbanColumns;
        (useKanban as jest.Mock).mockReturnValue({
            columns: [...column]
        });
        const { container } = render(
            <KanbanProvider title="Test Kanban Board" columns={mockKanbanColumns}>
                <KanbanColumn column={mockKanbanColumns[0]} />
            </KanbanProvider>
        )
        expect(container).toBeInTheDocument();
    });

    it("should render column title correctly based on props", () => {
        const column = mockKanbanColumns;
        (useKanban as jest.Mock).mockReturnValue({
            columns: [...column]
        });
        const { getByTestId } = render(
            <KanbanProvider title="Test Kanban Board" columns={mockKanbanColumns}>
                <KanbanBoard />
            </KanbanProvider>
        )
        for (let col of mockKanbanColumns) {
            const columnTitle = getByTestId(`kanban-column-title-${col.id}`) as HTMLDivElement;
            expect(columnTitle).toBeInTheDocument();
            expect(columnTitle).toHaveTextContent(col.title);
        }
    });

    it("should display all tasks passed in column", () => {
        const column = mockKanbanColumns[0];
        (useKanban as jest.Mock).mockReturnValue({
            columns: [column]
        });
        const { getByTestId } = render(
            <KanbanProvider title="Test Kanban Board" columns={[column]}>
                <KanbanBoard />
            </KanbanProvider>
        );
        const item = getByTestId('kanban-column-item-task-1') as HTMLDivElement;
        const itemTitle = getByTestId(`kanban-column-item-title-task-1`) as HTMLDivElement;
        const itemContent = getByTestId(`kanban-column-item-content-task-1`) as HTMLDivElement;
        expect(item).toBeInTheDocument();
        expect(itemTitle).toBeInTheDocument();
        expect(itemContent).toBeInTheDocument();
        expect(itemContent).toHaveTextContent('Create wireframes and UI layout for the homepage.');
        expect(itemTitle).toHaveTextContent('Design Homepage');
    })

    it("should contain correct class names in column heading", () => {
        const column = mockKanbanColumns[0];
        (useKanban as jest.Mock).mockReturnValue({
            columns: [...mockKanbanColumns]
        });
        const { getByTestId } = render(
            <KanbanProvider title="Test Kanban Board" columns={[column]}>
                <KanbanBoard />
            </KanbanProvider>
        );
        const columnTitle = getByTestId(`kanban-column-title-${column.id}`) as HTMLDivElement;
        if (column.id === 'todo') {
            expect(columnTitle.classList).toHaveClass('text-blue-500');
        }
        else if (column.id === 'inprogress') {
            expect(columnTitle.classList).toHaveClass('text-yellow-500');
        }
        else if (column.id === 'completed') {
            expect(columnTitle.classList).toHaveClass('text-green-500');
        }
        else {
            expect(columnTitle.classList).toContain('text-red-500');
        }
    })

    it("should call onDrop from useKanban when a drop event occurs", () => {
        const mockOnDrop = jest.fn();
        const mockOnDragStart = jest.fn();
        const mockOnDragOver = jest.fn();
        (useKanban as jest.Mock).mockReturnValue({
            onDrop: mockOnDrop,
            onDragStart: mockOnDragStart,
            onDragOver: mockOnDragOver,
            columns: [...mockKanbanColumns]
        });
        const column = mockKanbanColumns[0];
        const { getByTestId } = render(
            <KanbanProvider title="Test Kanban Board" columns={[column]}>
                <KanbanBoard />
            </KanbanProvider>
        );
        const columnElement = getByTestId(`kanban-column-container-${column.id}`) as HTMLDivElement;
        const event = {
            preventDefault: mockOnDragOver,
        }
        fireEvent.dragOver(columnElement, event);
        expect(event.preventDefault).toHaveBeenCalled();
        fireEvent.drop(columnElement, {
            dataTransfer: {
                getData: () => '',
                types: []
            }
        });
        expect(mockOnDrop).toHaveBeenCalled();
    });

    it("should show KanbanColumnNoTask when there are no tasks in column", () => {
        const column = mockKanbanColumns[0];
        const emptyColumn = { ...column, items: [] };
        const mockOnDrop = jest.fn();
        (useKanban as jest.Mock).mockReturnValue({
            onDrop: mockOnDrop,
            columns: [emptyColumn]
        });
        render(
            <KanbanProvider title="Test Kanban Board" columns={[emptyColumn]}>
                <KanbanBoard />
            </KanbanProvider>
        );
        const noTaskElement = screen.getByTestId('kanban-no-task') as HTMLDivElement;
        expect(noTaskElement).toBeInTheDocument();
    });

});