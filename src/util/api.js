import axios from "axios";

const BASE_URL = 'https://beta-explorer.thetatoken.org:8443/api'

export const getTransactionsForAccountAddress = (address, pageNumber) => {
    const url = `${BASE_URL}/accounttx/${address}?type=-1&pageNumber=${pageNumber || 1}&limitNumber=100&isEqualType=true&types=[%220%22,%228%22]`;
    return axios.get(url)
}

export const getTransactionList = (pageNumber, limitNumber) => {
    const url = `${BASE_URL}/transactions/range?pageNumber=${pageNumber || 1}&limit=${limitNumber || 10}`;
    return axios.get(url)
}