import {useState, useEffect, useCallback} from 'react'
import { fetchPostList, fetchActivityDataById } from '@/services/dataServices.jsx';
import Graph from "../Graph/Graph";
import DataTable from '../DataTable/DataTable';
import './PostData.css'

const PostData = (props) => {
    
    const postList = props.postList
    const selectedPostId = props.selectedPostId
    const activityById = props.activityById
    const postIdChange = props.postIdChange

    const handlePostIdChange = (event) => {
        const newPostId = event.target.value;
        postIdChange(newPostId)
    }

    return (
        <div className="post-data-container">
            <Graph data={activityById}/> 
            <div className="table-summary container-style">
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
            <div className="container-style">
                <DataTable data={activityById} tableType="post_trends"/>
            </div>
            
        </div>
    )
};

export default PostData;