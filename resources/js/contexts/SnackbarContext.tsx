import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

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

    const colors: Record<SnackbarType, string> = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        info: 'bg-blue-500',
        warning: 'bg-yellow-500 text-black',
    };

    return (
        <SnackbarContext.Provider value={{ showSnackbar }}>
            {children}
            {snackbar.open && (
                <div className={`fixed bottom-6 right-6 z-[100] rounded-lg px-5 py-3 text-sm font-medium text-white shadow-lg transition-all ${colors[snackbar.type]}`}>
                    {snackbar.message}
                </div>
            )}
        </SnackbarContext.Provider>
    );
}
