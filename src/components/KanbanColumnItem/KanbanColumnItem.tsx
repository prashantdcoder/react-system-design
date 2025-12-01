import React from 'react';
import { KanbanColumnItemProps } from '../../utils/types';
import { Item, ItemContent, ItemDescription, ItemTitle } from '../ui/item';


const KanbanColumnItem: React.FC<KanbanColumnItemProps> = ({ columnId, id, content, title, onDragStart }) => {

    return (
        <Item
            data-item-id={id}
            data-testid={`kanban-column-item-${id}`}
            draggable={true}
            variant="outline"
            className="cursor-move bg-gray-50"
            onDragStart={(e) => onDragStart(e, columnId)}
        >
            <ItemContent>
                <ItemTitle data-testid={`kanban-column-item-title-${id}`}>{title}</ItemTitle>
                <ItemDescription data-testid={`kanban-column-item-content-${id}`}>
                    {content}
                </ItemDescription>
            </ItemContent>
        </Item>
    );
};

export default KanbanColumnItem;