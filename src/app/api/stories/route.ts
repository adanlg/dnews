import { NextRequest, NextResponse } from 'next/server';
import { getStoryByTag } from '@/actions/getStories';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const tag = searchParams.get('tag') || 'All';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '7', 10);

    try {
        const data = await getStoryByTag(tag, page, limit);
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching stories:", error);
        return NextResponse.error();
    }
}
