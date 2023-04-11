import React, { useState, useEffect } from 'react';
import { TextField, Typography, Paper, Button, Stack, Autocomplete } from '@mui/material';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { createPost, updatePost } from '../../actions/posts';
import listOfStock from '../tags/Stock';
import listOfCategories from '../tags/Categories';
import listOfCuisines from '../tags/Cuisines';

const RecipeForm = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: '', description: '', userName: '', selectedFile: '', category: '', cuisine: '', time: '', difficulty: '', ingredients: '', preptime: '', cooktime: '',
  });
  const [ingredients, setIngredients] = useState([]);
  const [category, setCategory] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [difficulty, setDifficulty] = useState('');

  const post = useSelector((state) => (currentId ? state.posts.posts.find((description) => description._id === currentId) : null));
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    if (!post?.title) clear();
    if(post) setPostData(post);
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(currentId) {
      dispatch(updatePost(currentId, {...postData, userName: user?.result?.userName, ingredients: ingredientsArray, category: category, cuisine: cuisine, difficulty: difficulty }));
      clear();
    } else {
      dispatch(createPost({...postData, userName: user?.result?.userName, ingredients: ingredientsArray, category: category, cuisine: cuisine, difficulty: difficulty }));
      clear();
    }
  };

  if(!user?.result?.name) {
    return (
      <Paper>
        <Typography variant="h6" align="center">
          Please Sign In to use Toku.
        </Typography>
      </Paper>
    );
  }

  const clear = () => {
    setCurrentId(null);
    setPostData({ title: '', description: '', ingredients: '', selectedFile: '', category: '', cuisine: '', time: '', difficulty: '', preptime: '', cooktime: ''});
  };


  const ingredientsArray = [];

  ingredients.forEach(ingredient => {
    ingredientsArray.push(ingredient.title)
  });

  return (
    <Paper>
      <form autoComplete='off' noValidate onSubmit={handleSubmit}>
      {/* Title */}
      <Typography variant="h6" align="center">{currentId ? 'Edit' : 'Add a new'} recipe:</Typography>
      <Stack spacing={0.7}>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth 
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />


        {/* Description */}
        <TextField
          name="description"
          variant="outlined"
          label="Description"
          fullWidth 
          multiline
          rows={6}
          value={postData.description}
          onChange={(e) => setPostData({ ...postData, description: e.target.value })}
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
              label="Add Ingredient"
              placeholder="Ingredient"
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


        {/* Prep Time */}
        <TextField
          name="preptime"
          variant="outlined"
          label="Prep Time (mins)"
          fullWidth
          value={postData.preptime}
          onChange={(e) => setPostData({ ...postData, preptime: e.target.value })}
        />

        {/* Cook Time */}
        <TextField
          name="cooktime"
          variant="outlined"
          label="Cook Time (mins)"
          fullWidth
          value={postData.cooktime}
          onChange={(e) => setPostData({ ...postData, cooktime: e.target.value })}
        />

        {/* Image */}
        <div>
          <Typography variant="h7">Add image: </Typography>
          <FileBase 
            type="file"
            multiple={false}
            onDone={({base64}) => setPostData({...postData, selectedFile: base64})}
          />
        </div>
      </Stack>

      <Button variant="contained" color="primary" size="large" type="submit" fullWidth sx={{mt: 1}}>Submit</Button>
      <Button variant="contained" color="error" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  )
}

export default RecipeForm;