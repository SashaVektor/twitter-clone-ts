import React, { Dispatch, MouseEvent, SetStateAction, useRef, useState } from 'react'
import {
    CalendarDaysIcon, FaceSmileIcon,
    MapPinIcon, PhotoIcon, MagnifyingGlassCircleIcon
} from "@heroicons/react/24/outline"
import { useSession } from "next-auth/react"
import { Tweet, TweetBody } from '../typings'
import { fetchTweets } from '../utils/fetchTweets'
import { toast } from 'react-hot-toast'

interface Props {
    setTweets: Dispatch<SetStateAction<Tweet[]>>
}

const TweetBox = ({setTweets}: Props) => {
    const [input, setInput] = useState<string>("")
    const [image, setImage] = useState<string>("")
    const imageInputRef = useRef<HTMLInputElement>(null)
    const { data: session } = useSession()
    const [imgUrlBoxIsOpen, setImgUrlBoxIsOpen] = useState<boolean>(false)

    const addImageToTweet = (e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.preventDefault();

        if(!imageInputRef.current?.value) return;

        setImage(imageInputRef.current.value)
        imageInputRef.current.value = ""
        setImgUrlBoxIsOpen(false)
    }

    const postTweet = async () => {
        const tweetInfo : TweetBody = {
            text: input,
            username: session?.user?.name || "Unknown User",
            image: image,
            profileImg: session?.user?.image || "https://links.papareact.com/gll"
        }

        const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/addTweet`, {
            body: JSON.stringify(tweetInfo),
            method: "POST"
        })

        const json = await result.json();

        const newTweets = await fetchTweets();
        setTweets(newTweets)

        toast.success("Tweet posted")
        return json
    }

    const handleSubmit = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.preventDefault();

        postTweet()
        setInput("")
        setImage("")
        setImgUrlBoxIsOpen(false)
    }

    return (
        <div className='flex space-x-2 p-5'>
            <img
                src={session?.user?.image || "https://links.papareact.com/gll"}
                alt="face"
                className='w-14 h-14 object-cover rounded-full mt-4'
            />
            <div className='flex flex-1 items-center pl-2'>
                <form className='flex flex-1 flex-col'>
                    <input
                        type="text"
                        placeholder="What's Happening?"
                        className='h-24 w-full text-xl outline-none placeholder:text-xl'
                        value={input}
                        onChange={e => setInput(e.target.value)}
                    />
                    <div className='flex items-center '>
                        <div className='flex space-x-2 text-twitter flex-1'>
                            <PhotoIcon className='h-5 w-5 transition-transform 
                            duration-150 ease-out hover:scale-150 cursor-pointer' 
                            onClick={() => setImgUrlBoxIsOpen(!imgUrlBoxIsOpen)}
                            />
                            <MagnifyingGlassCircleIcon className='h-5 w-5' />
                            <FaceSmileIcon className='h-5 w-5' />
                            <CalendarDaysIcon className='h-5 w-5' />
                            <MapPinIcon className='h-5 w-5' />
                        </div>
                        <button
                            disabled={!input}
                            className='bg-twitter px-5 py-2 font-bold text-white 
                            rounded-full disabled:opacity-40'
                            onClick={handleSubmit}
                        >
                            Tweet
                        </button>
                    </div>
                    {imgUrlBoxIsOpen && (
                        <form className='mt-5 flex rounded-lg bg-twitter/80 py-2 px-4'>
                            <input type="text" placeholder='Enter Image Url...'
                            className='flex-1 bg-transparent p-2 text-white outline-none placeholder:text-white'
                            ref={imageInputRef}
                            />
                            <button className='font-bold text-white'
                            onClick={addImageToTweet} type="submit">Add Image</button>
                        </form>
                    )}
                    {image && (
                        <img src={image} alt="" 
                        className='mt-10 h-40 w-full rounded-xl object-contain shadow-lg'/>
                    )}
                </form>
            </div>
        </div>
    )
}

export default TweetBox
