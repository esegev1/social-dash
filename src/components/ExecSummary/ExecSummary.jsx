import { useEffect, useState } from 'react'
import {  fetchExecSummaryData } from '../../services/dataService';
import ScoreCard from './ScoreCard/ScoreCard'
import './ExecSummary.css'

const ExecSummary = () => {

    const [execSummaryData, setExecSummaryData] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    // const followersCount = props.followersCount

    useEffect(() => {
        const pullExecSummaryData = async () => {
            setIsLoading(true);
            const data = await fetchExecSummaryData()
            console.log("exec summary: ", data)
            setExecSummaryData(data)
            setIsLoading(false);
        };

        pullExecSummaryData();
    }, [])

    if (isLoading) {
        return <div className="exec-summary">Loading executive summary...</div>;
    }

    return (
        <div className="exec-summary">
            <ScoreCard mainScore={execSummaryData} title="Followers"/>
            <ScoreCard mainScore={execSummaryData} title="Total views"/>
            <ScoreCard mainScore={execSummaryData} title="Total Likes"/>
            <ScoreCard mainScore={execSummaryData} title="Total comments"/>
            {/* <ScoreCard mainScore={} title="Avg View Time"/> */}
        </div>
    )

};

export default ExecSummary;