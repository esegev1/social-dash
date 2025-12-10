import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Graph from './components/Graph/Graph.jsx'
import PostData from './components/PostData/PostData.jsx'
import { fetchLastXPosts } from '../src/services/dataService';


import './App.css'
import ExecSummary from './components/ExecSummary/ExecSummary.jsx';
import DataTable from './components/DataTable/DataTable.jsx';


const App = () => {
  
  const [latestPosts, setLatestPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
        const pullLatestPosts = async () => {
            setIsLoading(true);
            const data = await fetchLastXPosts(20)
            console.log("last x posts: ", data)
            setLatestPosts(data)
            setIsLoading(false);
        };

        pullLatestPosts();
    }, [])
    // const latestFollowers = execSummaryData.followers
    // const totalViews = execSummaryData.total_views
    // const totalLikes = execSummaryData.total_likes
    // const totalComments = execSummaryData.total_comments

    if (isLoading) {
        return <div className="exec-summary">Loading executive summary...</div>;
    }

  // const [followersCount, setFollowersCount] = useState([])
  // const [postsData, setPostsData] = useState([])
  // const [activityData, setActivityData] = useState([])

  // useEffect(() => {
  //   const pullFollowerCounts = async () => {
  //     const data = await fetchFollowerCounts()
  //     setFollowersCount(data)
  //   };
  //   const pullAllPosts = async () => {
  //     // try {
  //     const data = await fetchAllPosts();
  //     setPostsData(data)
  //     // } catch (error) {
  //     //   console.error(`Error loading data: ${error}`);
  //     // }
  //   };
  //   const pullAllActivity = async () => {
  //     const data = await fetchAllActivity()
  //     setActivityData(data)
  //   } ;

  //   pullAllActivity();
  //   pullFollowerCounts();
  //   pullAllPosts();
  // }, [])

  return (
    <>
      <h1>Frida Sofia Eats</h1>
      <ExecSummary />
      <PostData />
      <div className="latest-posts-table">
        <DataTable  data={latestPosts} tableType="latest_posts"/>
      </div>
      
    </>
  );

};

export default App;
