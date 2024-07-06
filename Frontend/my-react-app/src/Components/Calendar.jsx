// src/Calendar.js
import React, { useEffect, useState } from 'react';
import { 
    format, 
    startOfWeek, 
    endOfWeek, 
    addDays, 
    startOfMonth, 
    endOfMonth, 
    isSameMonth, 
    isSameDay, 
    addMonths, 
    subMonths, 
    isAfter 
} from 'date-fns';
import './calendar.css'

const Calendar = ({availableWeekdays, dateClicked}) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    useEffect(()=>{
        console.log(currentMonth);
    },[currentMonth])

    const renderHeader = () => {
        const dateFormat = 'MMMM yyyy';

        return (
            <div className="header row flex-middle">
                <div className="col col-start">
                    <div className="icon font-bold" onClick={prevMonth}>
                        &lt; prev
                    </div>
                </div>
                <div className="col col-center font-bold text-green-500 md:text-xl">
                    <span>{format(currentMonth, dateFormat)}</span>
                </div>
                <div className="col col-end" onClick={nextMonth}>
                    <div className="icon font-bold">next &gt;</div>
                </div>
            </div>
        );
    };

    const renderDays = () => {
        const dateFormat = 'EEEEEE';
        const days = [];

        let startDate = startOfWeek(currentMonth);

        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="col col-center" key={i}>
                    {format(addDays(startDate, i), dateFormat)}
                </div>
            );
        }

        return <div className="days row">{days}</div>;
    };

    const renderCells = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);
    
        const dateFormat = 'd';
        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = '';
        const todayDate = new Date();
    
        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, dateFormat);
                const cloneDay = day;
                const dayOfWeek = day.getDay();
                const isSelectable = availableWeekdays.includes(dayOfWeek) && (isAfter(day, todayDate) || isSameDay(day, todayDate));
    
                days.push(
                    <div
                        className={`col cell ${
                            !isSameMonth(day, monthStart)
                                ? 'disabled'
                                : isSameDay(day, selectedDate)
                                ? 'selected'
                                : isSelectable
                                ? ''
                                : 'not-selectable'
                        }`}
                        key={day}
                        onClick={isSelectable ? () => onDateClick(cloneDay, dayOfWeek) : null}
                    >
                        <span className="number">{formattedDate}</span>
                        <span className="bg">{formattedDate}</span>
                    </div>
                );
                day = addDays(day, 1);
            }
            rows.push(
                <div className="row" key={day}>
                    {days}
                </div>
            );
            days = [];
        }
        return <div className="body">{rows}</div>;
    };
    
    const onDateClick = (day, dayOfWeek) => {
        setSelectedDate(day);
        dateClicked(day, dayOfWeek)
    };

    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };

    const prevMonth = () => {
        const todayDate = new Date();
        const currentMonthStart = new Date(todayDate.getFullYear(), todayDate.getMonth(), 1);
        const currentMonthStartFormatted = format(currentMonth, "yyyy-MM");

        if (format(currentMonthStart, "yyyy-MM") !== currentMonthStartFormatted) {
            setCurrentMonth(subMonths(currentMonth, 1));
        }
    };

    return (
        <div className="calendar px-4">
            {renderHeader()}
            {renderDays()}
            {renderCells()}
        </div>
    );
};

export default Calendar;
