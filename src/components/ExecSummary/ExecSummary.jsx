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



// import { useEffect, useState } from 'react'
// // REMOVED: import {  fetchExecSummaryData } from '../../services/dataService';
// import useDataServices from '@/services/dataServices.jsx'; // NEW: Import the custom hook

// import ScoreCard from './ScoreCard/ScoreCard'
// import './ExecSummary.css'

// const ExecSummary = () => {

//     const [execSummaryData, setExecSummaryData] = useState([])
//     const [isLoading, setIsLoading] = useState(true);
    
//     // 1. CALL THE HOOK: Get the required function from the new hook
//     const { fetchExecSummaryData } = useDataServices();

//     useEffect(() => {
//         const pullExecSummaryData = async () => {
//             setIsLoading(true);
//             try {
//                 // 2. USE THE FUNCTION: Call the function retrieved from the hook
//                 const data = await fetchExecSummaryData();
//                 console.log("exec summary: ", data);
//                 setExecSummaryData(data);
//             } catch (error) {
//                 console.error("Failed to fetch executive summary:", error);
//                 // Optionally handle the error visually here (e.g., setExecSummaryData([]))
//             } finally {
//                  // Ensure loading state is turned off regardless of success/fail
//                 setIsLoading(false);
//             }
//         };

//         pullExecSummaryData();
        
//     // 3. UPDATE DEPENDENCY ARRAY: Include the service function here
//     }, [fetchExecSummaryData]) 

//     if (isLoading) {
//         return <div className="exec-summary">Loading executive summary...</div>;
//     }

//     return (
//         <div className="exec-summary">
//             <ScoreCard mainScore={execSummaryData} title="Followers"/>
//             <ScoreCard mainScore={execSummaryData} title="Total views"/>
//             <ScoreCard mainScore={execSummaryData} title="Total Likes"/>
//             <ScoreCard mainScore={execSummaryData} title="Total comments"/>
//             {/* <ScoreCard mainScore={} title="Avg View Time"/> */}
//         </div>
//     )

// };

// export default ExecSummary;












// import { useEffect, useState } from 'react'
// import {  fetchExecSummaryData } from '../../services/dataService';
// import ScoreCard from './ScoreCard/ScoreCard'
// import './ExecSummary.css'

// const ExecSummary = () => {

//     const [execSummaryData, setExecSummaryData] = useState([])
//     const [isLoading, setIsLoading] = useState(true);
//     // const followersCount = props.followersCount

//     useEffect(() => {
//         const pullExecSummaryData = async () => {
//             setIsLoading(true);
//             const data = await fetchExecSummaryData()
//             console.log("exec summary: ", data)
//             setExecSummaryData(data)
//             setIsLoading(false);
//         };

//         pullExecSummaryData();
//     }, [])

//     if (isLoading) {
//         return <div className="exec-summary">Loading executive summary...</div>;
//     }

//     return (
//         <div className="exec-summary">
//             <ScoreCard mainScore={execSummaryData} title="Followers"/>
//             <ScoreCard mainScore={execSummaryData} title="Total views"/>
//             <ScoreCard mainScore={execSummaryData} title="Total Likes"/>
//             <ScoreCard mainScore={execSummaryData} title="Total comments"/>
//             {/* <ScoreCard mainScore={} title="Avg View Time"/> */}
//         </div>
//     )

// };

// export default ExecSummary;