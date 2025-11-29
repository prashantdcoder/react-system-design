import React, { createContext, useState, useCallback } from "react";
import { generateUniqueId } from "../utils/appUtils";
import { KanbanColumn, KanbanColumnItem, KanbanContextProp, KanbanProviderProps } from "../utils/types";


export const KanbanContext = createContext<KanbanContextProp>(null);

const KanbanProvider = ({ children, title, columns: initialColumns }: KanbanProviderProps) => {
    const [columns, setColumns] = useState(initialColumns);
    const sourceRef = React.useRef<string>('');
    const destinationRef = React.useRef<string>('');
    const moveTaskIdRef = React.useRef<string>('');

    const onDragStart = (e: React.DragEvent<HTMLDivElement>, sourceId: string): void => {
        moveTaskIdRef.current = e.currentTarget.dataset.itemId;
        sourceRef.current = sourceId;
    };



    const resetRefs = (): void => {
        moveTaskIdRef.current = '';
        sourceRef.current = '';
        destinationRef.current = '';
    }

    const moveTask = useCallback(() => {
        const sourceColumnId: string = sourceRef.current;
        const destinationColumnId: string = destinationRef.current;
        const taskId: string = moveTaskIdRef.current;

        if (sourceColumnId === destinationColumnId) {
            return;
        };

        const extractItemFromSource: KanbanColumnItem | undefined = columns.find(col => col.id === sourceColumnId)?.items.find(item => item.id === taskId);


        const updatedColumns: KanbanColumn[] = columns.map(col => {
            if (col.id === sourceColumnId) {
                return {
                    ...col,
                    items: col.items.filter(item => item.id !== taskId)
                };
            }
            if (col.id === destinationColumnId) {
                const newItems = [...col.items, extractItemFromSource];
                return {
                    ...col,
                    items: [...newItems],
                }
            }
            return col;
        });
        setColumns(updatedColumns);
    }, [columns]);

    const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }, []);

    const onDrop = useCallback(
        (e: React.DragEvent<HTMLDivElement>, destinationId: string) => {
            destinationRef.current = destinationId;
            moveTask();
            resetRefs();
        },
        [moveTask]
    );

    return (
        <KanbanContext.Provider value={{ title, onDragStart, onDrop, columns, onDragOver }}>
            {children}
        </KanbanContext.Provider>
    );
};

export default KanbanProvider;