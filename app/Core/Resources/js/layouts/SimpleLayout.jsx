import React from 'react';
import { Navbar } from "@layouts/components/Navbar";
import { BladeContent } from "@shared";
import { motion } from "framer-motion";

export function SimpleLayout({ innerHtml, user, title }) {
    return (
        <div className="flex flex-col h-screen w-full overflow-hidden bg-zinc-50 dark:bg-zinc-950">
            <Navbar user={user} title={title} showMenuToggle={false} />
            
            <main className="flex-1 overflow-y-auto">
                <div className="max-w-4xl mx-auto py-10 px-6">
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