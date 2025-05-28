import { Colors } from '@/styles/tokens';
import { useMemo, useState } from 'react';
import { DateData, MarkedDates } from 'react-native-calendars/src/types';

const useDateSelector = () => {
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);

    const onDayPress = (day: DateData) => {
        // 두개 다 선택이 안된 경우
        if (!startDate || (startDate && endDate)) {
            setStartDate(day.dateString);
            setEndDate(null);
            return;
        }
        // 두번째로 선택한 날짜가 startDate일 때
        if (new Date(day.dateString) < new Date(startDate)) {
            setEndDate(startDate);
            setStartDate(day.dateString);
        } else {
            setEndDate(day.dateString);
        }
    };

    const markedDates = useMemo(() => {
        let marked: MarkedDates = {};

        if (startDate && !endDate) {
            marked[startDate] = {
                startingDay: true,
                endingDay: true,
                color: Colors.primary,
                textColor: Colors.white,
            };
        }

        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            let current = new Date(start);

            while (current <= end) {
                const dateStr = current.toISOString().split('T')[0];

                marked[dateStr] = {
                    color:
                        dateStr === startDate || dateStr === endDate ? Colors.primary : '#455464',
                    textColor: 'white',
                    startingDay: dateStr === startDate,
                    endingDay: dateStr === endDate,
                };

                current.setDate(current.getDate() + 1);
            }
        }

        return marked;
    }, [startDate, endDate]);

    const resetPeriod = () => {
        setStartDate(null);
        setEndDate(null);
    };

    return { startDate, endDate, onDayPress, markedDates, resetPeriod };
};
export default useDateSelector;
