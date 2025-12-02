import { formatDateKey, getDaysInMonth, getStartDayOfWeek } from "@/utils";
import { useEffect, useMemo, useRef, useState } from "react";

export const useCalendar = () => {
	const [isCalendarOpen, setCalendarOpen] = useState<boolean>(false);
	const [isSavedDatesOpen, setSavedDatesOpen] = useState<boolean>(false);
	const [currentDate, setCurrentDate] = useState<Date>(new Date());
	const [longPressedDate, setLongPressedDate] = useState<Date | null>(null);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);

	const today = new Date();
	const todayKey = formatDateKey(today);

	const [savedDates, setSavedDates] = useState<string[]>(() => {
		if (typeof window === "undefined") return [];
		const stored = localStorage.getItem("savedCalendarDates");
		if (stored) {
			try {
				const parsed = JSON.parse(stored);
				return Array.isArray(parsed) ? parsed : [];
			} catch (e) {
				console.error("Failed to parse saved dates", e);
				return [];
			}
		}
		return [];
	});

	useEffect(() => {
		localStorage.setItem("savedCalendarDates", JSON.stringify(savedDates));
	}, [savedDates]);

	const { days, monthName } = useMemo(() => {
		const year = currentDate.getFullYear();
		const month = currentDate.getMonth();
		const daysInMonth = getDaysInMonth(year, month);
		const startOffset = getStartDayOfWeek(daysInMonth[0]);
		const blank = Array(startOffset).fill(null);
		const total = [...blank, ...daysInMonth];
		while (total.length % 7 !== 0) total.push(null);
		return {
			days: total,
			monthName: currentDate.toLocaleDateString("ru-RU", {
				month: "long",
				year: "numeric",
			}),
		};
	}, [currentDate]);

	const longPressTimeout = useRef<NodeJS.Timeout | null>(null);
	const handleTouchStart = (date: Date | null) => {
		if (!date) return;
		longPressTimeout.current = setTimeout(() => setLongPressedDate(date), 500);
	};
	const handleTouchEnd = () => {
		if (longPressTimeout.current) {
			clearTimeout(longPressTimeout.current);
			longPressTimeout.current = null;
		}
	};

	const toggleSaveDate = (date: Date, forceSave?: boolean) => {
		const key = formatDateKey(date);
		setSavedDates(prev => {
			if (forceSave === false) return prev.filter(d => d !== key);
			if (forceSave === true || !prev.includes(key)) return [...prev, key];
			return prev.filter(d => d !== key);
		});
		setLongPressedDate(null);
	};

	const handleDateClick = (date: Date | null) => {
		if (!date) return;
		setSelectedDate(date);
		setCalendarOpen(false);
	};

	const prevMonth = () =>
		setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1));
	const nextMonth = () =>
		setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1));

	useEffect(() => {
		const handleWheel = (e: WheelEvent) => {
			if (!isCalendarOpen) return;
			if (e.deltaY < 0) prevMonth();
			else nextMonth();
		};
		window.addEventListener("wheel", handleWheel);
		return () => window.removeEventListener("wheel", handleWheel);
	}, [isCalendarOpen]);

	return {
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
	};
};
