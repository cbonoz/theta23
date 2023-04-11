import React, { useState } from 'react';
import { Paper, Typography, Stack, Autocomplete, TextField, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getStocksBySearch } from '../../actions/stocks';
import { createStock } from '../../actions/stocks';
import listOfStock from '../../components/tags/Stock';

const StockForm = () => {
    const [stockData, setStockData] = useState({
        title: '', department: '', expiry: '', 
    });
    const [title, setTitle] = useState('');
    const [department, setDepartment] = useState('');
    const [expiry, setExpiry] = useState(new Date(new Date().getTime() + (3 * 24 * 60 * 60 * 1000)));

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile'));

    const userId = (user?.result?.sub || user?.result?._id)

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(createStock({...stockData, creator: userId, title: title, department: department, expiry: expiry }));
        clear();
        dispatch(getStocksBySearch({ creator: userId }));
        navigate(`/stockbook/search?searchQuery=none&creator=${userId || 'none'}`);
      };

    const clear = () => {
        setStockData({ title: '', department: '', expiry: ''});
    };

    return (   
        <Paper>
            <form autoComplete='off' noValidate onSubmit={handleSubmit}>
            {/* Add new stock form*/}
            <Typography variant="h6">Add a stock:</Typography>
            <Stack direction="row" spacing={1}>

                {/* Stock */}
                <Autocomplete
                disablePortal
                loading
                onChange={(event, newItem) => {
                    setTitle(newItem?.title);
                    setDepartment(newItem?.department);
                  }}
                options={listOfStock}
                getOptionLabel={(option) => option.title}
                sx={{width: '80%'}}
                renderInput={(params) => <TextField {...params} label="Add Stock" placeholder='Type to search item'/>}
                />

                {/* Expiration Date */}
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Expiration Date"
                    inputFormat="MM/dd/yyyy"
                    minDate={new Date()}
                    value={expiry}
                    onChange={(newExpiry) => {
                        setExpiry(newExpiry);
                      }}
                    sx={{width: '100%'}}
                    renderInput={(params) => <TextField {...params} />}
                />
                </LocalizationProvider>

            </Stack>

            <Button variant="contained" color="primary" size="large" type="submit" fullWidth>Add</Button>
            </form>
        </Paper>
    )
    }

    export default StockForm;