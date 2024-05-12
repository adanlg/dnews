'use client';
import React from 'react';
import { ThumbUpIcon, ThumbDownIcon } from '@heroicons/react/outline';

type Props = {
    totalLikes: number;
    totalDislikes: number;
};

const CountLikedDisliked = ({ totalLikes, totalDislikes }: Props) => {
    return (
        <div className='flex space-x-2'>
            <div className="p-2 rounded flex items-center space-x-1">
                <ThumbUpIcon className="w-6 h-6 text-gray-400" />
                <span>{totalLikes}</span>
            </div>
            <div className="p-2 rounded flex items-center space-x-1">
                <ThumbDownIcon className="w-6 h-6 text-gray-400" />
                <span>{totalDislikes}</span>
            </div>
        </div>
    );
};

export default CountLikedDisliked;
