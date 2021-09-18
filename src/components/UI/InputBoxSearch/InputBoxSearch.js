import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { albumActions } from "../../../store/album-slice";
import classes from "./InputBoxSearch.module.css";
import $ from 'jquery';

const InputBoxSearch = () => {
    const [filterItem, setFilterItem] = useState([]);
    const dispatch = useDispatch();
    const list = useSelector(state => state.album.albumList)
    const [query, setQuery] = useState("");

    useEffect(() => {
        if(query !== "") {
            const filterList = list.filter(item => {
                return item.title.toUpperCase().includes(query.toUpperCase());
            });
            setFilterItem(filterList);
            dispatch(albumActions.setFilteredItemList(filterList));
        } else {
            dispatch(albumActions.setFilteredItemList([]));
            dispatch(albumActions.setAlbumData(list));
            $("#autocomplete").hide();
        }
    }, [query]);
    
    
    const changeHandler = (event) => {
        setQuery(event.target.value);
    }

    
    const searchHandler = useCallback(() => {
        let timer;
        $("#autocomplete").show();
        return (...args) => {

            if(timer) {
                clearTimeout(timer);
            }

            timer = setTimeout(() => {
                changeHandler(args);
                $("#autocomplete").show();
            }, 300);
        }

    }, []);


    const closeAutoComplete = (event) => {
        setQuery(event.target.innerText);
        $("#autocomplete").hide();
    }

    const clearSearch = () => {
        if(query!== "") {
            setQuery('');
        }
    }

    return (
        <div className={classes.mainDiv1}>
            <div className={classes.mainDiv}>
            <input 
                type="text" 
                value={query} 
                onChange={ (event) => searchHandler(changeHandler(event))} 
                className={classes.myInput}
                placeholder="Search Album"></input>
            <span className={classes.clearWithCircle} onClick={clearSearch}></span>
            <div id="autocomplete" className={classes["autocomplete-items"]} onClick={closeAutoComplete}>
                {filterItem.map(item => {
                    return (
                        <div key={item.id.id}>{item.title}</div>
                    )
                })}
            </div>
        </div>
        </div>
        
    )
}

export default InputBoxSearch;