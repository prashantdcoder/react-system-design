import React from 'react';
import useKanban from '../../hooks/useKanban';
import { KanbanColumnProps } from '../../utils/types';
import KanbanColumnItem from '../KanbanColumnItem/KanbanColumnItem';
import KanbanColumnNoTask from '../KanbanColumnNoTask/KanbanColumnNoTask';

const KanbanColumn: React.FC<KanbanColumnProps> = ({ column }) => {

    const { onDragStart, onDrop,onDragOver } = useKanban();

    const headingColor: Record<string, string> = {
        'todo': 'text-blue-500',
        'inprogress': 'text-yellow-500',
        'completed': 'text-green-500'
    }

    return (
        <div data-container-id={column.id}
            data-testid={`kanban-column-container-${column.id}`}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, column.id)}
            className='block border p-4 rounded-md shadow-md bg-white w-64'>
            <div className='block'>
                <h1 data-testid={`kanban-column-title-${column.id}`} className={`${headingColor[column.id] || 'text-red-500'} text-2xl font-semibold`}>{column.title}</h1>
                <div data-testid={`kanban-column-content-${column.id}`} className='flex flex-col gap-2 mt-2'>
                    {
                        column.items &&
                        column.items.map((item) => {
                            return (
                                <KanbanColumnItem key={item.id}
                                    id={item.id}
                                    title={item.heading}
                                    content={item.content}
                                    columnId={column.id}
                                    onDragStart={onDragStart}
                                />
                            )
                        })
                    }
                    {
                        column.items.length === 0 && <KanbanColumnNoTask />
                    }
                </div>
            </div>
        </div>
    );
};

export default KanbanColumn;