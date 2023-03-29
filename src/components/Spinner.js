import React from 'react';
import '../index.css';

const Spinner = () => (
    <div className="flex justify-center items-center h-screen bg-neutral-950">
        <div className="grid gap-2">
            <div className="flex items-center justify-center ">
                <div className="w-24 h-24 border-l-4 border-orange-500 rounded-full animate-spin"></div>
            </div>
        </div>

    </div>
);

export default Spinner;