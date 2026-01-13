import React, { useState, useEffect, Children } from 'react';
import { SidebarProvider, SidebarInset } from "@ui/sidebar";
import { AppSidebar as Sidebar } from "@layouts/components/Sidebar";
import { Navbar } from "@layouts/components/Navbar";
import { BladeContent } from "@shared";
import { motion } from "framer-motion";

export function SidebarLayout({ children, user, menu, title }) {
    
    const [sidebarOpen, setSidebarOpen] = useState(() => {
            if (typeof window !== 'undefined') {
                const saved = localStorage.getItem("sidebar:state");
                return saved !== null ? JSON.parse(saved) : true;
            }
            return true;
    });
    
    useEffect(() => {
        localStorage.setItem("sidebar:state", JSON.stringify(sidebarOpen));
    }, [sidebarOpen]);
    
    return (
        <SidebarProvider open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <div className="flex h-screen w-full overflow-hidden bg-background">
                <Sidebar user={user} menu={menu} />
                <SidebarInset className="flex flex-col flex-1 min-w-0 overflow-hidden">
                    <Navbar user={user} title={title} layoutType="sidebar" />
                    <main className="flex-1 overflow-y-auto md:p-1 lg:p-2">
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {children}
                        </motion.div>
                    </main>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}