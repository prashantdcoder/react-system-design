import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import SideNav from "./components/SideNav/SideNav";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import ThemeProvider from "./context/ThemeToggleContext";
import CheckboxProblemPage from "./pages/CheckboxProblemPage";
import DragAndDropListProblemPage from "./pages/DragAndDropListProblemPage";
import KanbanProblemPage from "./pages/KanbanProblemPage";
import ThemeChangeProblemPage from "./pages/ThemeChangeProblemPage";

const App: React.FC = () => {
  return (
    <div className="main-app">
      <ThemeProvider>
        <SidebarProvider>
          <SidebarTrigger />
          <SideNav />
          <Routes>
            <Route path="/" element={<CheckboxProblemPage />} />
            <Route path="/theme-problem" element={<ThemeChangeProblemPage />} />
            <Route path="/drag-list-problem" element={<DragAndDropListProblemPage />} />
            <Route path="/kanban-problem" element={<KanbanProblemPage />} />
          </Routes>
        </SidebarProvider>
      </ThemeProvider>
    </div>
  );
};

export default App;
