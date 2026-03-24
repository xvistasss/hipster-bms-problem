# Spa & Wellness Booking Management Frontend

## Overview

This project is a frontend Single Page Application built using React (Create React App) for managing spa and wellness bookings across therapist schedules.

The implementation focuses on building a responsive therapist booking board capable of handling large booking volumes while maintaining clean component architecture and efficient rendering.

## Tech Stack

* React 19 (Create React App)
* Zustand for state management
* React Hook Form for form handling
* Tailwind CSS for styling
* react-window for calendar virtualization
* dnd-kit for drag interaction foundation
* date-fns for date utilities

## Architecture Overview

The project follows a modular frontend structure:

* `components/` for reusable UI modules
* `hooks/` for derived state and reusable logic
* `store/` for Zustand state containers
* `services/` for backend abstraction and logging
* `utils/` for reusable scheduling helpers
* `pages/` for screen-level composition

The dashboard composes:

* Search
* Booking creation form
* Calendar board
* Booking details side panel

## State Management Strategy

Zustand is used to separate:

* booking domain state (bookings, selection, loading, errors)
* UI state (search term and transient UI state)

This avoids heavy prop drilling and keeps updates localized.

## Performance Strategy

Performance optimizations currently implemented:

* Debounced search filtering
* Memoized visible booking derivation
* React.memo for booking blocks and therapist columns
* Lazy loading for booking side panel
* Horizontal therapist virtualization using react-window Grid

The calendar currently virtualizes therapist columns to reduce DOM load under large therapist counts.

## Current Functional Coverage

Implemented features:

* Fetch bookings (booking service)
* Display bookings on therapist calendar
* Search bookings
* Create booking
* Edit booking
* Cancel booking
* Booking detail side panel
* Basic drag interaction foundation
* Booking conflict utility for future scheduling validation
* Error boundary fallback UI
* Structured logging for booking actions and API failures

## Error Handling

The application includes:

* UI error boundary for render failures
* Local error handling in booking actions
* Logging for user actions and API errors

## Assumptions

* Backend API layer is currently represented through booking service abstraction with provided APIs.
* Therapist virtualization is prioritized first for assignment-scale rendering.
* Drag interaction foundation is implemented; full rescheduling conflict enforcement can be extended further.

## Notes

The implementation intentionally avoids unnecessary abstraction and keeps the codebase assignment-focused, with emphasis on readable structure, extensibility, and stable performance.

## Run Locally

npm install  
npm start

## Building prodcution app
npm run build