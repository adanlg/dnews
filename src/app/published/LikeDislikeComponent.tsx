'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAccount } from 'wagmi'; // Import useAccount from wagmi
import { ThumbUpIcon, ThumbDownIcon } from '@heroicons/react/outline';
import { checkWalletAccess } from '@/actions/checks';  // Import your check function

type Props = {
    storyId: string;
    commentId?: string;
    initialLikeStatus: boolean | null;
    totalLikes: number;
    totalDislikes: number;
};

const LikeDislikeComponent = ({ storyId, commentId, initialLikeStatus, totalLikes, totalDislikes }: Props) => {
    const [likeStatus, setLikeStatus] = useState<boolean | null>(initialLikeStatus);
    const [accessGranted, setAccessGranted] = useState<boolean>(false);
    const [userId, setUserId] = useState<string | null>(null);
    const { address, isConnected } = useAccount(); // Use useAccount to get the connected wallet address

    useEffect(() => {
        // Call the check access function on component mount
        const verifyAccess = async () => {
            if (isConnected && address) {
                const access = await checkWalletAccess(address); // Pass the address to the check function
                setAccessGranted(access.hasAccess);
                setUserId(access.userIdAddress|| null);
                if (!access.hasAccess) {
                    alert('Access Denied: ' + access.message);
                }
            } else {
                alert('Wallet is not connected.');
                setAccessGranted(false);
            }
        };

        verifyAccess();
    }, [address, isConnected]); // Depend on address and isConnected to re-run when they change

    const updateLikeStatus = async (newStatus: boolean) => {
        if (!accessGranted || !userId) {
            console.error('Access denied or wallet not connected');
            return;
        }
        
        try {
            const endpoint = commentId ? '/api/likeDislikeComment' : '/api/likeDislike';
            await axios.post(endpoint, {
                storyId,
                commentId,
                like: newStatus,
                userId  // Pass the wallet address (user ID) to the API
            });

            setLikeStatus(newStatus);
        } catch (error) {
            console.error('Error updating like/dislike status', error);
        }
    };

    return (
        <div className='flex space-x-2'>
            <button 
                onClick={() => updateLikeStatus(true)}
                disabled={!accessGranted}  // Disable button if access is not granted
                className="p-2 rounded flex items-center space-x-1"
            >
                <ThumbUpIcon className={`w-6 h-6 ${likeStatus === true ? 'text-green-500' : 'text-gray-400'}`} />
                <span>{totalLikes}</span>
            </button>
            <button 
                onClick={() => updateLikeStatus(false)}
                disabled={!accessGranted}  // Disable button if access is not granted
                className="p-2 rounded flex items-center space-x-1"
            >
                <ThumbDownIcon className={`w-6 h-6 ${likeStatus === false ? 'text-red-500' : 'text-gray-400'}`} />
                <span>{totalDislikes}</span>
            </button>
        </div>
    );
};

export default LikeDislikeComponent;
