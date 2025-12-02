import { CalendarDays } from "lucide-react";
import { motion } from "motion/react";

type Props = {
	setCalendarOpen: (value: boolean) => void;
};

export const MainButton = ({ setCalendarOpen }: Props) => {
	return (
		<motion.button
			whileTap={{ scale: 0.95 }}
			onClick={() => setCalendarOpen(true)}
			className='p-3 bg-neutral-900 text-white rounded-full shadow-lg flex items-center gap-2'
		>
			<CalendarDays size={24} />
			Календарь
		</motion.button>
	);
};
