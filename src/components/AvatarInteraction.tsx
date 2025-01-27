'use client';
import React, { useState, useEffect, useRef } from 'react';
import { XMarkIcon, ArrowLeftIcon, MicrophoneIcon, StopIcon } from '@heroicons/react/24/outline';
import { StreamingAvatar } from '@heygen/streaming-avatar';

// Define Web Speech API types
interface SpeechRecognitionErrorEvent extends Event {
    error: string;
    message?: string;
}

interface SpeechRecognitionResult {
    readonly length: number;
    item(index: number): SpeechRecognitionAlternative;
    [index: number]: SpeechRecognitionAlternative;
    isFinal: boolean;
}

interface SpeechRecognitionAlternative {
    transcript: string;
    confidence: number;
}

interface SpeechRecognitionResultList {
    readonly length: number;
    item(index: number): SpeechRecognitionResult;
    [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionEvent extends Event {
    readonly resultIndex: number;
    readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    start(): void;
    stop(): void;
    abort(): void;
    onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => void) | null;
    onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => void) | null;
}

interface SpeechRecognitionConstructor {
    new(): SpeechRecognition;
    prototype: SpeechRecognition;
}

declare global {
    interface Window {
        SpeechRecognition: SpeechRecognitionConstructor;
        webkitSpeechRecognition: SpeechRecognitionConstructor;
    }
}

interface AvatarInteractionProps {
    avatar: {
        avatar_id: string;
        avatar_name: string;
        preview_video_url: string;
        preview_image_url: string;
    };
    onBack: () => void;
}

const languages = [
    { code: 'en-US', name: 'English (US)' },
    { code: 'es-ES', name: 'Spanish' },
    { code: 'fr-FR', name: 'French' },
    { code: 'de-DE', name: 'German' },
    { code: 'it-IT', name: 'Italian' },
    { code: 'ja-JP', name: 'Japanese' },
    { code: 'ko-KR', name: 'Korean' },
    { code: 'zh-CN', name: 'Chinese (Simplified)' },
];

const AvatarInteraction = ({ avatar, onBack }: AvatarInteractionProps) => {
    const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [isAvatarSpeaking, setIsAvatarSpeaking] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const streamingAvatarRef = useRef<StreamingAvatar | null>(null);
    const recognitionRef = useRef<SpeechRecognition | null>(null);

    // Initialize streaming avatar
    useEffect(() => {
        const initializeAvatar = async () => {
            try {
                const container = document.getElementById('avatar-stream-container');
                if (!container) {
                    throw new Error('Container element not found');
                }

                // Initialize the streaming avatar
                const avatarInstance = new StreamingAvatar({
                    token: process.env.NEXT_PUBLIC_HEYGEN_API_KEY || '',
                    basePath: 'https://api.heygen.com',
                });

                // Start the avatar session
                await avatarInstance.createStartAvatar({
                    avatarName: avatar.avatar_id,
                    quality: 'high',
                    language: selectedLanguage.code,
                    voice: {
                        voiceId: 'en_us_001',
                        rate: 1.0,
                    },
                    knowledgeBase: 'You are a helpful AI assistant',
                    disableIdleTimeout: true,
                });

                streamingAvatarRef.current = avatarInstance;

                // Set up event listeners
                avatarInstance.on('AVATAR_START_TALKING', () => {
                    setIsAvatarSpeaking(true);
                });

                avatarInstance.on('AVATAR_STOP_TALKING', () => {
                    setIsAvatarSpeaking(false);
                });

                setError(null);
            } catch (err) {
                console.error('Failed to initialize avatar:', err);
                setError('Failed to initialize avatar. Please try again.');
            }
        };

        initializeAvatar();

        return () => {
            if (streamingAvatarRef.current) {
                streamingAvatarRef.current.stopAvatar(avatar.avatar_id);
            }
        };
    }, [avatar.avatar_id, selectedLanguage.code]);

    // Initialize speech recognition
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            if (recognitionRef.current) {
                recognitionRef.current.continuous = true;
                recognitionRef.current.interimResults = true;
                recognitionRef.current.lang = selectedLanguage.code;

                recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
                    const results = Array.from(event.results);
                    const transcriptText = results
                        .map(result => (result[0] as SpeechRecognitionAlternative).transcript)
                        .join('');
                    setTranscript(transcriptText);
                };

                recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
                    console.error('Speech recognition error:', event.error);
                    setError('Failed to access microphone. Please check permissions.');
                    setIsListening(false);
                };
            }
        }
    }, [selectedLanguage.code]);

    const toggleListening = async () => {
        if (!recognitionRef.current) {
            setError('Speech recognition is not supported in your browser.');
            return;
        }

        if (isListening) {
            recognitionRef.current.stop();
            setIsListening(false);

            // Send the transcript to the avatar
            if (streamingAvatarRef.current && transcript) {
                try {
                    await streamingAvatarRef.current.speak({
                        text: transcript,
                        task_type: 'TALK'
                    });
                } catch (err) {
                    console.error('Failed to send message to avatar:', err);
                    setError('Failed to communicate with avatar. Please try again.');
                }
            }
        } else {
            try {
                await recognitionRef.current.start();
                setIsListening(true);
                setError(null);
            } catch (err) {
                console.error('Failed to start speech recognition:', err);
                setError('Failed to start listening. Please try again.');
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-[#1A1A1A] rounded-2xl p-8 max-w-6xl w-full mx-4 shadow-xl relative text-white h-[90vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center">
                        <button
                            onClick={onBack}
                            className="p-2 hover:bg-gray-800 rounded-full transition-colors mr-4"
                        >
                            <ArrowLeftIcon className="w-6 h-6" />
                        </button>
                        <h2 className="text-2xl font-bold">{avatar.avatar_name}</h2>
                    </div>
                    <button
                        onClick={onBack}
                        className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                    >
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                {error && (
                    <div className="bg-red-500/10 text-red-500 px-4 py-2 rounded-lg mb-4">
                        {error}
                    </div>
                )}

                {/* Main Content */}
                <div className="flex-1 flex gap-8">
                    {/* Left Side - Video Stream */}
                    <div className="w-2/3 bg-black rounded-lg overflow-hidden relative">
                        <div id="avatar-stream-container" className="w-full h-full" />
                        {isAvatarSpeaking && (
                            <div className="absolute bottom-4 left-4 px-3 py-1 bg-white/10 rounded-full text-sm">
                                Speaking...
                            </div>
                        )}
                    </div>

                    {/* Right Side - Controls */}
                    <div className="w-1/3 space-y-6">
                        {/* Language Selection */}
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Language</label>
                            <select
                                value={selectedLanguage.code}
                                onChange={(e) => setSelectedLanguage(
                                    languages.find(lang => lang.code === e.target.value) || languages[0]
                                )}
                                className="w-full bg-[#2A2A2A] text-white rounded-lg px-4 py-2 border border-gray-700 focus:border-gray-500 focus:outline-none"
                            >
                                {languages.map((lang) => (
                                    <option key={lang.code} value={lang.code}>
                                        {lang.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Transcript Display */}
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Your Message</label>
                            <div className="min-h-32 bg-[#2A2A2A] text-white rounded-lg p-4 border border-gray-700">
                                {transcript || 'Start speaking...'}
                            </div>
                        </div>

                        {/* Microphone Control */}
                        <button
                            onClick={toggleListening}
                            disabled={!streamingAvatarRef.current}
                            className={`w-full flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-colors ${isListening
                                    ? 'bg-red-600 hover:bg-red-700'
                                    : 'bg-gray-900 hover:bg-gray-800'
                                } ${!streamingAvatarRef.current ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isListening ? (
                                <>
                                    <StopIcon className="w-5 h-5 mr-2" />
                                    Stop Recording
                                </>
                            ) : (
                                <>
                                    <MicrophoneIcon className="w-5 h-5 mr-2" />
                                    Start Speaking
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AvatarInteraction; 