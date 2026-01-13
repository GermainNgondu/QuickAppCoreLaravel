import React, { useState, useEffect } from 'react';
import { Search, Filter, RotateCcw } from "lucide-react";
import { Input } from "@ui";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@ui";
import { Button } from "@ui";

export function FilterBar({ filters = [], onFilterChange }) {
    const [values, setValues] = useState({});

    // Debounce pour les champs texte
    useEffect(() => {
        const handler = setTimeout(() => {
            onFilterChange(values);
        }, 400);
        return () => clearTimeout(handler);
    }, [values]);

    const handleChange = (name, value) => {
        setValues(prev => ({
            ...prev,
            [name]: value === 'all' ? undefined : value
        }));
    };

    return (
        <div className="flex flex-wrap items-center gap-3">
            {filters.map((filter) => {

                if (filter.type === 'text' || filter.type === 'text_input' || filter.component === 'text-input') {
                    return (
                        <div key={filter.name} className="relative w-full md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder={filter.placeholder || `Filtrer par ${filter.label}...`}
                                value={values[filter.name] || ''}
                                onChange={(e) => handleChange(filter.name, e.target.value)}
                                className="pl-9 h-9"
                            />
                        </div>
                    );
                }

                return (
                    <Select 
                        key={filter.name}
                        value={values[filter.name] || 'all'} 
                        onValueChange={(val) => handleChange(filter.name, val)}
                    >
                        <SelectTrigger className="h-9 w-[180px]">
                            <Filter className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                            <SelectValue placeholder={filter.label} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tous les {filter.label}s</SelectItem>
                            {filter.options?.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                );
            })}

            {Object.keys(values).length > 0 && (
                <Button variant="ghost" onClick={() => setValues({})} className="h-9 px-2">
                    <RotateCcw className="h-4 w-4" />
                </Button>
            )}
        </div>
    );
}