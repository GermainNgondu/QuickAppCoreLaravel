import React from 'react';

export class ComponentErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error(`[React Error] ${this.props.componentName}:`, error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="p-4 border border-destructive/50 bg-destructive/10 text-destructive rounded-md text-sm">
                    <strong>Erreur de rendu :</strong> {this.props.componentName}
                    <p className="text-xs mt-1 opacity-70 italic">{this.state.error?.message}</p>
                </div>
            );
        }
        return this.props.children;
    }
}