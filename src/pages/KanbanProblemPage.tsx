import React from 'react'
import KanbanBoard from '../components/KanbanBoard/KanbanBoard'
import KanbanProvider from '../context/KanbanContext'
import { kanbanBoardColumns } from '../data/appData'
import KanbanBoardTitle from '../components/KanbanBoardTitle/KanbanBoardTitle'

const KanbanProblemPage: React.FC = () => {

    return (
        <div className='kanban-page-container w-full'>
            <KanbanProvider title='Kanban Board' columns={kanbanBoardColumns}>
                <KanbanBoardTitle />
                <KanbanBoard />
            </KanbanProvider>
        </div>
    )
}

export default KanbanProblemPage