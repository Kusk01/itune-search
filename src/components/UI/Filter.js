import CategorySearchDropdown from "./CategorySearchDropdown/CategorySearchDropdown";
import DateRangePicker from "./DatePicker/DateRangePicker";
import InputBoxSearch from "./InputBoxSearch/InputBoxSearch";

import classes from "./Filter.module.css";

const Filter = () => {

    return (
        <div className={classes.filterBox}>
            <InputBoxSearch />
            <div className={classes.dropDownSearch}>
                <div>
                    <CategorySearchDropdown />  
                </div>
                <div>
                    <DateRangePicker /> 
                </div>
            </div>
        </div>
    )

}

export default Filter;