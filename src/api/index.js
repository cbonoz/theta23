import axios from 'axios';

const API = axios.create({ baseURL: 'https://nfp.herokuapp.com/' });


API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const fetchPost = (id) => API.get(`/recipebook/${id}`);
export const fetchPosts = (page) => API.get(`/recipebook?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/recipebook/search?searchQuery=${searchQuery.search || 'none'}&ingredients=${searchQuery.ingredients}&category=${searchQuery.category}&cuisine=${searchQuery.cuisine}&difficulty=${searchQuery.difficulty}&name=${searchQuery.name}`);
export const createPost = (newPost) => API.post('/recipebook', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/recipebook/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/recipebook/${id}`);
export const likePost = (id) => API.patch(`/recipebook/${id}/likePost`);

export const fetchStocksBySearch = (searchQuery) => API.get(`/stockbook/search?searchQuery=${searchQuery.search || 'none'}&creator=${searchQuery.creator}`);
export const createStock = (newStock) => API.post('/stockbook', newStock);
export const deleteStock = (id) => API.delete(`/stockbook/${id}`);

export const fetchShopsBySearch = (searchQuery) => API.get(`/shoppinglist/search?searchQuery=${searchQuery.search || 'none'}&creator=${searchQuery.creator}`);
export const createShop = (newShop) => API.post('/shoppinglist', newShop);
export const deleteShop = (id) => API.delete(`/shoppinglist/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);

