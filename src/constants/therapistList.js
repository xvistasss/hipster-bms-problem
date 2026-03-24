export const THERAPISTS = Array.from({ length: 200 }, (_, index) => ({
  id: `therapist-${index + 1}`,
  name: `Therapist ${index + 1}`,
  gender: index % 2 === 0 ? 'female' : 'male',
}));

// const therapists = [
//   { id: 'therapist-1', name: 'Therapist 1', gender: 'female' },
//   { id: 'therapist-2', name: 'Therapist 2', gender: 'male' },
//   { id: 'therapist-3', name: 'Therapist 3', gender: 'female' },
//   { id: 'therapist-4', name: 'Therapist 4', gender: 'male' },
//   { id: 'therapist-5', name: 'Therapist 5', gender: 'female' },
//   { id: 'therapist-6', name: 'Therapist 6', gender: 'male' },
//   { id: 'therapist-7', name: 'Therapist 7', gender: 'female' },
//   { id: 'therapist-8', name: 'Therapist 8', gender: 'male' },
//   { id: 'therapist-9', name: 'Therapist 9', gender: 'female' },
//   { id: 'therapist-10', name: 'Therapist 10', gender: 'male' },
//   { id: 'therapist-11', name: 'Therapist 11', gender: 'female' },
//   { id: 'therapist-12', name: 'Therapist 12', gender: 'male' },
// ];