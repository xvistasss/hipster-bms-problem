import { useMemo } from 'react';
import { useUIStore } from '../store/uiStore';
import { THERAPISTS } from '../constants/therapistList';

export const useTherapists = () => {
    const activeFilters = useUIStore((state) => state.activeFilters);

    const therapists = useMemo(() => {
        return THERAPISTS.filter((therapist) => {
            if (
                activeFilters.gender &&
                therapist.gender.toLowerCase() !== activeFilters.gender
            ) {
                return false;
            }

            return true;
        });
    }, [activeFilters]);

    const visibleTherapistIds = useMemo(() => {
        return therapists.map((therapist) => therapist.id);
    }, [therapists]);

    return {
        therapists,
        visibleTherapistIds,
    };
};