import { useEffect, useState } from 'react';
import { fetchLastXPosts } from '../services/dataServices.jsx'; // Changed

import ExecSummary from '../components/ExecSummary/ExecSummary.jsx';
import PostData from '../components/PostData/PostData.jsx';
import DataTable from '../components/DataTable/DataTable.jsx';

const DashboardPage = () => {
  const [latestPosts, setLatestPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const pullLatestPosts = async () => {
      setIsLoading(true);
      try {
        const data = await fetchLastXPosts(20);
        console.log("last x posts: ", data);
        setLatestPosts(data);
      } catch (error) {
        console.error("Failed to load latest posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    pullLatestPosts();
  }, []); // Empty array - only run once!

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