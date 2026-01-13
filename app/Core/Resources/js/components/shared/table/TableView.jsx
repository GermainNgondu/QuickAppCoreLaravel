import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@ui/table";
import { Checkbox } from "@ui";
import { ActionMenu } from "./ActionMenu";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@ui";
import { CellRenderer } from "./CellRenderer";

export function TableView({ columns, rows, onSort, selectedIds, onSelectRow, onSelectAll, actions, onOpenAction}) {
    const params = new URLSearchParams(window.location.search);
    const sort = params.get('sort');
    const direction = params.get('direction');

    return (
        <div className="rounded-md border bg-card">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-10">
                            <Checkbox onCheckedChange={onSelectAll} checked={selectedIds.length === rows.length} />
                        </TableHead>
                        {columns.map(col => (
                            <TableHead key={col.key}>
                                {col.sortable ? (
                                    <Button 
                                        variant="ghost" 
                                        size="sm" 
                                        className="-ml-3 h-8 data-[state=open]:bg-accent"
                                        onClick={() => onSort(col.key)}
                                    >
                                        <span>{col.label}</span>
                                        {sort === col.key ? (
                                            direction === 'asc' ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />
                                        ) : <ArrowUpDown className="ml-2 h-4 w-4" />}
                                    </Button>
                                ) : col.label}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id} data-state={selectedIds.includes(row.id) && "selected"}>
                            <TableCell>
                                <Checkbox 
                                    checked={selectedIds.includes(row.id)} 
                                    onCheckedChange={() => onSelectRow(row.id)} 
                                />
                            </TableCell>
                            {columns.map(col => (
                                <TableCell key={col.key}><CellRenderer column={col} row={row} /></TableCell>
                            ))}
                            <TableCell className="text-right">
                                <ActionMenu actions={actions} row={row} onOpenAction={onOpenAction}/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}