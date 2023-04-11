import React, { useState } from 'react';
import { Paper, Typography, Stack, Autocomplete, TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getShopsBySearch } from '../../actions/shops';
import { createShop } from '../../actions/shops';
import listOfStock from '../../components/tags/Stock';

const ShopForm = () => {
    const [shopData, setShopData] = useState({
        title: '', department: '', expiry: '', priority: ''
    });
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState("Not Urgent");
    const [department, setDepartment] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile'));

    const userId = (user?.result?.sub || user?.result?._id)

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(createShop({...shopData, creator: userId, title: title, department: department, priority: priority }));
        clear();
        dispatch(getShopsBySearch({ creator: userId }));
        navigate(`/shoppinglist/search?searchQuery=none&creator=${userId || 'none'}`);
      };

    const clear = () => {
        setShopData({ title: '', department: '', priority: '', });
    };

    return (   
        <Paper>
            <form autoComplete='off' noValidate onSubmit={handleSubmit}>
            {/* Add new item form*/}
            <Typography variant="h6">Add an item:</Typography>
            <Stack direction="row" spacing={1}>

                {/* Item */}
                <Autocomplete
                disablePortal
                fullWidth
                loading
                onChange={(event, newItem) => {
                    setTitle(newItem?.title);
                    setDepartment(newItem?.department);
                  }}
                options={listOfStock}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => <TextField {...params} label="Add Item" placeholder='Type to search item'/>}
                />

                {/* Priority */}
                <Autocomplete
                    disablePortal
                    options={["Urgent", "Not Urgent"]}
                    fullWidth
                    loading
                    onChange={(event, newItem) => {
                        setPriority(newItem);
                      }}
                    renderInput={(params) => <TextField {...params} label="Priority" placeholder='Choose priority level'/>}
                />

            </Stack>

            <Button variant="contained" color="primary" size="large" type="submit" fullWidth>Add</Button>
            </form>
        </Paper>
    )
    }

    export default ShopForm;