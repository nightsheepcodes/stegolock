import { useEffect, useCallback } from 'react';
import { router } from '@inertiajs/react';

/**
 * Hook to automatically log out the user after a period of inactivity.
 * Uses localStorage to synchronize inactivity state across multiple tabs.
 * 
 * @param {number} timeoutMinutes - Inactivity threshold in minutes.
 */
export default function useInactivityTimeout(timeoutMinutes = 10) {
    const timeoutMs = timeoutMinutes * 60 * 1000;

    const logout = useCallback(() => {
        router.post(route('logout'), {}, {
            onFinish: () => {
                // Force redirect to login with a query parameter to show the timeout notice
                window.location.href = route('login', { timeout: 'session_expired' });
            }
        });
    }, []);

    useEffect(() => {
        const STORAGE_KEY = 'stegolock_last_activity';
        
        // Function to update the last activity timestamp in localStorage
        const updateActivity = () => {
            localStorage.setItem(STORAGE_KEY, Date.now().toString());
        };

        // Function to check if the inactivity period has been exceeded
        const checkInactivity = () => {
            const lastActivity = parseInt(localStorage.getItem(STORAGE_KEY) || '0');
            const now = Date.now();
            
            if (lastActivity && (now - lastActivity) >= timeoutMs) {
                logout();
            }
        };

        const events = [
            'mousedown',
            'mousemove',
            'keypress',
            'scroll',
            'touchstart',
            'click'
        ];

        // Initialize activity on mount
        updateActivity();
        
        // Add listeners for various user interactions
        events.forEach(event => {
            window.addEventListener(event, updateActivity);
        });

        // Check for inactivity every 10 seconds
        const intervalId = setInterval(checkInactivity, 10000);

        // Also listen for storage events to respond immediately to activity in other tabs
        const handleStorageChange = (e) => {
            if (e.key === STORAGE_KEY) {
                // If last activity was updated in another tab, we don't need to do anything
                // the interval check will handle it, but this keeps the local state fresh.
            }
        };
        window.addEventListener('storage', handleStorageChange);

        // Cleanup on unmount
        return () => {
            events.forEach(event => {
                window.removeEventListener(event, updateActivity);
            });
            window.removeEventListener('storage', handleStorageChange);
            clearInterval(intervalId);
        };
    }, [logout, timeoutMs]);
}
