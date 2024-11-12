const axios = require('axios');

// 设置 API 凭证
const BEARER_TOKEN = 'AAAAAAAAAAAAAAAAAAAAAHivwwEAAAAAMKY767Sc8nn%2FeS6Yq1rf%2FsjbNM8%3Dj0mvLYB0OakuATnEziQZqWc2MTrG5tAo6Mbfvwl4C7LxLWp6xM';

// 定义请求头
const headers = {
  'Authorization': `Bearer ${BEARER_TOKEN}`,
};

// 获取用户 ID
const getUserId = async (username) => {
  try {
    const userUrl = `https://api.twitter.com/2/users/by/username/${username}`;
    const userResponse = await axios.get(userUrl, { headers });
    return userResponse.data.data.id;
  } catch (error) {
    console.error('Error fetching user ID:', error);
  }
};

// 获取用户推文
const getUserTweets = async (userId, maxResults = 3) => {
  try {
    const tweetsUrl = `https://api.twitter.com/2/users/${userId}/tweets`;
    const params = {
      max_results: maxResults, // 设置最大返回结果数
    };
    const tweetsResponse = await axios.get(tweetsUrl, { headers, params });
    return tweetsResponse.data.data;
  } catch (error) {
    console.error('Error fetching tweets:', error);
  }
};

// 主函数
const fetchTweets = async (username) => {
  const userId = await getUserId(username);
  if (userId) {
    const tweets = await getUserTweets(userId);
    if (tweets) {
      tweets.forEach(tweet => {
        console.log(tweet.text);
      });
    }
  }
};

// 替换 'TwitterUsername' 为你想要查询的用户名
fetchTweets('moncici_is_girl');
