import { formatDateKey } from "@/utils";
import { Bookmark } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

type Props = {
	isCalendarOpen: boolean;
	setCalendarOpen: (value: boolean) => void;

	prevMonth: () => void;
	nextMonth: () => void;
	monthName: string;

	days: (Date | null)[];
	todayKey: string;
	savedDates: string[];
	currentDate: Date;

	handleTouchStart: (date: Date | null) => void;
	handleTouchEnd: () => void;
	handleDateClick: (date: Date | null) => void;

	setSavedDatesOpen: (value: boolean) => void;
};

export const ModalCalendar = ({
	isCalendarOpen,
	setCalendarOpen,
	prevMonth,
	nextMonth,
	monthName,
	days,
	todayKey,
	savedDates,
	currentDate,
	handleDateClick,
	handleTouchEnd,
	handleTouchStart,
	setSavedDatesOpen,
}: Props) => {
	return (
		<AnimatePresence>
			{isCalendarOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className='fixed inset-0 bg-black/70 z-50 flex items-end justify-center p-4 sm:items-center'
					onClick={e => {
						if (e.target === e.currentTarget) {
							setCalendarOpen(false);
						}
					}}
				>
					<motion.div
						layout
						initial={{ y: "100%", opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: "100%", opacity: 0 }}
						transition={{ type: "spring", damping: 25, stiffness: 300 }}
						className='bg-white rounded-t-3xl sm:rounded-2xl w-full max-w-md max-h-[90vh] flex flex-col'
						onClick={e => e.stopPropagation()}
					>
						<div className='p-4 border-b flex justify-between items-center'>
							<button onClick={prevMonth} className='p-2'>
								&larr;
							</button>
							<h2 className='font-bold text-lg'>{monthName}</h2>
							<button onClick={nextMonth} className='p-2'>
								&rarr;
							</button>
						</div>

						<div className='grid grid-cols-7 text-center text-sm text-gray-500 font-medium py-2'>
							{["пн", "вт", "ср", "чт", "пт", "сб", "вс"].map(d => (
								<div key={d}>{d}</div>
							))}
						</div>

						<div className='grid grid-cols-7 gap-0.5 p-2 flex-1 overflow-y-auto'>
							{days.map((date, idx) => {
								if (!date) return <div key={idx} className='p-3'></div>;
								const dateKey = formatDateKey(date);
								const isToday = dateKey === todayKey;
								const isSaved = savedDates.includes(dateKey);
								const isOtherMonth = date.getMonth() !== currentDate.getMonth();

								return (
									<motion.button
										key={idx}
										whileTap={{ scale: 0.95 }}
										onTouchStart={() => handleTouchStart(date)}
										onTouchEnd={handleTouchEnd}
										onMouseDown={e => {
											e.preventDefault();
											handleTouchStart(date);
										}}
										onMouseUp={handleTouchEnd}
										onClick={() => handleDateClick(date)}
										className={`p-3 text-center rounded-lg text-sm transition
                        ${isOtherMonth ? "text-gray-400" : "text-gray-800"}
                        ${
													isToday
														? "bg-neutral-100 border border-neutral-500 font-bold"
														: ""
												}
                        ${isSaved && !isToday ? "bg-blue-100" : ""}
                        ${
													!isOtherMonth && !isToday && !isSaved
														? "hover:bg-gray-100"
														: ""
												}
                      `}
									>
										{date.getDate()}
									</motion.button>
								);
							})}
						</div>

						<div className='p-4 border-t flex gap-2'>
							<motion.button
								whileTap={{ scale: 0.95 }}
								onClick={() => setSavedDatesOpen(true)}
								className='flex-1 flex items-center justify-center gap-1 bg-gray-200 py-2 rounded-lg'
							>
								<Bookmark size={16} />
								Сохранённые ({savedDates.length})
							</motion.button>
							<motion.button
								whileTap={{ scale: 0.95 }}
								onClick={() => setCalendarOpen(false)}
								className='flex-1 bg-neutral-900 text-white py-2 rounded-lg'
							>
								Готово
							</motion.button>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
