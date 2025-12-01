import React from "react";
import { KanbanContext } from "../context/KanbanContext";
import { KanbanContextProp } from "../utils/types";

const useKanban = () => {

    const kanbanContext = React.useContext<KanbanContextProp>(KanbanContext);
    if (!kanbanContext) {
        throw new Error('KanbanColumn must be used within a KanbanProvider');
    }

    const {
        title,
        children,
        onDragStart,
        onDrop,
        columns,
        onDragOver
    } = kanbanContext;

    return {
        title,
        children,
        onDragStart,
        onDrop,
        columns,
        onDragOver
    };
};

export default useKanban;