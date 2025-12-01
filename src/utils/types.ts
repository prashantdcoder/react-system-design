/********************* Models ************************************ */

interface ICheckBoxNode {
    id: number;
    label: string;
    checked: boolean;
    indeterminate?: boolean;
    children: ICheckBoxNode[];
}

interface DragItem {
    id: number;
    heading: string,
    content: string;
}

interface SideNavItem {
    title: string;
    url: string;
    icon: React.ComponentType<any>;
}

interface KanbanColumn {
    id: string;
    title: string;
    items: KanbanColumnItem[];
}

interface KanbanColumnItem {
    id: string;
    heading: string,
    content: string;
}



/********************* Props ************************************ */

interface ThemeContextProp {
    theme: ThemeMode,
    toggleTheme: () => void;
}

interface DragContainerProps {
    isDraggable: boolean;
    items: DragItem[];
}

interface DragItemProps {
    isDraggable: boolean;
    item: DragItem;
    position?: number;
    onDragStart: (e: React.DragEvent<HTMLDivElement>, item: DragItem, position: number) => void;
    onDragOver: (e: React.DragEvent<HTMLDivElement>, item: DragItem, position: number) => void;
}

interface KanbanContextProp {
    title: string;
    children?: React.ReactNode;
    columns: KanbanColumn[];
    onDragStart?: (e: React.DragEvent<HTMLDivElement>, sourceId: string) => void;
    onDrop?: (e: React.DragEvent<HTMLDivElement>, sourceId: string) => void;
    onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
}

interface KanbanProviderProps {
    title: string;
    children?: React.ReactNode;
    columns: KanbanColumn[];
}

interface KanbanColumnProps {
    column: KanbanColumn;
}

interface Endpoint {
    sourceId: string;
    destinationId: string;
}

interface KanbanColumnItemProps {
    columnId?: string;
    id: string;
    title: string;
    content: string;
    onDragStart: (e: React.DragEvent<HTMLDivElement>, sourceId: string) => void;
}

/********************* Enums************************************ */

enum ThemeMode {
    LIGHT = "Light",
    DARK = "Dark"
}


export {
    DragContainerProps,
    DragItem,
    DragItemProps,
    Endpoint, ICheckBoxNode,
    KanbanColumn, KanbanColumnItem, KanbanColumnItemProps,
    KanbanColumnProps, KanbanContextProp,
    KanbanProviderProps, SideNavItem,
    ThemeContextProp, ThemeMode
};

