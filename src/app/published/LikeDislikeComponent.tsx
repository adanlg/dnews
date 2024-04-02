'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ThumbUpIcon, ThumbDownIcon } from '@heroicons/react/outline'; // Importa los iconos

type Props = {
    storyId: string;
    commentId?: string;
    initialLikeStatus: boolean | null;
    totalLikes: number;
    totalDislikes: number;
};

const LikeDislikeComponent = ({ storyId, commentId, initialLikeStatus, totalLikes, totalDislikes }: Props) => {
    const [likeStatus, setLikeStatus] = useState<boolean | null>(initialLikeStatus);
    const [disLikeStatus, setDisLikeStatus] = useState<boolean | null>(initialLikeStatus);

    const updateLikeStatus = async (newStatus: boolean) => {
        try {
            const endpoint = commentId ? '/api/likeDislikeComment' : '/api/likeDislikeStory';
            await axios.post(endpoint, {
                storyId,
                commentId,
                like: newStatus
            });

            setLikeStatus(newStatus);
            // Implementa la lógica para actualizar las cuentas de likes y dislikes si es necesario
        } catch (error) {
            console.error('Error updating like/dislike status', error);
        }
    };

    const updateLDislikeStatus = async (newStatus: boolean) => {
        try {
            const endpoint = commentId ? '/api/likeDislikeComment' : '/api/likeDislikeStory';
            await axios.post(endpoint, {
                storyId,
                commentId,
                like: newStatus
            });

            setLikeStatus(newStatus);
            // Implementa la lógica para actualizar las cuentas de likes y dislikes si es necesario
        } catch (error) {
            console.error('Error updating like/dislike status', error);
        }
    };

    return (
        <div className='flex space-x-2'>
            <button 
                onClick={() => updateLikeStatus(true)}
                className="p-2 rounded flex items-center space-x-1"
            >
                <ThumbUpIcon className={`w-6 h-6 ${likeStatus === true ? 'text-green-500' : 'text-gray-400'}`} />
                <span>{totalLikes}</span>
            </button>
            <button 
                onClick={() => updateLDislikeStatus(false)}
                className="p-2 rounded flex items-center space-x-1"
            >
                <ThumbDownIcon className={`w-6 h-6 ${likeStatus === false ? 'text-red-500' : 'text-gray-400'}`} />
                <span>{totalDislikes}</span>
            </button>
        </div>
    );
};

export default LikeDislikeComponent;
