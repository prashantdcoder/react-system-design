import { ListTodo } from 'lucide-react'
import React from 'react'

const KanbanColumnNoTask: React.FC = () => {
    return (

        <div data-testid="kanban-no-task" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 16, color: '#6b7280' }}>
           <ListTodo />
            <div style={{ fontWeight: 600, marginTop: 8 }}>No tasks</div>
            <div style={{ fontSize: 13, marginTop: 4 }}>Drag tasks here or create one.</div>
        </div>
    )
}

export default KanbanColumnNoTask