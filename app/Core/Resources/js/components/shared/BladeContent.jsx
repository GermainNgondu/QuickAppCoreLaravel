import React, { useEffect, useRef,memo } from 'react';
import { mountIslands } from '@core/app.jsx';

export const BladeContent = memo(({ html }) => {
    const contentRef = useRef(null);

    useEffect(() => {
        
        if (contentRef.current) {
            mountIslands(contentRef.current);
        }
    }, [html]);

    if (!html) return null;

    return (
        <div 
            ref={contentRef}
            className="w-full"
            dangerouslySetInnerHTML={{ __html: html }} 
        />
    );
}); 