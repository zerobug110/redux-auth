import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createPostService, getAllPostsService } from '../../Service/postApi'; 

const initialState = [];

export const createPost = createAsyncThunk(
  "post/create",
  async (postData) => {
    console.log("post datas",postData)
    const res = await createPostService(postData);
    return res.data;
  }
);

export const retrievePosts = createAsyncThunk(
  "post/retrieve",
  async () => {
    const res = await getAllPostsService();
    return res.data;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
 
  extraReducers: (builder) => {
    builder
      .addCase(createPost.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(retrievePosts.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});

export const { addedPost } = postsSlice.actions;
export default postsSlice.reducer;
