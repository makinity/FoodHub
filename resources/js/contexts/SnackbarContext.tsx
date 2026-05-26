import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { router, usePage } from '@inertiajs/react';

type SnackbarType = 'success' | 'error' | 'info' | 'warning';

interface SnackbarState {
    open: boolean;
    message: string;
    type: SnackbarType;
}

interface SnackbarContextType {
    showSnackbar: (message: string, type?: SnackbarType) => void;
}

const SnackbarContext = createContext<SnackbarContextType>({ showSnackbar: () => {} });

export function useSnackbar() {
    return useContext(SnackbarContext);
}

export function SnackbarProvider({ children }: { children: ReactNode }) {
    const [snackbar, setSnackbar] = useState<SnackbarState>({ open: false, message: '', type: 'success' });

    const showSnackbar = useCallback((message: string, type: SnackbarType = 'success') => {
        setSnackbar({ open: true, message, type });
        setTimeout(() => setSnackbar(s => ({ ...s, open: false })), 3000);
    }, []);

    useEffect(() => {
        return router.on('success', (event) => {
            const flash = (event.detail.page.props as any).flash;
            if (flash?.success) showSnackbar(flash.success, 'success');
            if (flash?.error) showSnackbar(flash.error, 'error');
        });
    }, [showSnackbar]);

    const icons: Record<SnackbarType, string> = {
        success: '✓',
        error: '✕',
        info: 'ℹ',
        warning: '⚠',
    };

    const colors: Record<SnackbarType, string> = {
        success: 'border-green-500 bg-green-50 text-green-800 dark:bg-green-900/80 dark:text-green-200',
        error: 'border-red-500 bg-red-50 text-red-800 dark:bg-red-900/80 dark:text-red-200',
        info: 'border-blue-500 bg-blue-50 text-blue-800 dark:bg-blue-900/80 dark:text-blue-200',
        warning: 'border-yellow-500 bg-yellow-50 text-yellow-800 dark:bg-yellow-900/80 dark:text-yellow-200',
    };

    const iconColors: Record<SnackbarType, string> = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        info: 'bg-blue-500',
        warning: 'bg-yellow-500',
    };

    return (
        <SnackbarContext.Provider value={{ showSnackbar }}>
            {children}
            {snackbar.open && (
                <div className={`fixed left-1/2 top-6 z-[100] -translate-x-1/2 flex items-center gap-3 rounded-xl border-l-4 px-5 py-3 shadow-lg backdrop-blur-sm transition-all ${colors[snackbar.type]}`}>
                    <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white ${iconColors[snackbar.type]}`}>{icons[snackbar.type]}</span>
                    <span className="text-sm font-medium">{snackbar.message}</span>
                </div>
            )}
        </SnackbarContext.Provider>
    );
}
