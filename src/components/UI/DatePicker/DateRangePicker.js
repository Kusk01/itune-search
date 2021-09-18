import { useEffect, useState } from 'react';
import $ from 'jquery';
import "jquery-ui/ui/widgets/datepicker";
import classes from "./DateRangePicker.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { albumActions } from '../../../store/album-slice';


const DateRangePicker = () => {
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const dispatch = useDispatch();
    const list = useSelector(state => state.album.albumList)
    useEffect(() => {
        $( "#datepicker1" ).datepicker(
            { 
                dateFormat: 'mm/dd/yy',
                onSelect: function(date) {
                    console.log(date);
                    setStartDate(date);
                    $( "#datepicker2" ).datepicker("option", "minDate", date );
                    setTimeout(function(){
                        $( "#datepicker2" ).datepicker('show');
                    }, 16);
                }
            });
        
        if(startDate) {
            $( "#datepicker2" ).datepicker(
                { 
                    dateFormat: 'mm/dd/yy',
                    onSelect: function(date) {
                        console.log(date);
                        setEndDate(date);
                    },
            });
        }

        if(startDate && endDate && list.length) {

            var startDateInMilliSeconds = new Date(startDate).getTime();
            var endDateInMilliSeconds = new Date(endDate).getTime();
            

            const filterList = list.filter((listItem) => {
                var releaseDate = new Date(listItem.releaseDate.calenderDate).getTime();
                return startDateInMilliSeconds <= releaseDate && endDateInMilliSeconds >= releaseDate;
            });

            console.log(filterList);

            dispatch(albumActions.setFilteredItemList(filterList));
            
        }
        
    }, [startDate, endDate]);


    const leftArrow = `${classes.arrow + " " + classes.left}`;
    const rightArrow = `${classes.arrow + " " + classes.right}`;


    
    return (
        <div>
            <div className={classes.title}><span>Release Date</span></div>
            <div className={classes.rangePicker}>
                <input 
                    type='text' 
                    id='datepicker1'
                    className={classes.datepicker1}
                    placeholder="Start Date" />
                <div className={classes.myarrow}>
                    <span className={leftArrow}></span>
                    <span className={classes.line}></span>
                    <span className={rightArrow}></span>
                </div>
                <input 
                    type='text' 
                    id='datepicker2' 
                    className={classes.datepicker2}
                    placeholder="End Date" />
            </div>
        </div>
        
        
        
    )
}

export default DateRangePicker;