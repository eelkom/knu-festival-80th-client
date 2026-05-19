import { useState } from 'react';
import { motion } from 'framer-motion';
import DateTabBar from '@/components/timetable/DateTabBar';
import DayScheduleBlock from '@/components/timetable/DayScheduleBlock';
import Day20Placeholder from '@/components/timetable/Day20Placeholder';
import PerformanceLocationSection from '@/components/timetable/PerformanceLocationSection';
import { fadeUpVariant } from '@/constants/animation';
import { MOCK_LINEUP } from '@/mocks/home';
import { getNow } from '@/utils/time';

const DAYS = [20, 21, 22];

function getDefaultDay() {
  const today = getNow().getDate();
  return DAYS.includes(today) ? today : 20;
}

export default function TimeTablePage() {
  const [selectedDay, setSelectedDay] = useState(getDefaultDay);
  const dayData = MOCK_LINEUP.find((d) => d.day === selectedDay) ?? MOCK_LINEUP[0];

  return (
    <div className="bg-surface flex flex-col min-h-dvh pb-16">
      <motion.div className="px-5 pt-5 pb-10" {...fadeUpVariant}>
        <h1 className="text-body1 font-bold text-ink">Time Table</h1>
        <div className="mt-3">
          <DateTabBar days={DAYS} selectedDay={selectedDay} onSelect={setSelectedDay} />
        </div>
      </motion.div>
      <motion.div
        key={selectedDay}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {selectedDay === 20 ? <Day20Placeholder /> : <DayScheduleBlock data={dayData} />}
      </motion.div>
      <motion.div {...fadeUpVariant}>
        <PerformanceLocationSection />
      </motion.div>
    </div>
  );
}
