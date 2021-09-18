import React from "react";
import { useSelector } from "react-redux";

import classes from "./AlbumDetails.module.css";

const AlbumDetails = (props) => {
    const albumDetail = useSelector(state => state.album.albumDetailsPageInformation);
    return (
        <React.Fragment>
            <div className={classes.detailsPage}>
                <div className={classes.detailsImg}>
                    <span><img src={albumDetail.images[2].largeImage.imageUrl} ></img></span>
                </div>
                
                <div className={classes.detailsSection}>
                    <div>
                        <span>{albumDetail.title}</span>
                    </div>
                    <div className={classes.artist}>
                        <span>{albumDetail.artist.name}</span>
                    </div>
                </div>
            </div>
            
        </React.Fragment>
    )
}

export default AlbumDetails;