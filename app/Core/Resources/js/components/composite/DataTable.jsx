import React, { useState } from 'react';
import * as Icons from "lucide-react";
import { useDataTable } from "@hooks";
import { Button } from "@ui"; 
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@ui";
import { TableView } from "../shared/table/TableView";
import { Pagination } from "../shared/table/Pagination";
import { FilterBar } from "../shared/table/FilterBar";
import { ResourceOverlay } from "../shared/ResourceOverlay";

export function DataTable(props) {
    const { 
        rows, isFetching, queryState, selectedIds, 
        handleSort, handleSearch, handleFilterChange, 
        handlePageChange, toggleSelection, selectAll, refresh 
    } = useDataTable(props);

    const [overlay, setOverlay] = useState({ open: false, mode: 'modal', component: null, title: '', props: {} });
    const [isFormDirty, setIsFormDirty] = useState(false);

    const handleSuccess = () => {
        setIsFormDirty(false);
        setOverlay(prev => ({ ...prev, open: false }));
        refresh();
    };

    const openActionOverlay = (config) => {
        setOverlay({
            open: true, mode: config.mode || 'modal', component: config.component,
            title: config.label, props: { ...config.props, id: config.id }
        });
    };

    return (
        <div className={`space-y-4 ${isFetching ? 'opacity-70' : ''}`}>
            <div className="flex justify-between items-center gap-4">
                <FilterBar 
                    filters={props.filters} 
                    onSearch={handleSearch} 
                    onFilterChange={handleFilterChange} 
                />
                
                <div className="flex gap-2">
                    {props.headerActions?.map((action, idx) => {
                        const Icon = Icons[action.icon] || Icons.Plus;
                        return (
                            <Button key={idx} onClick={() => openActionOverlay(action)} size="sm">
                                <Icon className="mr-2 h-4 w-4" /> {action.label}
                            </Button>
                        );
                    })}
                </div>
            </div>

            <TableView 
                columns={props.columns} 
                rows={rows?.data || []} 
                onSort={handleSort} 
                actions={props.actions}
                selectedIds={selectedIds}
                onSelectRow={toggleSelection}
                onSelectAll={selectAll}
                onOpenAction={openActionOverlay}
            />

            <Pagination meta={rows?.meta} onPageChange={handlePageChange} />

            <Dialog open={overlay.open} onOpenChange={setOverlay}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader><DialogTitle>{overlay.title}</DialogTitle></DialogHeader>
                    <ResourceOverlay 
                        {...overlay.props} 
                        component={overlay.component} 
                        onSuccess={handleSuccess} 
                        onDirtyStateChange={setIsFormDirty} 
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
}