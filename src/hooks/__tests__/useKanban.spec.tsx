import React from "react";
import { renderHook } from "@testing-library/react";
import KanbanProvider from "../../context/KanbanContext";
import kanbanData from "../../data/testData/kanbanData.json";
import { KanbanColumn } from "../../utils/types";
import useKanban from "../useKanban";

const mockKanbanColumns: KanbanColumn[] = kanbanData as KanbanColumn[];
const wrapper = ({ children }) => <KanbanProvider title="Test board" columns={mockKanbanColumns}>{children}</KanbanProvider>;

describe("useKanban hook", () => {

    it("should use useKanban hook correctly", () => {
        renderHook(() => useKanban(), { wrapper });
        expect(useKanban).toBeDefined();
    });

    it("should return kanban context values from useKanban hook", () => {
        const { result } = renderHook(() => useKanban(), { wrapper });
        expect(result.current.title).toBe("Test board");
        expect(Array.isArray(result.current.columns)).toBe(true);
        expect(result.current.columns.length).toBe(mockKanbanColumns.length);
    });

    it("should throw an error when hook is used outside the KanbanProvider", () => {
        const consoleError = jest.spyOn(console, "error").mockImplementation(() => { });
        expect(() => {
            renderHook(() => useKanban());
        }).toThrow("KanbanColumn must be used within a KanbanProvider");
        consoleError.mockRestore();
    });
});