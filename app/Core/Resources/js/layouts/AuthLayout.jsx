import React from 'react';

export function AuthLayout({ children, title, subtitle }) {

    return (
        <div className=" min-h-screen w-full">
            <div className="flex items-center justify-center p-20">
                <div className="mx-auto w-full max-w-[400px] space-y-6">
                    <div className="w-28 mx-auto mb-4 flex items-center justify-center">
                        <img src={window.App?.logo} alt={window.App?.name} className="w-20 mb-5" />
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}