import { useState } from "react";
import "./App.css";
import { useGetPostsQuery, useCreatePostsMutation, useDeletePostMutation, useUpdatePostMutation } from "./services/Api";
import { TextField, Button, Typography, List, ListItem, ListItemText, IconButton, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function App() {
  const [newPost, setNewPost] = useState({ title: "", body: "", id: 99999 });
  const [editingPost, setEditingPost] = useState(null);

  const { data, error, isLoading } = useGetPostsQuery();
  const [createPost, { isLoading: isCreating, error: createError }] = useCreatePostsMutation();
  const [deletePost] = useDeletePostMutation();
  const [updatePost] = useUpdatePostMutation();

  const handleCreatePost = async () => {
    if (editingPost) {
      await updatePost({ ...editingPost, ...newPost });
      setEditingPost(null); 
    } else {
      await createPost(newPost);
    }
    setNewPost({ title: "", body: "", id: 99999 }); 
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    setNewPost({ title: post.title, body: post.body, id: post.id });
  };

  const handleDeletePost = async (id) => {
    await deletePost(id);
    ;
  };

  if (isLoading) return <Typography variant="h6">Loading...</Typography>;

  if (createError) return <Typography color="error">There was an error creating a post</Typography>;

  if (error) return <Typography color="error">There was an error loading the posts</Typography>;

  return (
    <>
      <Box p={2}>
        <Typography variant="h4" gutterBottom>
          {editingPost ? "Edit Post" : "Create Post"}
        </Typography>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <TextField
          label="Body"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newPost.body}
          onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreatePost}
          disabled={isCreating}
        >
          {editingPost ? "Update Post" : "Create Post"}
        </Button>
      </Box>

      <Box p={2}>
        <Typography variant="h5" gutterBottom>
          Posts
        </Typography>
        <List>
          {data?.map((post) => (
            <ListItem key={post.id} sx={{ display: "flex", alignItems: "center" }}>
              <ListItemText
                primary={post.title}
                secondary={post.body}
              />
              <IconButton onClick={() => handleEditPost(post)} color="primary">
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDeletePost(post.id)} color="secondary">
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
}

export default App;
