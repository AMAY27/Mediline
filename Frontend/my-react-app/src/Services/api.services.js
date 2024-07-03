import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_NODE_BACKEND_URL;

const uploadReport = async(files, userId) => {
    const body = files;
    const config = {
        headers : {
            "Content-Type": "multipart/form-data",
            "userid" : userId
        }
    }
    try {
        const reportResponse = await axios.post(`${BACKEND_URL}/uploadReport`, body,config);
        return reportResponse;
    } catch (error) {
        return error
    }
}

export {uploadReport}