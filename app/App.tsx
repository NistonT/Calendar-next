"use client";

import {
	LongPressModal,
	MainButton,
	MainDate,
	ModalCalendar,
	SavedDatesModal,
} from "@/components";

import { useCalendar } from "@/hooks/useCalendar";

export const App = () => {
	const {
		selectedDate,
		setCalendarOpen,
		isCalendarOpen,
		prevMonth,
		monthName,
		nextMonth,
		days,
		todayKey,
		savedDates,
		currentDate,
		handleTouchStart,
		handleDateClick,
		setSavedDatesOpen,
		handleTouchEnd,
		setLongPressedDate,
		longPressedDate,
		toggleSaveDate,
		searchQuery,
		setSearchQuery,
		setSavedDates,
		isSavedDatesOpen,
	} = useCalendar();

	return (
		<>
			<div className='flex flex-col items-center gap-3 mt-6'>
				<MainDate selectedDate={selectedDate} />
				<MainButton setCalendarOpen={setCalendarOpen} />
			</div>

			<ModalCalendar
				isCalendarOpen={isCalendarOpen}
				setCalendarOpen={setCalendarOpen}
				prevMonth={prevMonth}
				nextMonth={nextMonth}
				monthName={monthName}
				days={days}
				todayKey={todayKey}
				savedDates={savedDates}
				currentDate={currentDate}
				handleTouchStart={handleTouchStart}
				handleTouchEnd={handleTouchEnd}
				handleDateClick={handleDateClick}
				setSavedDatesOpen={setSavedDatesOpen}
			/>

			<LongPressModal
				longPressedDate={longPressedDate}
				setLongPressedDate={setLongPressedDate}
				toggleSaveDate={toggleSaveDate}
			/>

			<SavedDatesModal
				isSavedDatesOpen={isSavedDatesOpen}
				setSavedDatesOpen={setSavedDatesOpen}
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
				savedDates={savedDates}
				setSavedDates={setSavedDates}
			/>
		</>
	);
};
