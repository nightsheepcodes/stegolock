import React, { useState, useEffect } from 'react';
import { Bell, Check, Trash2, Mail, FolderHeart, ShieldAlert, CheckCircle, Sparkles } from 'lucide-react';
import axios from 'axios';
import { router } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';
import { toast } from 'sonner';

export default function NotificationDropdown() {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    // Fetch user notifications
    const fetchNotifications = async () => {
        try {
            const res = await axios.get('/notifications');
            setNotifications(res.data.notifications || []);
            setUnreadCount(res.data.unread_count || 0);
        } catch (err) {
            console.error('Failed to fetch notifications:', err);
        }
    };

    // Initial fetch on mount and setup polling every 10 seconds
    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 10000);
        return () => clearInterval(interval);
    }, []);

    // Handle marking a notification as read
    const markAsRead = async (id, e) => {
        if (e) e.stopPropagation();
        try {
            const res = await axios.post(`/notifications/${id}/read`);
            setNotifications(prev =>
                prev.map(n => n.id === id ? { ...n, read_at: new Date().toISOString() } : n)
            );
            setUnreadCount(res.data.unread_count);
        } catch (err) {
            console.error('Failed to mark notification as read:', err);
        }
    };

    // Handle marking all notifications as read
    const markAllAsRead = async (e) => {
        if (e) e.stopPropagation();
        try {
            await axios.post('/notifications/read-all');
            setNotifications(prev => prev.map(n => ({ ...n, read_at: new Date().toISOString() })));
            setUnreadCount(0);
            toast.success('All notifications marked as read');
        } catch (err) {
            console.error('Failed to mark all as read:', err);
        }
    };

    // Handle deleting a notification
    const deleteNotification = async (id, e) => {
        if (e) e.stopPropagation();
        try {
            const res = await axios.delete(`/notifications/${id}`);
            setNotifications(prev => prev.filter(n => n.id !== id));
            setUnreadCount(res.data.unread_count);
        } catch (err) {
            console.error('Failed to delete notification:', err);
        }
    };

    // Handle notification click (mark as read & redirect if action_url is present)
    const handleNotificationClick = async (notification) => {
        if (!notification.read_at) {
            await markAsRead(notification.id);
        }
        
        const data = typeof notification.data === 'string' 
            ? JSON.parse(notification.data) 
            : notification.data;

        if (data?.action_url) {
            router.visit(data.action_url);
        }
    };

    // Format relative time helper
    const formatTimeAgo = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        return `${diffDays}d ago`;
    };

    // Helper to get notification icons based on type
    const getNotificationIcon = (type) => {
        switch (type) {
            case 'share_granted':
                return (
                    <div className="flex items-center justify-center size-8 rounded-lg bg-cyan-50 dark:bg-cyber-accent/15 text-cyan-600 dark:text-cyber-accent border border-cyan-100 dark:border-cyber-accent/20">
                        <Mail className="size-4" />
                    </div>
                );
            case 'folder_share_granted':
                return (
                    <div className="flex items-center justify-center size-8 rounded-lg bg-indigo-50 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20">
                        <FolderHeart className="size-4" />
                    </div>
                );
            case 'share_revoked':
            case 'folder_share_revoked':
                return (
                    <div className="flex items-center justify-center size-8 rounded-lg bg-red-50 dark:bg-red-500/15 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-500/20">
                        <ShieldAlert className="size-4" />
                    </div>
                );
            case 'share_accepted':
            case 'folder_share_accepted':
                return (
                    <div className="flex items-center justify-center size-8 rounded-lg bg-emerald-50 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/20">
                        <CheckCircle className="size-4" />
                    </div>
                );
            default:
                return (
                    <div className="flex items-center justify-center size-8 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                        <Bell className="size-4" />
                    </div>
                );
        }
    };

    return (
        <Dropdown>
            <Dropdown.Trigger>
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="relative flex items-center justify-center size-10 bg-slate-50 dark:bg-cyber-surface hover:bg-slate-100 dark:hover:bg-cyber-surface/80 rounded-full transition-all border border-slate-200 dark:border-cyber-border/50 group cursor-pointer shadow-sm hover:shadow-cyan-500/20"
                >
                    <Bell className={`size-5 text-slate-600 dark:text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyber-accent transition-colors ${unreadCount > 0 ? 'animate-wiggle' : ''}`} />
                    
                    {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-5 min-w-5 px-1 items-center justify-center bg-red-500 text-[10px] font-black text-white rounded-full border border-white dark:border-cyber-surface animate-bounce shadow-md">
                            {unreadCount}
                        </span>
                    )}
                </button>
            </Dropdown.Trigger>

            <Dropdown.Content 
                width="80" 
                contentClasses="py-0 bg-white dark:bg-cyber-surface/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-300 dark:border-cyber-accent/30 overflow-hidden"
            >
                {/* Dropdown Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-cyber-border/50 bg-slate-50/50 dark:bg-cyber-void/30">
                    <div className="flex items-center gap-2">
                        <Bell className="size-4 text-cyan-600 dark:text-cyber-accent" />
                        <span className="font-black text-sm text-slate-900 dark:text-white uppercase tracking-wider">Notifications</span>
                    </div>
                    {unreadCount > 0 && (
                        <button 
                            onClick={markAllAsRead}
                            className="flex items-center gap-1 text-[11px] font-semibold text-cyan-600 dark:text-cyber-accent hover:underline transition-all"
                        >
                            <Check className="size-3" />
                            Mark all read
                        </button>
                    )}
                </div>

                {/* Notifications List */}
                <div className="max-h-[380px] overflow-y-auto divide-y divide-slate-100 dark:divide-cyber-border/30">
                    {notifications.length > 0 ? (
                        notifications.map((notification) => {
                            const isUnread = !notification.read_at;
                            const data = typeof notification.data === 'string'
                                ? JSON.parse(notification.data)
                                : notification.data;

                            return (
                                <div 
                                    key={notification.id}
                                    onClick={() => handleNotificationClick(notification)}
                                    className={`relative flex gap-3 p-4 hover:bg-slate-50 dark:hover:bg-cyber-border/20 cursor-pointer transition-colors group ${isUnread ? 'bg-cyan-500/[0.02] dark:bg-cyber-accent/[0.02]' : ''}`}
                                >
                                    {/* Left Status Indicator */}
                                    {isUnread && (
                                        <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-600 dark:bg-cyber-accent shadow-sm shadow-cyan-500/50 animate-pulse" />
                                    )}

                                    {/* Type Icon */}
                                    <div className="shrink-0">
                                        {getNotificationIcon(data?.type)}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0 pr-4">
                                        <p className={`text-xs font-bold truncate leading-tight ${isUnread ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'}`}>
                                            {data?.title || 'System Notification'}
                                        </p>
                                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-normal break-words">
                                            {data?.message}
                                        </p>
                                        <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 block font-medium">
                                            {formatTimeAgo(notification.created_at)}
                                        </span>
                                    </div>

                                    {/* Quick Actions (Mark Read / Delete) */}
                                    <div className="absolute right-3 top-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {isUnread && (
                                            <button 
                                                onClick={(e) => markAsRead(notification.id, e)}
                                                className="p-1 rounded-md text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 bg-slate-100 dark:bg-cyber-border/40 hover:bg-slate-200 dark:hover:bg-cyber-border/60 transition-colors shadow-sm"
                                                title="Mark as read"
                                            >
                                                <Check className="size-3" />
                                            </button>
                                        )}
                                        <button 
                                            onClick={(e) => deleteNotification(notification.id, e)}
                                            className="p-1 rounded-md text-slate-400 hover:text-red-500 dark:hover:text-red-400 bg-slate-100 dark:bg-cyber-border/40 hover:bg-slate-200 dark:hover:bg-cyber-border/60 transition-colors shadow-sm"
                                            title="Delete"
                                        >
                                            <Trash2 className="size-3" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
                            <div className="size-12 rounded-2xl bg-slate-50 dark:bg-cyber-surface/50 flex items-center justify-center border border-slate-100 dark:border-cyber-border/20 mb-3 shadow-inner">
                                <Sparkles className="size-6 text-slate-400 dark:text-slate-500" />
                            </div>
                            <p className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider">All Caught Up!</p>
                            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 max-w-[200px]">
                                You have no notifications at the moment.
                            </p>
                        </div>
                    )}
                </div>
            </Dropdown.Content>
        </Dropdown>
    );
}
