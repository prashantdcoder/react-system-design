import { ClipboardCheck } from "lucide-react";
import { generateUniqueId } from "../utils/appUtils";
import { DragItem, ICheckBoxNode, KanbanColumn, SideNavItem } from "../utils/types";

const shoppingList: ICheckBoxNode[] = [
    {
        id: 1,
        label: 'electronics',
        checked: false,
        children: [
            {
                id: 101,
                label: 'mobile',
                checked: false,
                children: [
                    {
                        id: 1001,
                        label: 'samsung',
                        checked: false,
                        children: []
                    },
                    {
                        id: 1002,
                        label: 'iphone',
                        checked: false,
                        children: []
                    }
                ]
            },
            {
                id: 102,
                label: 'power bank',
                checked: false,
                children: []
            },
            {
                id: 103,
                label: 'ear phones',
                checked: false,
                children: []
            }
        ]
    },
    {
        id: 2,
        label: 'grocery',
        checked: false,
        children: [
            {
                id: 201,
                label: 'fruits',
                checked: false,
                children: [
                    {
                        id: 2001,
                        label: 'apple',
                        checked: false,
                        children: [
                            {
                                id: 20001,
                                label: 'fuji apple',
                                checked: false,
                                children: []
                            }, {
                                id: 20002,
                                label: 'red delicious apple',
                                checked: false,
                                children: []
                            }
                        ]
                    },
                    {
                        id: 2002,
                        label: 'banana',
                        checked: false,
                        children: []
                    }
                ]
            }
        ]
    }
];

const permissions: ICheckBoxNode[] = [
    {
        id: 1,
        label: "User Management",
        checked: false,
        children: [
            {
                id: 2,
                label: "Create User",
                checked: false,
                children: []
            },
            {
                id: 3,
                label: "Edit User",
                checked: false,
                children: []
            },
            {
                id: 4,
                label: "Delete User",
                checked: false,
                children: []
            }
        ]
    },
    {
        id: 5,
        label: "Reports",
        checked: false,
        children: [
            {
                id: 6,
                label: "View Sales Report",
                checked: false,
                children: []
            },
            {
                id: 7,
                label: "Download Reports",
                checked: false,
                children: []
            }
        ]
    },
    {
        id: 8,
        label: "Settings",
        checked: false,
        children: [
            {
                id: 9,
                label: "Profile Settings",
                checked: false,
                children: []
            },
            {
                id: 10,
                label: "System Settings",
                checked: false,
                children: [
                    {
                        id: 11,
                        label: "Update Password Policy",
                        checked: false,
                        children: []
                    },
                    {
                        id: 12,
                        label: "Manage Integrations",
                        checked: false,
                        children: []
                    }
                ]
            }
        ]
    }
];

const groceries: ICheckBoxNode[] = [
    {
        id: 1,
        label: "Fruits",
        checked: false,
        children: [
            {
                id: 11,
                label: "Apple",
                checked: false,
                children: []
            },
            {
                id: 12,
                label: "Banana",
                checked: false,
                children: []
            },
            {
                id: 13,
                label: "Citrus",
                checked: false,
                children: [
                    {
                        id: 131,
                        label: "Orange",
                        checked: false,
                        children: []
                    },
                    {
                        id: 132,
                        label: "Lemon",
                        checked: false,
                        children: []
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        label: "Vegetables",
        checked: false,
        children: [
            {
                id: 21,
                label: "Carrot",
                checked: false,
                children: []
            },
            {
                id: 22,
                label: "Broccoli",
                checked: false,
                children: []
            }
        ]
    }
]

const userManagement: ICheckBoxNode[] = [
    {
        id: 2,
        label: "User Management",
        checked: false,
        children: [
            {
                id: 3,
                label: "Users",
                checked: false,
                children: [
                    {
                        id: 4,
                        label: "Create User",
                        checked: false,
                        children: []
                    },
                    {
                        id: 5,
                        label: "Edit User",
                        checked: false,
                        children: []
                    },
                    {
                        id: 6,
                        label: "Delete User",
                        checked: false,
                        children: []
                    }
                ]
            },
            {
                id: 7,
                label: "Roles",
                checked: false,
                children: [
                    {
                        id: 8,
                        label: "Create Role",
                        checked: false,
                        children: []
                    },
                    {
                        id: 9,
                        label: "Assign Role",
                        checked: false,
                        children: []
                    }
                ]
            }
        ]
    },

    {
        id: 10,
        label: "Inventory",
        checked: false,
        children: [
            {
                id: 11,
                label: "Products",
                checked: false,
                children: [
                    {
                        id: 12,
                        label: "Create Product",
                        checked: false,
                        children: []
                    },
                    {
                        id: 13,
                        label: "Bulk Import",
                        checked: false,
                        children: []
                    },
                    {
                        id: 14,
                        label: "Categories",
                        checked: false,
                        children: [
                            {
                                id: 15,
                                label: "Create Category",
                                checked: false,
                                children: []
                            },
                            {
                                id: 16,
                                label: "Edit Category",
                                checked: false,
                                children: []
                            }
                        ]
                    }
                ]
            },
            {
                id: 17,
                label: "Stock",
                checked: false,
                children: [
                    {
                        id: 18,
                        label: "View Stock",
                        checked: false,
                        children: []
                    },
                    {
                        id: 19,
                        label: "Adjust Stock",
                        checked: false,
                        children: []
                    }
                ]
            }
        ]
    },

    {
        id: 20,
        label: "Reporting & Analytics",
        checked: false,
        children: [
            {
                id: 21,
                label: "Dashboards",
                checked: false,
                children: [
                    {
                        id: 22,
                        label: "Sales Dashboard",
                        checked: false,
                        children: [
                            {
                                id: 23,
                                label: "Daily Sales",
                                checked: false,
                                children: []
                            },
                            {
                                id: 24,
                                label: "Monthly Sales",
                                checked: false,
                                children: []
                            }
                        ]
                    },
                    {
                        id: 25,
                        label: "Operations Dashboard",
                        checked: false,
                        children: []
                    }
                ]
            },
            {
                id: 26,
                label: "Export Reports",
                checked: false,
                children: [
                    {
                        id: 27,
                        label: "CSV Exports",
                        checked: false,
                        children: []
                    },
                    {
                        id: 28,
                        label: "PDF Exports",
                        checked: false,
                        children: []
                    }
                ]
            }
        ]
    },

    // A deeply nested branch (7 levels)
    {
        id: 29,
        label: "Advanced",
        checked: false,
        children: [
            {
                id: 30,
                label: "Integrations",
                checked: false,
                children: [
                    {
                        id: 31,
                        label: "Third-Party",
                        checked: false,
                        children: [
                            {
                                id: 32,
                                label: "Payment Gateways",
                                checked: false,
                                children: [
                                    {
                                        id: 33,
                                        label: "Gateway A",
                                        checked: false,
                                        children: [
                                            {
                                                id: 34,
                                                label: "Sandbox Mode",
                                                checked: false,
                                                children: [
                                                    {
                                                        id: 35,
                                                        label: "Enable Webhook Logging",
                                                        checked: false,
                                                        children: []
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
];

const printers: ICheckBoxNode[] = [
    {
        id: 1,
        label: "Printers",
        checked: false,
        children: [
            {
                id: 2,
                label: "HP",
                checked: false,
                children: []
            },
            {
                id: 3,
                label: "Nixon",
                checked: false,
                children: []
            },
        ]
    }
]

const dragAndDropList: DragItem[] = [
    {
        id: 1,
        heading: 'Java',
        content: 'Java is a high-level, object-oriented programming language and computing platform'
    },
    {
        id: 2,
        heading: 'React',
        content: 'React is the library for web and native user interfaces. Build user interfaces out of individual pieces called components written in JavaScript'
    },
    {
        id: 3,
        heading: 'Python',
        content: 'Python is a programming language that lets you work quickly and integrate systems more effectively'
    }
]

const sideNavItems: SideNavItem[] = [
    {
        title: "Checkbox Problem",
        url: "/",
        icon: ClipboardCheck,
    },
    {
        title: "Theme Change Problem",
        url: "/theme-problem",
        icon: ClipboardCheck,
    },
    {
        title: "Drag and Drop List Problem",
        url: "/drag-list-problem",
        icon: ClipboardCheck,
    },
    {
        title: "Kanban Problem",
        url: "/kanban-problem",
        icon: ClipboardCheck,
    }
];

const kanbanBoardColumns: KanbanColumn[] = [
    {
        id: 'todo',
        title: 'To Do',
        items: [
            {
                id: generateUniqueId(),
                heading: 'Create Login API',
                content: 'Design and develop the authentication endpoint with JWT tokens.'
            },
            {
                id: generateUniqueId(),
                heading: 'Prepare Sprint Report',
                content: 'Compile tasks completed and pending for this sprint.'
            },
            {
                id: generateUniqueId(),
                heading: 'Design Dashboard UI',
                content: 'Create Figma wireframes for the analytics dashboard.'
            }
        ]
    },
    {
        id: 'inprogress',
        title: 'In Progress',
        items: [
            {
                id: generateUniqueId(),
                heading: 'Fix Payment Failure Bug',
                content: 'Investigate transaction timeout occurring for UPI payments.'
            },
            {
                id: generateUniqueId(),
                heading: 'Refactor User Service',
                content: 'Improve code quality and reduce duplication in user-related APIs.'
            },
            {
                id: generateUniqueId(),
                heading: 'Write Unit Tests',
                content: 'Add Jest unit tests for the product module to increase coverage.'
            }
        ]
    },
    {
        id: 'completed',
        title: 'Completed',
        items: [
            {
                id: generateUniqueId(),
                heading: 'Deploy New Version to Staging',
                content: 'v2.3.1 deployed successfully for internal QA testing.'
            },
            {
                id: generateUniqueId(),
                heading: 'Set Up CI/CD Pipeline',
                content: 'Configured GitHub Actions for automated tests and deployments.'
            },
            {
                id: generateUniqueId(),
                heading: 'API Documentation Update',
                content: 'Updated Swagger docs for user and product services.'
            }
        ]
    }
];


export {
    dragAndDropList,
    groceries, kanbanBoardColumns, permissions,
    printers,
    shoppingList, sideNavItems, userManagement
};

