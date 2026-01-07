// src/services/dataServices.jsx
import axiosClient from '../api/axiosClient';

// Utility function to handle error logging consistently
const logAndThrowError = (message, error) => {
    console.error(`Error in dataServices: ${message}`, error);
    throw error;
};

export const fetchPostList = async () => {
    try {
        console.log(`service kicked off: fetchPostList`);
        const res = await axiosClient.get('postlist');
        return res.data;
    } catch (error) {
        logAndThrowError('failed to fetch post list', error);
    }
};

export const fetchLastXPosts = async (count) => {
    try {
        console.log(`service kicked off: fetchLastXPosts`);
        const res = await axiosClient.get(`latest/${count}`);
        return res.data;
    } catch (error) {
        logAndThrowError('failed to fetch latest posts', error);
    }
};

export const fetchActivityData = async () => {
    try {
        console.log(`service kicked off: fetchActivityData`);
        const res = await axiosClient.get('activity');
        return res.data;
    } catch (error) {
        logAndThrowError('failed to fetch activity', error);
    }
};

export const fetchActivityDataById = async (id) => {
    try {
        console.log(`service kicked off: fetchActivityDataById`);
        const res = await axiosClient.get(`activity/${id}`);
        return res.data;
    } catch (error) {
        logAndThrowError('failed to fetch activity by id', error);
    }
};

export const fetchLatestActivityData = async () => {
    try {
        console.log(`service kicked off: fetchLatestActivityData`);
        const res = await axiosClient.get('activity/latest');
        return res.data;
    } catch (error) {
        logAndThrowError('failed to fetch latest activity', error);
    }
};

export const fetchExecSummaryData = async () => {
    try {
        console.log(`service kicked off: fetchExecSummaryData`);
        const res = await axiosClient.get('execsummary');
        return res.data;
    } catch (error) {
        logAndThrowError('failed to fetch execsummary', error);
    }
};

export const fetchFollowerCountsData = async (interval) => {
    try {
        console.log(`service kicked off: fetchFollowerCountsData`);
        const res = await axiosClient.get(`followers/${interval}`);
        return res.data;
    } catch (error) {
        logAndThrowError('failed to fetch follower counts', error);
    }
};

export const updatePostMetadataTable = async () => {
    try {
        console.log(`service kicked off: updatePostMetadataTable`);
        const res = await axiosClient.get('update');
        return res.data;
    } catch (error) {
        logAndThrowError('failed to update post_metadata table', error);
    }

}

