import React from 'react';
import useKanban from '../../hooks/useKanban';

const KanbanBoardTitle: React.FC = () => {
    const { title } = useKanban();
    return (
        <header className="w-full mb-4">
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                    <h1 data-testid="board-title" className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100 leading-tight">
                        {title}
                    </h1>
                </div>
            </div>
        </header>
    )
}

export default KanbanBoardTitle