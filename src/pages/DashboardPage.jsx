import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx'; // 👈 IMPORT useAuth to get the token
import { fetchLastXPosts } from '../services/dataServices.jsx'; 

import ExecSummary from '../components/ExecSummary/ExecSummary.jsx';
import PostData from '../components/PostData/PostData.jsx';
import DataTable from '../components/DataTable/DataTable.jsx';

const DashboardPage = () => {
  // 👈 GET the access token from the context
  const { accessToken } = useAuth(); 
  
  const [latestPosts, setLatestPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

    const pullLatestPosts = async () => {
      setIsLoading(true);
      try {
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

    pullLatestPosts();
  // 👈 The effect now correctly waits for the accessToken to be available.
  }, [accessToken]); 

  // The loading state relies on the fetch completing, which is guarded by the token.
  if (isLoading) {
    return <div className="exec-summary">Loading executive summary...</div>;
  }

  return (
    <>
      <h1>Frida Sofia Eats</h1>
      <ExecSummary />
      <PostData />
      <div className="latest-posts-table">
        <DataTable data={latestPosts} tableType="latest_posts" />
      </div>
    </>
  );
};

export default DashboardPage;