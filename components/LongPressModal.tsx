import { AnimatePresence, motion } from "motion/react";

type Props = {
	longPressedDate: Date | null;
	setLongPressedDate: (value: Date | null) => void;
	toggleSaveDate: (date: Date, forceSave?: boolean) => void;
};

export const LongPressModal = ({
	longPressedDate,
	setLongPressedDate,
	toggleSaveDate,
}: Props) => {
	return (
		<AnimatePresence>
			{longPressedDate && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4'
					onClick={() => setLongPressedDate(null)}
				>
					<motion.div
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.8, opacity: 0 }}
						className='bg-white rounded-xl p-6 w-64 text-center'
						onClick={e => e.stopPropagation()}
					>
						<p className='mb-4'>
							Сохранить дату? <br />
							<strong>
								{longPressedDate.toLocaleDateString("ru-RU", {
									weekday: "long",
									day: "numeric",
									month: "long",
									year: "numeric",
								})}
							</strong>
						</p>
						<div className='flex gap-2'>
							<motion.button
								whileTap={{ scale: 0.95 }}
								onClick={() => toggleSaveDate(longPressedDate, true)}
								className='flex-1 bg-neutral-600 text-white py-2 rounded'
							>
								Сохранить
							</motion.button>
							<motion.button
								whileTap={{ scale: 0.95 }}
								onClick={() => setLongPressedDate(null)}
								className='flex-1 bg-gray-300 py-2 rounded'
							>
								Отмена
							</motion.button>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
