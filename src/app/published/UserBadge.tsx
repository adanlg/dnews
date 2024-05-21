import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { getUser } from '@/actions/User'

type Props = {
    userId: string;
    createdAt: Date;
}

interface User {
    imageUrl?: string;
    firstName?: string;
    lastName?: string;
}

const UserBadge = ({ userId, createdAt }: Props) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getUser(userId);
                if (user) setUser(user);
            } catch (error) {
                console.log(error);
            }
        }

        fetchUser();
    }, [userId]);

    const calculateDaysAgo = (createdAt: Date) => {
        const currentDate = new Date();
        const createdDate = new Date(createdAt);
        const timeDifference: number = currentDate.getTime() - createdDate.getTime();

        const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        return daysAgo;
    }

    return (
        <div className='px-4 text-sm'>
            <div className='flex items-center space-x-3'>
                <Image
                    src={user?.imageUrl ? user.imageUrl : "/no-image.jpg"}
                    width={32}
                    height={32}
                    alt='User'
                    className='rounded-full object-cover'
                    priority
                />
                <div>
                    <p>{user?.firstName} {user?.lastName}</p>
                    <p className='text-xs opacity-60'>{calculateDaysAgo(createdAt)} days ago</p>
                </div>
            </div>
        </div>
    )
}

export default UserBadge;
