import React, { createContext, useContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

const SidebarContext = createContext();

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

export const SidebarProvider = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSidebar = () => {
    console.log('toggleSidebar called, current isCollapsed:', isCollapsed);
    setIsCollapsed(prev => !prev);
  };

  const toggleMobileSidebar = () => {
    console.log('toggleMobileSidebar called, current isMobileOpen:', isMobileOpen);
    setIsMobileOpen(prev => !prev);
  };

  const closeMobileSidebar = () => {
    setIsMobileOpen(false);
  };

  const value = useMemo(() => ({
    isCollapsed,
    isMobileOpen,
    toggleSidebar,
    toggleMobileSidebar,
    closeMobileSidebar
  }), [isCollapsed, isMobileOpen]);

  return (
    <SidebarContext.Provider value={value} data-testid="sidebar-provider">
      {children}
    </SidebarContext.Provider>
  );
};

SidebarProvider.propTypes = {
  children: PropTypes.node.isRequired
};