import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchNews = createAsyncThunk(
    'news/fetchNews',
    async (queryData, thunkAPI) => {
        // const apiUrl = `https://newspoint-server.vercel.app/getdata?q=${query}`;
        const apiUrl = `http://localhost:5000/getdata?q=${queryData.query}&page=${queryData.page || 1}`;
        const response = await axios.get(apiUrl);
        return response.data.newsData;
    }
)

export const newsSlice = createSlice({
    name: 'news',
    initialState: {
        loading: false,
        articles: [],
        error: '',
    },
    reducers: {
        updateNews: (state, action) => {
            state.articles = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchNews.pending, (state) => {
            state.loading = true;
            state.articles = [];
            state.error = '';
        })
        .addCase(fetchNews.fulfilled, (state, action) => {
            state.loading = false;
            state.articles = action.payload;
            state.error = '';
        })
        .addCase(fetchNews.rejected, (state, action) => {
            state.loading = false;
            state.articles = [];
            state.error = action.error.message;
        });
    }
});

export const { updateNews } = newsSlice.actions;
export default newsSlice.reducer;