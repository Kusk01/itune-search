import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { albumActions } from "../../../store/album-slice";

import classes from "./CategorySearchDropdown.module.css";
const CategorySearchDropdown = () => {
    const dispatch = useDispatch();
    const [selectedCategory, setSelectedCategory] = useState("All");
    const category = useSelector(state => state.album.categoryList);
    const list = useSelector(state => state.album.albumList)

    useEffect(() => {
        if(list.length) {
            const filterList = list.filter(item => {
                return item.category.type === selectedCategory;
            });
            dispatch(albumActions.setFilteredItemList(filterList));
        }
    }, [selectedCategory]);


    const onCategoryChange = (event) => {
        event.preventDefault();
        setSelectedCategory(event.target.value);
    }


    let optionList;
    if(category.length) {
        optionList = category.map( categoryItem => {
            return <option key={categoryItem.id} value={categoryItem.type}>{categoryItem.type}</option> });
    }
    
                
    return (
        <div>
            <div className={classes.title}><span>Category</span></div>
             <select value={selectedCategory} onChange={onCategoryChange} className={classes.categoryDropdown}>
                {optionList}
                </select>
        </div>
       
    );
}

export default CategorySearchDropdown;