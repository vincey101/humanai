'use client';

import React, { useState, useRef } from 'react';
import {
    Box,
    Typography,
    Paper,
    IconButton,
    Button,
    Alert,
} from '@mui/material';
import { ArrowBack, CloudUpload } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

interface VideoValidationResult {
    isValid: boolean;
    error?: string;
}

const AvatarUpload = () => {
    const router = useRouter();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleBack = () => {
        router.push('/projects/create-avatar/select-avatar-template');
    };

    const validateVideo = (file: File): Promise<VideoValidationResult> => {
        return new Promise((resolve) => {
            const video = document.createElement('video');
            video.preload = 'metadata';

            video.onloadedmetadata = () => {
                window.URL.revokeObjectURL(video.src);
                const duration = video.duration;

                if (duration < 120 || duration > 300) {
                    resolve({
                        isValid: false,
                        error: 'Video duration must be between 2 and 5 minutes'
                    });
                } else {
                    resolve({ isValid: true });
                }
            };

            video.src = URL.createObjectURL(file);
        });
    };

    const handleFileSelect = async (file: File) => {
        const validTypes = ['video/mp4', 'video/quicktime'];
        if (!validTypes.includes(file.type)) {
            setError('Please upload MP4 or MOV files only');
            return;
        }

        const validation = await validateVideo(file);
        if (!validation.isValid) {
            setError(validation.error || 'Invalid video');
            return;
        }

        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
        setError(null);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) handleFileSelect(file);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFileSelect(e.target.files[0]);
        }
    };

    return (
        <Box sx={{ p: 2, maxWidth: 700, mx: 'auto' }}>
            <Paper elevation={0} sx={{ p: 2, borderRadius: 2 }}>
                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 1.5
                }}>
                    <IconButton
                        onClick={handleBack}
                        sx={{ mr: 1, color: '#1D2136' }}
                    >
                        <ArrowBack />
                    </IconButton>
                    <Typography 
                        variant="h5" 
                        sx={{ 
                            color: '#1C2536',
                            fontSize: '1.4rem'
                        }}
                    >
                        Upload Video
                    </Typography>
                </Box>

                {error && (
                    <Alert severity="error" sx={{ mb: 1.5 }}>
                        {error}
                    </Alert>
                )}

                <Box
                    sx={{
                        border: '2px dashed #E5E7EB',
                        borderRadius: 2,
                        p: 2.5,
                        textAlign: 'center',
                        backgroundColor: '#F9FAFB',
                    }}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >
                    {!previewUrl ? (
                        <>
                            <CloudUpload sx={{ fontSize: 40, color: '#9DA4AE', mb: 1.5 }} />
                            <Typography variant="h6" gutterBottom>
                                Drag and drop your video here, or{' '}
                                <Typography
                                    component="span"
                                    variant="inherit"
                                    onClick={(e: React.MouseEvent<HTMLSpanElement>) => {
                                        e.stopPropagation();
                                        fileInputRef.current?.click();
                                    }}
                                    sx={{
                                        color: '#6366F1',
                                        textDecoration: 'underline',
                                        cursor: 'pointer',
                                        display: 'inline',
                                        '&:hover': {
                                            color: '#4F46E5',
                                        },
                                    }}
                                >
                                    browse to choose a file
                                </Typography>
                            </Typography>
                            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                                Supported formats: MP4, MOV
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Video duration must be between 2-5 minutes
                            </Typography>
                            <Typography
                                component="span"
                                variant="body2"
                                sx={{
                                    color: '#6366F1',
                                    mt: 2,
                                    display: 'block',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        textDecoration: 'underline'
                                    }
                                }}
                                onClick={(e: React.MouseEvent<HTMLSpanElement>) => {
                                    e.stopPropagation();
                                    router.push('/projects/create-avatar/avatar-instructions');
                                }}
                            >
                                View detailed instructions here
                            </Typography>
                        </>
                    ) : (
                        <Box sx={{ 
                            width: '100%', 
                            maxWidth: 600,
                            mx: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 1.5
                        }}>
                            <video
                                controls
                                width="100%"
                                src={previewUrl}
                                style={{ 
                                    borderRadius: '8px',
                                    maxHeight: '400px'
                                }}
                            />
                            <Typography
                                component="span"
                                variant="body2"
                                sx={{
                                    color: '#6366F1',
                                    cursor: 'pointer',
                                    textAlign: 'center',
                                    '&:hover': {
                                        textDecoration: 'underline'
                                    },
                                    mb: 0.5
                                }}
                                onClick={(e: React.MouseEvent<HTMLSpanElement>) => {
                                    e.stopPropagation();
                                    router.push('/projects/create-avatar/avatar-instructions');
                                }}
                            >
                                View detailed instructions here
                            </Typography>
                            <Button
                                variant="outlined"
                                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                    e.stopPropagation();
                                    setSelectedFile(null);
                                    setPreviewUrl(null);
                                    setError(null);
                                }}
                                sx={{ 
                                    textTransform: 'none',
                                    borderColor: '#E5E7EB',
                                    color: '#6B7280',
                                    '&:hover': {
                                        borderColor: '#9CA3AF',
                                        bgcolor: 'rgba(55, 65, 81, 0.04)'
                                    }
                                }}
                            >
                                Choose Different File
                            </Button>
                        </Box>
                    )}
                </Box>

                <input
                    type="file"
                    ref={fileInputRef}
                    accept="video/mp4,video/quicktime"
                    style={{ display: 'none' }}
                    onChange={handleFileInputChange}
                />

                {selectedFile && !error && (
                    <Box sx={{ mt: 2, textAlign: 'right' }}>
                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: '#1D2136',
                                '&:hover': {
                                    bgcolor: '#282d4a',
                                },
                                textTransform: 'none'
                            }}
                        >
                            Next
                        </Button>
                    </Box>
                )}
            </Paper>
        </Box>
    );
};

export default AvatarUpload; 