import React from 'react';
import useKanban from '../../hooks/useKanban';
import KanbanColumn from '../KanbanColumn/KanbanColumn';

const KanbanBoard: React.FC = () => {
    const { columns } = useKanban();
    return (
        <div className='kanban-board-ontainer w-full flex gap-2 p-4'>
            {
                columns && columns.map((col) => <KanbanColumn key={col.id} column={col} />)
            }
        </div>
    );
};

export default KanbanBoard;