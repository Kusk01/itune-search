
import { useDispatch } from 'react-redux';
import { albumActions } from '../../../store/album-slice';
import classes from './AlbumListItem.module.css';

const AlbumListItem = (props) => {
    const dispatch = useDispatch();
    const {id, title, artist, price, name, releaseDate, images, index, isFavorite}  = props;

    const goToAlbumDetailPage = (event) => {
        event.stopPropagation();
        dispatch(albumActions.getDetailsPageInformation({
            id,
            title,
            artist,
            price,
            name,
            releaseDate,
            images,
            isFavorite
        }));
    }

    const addToWishList = (event) => {
        event.preventDefault();
        if(!isFavorite) {
            dispatch(albumActions.addToWishList({
                id,
                title,
                artist,
                price,
                name,
                releaseDate,
                images,
                isFavorite
            }));
        } else {
            dispatch(albumActions.removeFromWishList(id));
        }
        
    }

    return (
            <div className={classes.item} >
                <div style={{display: "inline-block"}}>
                    <span onClick={goToAlbumDetailPage}>
                        <img src={images[2].largeImage.imageUrl}/>
                    </span>
                    <div className={classes.artist}>
                        <div className={classes.title}>
                            <span>{title}</span>
                        </div>
                        <div className={classes.favorite} onClick={addToWishList}>
                            { ! isFavorite && <span><i className="fa fa-heart-o"></i></span> }
                            { isFavorite && <span><i className="fa fa-heart"></i></span> }
                        </div>
                    </div>
                    <div className={classes.name}>
                        <span>{artist.name}</span>
                    </div>
                </div>
            </div>
    )
}

export default AlbumListItem;