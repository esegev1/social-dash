import {useState, useEffect} from 'react'
import { fetchActivityData, fetchLatestActivityData, fetchPostList, fetchActivityDataById } from '../../services/dataService';
import Graph from "../Graph/Graph";
import DataTable from '../DataTable/DataTable';
import './PostData.css'

const PostData = () => {
    // const [activityData, setActivityData] = useState([])
    // const [latestActivityData, setLatestActivityData] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [activityById, setActivityById] = useState([])
    const [postList, setPostList] = useState([])
    const [selectedPostId, setSelectedPostId] = useState(null);

    useEffect(() => {
        const pullPostList = async () => {
            setIsLoading(true);
            const data = await fetchPostList()
            console.log("all posts: ", data)
            setPostList(data)
            
            if (data && data.length > 0) {
                const defaultId = data[0].id;
                setSelectedPostId(defaultId);
                    
                const postActivity = await fetchActivityDataById(defaultId);
                setActivityById(postActivity);

                setIsLoading(false);
            }
        }
        // const pullActivityById = async () => {
        //     const data = await fetchActivityData(postList[0]["id"])
        //     console.log("activity by id: ", data)
        //     setActivityById(data)

        // };
        // const pullLatestActivityData = async () => {
        //     const data = await fetchLatestActivityData()
        //     console.log("latest activity data: ", data)
        //     setLatestActivityData(data)

        // };
        // const pullActivityData = async () => {
        //     const data = await fetchActivityData()
        //     console.log("activity data: ", data)
        //     setActivityData(data)

        // };
        pullPostList();
        // pullActivityById(); 
        // pullLatestActivityData();
        // pullActivityData();

    },[])

    const handlePostIdChange = async (event) => {
        const newPostId = event.target.value;

        const data = await fetchActivityDataById(newPostId)
        console.log("activity by id: ", data)
        setSelectedPostId(newPostId)
        setActivityById(data)
    }

    if (isLoading) {
        return <div className="post-data-container">Loading executive summary...</div>;
    }

    return (
        <div className="post-data-container">
            <Graph data={activityById}/> 
            <div className="table-summary">
                <div className="post-selection">
                    <label htmlFor="post-select">Choose a Post:</label>
                    <select id="post-select" name="post"
                    onChange={handlePostIdChange}
                    value={selectedPostId || ''}>
                        {!isLoading && postList.length > 0 ? (
                            postList.map((post, index) => (
                                <option className="post-options" key={index} value={post.id} >{post.short_caption}</option>
                            ))
                        ) : (
                            ""
                        )}
                    </select>
                </div>
                
            </div>
            <DataTable data={activityById} tableType="post_trends"/>
        </div>
    )
};

export default PostData;


