import { configureStore, createSlice } from "@reduxjs/toolkit";

const albumSlice = createSlice({
    name: 'album',
    initialState: {
        albumList: [],
        filterItems: [],
        mainImage: '',
        authorInformation: {},
        wishList: [],
        totalWishlistCount: 0,
        albumDetailsPageInformation: '',
        isWishListItemAvailable:false,
        headerIconUrl: '',
        categoryList: []
    },
    reducers: {
        setAlbumData(state, action){
            state.albumList = action.payload;
        },
        addToWishList(state, action) {
            const newItem = action.payload;
            const isAlreadyAddedToWishlist = state.wishList.find(item => item.id.id === newItem.id.id);

            const index = state.albumList.findIndex(item => item.id.id === newItem.id.id);
            if(isAlreadyAddedToWishlist) {
                state.wishList.splice(index, 1);
            } else {
                state.wishList.push({
                    ...newItem,
                    isFavorite: true
                });
                state.totalWishlistCount++;
            }
            if(state.filterItems.length) {
                const filterItemIndex = state.filterItems.findIndex(item => item.id.id === newItem.id.id);
                state.filterItems[filterItemIndex].isFavorite = true;
            }
            state.albumList[index].isFavorite = true;
            
        },
        removeFromWishList(state, action) {
            const index = state.wishList.findIndex(item => item.id.id === action.payload.id);
            state.albumList.forEach((item) => {
                if(item.id.id === action.payload.id) {
                    item.isFavorite = false;
                    return;
                }
            })
            state.wishList.splice(index, 1);
            state.totalWishlistCount--;
        },
        getDetailsPageInformation(state, action) {
            state.albumDetailsPageInformation = action.payload;
        },
        setFilteredItemList(state, action) {
            state.filterItems = action.payload;
        },
        setCategoyList(state, action) {
            state.categoryList = action.payload;
        },
        showWishListPage(state, action) {
            state.isWishListItemAvailable = action.payload;
        }
    }
});

const store = configureStore({
    reducer: {
        album: albumSlice.reducer
    }
})

export const albumActions = albumSlice.actions;

export default store;