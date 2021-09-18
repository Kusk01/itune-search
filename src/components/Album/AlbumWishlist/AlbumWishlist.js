

import React from "react";
import { useSelector } from "react-redux";
import classes from "./AlbumWishlist.module.css";

const AlbumWishList = () => {
    const wishListItem = useSelector(state =>state.album.wishList);
    return (
        <React.Fragment>
            {
                wishListItem.map(item => {
                    
                    return (<div className={classes.item} >
                        <div style={{display: "inline-block"}}>
                            <span>
                                <img src={item.images[2].largeImage.imageUrl}/>
                            </span>
                            <div className={classes.artist}>
                                <div className={classes.title}>
                                    <span>{item.title}</span>
                                </div>
                            </div>
                            <div className={classes.name}>
                                <span>{item.artist.name}</span>
                            </div>
                        </div>
                    </div>
                )})
            }
        </React.Fragment>
    )
}

export default AlbumWishList;