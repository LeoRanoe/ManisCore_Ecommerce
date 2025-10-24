'use client';

import { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface Tab {
  id: string;
  label: string;
  icon?: ReactNode;
  content: ReactNode;
}

interface AnimatedTabsProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
}

export function AnimatedTabs({ tabs, defaultTab, className = '' }: AnimatedTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const activeTabData = tabs.find(tab => tab.id === activeTab);

  return (
    <div className={className}>
      {/* Tab Headers */}
      <div className="flex gap-1 border-b border-gray-200 mb-6">
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.id;
          
          return (
            <motion.button
              key={tab.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'relative px-6 py-3 font-medium text-sm transition-colors rounded-t-lg',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              )}
            >
              <div className="flex items-center gap-2">
                {tab.icon && <span className="w-5 h-5">{tab.icon}</span>}
                <span>{tab.label}</span>
              </div>
              
              {/* Active Indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="relative">
        <AnimatePresence mode="wait">
          {activeTabData && (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTabData.content}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
