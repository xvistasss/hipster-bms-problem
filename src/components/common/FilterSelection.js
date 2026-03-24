import React from 'react';
import { useUIStore } from '../../store/uiStore';

const genderOptions = ['Male', 'Female'];
const resourceOptions = ['Rooms', 'Sofa', 'Monkey Chair'];

const bookingStatuses = [
    'Confirmed',
    'Unconfirmed',
    'Checked In',
    'Completed',
    'Cancelled',
    'No Show',
    'Holding',
    'Check-In (In Progress)',
];

const FilterSelection = () => {
    const toggleFilter = useUIStore((state) => state.toggleFilter);
    const activeFilters = useUIStore((state) => state.activeFilters);
    const setActiveFilters = useUIStore((state) => state.setActiveFilters);

    const clearGenderChange = () => {
        setActiveFilters({gender: null});
    };

    const handleGenderChange = (gender) => {
        setActiveFilters({
            gender: gender === activeFilters.gender ? null : gender.toLowerCase(),
        });
    };

    const checkboxFilterChange = (filterKey, value) => {
        setActiveFilters({
            [filterKey]: activeFilters[filterKey]?.includes(value)
                ? activeFilters[filterKey].filter((item) => item !== value)
                : [...(activeFilters[filterKey] || []), value],
        });
    };

    const resetFilters = () => {
        setActiveFilters({
            gender: null,
            requestedOnly: false,
        });

        toggleFilter();
    };

    return (
        <section className="absolute left-0 top-12 min-w-[320px] max-h-96 overflow-y-scroll rounded-md border border-gray-200 bg-white shadow-lg text-xs text-gray-700">

            {/* Show by group */}
            <div className="px-3 pt-3 pb-2">
                <span className="font-medium text-[12px]">Show by group (Person who is on duty)</span>

                <div className="mt-2 space-y-2 pl-3">
                    <label className="flex cursor-pointer items-center gap-2">
                        <input
                            type="radio"
                            name="gender"
                            checked={!activeFilters.gender}
                            onChange={clearGenderChange}
                            className="h-3 w-3"
                        />
                        <span>{"All Therapist"}</span>
                    </label>
                    {genderOptions.map((option) => (
                        <label
                            key={option}
                            className="flex cursor-pointer items-center gap-2">
                            <input
                                type="radio"
                                name="gender"
                                checked={activeFilters.gender === option.toLowerCase()}
                                onChange={() => handleGenderChange(option)}
                                className="h-3 w-3"
                            />
                            <span>{option}</span>
                        </label>
                    ))}
                </div>
            </div>

            <hr className="border-gray-200" />

            {/* Resources */}
            <div className="px-3 py-3">
                <p className="font-medium">Resources</p>

                <div className="mt-2 space-y-2 pl-3">
                    {resourceOptions.map((resource) => (
                        <label
                            key={resource}
                            className="flex cursor-pointer items-center gap-2">
                            <input
                                type="checkbox"
                                value={activeFilters.resources[resource]}
                                onChange={() => checkboxFilterChange('resources', resource)}
                                className="h-3 w-3"
                            />
                            <span>{resource}</span>
                        </label>
                    ))}
                </div>
            </div>

            <hr className="border-gray-200" />

            {/* Booking Status */}
            <div className="px-3 py-3">
                <p className="font-medium">Booking Status</p>

                <div className="mt-3 grid grid-cols-2 gap-y-2 gap-x-4">
                    {bookingStatuses.map((status) => (
                        <label
                            key={status}
                            className="flex cursor-pointer items-center gap-2 whitespace-nowrap">
                            <input
                                type="checkbox"
                                value={activeFilters.statuses[status]}
                                onChange={() => checkboxFilterChange('statuses', status)}
                                className="h-3 w-3"
                            />
                            <span>{status}</span>
                        </label>
                    ))}
                </div>
            </div>

            <hr className="border-gray-200" />

            {/* Select Therapist */}
            <div className="px-3 py-3">
                <div className="flex items-center justify-between font-medium">
                    <span>Select Therapist</span>

                    <label className="flex items-center gap-1 cursor-pointer">
                        <span>Select All</span>
                        <input
                            type="checkbox"
                            // value={activeFilters.selectedTherapists[status]}
                            // onChange={() => checkboxFilterChange('statuses', status)}
                            className="h-3 w-3"
                        />
                    </label>
                </div>

                <input
                    type="text"
                    placeholder="Search by therapist"
                    className="mt-3 w-full border-b border-gray-200 pb-1 text-xs outline-none placeholder:text-gray-400"
                />
            </div>

            <hr className="border-gray-200" />

            {/* Footer */}
            <button
                type="button"
                onClick={resetFilters}
                className="px-3 py-2 text-left text-[11px] font-medium text-[#d97745]">
                Clear Filter (Return to Default)
            </button>
        </section>
    );
};

export default FilterSelection;
