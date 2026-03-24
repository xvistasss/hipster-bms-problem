// Calendar SPA header component
// Responsibilities:
// - Render outlet select dropdown
// - Render calendar time range selector
// - Render search input for therapists
// - Render filter buttons for therapist attributes
// - Render 'New Booking' button

import React from 'react';
import {
    SlidersHorizontal,
    ChevronLeft,
    ChevronRight,
    CalendarDays
} from 'lucide-react';

import { useBookingStore } from '../../store/bookingStore';
import { useUIStore } from '../../store/uiStore';
import {
    formatBookingDate,
    setBookingTime
} from '../../utils/dateHelpers';

import SearchBar from '../common/SearchBar';
import FilterSelection from '../common/FilterSelection';

const BookingOverlay = () => {
    const openCreatePanel = useBookingStore((state) => state.openCreatePanel);

    const selectedOutlet = useBookingStore((state) => state.selectedOutlet);
    const setSelectedOutlet = useBookingStore((state) => state.setSelectedOutlet);

    const selectedInterval = useBookingStore((state) => state.selectedInterval);
    const setSelectedInterval = useBookingStore((state) => state.setSelectedInterval);

    const isFilterOpen = useUIStore((state) => state.isFilterOpen);
    const toggleFilter = useUIStore((state) => state.toggleFilter);
    const activeFilters = useUIStore((state) => state.activeFilters);

    const selectedDate = useBookingStore((state) => state.selectedDate);
    const setSelectedDate = useBookingStore((state) => state.setSelectedDate);

    const activeFilterCount = Number(Boolean(activeFilters.gender)) + Number(Boolean(activeFilters.requestedOnly));

    const safeSelectedDate =
    selectedDate instanceof Date
        ? selectedDate
        : new Date(selectedDate);

    const setPreviousDate = () => {
        const previousDate = new Date(safeSelectedDate);
        previousDate.setDate(previousDate.getDate() - 1);
        setSelectedDate(setBookingTime(previousDate));
    };

    const setNextDate = () => {
        const nextDate = new Date(safeSelectedDate);
        nextDate.setDate(nextDate.getDate() + 1);
        setSelectedDate(setBookingTime(nextDate));
    };

    const setToday = () => {
        const today = setBookingTime(new Date());
        if (today.getTime() !== safeSelectedDate.getTime()) {
            setSelectedDate(today);
        }
    };

    return (
        <header className="bg-white shadow-sm border-b border-gray-100 p-2 overflow-visible">
            <div className="flex flex-col lg:flex-row justify-between align-middle gap-3">
                <div className="flex flex-col sm:flex-row justify-between align-middle gap-3">
                    <div className="flex flex-row justify-between align-middle gap-3">
                        {/* Outlet Selector */}
                        <select
                            value={selectedOutlet}
                            onChange={(event) => setSelectedOutlet(event.target.value)}
                            className="bg-transparent text-md font-semibold text-gray-800">
                            <option>Liat Towers</option>
                            <option>Main Branch</option>
                            <option>Wellness Center</option>
                        </select>

                        {/* Display Duration */}
                        <select
                            value={selectedInterval}
                            onChange={(event) => setSelectedInterval(Number(event.target.value))}
                            className="bg-transparent text-xs text-gray-500">
                            <option>Display : 15 Min</option>
                            <option>Display : 30 Min</option>
                            <option>Display : 60 Min</option>
                        </select>
                    </div>

                    <SearchBar />
                </div>

                <div className="flex flex-row justify-between align-middle gap-3">
                    {/* Filter */}
                    <div className="relative">
                        <button
                            onClick={toggleFilter}
                            className={`flex items-center gap-2 h-10 px-4 rounded-md border text-sm font-medium ${
                                isFilterOpen
                                    ? 'border-blue-400 bg-blue-50 text-blue-600'
                                    : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                            }`}>
                            <span>Filter</span>
                            {activeFilterCount > 0 && (
                                <span className="flex h-5 items-center justify-center rounded-full bg-blue-500 px-1 text-xs font-medium text-white">
                                    {activeFilterCount}
                                </span>
                            )}
                            <SlidersHorizontal size={16} />
                        </button>

                        {isFilterOpen && <FilterSelection />}
                    </div>

                    {/* Date Navigation */}
                    <div className="flex justify-between items-center gap-2 px-2 h-10 rounded-md border border-gray-200 bg-white">
                        <button
                            onClick={setToday}
                            className="text-xs text-gray-800">
                            Today
                        </button>

                        <button
                            onClick={setPreviousDate}
                            className="text-xs font-bold text-gray-500 hover:text-gray-700">
                            <ChevronLeft size={12} />
                        </button>

                        <span className="text-xs font-medium text-gray-500 text-center">
                            {formatBookingDate(selectedDate)}
                        </span>

                        <button
                            onClick={setNextDate}
                            className="text-xs font-bold text-gray-500 hover:text-gray-700">
                            <ChevronRight size={12} />
                        </button>
                    </div>

                    {/* New Booking */}
                    <button
                        type="button"
                        onClick={openCreatePanel}
                        className="flex items-center gap-2 h-10 rounded-md bg-red-500 px-4 text-sm font-medium text-white hover:bg-red-600">
                        <CalendarDays size={16} />
                        <span>New</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default BookingOverlay;
