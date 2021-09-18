import { useSelector } from "react-redux";
import AlbumListItem from "./AlbumListItem/AlbumListItem";
import classes from './AlbumList.module.css';
import React from "react";

const AlbumList = (props) => {
    let albumList = useSelector(state => state.album.albumList);
    const filterItems = useSelector(state => state.album.filterItems);
    let albumlistItems;
    if(filterItems.length) {
        albumList = filterItems;
    }

    
    if(albumList.length) {
        albumlistItems = albumList.map((oneAlbum, index) => {

            return (
                <AlbumListItem 
                    key={oneAlbum.id.id}
                    id={oneAlbum.id}
                    images={oneAlbum.images}
                    artist={oneAlbum.artist}
                    price={oneAlbum.price}
                    name={oneAlbum.name}
                    title={oneAlbum.title}
                    isFavorite={oneAlbum.isFavorite}
                /> 
            )
        })
    }
    
    return (
        <React.Fragment>
            
            <div className={classes.list}>
                {albumlistItems}
            </div>
        </React.Fragment>
    )
}

export default AlbumList;