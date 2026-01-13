import React from 'react';
import { Navbar } from "@layouts/components/Navbar";
import { BladeContent } from "@shared";
import { HorizontalMenu } from "@layouts/components/HorizontalMenu";
import { motion } from "framer-motion";

export function TopNavLayout({ innerHtml, user, menu, title }) {
    return (
        <div className="flex flex-col h-screen w-full overflow-hidden bg-background">
            
            <Navbar user={user} title={title} showMenuToggle={false} layoutType="top-nav">

               <div className="hidden lg:block ml-4">
                    <HorizontalMenu items={menu} />
                </div>
                
            </Navbar>


            <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-zinc-50/50 dark:bg-zinc-950/50">
                <div className="max-w-7xl mx-auto w-full">
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-6"
                    >
                        <BladeContent html={innerHtml} />
                    </motion.div>
                </div>
            </main>
        </div>
    );
}