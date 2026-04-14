import { Prisma } from "@/lib/generated/prisma/client";

export type ActionFunction = (prevState: any, formData: FormData) => Promise<{ message: string, error?: boolean }>

export type FullPost = Prisma.PostGetPayload<{
    include: {
        author: true,
        comments: true,
        likes: true,
        release: {
            include: {
                collaborations: {
                    include: {
                        musician: true,
                        producer: true
                    }
                }
            }
        }
    }
}>

export type FullUser = Prisma.UserGetPayload<{
    include: {
        posts: true,
        comments: true,
        releases: {
            include: {
                collaborations: {
                    include: {
                        musician: true,
                        producer: true
                    }
                }
            }
        },
        postLikes: true,
        followers: true,
        following: true,
        collaborations: true,
        producedWorks: true,
        reviews: true,
        notifications: true,
        sentMessages: true,
        receivedMessages: true,
        studioProjects: true,
        projectCollaborations: true,
        uploadedTracks: true,
        projectComments: true,
    }
}>

export type PartialUser = Partial<FullUser>

export interface UserProfileOptions {
    posts?: boolean;
    comments?: boolean;
    releases?: boolean;
    postLikes?: boolean;
    followers?: boolean;
    following?: boolean;
    collaborations?: boolean;
    producedWorks?: boolean;
    reviews?: boolean;
    notifications?: boolean;
    sentMessages?: boolean;
    receivedMessages?: boolean;
    studioProjects?: boolean;
    projectCollaborations?: boolean;
    uploadedTracks?: boolean;
    projectComments?: boolean;
}