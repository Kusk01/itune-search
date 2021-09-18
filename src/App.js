import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AlbumDetails from "./components/Album/AlbumDetails/AlbumDetals";
import AlbumList from "./components/Album/AlbumList";
import Header from "./components/Header/Header";
import { fetchAlbumData } from "./store/album-action";
import Filter from "./components/UI/Filter";
import AlbumWishList from "./components/Album/AlbumWishlist/AlbumWishlist";



function App() {
  const albumDetails = useSelector(state => state.album.albumDetailsPageInformation);
  const isWishListHasItems = useSelector(state => state.album.isWishListItemAvailable);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAlbumData());
  }, []);


  return (
    <React.Fragment>
      <Header />
      { (!albumDetails && !isWishListHasItems) && 
        <div style={{paddingTop: '80px'}}>
          <Filter /> 
        </div>
      }
      { (!albumDetails && !isWishListHasItems) && <AlbumList /> }

      <div style={{paddingTop: '80px'}}>
        { albumDetails && <AlbumDetails /> }
        { isWishListHasItems && <AlbumWishList />}
      </div>

      {/* <Switch>
        <Route path="/">
          <AlbumList />
        </Route>
        <Route path="/details" exact>
          <AlbumDetails />
        </Route>
      </Switch> */}
      
    </React.Fragment>
     
  );
}

export default App;
