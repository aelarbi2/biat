import axios from "axios";


// téléchargement d'une facture 
export function downloadZip(request) {
    axios.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhc21hIiwiaWF0IjoxNjA1MTk0NjE5LCJjb2RlIjoiYXNtYSIsInJvbGVzIjpbXX0.mr3-za2fWPSRIr9qG6WV_82cpF0ejh3aSmH9fPYWYv0';
    return new Promise((resolve, reject) => {
        return axios({
            url: 'http://localhost:1920/Rest/Api/docs/getZipFile/'+request,
            method: 'GET',
            responseType: 'blob'
        }).then(
            (res) => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
    })
}


// requête pour avoir une/des facture(s) selon le code client et/ou le numéro de facture demandé(s)
export function getAdvancedDocuments(data) {
    axios.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhc21hIiwiaWF0IjoxNjA1MTk0NjE5LCJjb2RlIjoiYXNtYSIsInJvbGVzIjpbXX0.mr3-za2fWPSRIr9qG6WV_82cpF0ejh3aSmH9fPYWYv0';
    return new Promise((resolve, reject) => {
        return axios.post('http://localhost:1920/Rest/Api/docs/getDocsWithAdvancedSearch', data).then(
            (res) => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
            })
    })
}