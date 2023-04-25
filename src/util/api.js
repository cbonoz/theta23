import axios from "axios";

const BASE_URL = 'https://beta-explorer.thetatoken.org:8443/api/accounttx/'

export const getTransactionsForAccountAddress = (address, pageNumber) => {
    const url = `${BASE_URL}${address}?type=-1&pageNumber=${pageNumber || 1}&limitNumber=100&isEqualType=true&types=[%220%22,%228%22]`;
    return axios.get(url)
}