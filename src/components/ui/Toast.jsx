import React, { useEffect } from 'react';

export const Toast = ({ message, type = 'success', onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`toast ${type}`}>
            {type === 'success' && (
                <span style={{ color: 'var(--success)', fontSize: '1.25rem' }}>&#10003;</span>
            )}
            {type === 'error' && (
                <span style={{ color: 'var(--danger)', fontSize: '1.25rem' }}>&#9888;</span>
            )}
            <p style={{ fontWeight: 500, color: 'var(--text-main)' }}>{message}</p>
        </div>
    );
};
