import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
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

  const toggleSidebar = useCallback(() => {
    console.log('toggleSidebar called, current isCollapsed:', isCollapsed);
    setIsCollapsed(prev => !prev);
  }, [isCollapsed]);

  const toggleMobileSidebar = useCallback(() => {
    console.log('toggleMobileSidebar called, current isMobileOpen:', isMobileOpen);
    setIsMobileOpen(prev => !prev);
  }, [isMobileOpen]);

  const closeMobileSidebar = useCallback(() => {
    setIsMobileOpen(false);
  }, []);

  const value = useMemo(() => ({
    isCollapsed,
    isMobileOpen,
    toggleSidebar,
    toggleMobileSidebar,
    closeMobileSidebar
  }), [isCollapsed, isMobileOpen, toggleSidebar, toggleMobileSidebar, closeMobileSidebar]);

  return (
    <SidebarContext.Provider value={value} data-testid="sidebar-provider">
      {children}
    </SidebarContext.Provider>
  );
};

SidebarProvider.propTypes = {
  children: PropTypes.node.isRequired
};