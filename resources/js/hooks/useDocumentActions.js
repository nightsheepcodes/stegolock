import { toast } from 'sonner';
import { router } from '@inertiajs/react';
import axios from 'axios';

export function useDocumentActions({ 
    setLocalDocs, 
    updateUnlockingProgress, 
    setSelectedDocId, 
    setSelectedDocForShare, 
    setSelectedDocForInfo,
    setShowDeleteModal, 
    setShowMoveModal, 
    setShowShareModal, 
    setShowInfoModal,
    setShowKeepFileModal 
}) {

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const handleBeforeUnload = (e) => {
        e.preventDefault();
        e.returnValue = ''; 
    };

    const handleUnlock = async (id) => {
        updateUnlockingProgress(id);
        const toastId = toast.loading('Unlocking file...', { duration: 3000 });
        try {
            window.addEventListener('beforeunload', handleBeforeUnload);

            const resp = await axios.post('/documents/unlock', {
                document_id: id
            });

            if (resp.data.success) {
                toast.dismiss(toastId);
                // Already updated progress at start
                
                setLocalDocs(prev => prev.map(doc => 
                    doc.document_id === id ? { ...doc, status: resp.data.status } : doc
                ));

                window.dispatchEvent(new CustomEvent('stegolock-action-completed', { 
                    detail: { type: 'unlock' } 
                }));
            }
        } catch (err) {
            console.error('Unlock failed:', err);
            toast.error('Unlock failed', { id: toastId });
        } finally {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        }
    };

    const handleMove = async (docId, folderId) => {
        const toastId = toast.loading('Moving document...');
        try {
            await axios.put(`/documents/${docId}/move`, {
                folder_id: folderId
            });
            toast.success('Document moved successfully', { id: toastId });
            setShowMoveModal(false);
            router.reload();
        } catch (err) {
            toast.error('Failed to move document', { id: toastId });
        }
    };

    const confirmDelete = async (docId) => {
        const toastId = toast.loading('Deleting document...');
        try {
            await axios.post('/documents/delete', {
                document_id: docId,
            });
            toast.success('Document deleted successfully', { id: toastId });
            window.dispatchEvent(new CustomEvent('stegolock-action-completed', { 
                detail: { type: 'delete' } 
            }));
            await sleep(1000);
            router.reload();
        } catch (err) {
            console.error(err);
            toast.error('Failed to delete document', { id: toastId });
        }
    };

    const keepFile = async (docId, filename, silent = false, customMessage = null) => {
        let toastId = null;
        if (!silent) {
            toastId = toast.loading(`Keeping ${filename}...`);
        }
        try {
            await axios.post('/documents/keep', {
                document_id: docId
            });
            if (!silent) {
                await sleep(2000);
                toast.success(`${filename} is kept.`, { id: toastId });
            } else if (customMessage) {
                toast.success(customMessage);
            }
            setShowKeepFileModal(null);
            setSelectedDocId(null);
        } catch (err) {
            if (!silent) {
                toast.error(`Failed to keep ${filename}.`, { id: toastId });
            }
        }
    };

    const handleToggleStar = async (id) => {
        try {
            const resp = await axios.post(route('documents.star.toggle'), {
                document_id: id
            });
            
            if (resp.data.is_starred !== undefined) {
                setLocalDocs(prev => prev.map(doc => 
                    doc.document_id === id ? { ...doc, is_starred: resp.data.is_starred } : doc
                ));
                toast.success(resp.data.message);
            }
        } catch (err) {
            toast.error('Failed to update star status');
        }
    };

    const handleFileInfo = (doc) => {
        setSelectedDocForInfo(doc);
        setShowInfoModal(true);
    };

    const handleRename = async (docId, newName) => {
        const toastId = toast.loading('Renaming document...');
        try {
            await axios.put(`/documents/${docId}/rename`, {
                filename: newName
            });
            toast.success('Document renamed successfully', { id: toastId });
            router.reload();
        } catch (err) {
            toast.error('Failed to rename document', { id: toastId });
        }
    };

    const fetchMetrics = async (docId) => {
        try {
            const resp = await axios.get(`/documents/metrics/${docId}`);
            return resp.data;
        } catch (err) {
            console.error('Failed to fetch metrics:', err);
            return [];
        }
    };

    const handleVerifyIntegrity = async (docId) => {
        const toastId = toast.loading('Starting storage integrity scan...', { duration: 3000 });
        try {
            const resp = await axios.post(`/documents/verify/${docId}`);
            if (resp.data.success) {
                if (resp.data.status === 'healthy') {
                    toast.success('Integrity Check Passed: All fragments are intact.', { id: toastId });
                } else {
                    toast.error(`Integrity Check Failed: ${resp.data.issues.length} issues found.`, { id: toastId });
                }
                return resp.data;
            }
        } catch (err) {
            console.error('Integrity check failed:', err);
            toast.error('Failed to complete integrity check.', { id: toastId });
        }
        return null;
    };

    return {
        handleUnlock,
        handleMove,
        confirmDelete,
        keepFile,
        handleToggleStar,
        handleFileInfo,
        handleRename,
        fetchMetrics,
        handleVerifyIntegrity
    };
}
