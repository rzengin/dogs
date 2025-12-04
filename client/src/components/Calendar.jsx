import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Calendar.css';

export default function Calendar({ bookings = [], availability = [], onDateClick, mode = 'view' }) {
    const [currentDate, setCurrentDate] = useState(new Date());

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        return { daysInMonth, startingDayOfWeek, year, month };
    };

    const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentDate);

    const previousMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const getBookingsForDate = (day) => {
        const dateStr = new Date(year, month, day).toISOString().split('T')[0];
        return bookings.filter(booking => {
            const start = new Date(booking.startDate).toISOString().split('T')[0];
            const end = new Date(booking.endDate).toISOString().split('T')[0];
            return dateStr >= start && dateStr <= end;
        });
    };

    const getAvailabilityForDate = (day) => {
        const dateStr = new Date(year, month, day).toISOString().split('T')[0];
        return availability.find(avail => {
            const availDate = new Date(avail.date).toISOString().split('T')[0];
            return availDate === dateStr;
        });
    };

    const handleDateClick = (day) => {
        if (onDateClick) {
            const date = new Date(year, month, day);
            onDateClick(date);
        }
    };

    const isToday = (day) => {
        const today = new Date();
        return day === today.getDate() && 
               month === today.getMonth() && 
               year === today.getFullYear();
    };

    const isPast = (day) => {
        const date = new Date(year, month, day);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
    };

    const monthNames = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

    const renderCalendarDays = () => {
        const days = [];
        
        // Empty cells for days before month starts
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
        }

        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayBookings = getBookingsForDate(day);
            const dayAvailability = getAvailabilityForDate(day);
            const past = isPast(day);
            const today = isToday(day);

            let dayClass = 'calendar-day';
            if (today) dayClass += ' today';
            if (past) dayClass += ' past';
            if (dayBookings.length > 0) dayClass += ' has-booking';
            if (dayAvailability?.isAvailable) dayClass += ' available';
            if (mode === 'edit' && !past) dayClass += ' clickable';

            days.push(
                <div
                    key={day}
                    className={dayClass}
                    onClick={() => !past && handleDateClick(day)}
                >
                    <span className="day-number">{day}</span>
                    {dayBookings.length > 0 && (
                        <div className="booking-indicators">
                            {dayBookings.map((booking, idx) => (
                                <div
                                    key={idx}
                                    className={`booking-dot ${booking.status.toLowerCase()}`}
                                    title={`${booking.status} - ${booking.user?.name || 'Reserva'}`}
                                />
                            ))}
                        </div>
                    )}
                    {mode === 'edit' && dayAvailability && (
                        <div className="availability-indicator">
                            {dayAvailability.isAvailable ? '✓' : '✗'}
                        </div>
                    )}
                </div>
            );
        }

        return days;
    };

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <button onClick={previousMonth} className="calendar-nav-btn">
                    <ChevronLeft size={20} />
                </button>
                <h3 className="calendar-title">
                    {monthNames[month]} {year}
                </h3>
                <button onClick={nextMonth} className="calendar-nav-btn">
                    <ChevronRight size={20} />
                </button>
            </div>

            <div className="calendar-weekdays">
                {dayNames.map(day => (
                    <div key={day} className="calendar-weekday">
                        {day}
                    </div>
                ))}
            </div>

            <div className="calendar-grid">
                {renderCalendarDays()}
            </div>

            <div className="calendar-legend">
                <div className="legend-item">
                    <span className="legend-dot pending"></span>
                    <span>Pendiente</span>
                </div>
                <div className="legend-item">
                    <span className="legend-dot confirmed"></span>
                    <span>Confirmada</span>
                </div>
                <div className="legend-item">
                    <span className="legend-dot completed"></span>
                    <span>Completada</span>
                </div>
                <div className="legend-item">
                    <span className="legend-dot cancelled"></span>
                    <span>Cancelada</span>
                </div>
            </div>
        </div>
    );
}
