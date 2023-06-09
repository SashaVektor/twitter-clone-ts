import React, { useState } from 'react'
import {ArrowPathIcon} from "@heroicons/react/24/outline"
import TweetBox from './TweetBox'
import { Tweet } from '../typings'
import TweetComponent from './Tweet'
import { fetchTweets } from '../utils/fetchTweets'
import toast from "react-hot-toast"

interface Props {
  tweets: Tweet[]
}

const Feed = ({tweets: tweetsProps} : Props) => {
  const [tweets, setTweets] = useState<Tweet[]>(tweetsProps)

  const handleRefresh = async () => {
    const refreshToast = toast.loading("Refreshing...")
    const tweets = await fetchTweets();
    setTweets(tweets)

    toast.success("Feed is updated", {
      id: refreshToast
    })
    
  }
  return (
    <div className='col-span-7 lg:col-span-5 border-x max-h-screen overflow-scroll scrollbar-hide'>
      <div className='flex justify-between items-center'>
        <h1 className='p-5 pb-0 text-xl font-bold'>Home</h1>
        <ArrowPathIcon className='h-8 w-8 cursor-pointer text-twitter mr-5 mt-5 transition-all duration-500
        ease-out hover:rotate-180 active:scale-125'
        onClick={handleRefresh}
        />
      </div>
      <div>
        <TweetBox setTweets={setTweets}/>
      </div>
      <div>
        {tweets.map((tweet) => <TweetComponent key={tweet._id} tweet={tweet}/>)}
      </div>
    </div>
  )
}

export default Feed
