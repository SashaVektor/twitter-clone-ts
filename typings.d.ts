export interface Tweet extends TweetBody {
    _id: string,
    _createdAt: string,
    _updatedAt: string,
    _rev: string,
    _type: "tweet",
    blockTweet: boolean
}

export interface TweetBody {
    text: string,
    username: string,
    profileImg: string,
    image?: string
}

export interface CommentBody {
    commentId?: string
    tweetId: string
    username: string
    profileImg: string
    comment: string
}

export interface Comment extends CommentBody {
    _id: string,
    _createdAt: string,
    _updatedAt: string,
    _rev: string,
    _type: "comment",
    tweet: {
        _ref: string
        _type: "reference"
    }
}