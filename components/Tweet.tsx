import React, { useEffect, useState } from 'react'
import { Comment, CommentBody, Tweet } from '../typings'
import TimeAgo from "react-timeago"
import { ChatBubbleBottomCenterIcon, HeartIcon, ArrowsUpDownIcon, ArrowUpTrayIcon } from "@heroicons/react/24/outline"
import { fetchComments } from '../utils/fetchComments'
import { useSession } from 'next-auth/react'
import { toast } from 'react-hot-toast'

interface Props {
    tweet: Tweet
}

const Tweet = ({ tweet }: Props) => {
    const [comments, setComments] = useState<Comment[]>([])
    const [input, setInput] = useState<string>("")
    const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false)
    const { data: session } = useSession()

    const refreshComments = async () => {
        const comments: Comment[] = await fetchComments(tweet._id)
        setComments(comments)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const commentsToast = toast.loading("Posting comment...")
        const comment: CommentBody = {
            comment: input,
            tweetId: tweet._id,
            username: session?.user?.name || "Unknown User",
            profileImg: session?.user?.name || "https://links.papareact.com/gll"
        }

        const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/addComment`, {
            body: JSON.stringify(comment),
            method: "POST"
        })
        console.log(result);
        
        toast.success("Comment Posted!", { id: commentsToast })
        setInput("")
        setCommentBoxVisible(false)
        refreshComments()
    }

    useEffect(() => {
        refreshComments();
    }, [])

    return (
        <div className='flex flex-col space-x-3 border-y p-5 border-gray-100'>
            <div className='flex space-x-3'>
                <img src={tweet.profileImg} alt={tweet.username}
                    className="w-10 h-10 rounded-full object-cover" />
                <div>
                    <div className='flex items-center space-x-1'>
                        <p className='mr-1 font-bold'>{tweet.username}</p>
                        <p className='hidden text-sm text-gray-500 sm:inline'>
                            @{tweet.username.replace(/\s+/g, "").toLowerCase()} .
                        </p>
                        <TimeAgo date={tweet._createdAt} className="text-sm text-gray-500" />
                    </div>
                    <p>
                        {tweet.text}
                    </p>
                    {tweet.image && (
                        <img src={tweet.image} alt="image"
                            className='m-5 ml-0 mb-1 max-h-60 rounded-lg object-cover shadow-sm' />
                    )}
                </div>
            </div>
            <div className='flex justify-between mt-5'>
                <div className='flex cursor-pointer items-center space-x-2 text-gray-400'
                    onClick={() => setCommentBoxVisible(!commentBoxVisible)}>
                    <ChatBubbleBottomCenterIcon className='w-5 h-5' />
                    <p>{comments?.length}</p>
                </div>
                <div className='flex cursor-pointer items-center space-x-3 text-gray-400'>
                    <ArrowsUpDownIcon className='w-5 h-5' />
                </div>
                <div className='flex cursor-pointer items-center space-x-3 text-gray-400'>
                    <HeartIcon className='w-5 h-5' />
                </div>
                <div className='flex cursor-pointer items-center space-x-3 text-gray-400'>
                    <ArrowUpTrayIcon className='w-5 h-5' />
                </div>
            </div>
            {commentBoxVisible && (
                <form className='mt-3 flex space-x-3' onSubmit={handleSubmit}>
                    <input type="text" placeholder='Wtite a Comment...'
                        className='flex-1 rounded-lg bg-gray-100 p-2 outline-none'
                        value={input}
                        onChange={e => setInput(e.target.value)} />
                    <button className='text-twitter disabled:text-gray-200'
                        disabled={!input}
                        type="submit"
                    >
                        Post
                    </button>
                </form>
            )}
            {comments?.length > 0 && (
                <div className='my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-100 p-5'>
                    {comments.map((comment) => (
                        <div key={comment._id} className="flex space-x-2 relative">
                            <hr className='absolute left-5 top-10 h-8 border-x border-twitter/30' />
                            <img src={comment.profileImg} alt="profile img"
                                className='mt-2 h-7 w-7 object-cover rounded-full' />
                            <div>
                                <div className='flex items-center space-x-1'>
                                    <p className='mr-1 font-bold'>{comment.username}</p>
                                    <p className='hidden text-sm tex-gray-500 lg:inline'>
                                        @{comment.username.replace(/\s+/g, "").toLowerCase()} .
                                    </p>
                                    <TimeAgo date={comment._createdAt}
                                        className="text-sm text-gray-500"
                                    />
                                </div>
                                <p>{comment.comment}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Tweet
