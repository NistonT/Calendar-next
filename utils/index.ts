const getDaysInMonth = (year: number, month: number): Date[] => {
	const days: Date[] = [];
	const daysInMonth = new Date(year, month + 1, 0).getDate();
	for (let i = 1; i <= daysInMonth; i++) {
		days.push(new Date(year, month, i));
	}
	return days;
};

const getStartDayOfWeek = (date: Date): number => {
	const day = date.getDay();
	return day === 0 ? 6 : day - 1;
};

const formatDateKey = (date: Date): string => date.toISOString().split("T")[0];

export { formatDateKey, getDaysInMonth, getStartDayOfWeek };
