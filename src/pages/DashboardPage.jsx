import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx'; // 👈 IMPORT useAuth to get the token
import { fetchLastXPosts, updatePostMetadataTable, fetchPostList, fetchActivityDataById } from '../services/dataServices.jsx'; 

import ExecSummary from '../components/ExecSummary/ExecSummary.jsx';
import PostData from '../components/PostData/PostData.jsx';
import DataTable from '../components/DataTable/DataTable.jsx';

const DashboardPage = () => {
  // 👈 GET the access token from the context
  const { accessToken } = useAuth(); 
  
  const [latestPosts, setLatestPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [postList, setPostList] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [activityById, setActivityById] = useState([]);

  const postIdChange = useCallback(async (newPostId) => {
    try {
      const listData = await fetchPostList();
      console.log("aupdated posts list: ", listData);
      setPostList(listData);
      
      const data = await fetchActivityDataById(newPostId);
      console.log("activity by id: ", data);
      setSelectedPostId(newPostId);
      setActivityById(data);
      } catch (error) {
        console.error("Failed to fetch activity by ID:", error);
      }
  }, [])
  
  useEffect(() => {
    // 🛑 CRITICAL FIX: Only execute the fetch if the accessToken is present.
    // This ensures that App.jsx's useEffect, which re-initializes the interceptors 
    // when accessToken changes, runs BEFORE this component attempts the fetch.
    if (!accessToken) {
        console.log("Dashboard fetch paused: Waiting for active token to ensure interceptor is set.");
        setIsLoading(true);
        return; 
    }
    
    console.log("Dashboard fetch starting with valid token.");
    const pullPostList = async () => {
      try {
        // pull list of posts in post_metadata for select drop down
        const listData = await fetchPostList();
          console.log("all posts: ", listData);
          setPostList(listData);
                     
          if (listData && listData.length > 0) {
            const defaultId = listData[0].id;
            setSelectedPostId(defaultId);
                                
            const postActivity = await fetchActivityDataById(defaultId);
            setActivityById(postActivity);
          }

        console.log("list of posts: ", listData);
        setPostList(listData); // Use the sorted data
      } catch (error) {
        console.error("Failed to load latest posts:", error);
      } finally {
        setIsLoading(false);
      }

    };

    const pullLatestPosts = async () => {
      setIsLoading(true);
      try {
        // pull detailed data for last 20 posts
        const data = await fetchLastXPosts(20);
        
        // 🚀 UPDATED CODE: Sort the data reliably in DESCENDING order (newest first)
        const sortedData = data.sort((a, b) => {
          // Convert timestamps to Date objects (or milliseconds) for accurate comparison.
          const dateA = new Date(a.post_timestamp);
          const dateB = new Date(b.post_timestamp);
          
          // b - a results in DESCENDING order (Newest first)
          return dateB - dateA;
        });

        console.log("last x posts (sorted newest first): ", sortedData);
        setLatestPosts(sortedData); // Use the sorted data
      } catch (error) {
        console.error("Failed to load latest posts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    pullPostList();
    pullLatestPosts();
  // 👈 The effect now correctly waits for the accessToken to be available.
  }, [accessToken]); 

  const updateHandler = async (event) => {
    event.preventDefault();
    // setIsLoading(true);
      try {
        const dataUpdated = await updatePostMetadataTable();
        console.log(dataUpdated)
        const data = await fetchLastXPosts(20);
        
        // 🚀 UPDATED CODE: Sort the data reliably in DESCENDING order (newest first)
        const sortedData = data.sort((a, b) => {
          // Convert timestamps to Date objects (or milliseconds) for accurate comparison.
          const dateA = new Date(a.post_timestamp);
          const dateB = new Date(b.post_timestamp);
          
          // b - a results in DESCENDING order (Newest first)
          return dateB - dateA;
        });

        console.log("last x posts (sorted newest first): ", sortedData);
        setLatestPosts(sortedData); // Use the sorted data

        //select the latest post from the new batch
        const newPostId = sortedData[0]["id"];
        console.log("trying to auto reset the select to: ", newPostId);
        postIdChange(newPostId)

      } catch (error) {
        console.error("Failed to load latest posts:", error);
      }
      // } finally {
      //   setIsLoading(false);
      // }
  }

  // The loading state relies on the fetch completing, which is guarded by the token.
  if (isLoading) {
    return <div className="exec-summary">Loading data...</div>;
  }

  return (
    <>
      <h1>Frida Sofia Eats</h1>
      <ExecSummary />
      <PostData postIdChange={postIdChange} postList={postList} selectedPostId={selectedPostId} activityById={activityById} />
      <div className="latest-posts-table container-style">
        <button className='refresh-data' onClick={updateHandler}>
          <img src="https://cdn-icons-png.flaticon.com/512/860/860820.png"></img>
        </button>
        <DataTable data={latestPosts} tableType="latest_posts" />
      </div>
    </>
  );
};

export default DashboardPage;