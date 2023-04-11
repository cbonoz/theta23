import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Modal, Box, ButtonBase, Grid } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';
import { useNavigate } from 'react-router-dom';

const Post = ({ post, setCurrentId }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'));

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid rgba(0,0,0,.333)',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px'
  };
  

  const Likes = () => {
    if (post.likes?.length > 0) {
      return post.likes.find((like) => like === (user?.result?.sub || user?.result?._id))
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpOffAltIcon fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpOffAltIcon fontSize="small" />&nbsp;Like</>;
  };

  const openPost = () => navigate(`/recipebook/${post._id}`);
  return (
    <Card>
      <ButtonBase onClick={openPost}>
       <div>
        {/* Image */}
        <CardMedia style={{height: 0, paddingTop: '56.25%'}}
          image={post?.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
        />

        <CardContent>
          <Typography variant="h5">{post.title}</Typography>
          <Typography variant="subtitle1">By {post?.userName || "Anonymous Cook"}</Typography>

          <div align="left">
            <Typography variant="subtitle2">Total Time: {post.preptime+post.cooktime} mins</Typography>
            <Typography variant="subtitle2">Difficulty: {post.difficulty}</Typography>
            <Typography variant="subtitle2">Ingredients: </Typography>
            <Typography variant="body2">{post.ingredients?.map((ingredient) => `· ${ingredient} `)}</Typography>
            <Typography variant="body2" color="textSecondary">Category: {post.category}, Cuisine: {post.cuisine}</Typography>
            <Typography variant="body2" color="textSecondary">Prep Time: {post.preptime} mins, Cook Time: {post.cooktime} mins </Typography>
          </div>
        </CardContent>
       </div>
      </ButtonBase>

      <CardActions>
        {/* Likes */}
        <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
          <Likes />
        </Button>
        
        {/* Delete */}
        {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
          <div>
            <Button size="small" color="primary" onClick={handleOpen}>
              <DeleteIcon fontSize='small' />&nbsp;Delete
            </Button>

            {/* Pop-up */}
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Are you sure?
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Deleted recipes cannot be recovered.
              </Typography>
             {/* Buttons */}
             <Grid container sx={{mt: 2}}>
              <Button color="primary" variant="outlined" onClick={handleClose
                }>
                  Go Back
                </Button>
                <Button sx={{ml: 1}}color="error" variant="contained" onClick={() => dispatch(deletePost(post._id))}>
                  Delete
                </Button>
             </Grid>
            </Box>
            </Modal>
          </div>
        )}

        {/* Edit */}
        <Box sx={{ml: "auto"}}>
          {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
              <Button size="small" onClick={() => setCurrentId(post._id)}>
                <EditIcon fontSize='default' />&nbsp;Edit
              </Button>
            )}
        </Box>
      </CardActions>

    </Card>
  )
}

export default Post;