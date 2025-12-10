const BASE_URL = import.meta.env.VITE_BASE_URL;

// const fetchAllPosts = async () => {
//     try {
//         // console.log(`searching for ${searchString}...`);
//         // const updatedSrchStr = searchString ? `?search=${searchString}` : '';
//         console.log(`service kicked off, url: ${BASE_URL}activity`)  
//         const res = await fetch(`${BASE_URL}activity`);
        

//         //handle non ok messages
//         if(!res.ok) {
//             throw new Error(`failed to fetch datas`);
//         }

//         //parse and return data
//         const data = await res.json();
//         console.log("Data 2: ", Array.isArray(data))

//         return data
//     } catch (error) {
//         console.error(`Error fetching data: ${error}`)
//     }
// }

// const fetchFollowerCounts = async () => {
//     try {
//         // console.log(`searching for ${searchString}...`);
//         // const updatedSrchStr = searchString ? `?search=${searchString}` : '';
//         console.log(`service kicked off`)  
//         const url = `${BASE_URL}followers`
//         console.log(`url: ${url}`)  
//         const res = await fetch(url);
        
//         //handle non ok messages
//         if(!res.ok) {
//             throw new Error(`failed to fetch followers`);
//         }

//         //parse and return data
//         const data = await res.json();
//         return data
//     } catch (error) {
//         console.error(`Error fetching data: ${error}`)
//     }
// }

const fetchPostList = async () => {
    try {
        console.log(`service kicked off`)  
        const url = BASE_URL + 'postlist';
        console.log(`post list url: ${url}`)  
        const res = await fetch(url);
        
        //handle non ok messages
        if(!res.ok) {
            throw new Error(`failed to fetch activity`);
        }

        //parse and return data
        const data = await res.json();
        return data
    } catch (error) {
        console.error(`Error fetching data: ${error}`)
    }
}

const fetchLastXPosts = async (count) => {
    try {
        console.log(`service kicked off`)  
        const url = BASE_URL + 'latest/' + count;
        console.log(`url: ${url}`)  
        const res = await fetch(url);
        
        //handle non ok messages
        if(!res.ok) {
            throw new Error(`failed to fetch activity`);
        }

        //parse and return data
        const data = await res.json();
        return data
    } catch (error) {
        console.error(`Error fetching data: ${error}`)
    }
}

const fetchActivityData = async () => {
    try {
        console.log(`service kicked off`)  
        const url = BASE_URL + 'activity';
        console.log(`url: ${url}`)  
        const res = await fetch(url);
        
        //handle non ok messages
        if(!res.ok) {
            throw new Error(`failed to fetch activity`);
        }

        //parse and return data
        const data = await res.json();
        return data
    } catch (error) {
        console.error(`Error fetching data: ${error}`)
    }
}

const fetchActivityDataById = async (id) => {
    try {
        console.log(`service kicked off`)  
        const url = BASE_URL + 'activity/'+id;
        console.log(`url: ${url}`)  
        const res = await fetch(url);
        
        //handle non ok messages
        if(!res.ok) {
            throw new Error(`failed to fetch activity`);
        }

        //parse and return data
        const data = await res.json();
        return data
    } catch (error) {
        console.error(`Error fetching data: ${error}`)
    }
}

const fetchLatestActivityData = async () => {
    try {
        console.log(`service kicked off`)  
        const url = BASE_URL + 'activity/latest';
        console.log(`url: ${url}`)  
        const res = await fetch(url);
        
        //handle non ok messages
        if(!res.ok) {
            throw new Error(`failed to fetch latst activity`);
        }

        //parse and return data
        const data = await res.json();
        return data
    } catch (error) {
        console.error(`Error fetching data: ${error}`)
    }
}

const fetchExecSummaryData = async () => {
    try {
        // console.log(`searching for ${searchString}...`);
        // const updatedSrchStr = searchString ? `?search=${searchString}` : '';
        console.log(`service kicked off`);
        const url = BASE_URL + 'execsummary';
        console.log(`url: ${url}`);  
        const res = await fetch(url);
        
        //handle non ok messages
        if(!res.ok) {
            throw new Error(`failed to fetch execsummary`);
        }

        //parse and return data
        const data = await res.json();
        return data
    } catch (error) {
        console.error(`Error fetching data: ${error}`)
    }
}



export {  fetchExecSummaryData, fetchActivityData, fetchLatestActivityData, fetchActivityDataById, fetchPostList, fetchLastXPosts }


// const starshipList = () => {
//     fetch("https://swapi.info/api/starships/")
//         .then((res) => res.json())
//         .then((json) => console.log(json))
//         .catch((error) => console.error(error))
// }