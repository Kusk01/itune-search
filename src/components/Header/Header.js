
import { useDispatch, useSelector } from 'react-redux';
import classes from './Header.module.css';
import { albumActions } from '../../store/album-slice';

const Header = () => {
    const count = useSelector(state =>state.album.totalWishlistCount);
    const dispatch = useDispatch();

    const goBackToList = (event) => {
        event.preventDefault();
        dispatch(albumActions.getDetailsPageInformation(''));
        dispatch(albumActions.showWishListPage(false));
    }

    const gotoWishListPage = () => {
        dispatch(albumActions.showWishListPage(true));
    }
    
    return (
        <div className={classes.mainHeaderDiv}>
            <header className={classes.header}>
                <nav className={classes.nav}>
                    <ul>
                        <li className={classes.l1} onClick={goBackToList}>
                            <span><img src="https://itunes.apple.com/favicon.ico" height="30px"/>Music</span>
                        </li>
                        <li className={classes.l2} onClick={gotoWishListPage}>
                            <div className={classes.headerFavorite}>
                            {count === 0 && <span><i className="fa fa-heart-o"></i> Favorite</span>}
                            {count !== 0 && <span><i className="fa fa-heart"></i> Favorite</span>}
                            </div>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
        
    )
}

export default Header;