import React from 'react';
import { Grid, CircularProgress, Button, Toolbar } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Stock from './Stock/Stock';
import { getPostsBySearch } from '../../actions/posts';

const Stocks = ({ setCurrentId }) => {
  const { stocks, isLoading } = useSelector((state) => state.stocks);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'));

  const ingredientsArray = stocks.map(stock => stock.title);

  if(!stocks.length && !isLoading) return 'No Items Found';

  return (
    isLoading ? <CircularProgress /> : (
      <div>
        <Toolbar position="static" sx={{ justifyContent: "center", mb: -1, mt: -2 }} color="inherit">
          <div>
            <Button variant="outlined" onClick={()=>{
              dispatch(getPostsBySearch({ ingredients: ingredientsArray.join(',') }));
              navigate(`/recipebook/search?searchQuery=none&ingredients=${ingredientsArray.join(',') || 'none'}&category=none&cuisine=none&difficulty=none&name=none`);
              }}>🍕Suggest Me Recipes
            </Button>
          </div>
        </Toolbar>

        <Grid container alignItems="stretch" spacing={1}>
          {stocks.map((stock) => (
            <Grid key={stock._id} item xs={12} sm={12}>
              <Stock stock={stock} setCurrentId={setCurrentId} />
            </Grid>
          ))}
        </Grid>
      </div>
    )
  )
}

export default Stocks;