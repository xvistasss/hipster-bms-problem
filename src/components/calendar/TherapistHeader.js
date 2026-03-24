// Responsibilities:
// - Render sticky time header component
// - Sticky sticky therapists list horizontally

import React from 'react';
import { useTherapists } from '../../hooks/useTherapists';
import { THERAPIST_COLUMN_WIDTH } from '../../constants/calendarConfig';
import { FEMALE_COLOR, MALE_COLOR } from '../../constants/therapistColors';

const TherapistHeader = React.forwardRef((props, ref) => {
    const { therapists } = useTherapists();

    const renderTherapistBox = (therapist) => {
        const therapistColor = therapist.gender === 'female' ? FEMALE_COLOR : MALE_COLOR;
        return (
            <div key={therapist.id} className="flex flex-row items-center p-2 shrink-0 border-r border-gray-200 bg-gray-50 shadow-sm"
            style={{ minWidth: THERAPIST_COLUMN_WIDTH, width: THERAPIST_COLUMN_WIDTH }}>
                <span
                    className="flex-row align-middle rounded-full px-2 py-1 text-xs font-semibold text-center text-white"
                    style={{ backgroundColor: therapistColor }}>
                    {342344}
                </span>
                <div
                    className="flex flex-1 flex-col ml-2">
                    <span className="text-sm font-semibold truncate whitespace-nowrap">
                        {therapist.name}
                    </span>
                    <span className="text-[0.60rem] font-thin truncate whitespace-nowrap capitalize">
                        {therapist.gender}
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className="flex border-b border-gray-200 bg-white">

            {/* Time Label */}
            <div className="align-middle w-20 shrink-0 border-r border-gray-200 bg-gray-50 px-3 py-3 text-sm font-medium text-gray-600 shadow-sm">
                Time
            </div>

            {/* Therapist Scroll Header */}
            <div
                ref={ref}
                className="flex overflow-hidden">
                {therapists.map((therapist) => renderTherapistBox(therapist))}
            </div>
        </div>
    );
});

export default TherapistHeader;
