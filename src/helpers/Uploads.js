import axios from "axios";
import { API_URL, AUTH_TOKEN } from '../components/constants';

export const UploadFile = async (files, folder) => {
    const options = {
        headers: {
            'Authorization': `${sessionStorage.getItem(AUTH_TOKEN)}`,
            'Content-Type': 'multipart/form-data'
        }
    };

    const bodyFormData = new FormData();
    bodyFormData.append('file', files[0]);

    return await axios.post(`${ API_URL }/api/uploads?folder=${folder}`, bodyFormData, options)
        .then(imageId => {
            return imageId.data.fileNames[0];
        })
        .catch(response => {
            console.log(response)
        })
};