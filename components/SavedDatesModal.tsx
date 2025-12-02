import { Search, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

type Props = {
	isSavedDatesOpen: boolean;
	setSavedDatesOpen: (value: boolean) => void;
	searchQuery: string;
	setSearchQuery: (value: string) => void;
	savedDates: string[];
	setSavedDates: React.Dispatch<React.SetStateAction<string[]>>;
};

export const SavedDatesModal = ({
	isSavedDatesOpen,
	setSavedDatesOpen,
	searchQuery,
	setSearchQuery,
	savedDates,
	setSavedDates,
}: Props) => {
	return (
		<AnimatePresence>
			{isSavedDatesOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className='fixed inset-0 bg-black/70 z-50 flex items-end justify-center p-4 sm:items-center'
					onClick={e => {
						if (e.target === e.currentTarget) setSavedDatesOpen(false);
					}}
				>
					<motion.div
						layout
						initial={{ y: "100%", opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: "100%", opacity: 0 }}
						transition={{ type: "spring", damping: 25, stiffness: 300 }}
						className='bg-white rounded-t-3xl sm:rounded-2xl w-full max-w-md max-h-[80vh] flex flex-col'
						onClick={e => e.stopPropagation()}
					>
						<div className='p-4 border-b flex justify-between items-center'>
							<h3 className='font-bold'>Сохранённые даты</h3>
							<button onClick={() => setSavedDatesOpen(false)}>
								<X size={24} />
							</button>
						</div>

						<div className='p-3 border-b'>
							<div className='relative'>
								<Search
									className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
									size={16}
								/>
								<input
									type='text'
									placeholder='Поиск...'
									value={searchQuery}
									onChange={e => setSearchQuery(e.target.value)}
									className='w-full pl-10 pr-4 py-2 border rounded-lg text-sm'
								/>
							</div>
						</div>

						<div className='flex-1 overflow-y-auto p-2'>
							{savedDates.length === 0 ? (
								<p className='text-center text-gray-500 py-4'>
									Нет сохранённых дат
								</p>
							) : (
								<ul className='space-y-2'>
									{savedDates
										.filter(dateStr => {
											if (!searchQuery.trim()) return true;
											const d = new Date(dateStr);
											const full = d
												.toLocaleDateString("ru-RU", {
													weekday: "long",
													day: "numeric",
													month: "long",
													year: "numeric",
												})
												.toLowerCase();
											return (
												full.includes(searchQuery.toLowerCase()) ||
												dateStr.includes(searchQuery)
											);
										})
										.map(dateStr => (
											<motion.li
												key={dateStr}
												initial={{ opacity: 0, x: -20 }}
												animate={{ opacity: 1, x: 0 }}
												className='p-3 bg-gray-50 rounded-lg flex justify-between items-start'
											>
												<span className='text-sm'>
													{new Date(dateStr).toLocaleDateString("ru-RU", {
														weekday: "short",
														day: "numeric",
														month: "long",
														year: "numeric",
													})}
												</span>
												<button
													onClick={() =>
														setSavedDates(prev =>
															prev.filter(d => d !== dateStr)
														)
													}
													className='text-neutral-500 text-xs'
												>
													Удалить
												</button>
											</motion.li>
										))}
								</ul>
							)}
						</div>

						<div className='p-3 border-t'>
							<motion.button
								whileTap={{ scale: 0.95 }}
								onClick={() => setSavedDatesOpen(false)}
								className='w-full py-2 bg-neutral-900 text-white rounded-lg'
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
