import {useState, useEffect, useCallback} from 'react'
import { fetchPostList, fetchActivityDataById } from '@/services/dataServices.jsx';
import Graph from "../Graph/Graph";
import DataTable from '../DataTable/DataTable';
import './PostData.css'

const PostData = () => {
    
    const [isLoading, setIsLoading] = useState(true);
    const [activityById, setActivityById] = useState([]);
    const [postList, setPostList] = useState([]);
    const [selectedPostId, setSelectedPostId] = useState(null);

    const handlePostIdChange = useCallback(async (event) => {
        const newPostId = event.target.value;

        try {
            const data = await fetchActivityDataById(newPostId);
            console.log("activity by id: ", data);
            setSelectedPostId(newPostId);
            setActivityById(data);
        } catch (error) {
             console.error("Failed to fetch activity by ID:", error);
        }
        
    }, []);

    useEffect(() => {
        const pullPostListAndDefaultActivity = async () => {
            setIsLoading(true);
            try {
                const listData = await fetchPostList();
                console.log("all posts: ", listData);
                setPostList(listData);
                
                if (listData && listData.length > 0) {
                    const defaultId = listData[0].id;
                    setSelectedPostId(defaultId);
                        
                    const postActivity = await fetchActivityDataById(defaultId);
                    setActivityById(postActivity);
                }
            } catch (error) {
                console.error("Error during initial data fetch in PostData:", error);
            } finally {
                setIsLoading(false);
            }
        };

        pullPostListAndDefaultActivity();

    }, []);

    if (isLoading) {
        return <div className="post-data-container">Loading post data...</div>;
    }

    return (
        <div className="post-data-container">
            <Graph data={activityById}/> 
            <div className="table-summary">
                <div className="post-selection">
                    <label htmlFor="post-select">Choose a Post:</label>
                    <select 
                        id="post-select" 
                        name="post"
                        onChange={handlePostIdChange}
                        value={selectedPostId || ''}
                    >
                        {postList.length > 0 ? (
                            postList.map((post, index) => (
                                <option className="post-options" key={index} value={post.id} >{post.short_caption}</option>
                            ))
                        ) : (
                            <option value="">No posts available</option>
                        )}
                    </select>
                </div>
                
            </div>
            <DataTable data={activityById} tableType="post_trends"/>
        </div>
    )
};

export default PostData;