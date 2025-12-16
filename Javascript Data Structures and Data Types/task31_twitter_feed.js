/**
 * Task 31: Design Twitter Feed
 * Difficulty: Advanced
 */

class Twitter {
    constructor() {
        this.tweets = new Map(); // userId -> tweets[]
        this.following = new Map(); // userId -> Set of followee IDs
        this.timestamp = 0;
    }

    postTweet(userId, tweetId) {
        if (!this.tweets.has(userId)) {
            this.tweets.set(userId, []);
        }
        this.tweets.get(userId).push({ tweetId, time: this.timestamp++ });
    }

    getNewsFeed(userId) {
        const allTweets = [];

        // Get user's own tweets
        if (this.tweets.has(userId)) {
            allTweets.push(...this.tweets.get(userId));
        }

        // Get followees' tweets
        if (this.following.has(userId)) {
            for (const followeeId of this.following.get(userId)) {
                if (this.tweets.has(followeeId)) {
                    allTweets.push(...this.tweets.get(followeeId));
                }
            }
        }

        // Sort by timestamp and get 10 most recent
        return allTweets
            .sort((a, b) => b.time - a.time)
            .slice(0, 10)
            .map(tweet => tweet.tweetId);
    }

    follow(followerId, followeeId) {
        if (followerId === followeeId) return; // Can't follow yourself

        if (!this.following.has(followerId)) {
            this.following.set(followerId, new Set());
        }
        this.following.get(followerId).add(followeeId);
    }

    unfollow(followerId, followeeId) {
        if (this.following.has(followerId)) {
            this.following.get(followerId).delete(followeeId);
        }
    }
}

// Tests
const twitter = new Twitter();
twitter.postTweet(1, 5);
console.log(twitter.getNewsFeed(1)); // [5]
twitter.follow(1, 2);
twitter.postTweet(2, 6);
console.log(twitter.getNewsFeed(1)); // [6, 5]
twitter.unfollow(1, 2);
console.log(twitter.getNewsFeed(1)); // [5]
