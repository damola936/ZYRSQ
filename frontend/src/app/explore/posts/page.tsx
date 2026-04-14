import React from 'react';
import { fetchAllPosts } from "@/utils/actions";
import PostComponent from "@/components/ExplorePage/PostComponent";
import CreatePostFAB from '@/components/PostsPage/CreatePostFAB';
import { getUserProfile } from '@/utils/actions';

async function PostsPage() {
    const [posts, user] = await Promise.all([
        fetchAllPosts(),
        getUserProfile({ releases: true })
    ]);

    return (
        <>
            <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-4">
                    {posts.map((post) => (
                        <PostComponent key={post.id} post={post} />
                    ))}
                </div>
            </div>
            {user && <CreatePostFAB user={user} />}
        </>
    );
}

export default PostsPage;