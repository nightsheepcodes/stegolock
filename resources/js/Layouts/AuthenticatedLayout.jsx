import { Shield, Plus, ChevronDown, Upload, FolderOpen, Mail, Lock, User, Eye, EyeOff, AlertCircle, CheckCircle2, Loader2, HardDrive, X, Folder, Menu, PlayCircle} from "lucide-react";
import { Toaster } from 'sonner';

import Dropdown from '@/Components/Dropdown';

import Sidebar from "@/Components/Sidebar";

import { Link, usePage, router } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import CreateFolderModal from '@/Components/modals/CreateFolderModal';
import UploadModal from '@/Components/modals/UploadModal';
import { TourGuideModal } from '@/Components/modals/TourGuideModal';
import { EvaluationTourWidget } from '@/Components/EvaluationTourWidget';
import { GuideContentModal } from '@/Components/modals/GuideContentModal';
import useInactivityTimeout from '@/hooks/useInactivityTimeout';

 export default function AuthenticatedLayout({
    header,
    subHeader,
    headerActions,
    totalStorage,
    storageLimit,
    hasProcessingDocs = false,
    children
 }) {
    // Enable auto-logout after 10 minutes of inactivity
    useInactivityTimeout(10);

    const user = usePage().props.auth.user;
    const [showFolderCreateModal, setShowFolderCreateModal] = useState(false);
    const [folderName, setFolderName] = useState('');
    const [folderErrors, setFolderErrors] = useState({});
    const [folderProcessing, setFolderProcessing] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [currentFolderId, setCurrentFolderId] = useState(null);
    const [showTourModal, setShowTourModal] = useState(false);
    const [showGuideContentModal, setShowGuideContentModal] = useState(false);

    useEffect(() => {
        // Only show once per user across the whole app
        if (typeof window !== 'undefined' && !localStorage.getItem('stegolock_tour_completed')) {
            const timer = setTimeout(() => setShowTourModal(true), 500);
            return () => clearTimeout(timer);
        }
    }, []);

    useEffect(() => {
        const handleTriggerUpload = (e) => {
            if (!isUploading) {
                setCurrentFolderId(e.detail?.folderId || null);
                setShowUploadModal(true);
            }
        };
        window.addEventListener('trigger-upload-modal', handleTriggerUpload);
        return () => window.removeEventListener('trigger-upload-modal', handleTriggerUpload);
    }, [isUploading]);

    const submitFolderCreate = async (e) => {
        e.preventDefault();
        setFolderProcessing(true);
        const toastId = toast.loading('Creating folder...');
        try {
            await axios.post('/folders', { 
                name: folderName,
                parent_id: null 
            });
            toast.success('Folder created successfully', { id: toastId });
            setShowFolderCreateModal(false);
            setFolderName('');
            router.reload();
        } catch (err) {
            if (err.response?.data?.errors) {
                setFolderErrors(err.response.data.errors);
            }
            toast.error('Failed to create folder', { id: toastId });
        } finally {
            setFolderProcessing(false);
        }
    };

    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-cyber-surface transition-colors overflow-hidden relative">

            {/* Mobile Sidebar Overlay */}
            {isMobileSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] lg:hidden"
                    onClick={() => setIsMobileSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-[110] transform transition-transform duration-300 lg:relative lg:translate-x-0 ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <Sidebar
                    totalStorage={totalStorage}
                    storageLimit={storageLimit}
                    hasProcessingDocs={hasProcessingDocs}
                    onNewFolderClick={() => {
                        setFolderName('');
                        setFolderErrors({});
                        setShowFolderCreateModal(true);
                    }}
                    onClose={() => setIsMobileSidebarOpen(false)}
                    isMobile={true}
                />
            </div>

            {/* RIGHT SIDE */}
            <div className="flex flex-col flex-1 h-screen overflow-hidden bg-slate-50 dark:bg-cyber-surface">
                <header className="bg-white/80 dark:bg-cyber-void/90 backdrop-blur-xl border-b border-slate-200 dark:border-cyber-border/50 relative z-40 transition-colors">
                    <div className="max-w-[1600px] mx-auto px-4 lg:px-8 py-4">
                        {/* Row 1: Title & Actions */}
                        <div className="flex items-center justify-between min-h-[40px] gap-4">
                            <div className="flex items-center gap-3 flex-1 min-w-0 text-slate-900 dark:text-white transition-colors">
                                <button 
                                    onClick={() => setIsMobileSidebarOpen(true)}
                                    className="lg:hidden p-2 -ml-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-cyber-border/30 rounded-xl transition-colors"
                                >
                                    <Menu className="size-6" />
                                </button>
                                <div className="truncate text-lg sm:text-xl md:text-2xl font-black tracking-tight">
                                    {header}
                                </div>
                            </div>

                            <div className="flex items-center gap-3 shrink-0">
                                {/* Page-specific actions (e.g., Grid/List Toggle) */}
                                {headerActions}

                                {/* Global Profile Menu */}
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button className="flex items-center justify-center size-10 bg-slate-50 dark:bg-cyber-surface hover:bg-slate-100 dark:hover:bg-cyber-surface/80 rounded-full transition-all border border-slate-200 dark:border-cyber-border/50 group cursor-pointer shadow-sm hover:shadow-cyan-500/20 overflow-hidden">
                                            <div className="size-full bg-gradient-to-br from-cyber-accent to-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-inner group-hover:scale-110 transition-transform">
                                                {user.name.charAt(0)}
                                            </div>
                                        </button>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content width="72" contentClasses="py-2 bg-white dark:bg-cyber-surface/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-300 dark:border-cyber-accent/30">
                                        <div className="px-5 py-4 border-b border-slate-200 dark:border-cyber-border/50 mb-1">
                                            <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{user.name}</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">{user.email}</p>
                                        </div>
                                        
                                        <div className="space-y-0.5 px-2">
                                            <button onClick={() => setShowTourModal(true)} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-cyber-border/30 transition-colors rounded-xl group text-left">
                                                <PlayCircle className="size-4 text-slate-400 group-hover:text-cyan-500 dark:group-hover:text-cyber-accent transition-colors" />
                                                Quick Start Guide
                                            </button>

                                            <Dropdown.Link href={route('profile.edit')} className="flex items-center gap-3 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-cyber-border/30 transition-colors rounded-xl group">
                                                <User className="size-4 text-slate-400 group-hover:text-cyber-accent transition-colors" />
                                                Manage Account
                                            </Dropdown.Link>

                                            <Dropdown.Link href={route('manageStorage')} className="flex items-center gap-3 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-cyber-border/30 transition-colors rounded-xl group">
                                                <HardDrive className="size-4 text-slate-400 group-hover:text-cyber-accent transition-colors" />
                                                Manage Personal Space
                                            </Dropdown.Link>
                                        </div>

                                        <div className="my-2 border-t border-slate-50 dark:border-cyber-border/30 mx-2" />

                                        <div className="px-2">
                                            <Dropdown.Link href={route('logout')} method="post" as="button" className="flex items-center gap-3 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors rounded-xl w-full group">
                                                <EyeOff className="size-4 text-red-400 group-hover:text-red-500 transition-colors" />
                                                Log Out
                                            </Dropdown.Link>
                                        </div>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        {/* Row 2: Search & Filters */}
                        {subHeader && (
                            <div className="mt-4 pt-4 border-t border-slate-50 dark:border-cyber-border/30">
                                {subHeader}
                            </div>
                        )}
                    </div>
                </header>

                <main className="flex-1 overflow-hidden">
                    {children}

                    <UploadModal 
                        isOpen={showUploadModal}
                        onClose={() => setShowUploadModal(false)}
                        allowUpload={() => setIsUploading(false)}
                        uploaded={() => setIsUploading(true)}
                        folderId={currentFolderId}
                    />

                    <CreateFolderModal 
                        show={showFolderCreateModal}
                        onClose={() => setShowFolderCreateModal(false)}
                        onSubmit={submitFolderCreate}
                        name={folderName}
                        setName={setFolderName}
                        errors={folderErrors}
                        processing={folderProcessing}
                        title="New Root Folder"
                        subtitle="Organize your top-level workspace"
                    />

                    <TourGuideModal 
                        show={showTourModal} 
                        onClose={() => setShowTourModal(false)} 
                        onExploreMore={() => {
                            setShowTourModal(false);
                            setShowGuideContentModal(true);
                        }}
                    />

                    <EvaluationTourWidget 
                        onExploreMore={() => setShowGuideContentModal(true)}
                    />

                    <GuideContentModal 
                        show={showGuideContentModal} 
                        onClose={() => setShowGuideContentModal(false)} 
                    />

                    <Toaster position="top-center" richColors />
                </main>
            </div>
        </div>
    );
}
