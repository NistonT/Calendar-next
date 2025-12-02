"use client";
import { motion } from "motion/react";

type Props = {
	selectedDate: Date | null;
};

export const MainDate = ({ selectedDate }: Props) => {
	return (
		<>
			{selectedDate && (
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					className='text-lg text-neutral-900 font-medium'
				>
					Выбрано:{" "}
					{selectedDate.toLocaleDateString("ru-RU", {
						day: "numeric",
						month: "short",
						year: "numeric",
					})}
				</motion.div>
			)}
		</>
	);
};
