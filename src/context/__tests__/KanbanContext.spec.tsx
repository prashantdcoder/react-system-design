import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import KanbanProvider, { KanbanContext } from "../KanbanContext";

const TestConsumer = () => {
    const ctx = React.useContext(KanbanContext);
    return (
        <div>
            <button
                data-testid="drag-start"
                onClick={(e) => {
                    ctx.onDragStart(
                        { currentTarget: { dataset: { itemId: "task-1" } } } as any,
                        "todo"
                    )
                }
                }
            />
            <button
                data-testid="drop"
                onClick={(e) =>
                    ctx.onDrop({} as any, "inprogress")
                }
            />
            <span data-testid="columns-json">
                {JSON.stringify(ctx.columns)}
            </span>
        </div>
    );
};

const TestConsumerForSameSourceAndDestinatino = () => {
    const ctx = React.useContext(KanbanContext);
    return (
        <div>
            <button
                data-testid="drag-start"
                onClick={(e) =>
                    ctx.onDragStart({ currentTarget: { dataset: { itemId: "task-1" } } } as any, "todo")
                }
            />
            <button
                data-testid="drop"
                onClick={(e) =>
                    ctx.onDrop({ currentTarget: { dataset: { itemId: "task-1" } } } as any, "todo")
                }
            />
            <span data-testid="columns-json">
                {JSON.stringify(ctx.columns)}
            </span>
        </div>
    );
};

describe("KanbanProvider", () => {

    it("should move task from source to destination onDrop", () => {
        const mockColumns = [
            {
                id: "todo",
                title: "Todo",
                items: [
                    { id: "task-1", heading: "Task 1", content: "Content 1" },
                ],
            },
            {
                id: "inprogress",
                title: "In Progress",
                items: [],
            }
        ];
        const { getByTestId } = render(
            <KanbanProvider title="test" columns={mockColumns}>
                <TestConsumer />
            </KanbanProvider>
        );
        fireEvent.click(getByTestId("drag-start"));
        act(() => {
            fireEvent.click(getByTestId("drop"));
        });

        const updated = JSON.parse(getByTestId("columns-json").textContent);
        expect(updated[0].items.length).toBe(0);
        expect(updated[1].items.length).toBe(1);
        expect(updated[1].items[0].id).toBe("task-1");
        expect(updated[1].items[0].heading).toBe("Task 1");
    });

    it("should not move task if source and destination are same", () => {
        const mockColumns = [
            {
                id: "todo",
                title: "Todo",
                items: [
                    { id: "task-1", heading: "Task 1", content: "Content 1" },
                ],
            },
            {
                id: "inprogress",
                title: "In Progress",
                items: [],
            }
        ];
        const { getByTestId } = render(
            <KanbanProvider title="test" columns={mockColumns}>
                <TestConsumerForSameSourceAndDestinatino />
            </KanbanProvider>
        );
        fireEvent.click(getByTestId("drag-start"));
        act(() => {
            fireEvent.click(getByTestId("drop"));
        });

        const updated = JSON.parse(getByTestId("columns-json").textContent);
        expect(updated[0].items.length).toBe(1);
        expect(updated[1].items.length).toBe(0);
    });

});
