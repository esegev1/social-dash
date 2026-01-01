import { useEffect, useState } from 'react';
import { fetchExecSummaryData } from '@/services/dataServices.jsx'; // Changed

import ScoreCard from './ScoreCard/ScoreCard';
import './ExecSummary.css';

const ExecSummary = () => {
  const [execSummaryData, setExecSummaryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const pullExecSummaryData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchExecSummaryData();
        console.log("exec summary: ", data);
        setExecSummaryData(data);
      } catch (error) {
        console.error("Failed to fetch executive summary:", error);
      } finally {
        setIsLoading(false);
      }
    };

    pullExecSummaryData();
  }, []); // Empty array - only run once!

  if (isLoading) {
    return <div className="exec-summary">Loading executive summary...</div>;
  }

  return (
    <div className="exec-summary">
      <ScoreCard mainScore={execSummaryData} title="Followers" />
      <ScoreCard mainScore={execSummaryData} title="Total views" />
      <ScoreCard mainScore={execSummaryData} title="Total Likes" />
      <ScoreCard mainScore={execSummaryData} title="Total comments" />
    </div>
  );
};

export default ExecSummary;