import { THERAPISTS } from '../constants/therapistList';

export const createTherapistMap = () => {
  const map = new Map();

  THERAPISTS.forEach((therapist, index) => {
    const numericId = index + 1;

    map.set(numericId, therapist);
    map.set(String(numericId), therapist);
    map.set(therapist.id, therapist);
  });

  return map;
};