import React, { useState } from 'react';
import { TextField, Typography, Paper, Button, Stack, Autocomplete, Slider } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getPostsBySearch } from '../../actions/posts';

import listOfStock from '../tags/Stock';
import listOfCategories from '../tags/Categories';
import listOfCuisines from '../tags/Cuisines';


const SearchRecipes = () => {
    const [search, setSearch] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [category, setCategory] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [difficulty, setDifficulty] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const searchPost = () => {
      if (search.trim() || ingredientsArray || category || cuisine || difficulty ) {
        dispatch(getPostsBySearch({ search, ingredients: ingredientsArray.join(','), category: category, cuisine: cuisine, difficulty: difficulty }));
        navigate(`/recipebook/search?searchQuery=${search || 'none'}&ingredients=${ingredientsArray.join(',') || 'none'}&category=${category || 'none'}&cuisine=${cuisine || 'none'}&difficulty=${difficulty || 'none'}&name=none`);
      } else {
        navigate('/recipebook');
      }
      };
      
    const handleKeyPress = (e) => {
      if(e.keyCode === 13) {
          searchPost();
      }
      };
    
    const ingredientsArray = [];

    ingredients.forEach(ingredient => {
      ingredientsArray.push(ingredient.title)
    });
    
    return (
        <Paper>
            <Typography variant="h6" align="center">Search Recipes: </Typography>

            <Stack spacing={0.7}>
              {/* Title */}
              <TextField 
                name="searchtitle"
                variant="outlined"
                label="Search By Title"
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyPress}
              />
            

              {/* Ingredients */}
              <Autocomplete
                multiple
                fullWidth
                loading
                onChange={(event, newIngredient) => {
                  setIngredients(newIngredient);
                }}
                options={listOfStock}
                getOptionLabel={(option) => option.title}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search By Ingredients"
                    placeholder="Add Ingredient"
                  />
                )}
              />


              {/* Category */}
              <Autocomplete
                disablePortal
                fullWidth
                loading
                options={listOfCategories}
                onChange={(event, newCategory) => {
                  setCategory(newCategory);
                }}
                renderInput={(params) => <TextField {...params} label="Category" />}
              />

              {/* Cuisine */}
              <Autocomplete
                disablePortal
                fullWidth
                loading
                options={listOfCuisines}
                onChange={(event, newCuisine) => {
                  setCuisine(newCuisine);
                }}
                renderInput={(params) => <TextField {...params} label="Cuisine" />}
              />


              {/* Difficulty */}
              <Autocomplete
                disablePortal
                fullWidth
                loading
                options={['Easy', 'Medium', 'Hard']}
                onChange={(event, newDifficulty) => {
                  setDifficulty(newDifficulty);
                }}
                renderInput={(params) => <TextField {...params} label="Difficulty" />}
              />

            </Stack>
            
            <Button onClick={searchPost} color="primary" variant="contained" fullWidth >Search</Button>
        </Paper>)
};

export default SearchRecipes;