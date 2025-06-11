import { Text, View } from 'react-native';
import { Common } from '@/styles/common';
import { Calendar } from 'react-native-calendars';
import Chip from '../Chip';
import useDateSelector from '@/hooks/useDateSelector';
import { useBottomSheetStore } from '@/stores/useBottomSheetStore';
import { useEffect, useState } from 'react';

const DateSelectorModal = () => {
    const { startDate, endDate, onDayPress, markedDates, resetPeriod } = useDateSelector();
    const { visible, result, setResult } = useBottomSheetStore();
    const [limitDate, setLimitDate] = useState<{
        minDate?: string;
        maxDate?: string;
    }>({
        minDate: undefined,
        maxDate: undefined,
    });

    const selectableStartDate = result?.selectableStartDate ?? null;
    const selectableEndDate = result?.selectableEndDate ?? null;

    useEffect(() => {
        setResult({ ...result, startDate: startDate, endDate: endDate });
    }, [startDate, endDate]);

    if (!visible) return null;

    const formatDateToString = (date: Date) => {
        const year = date.getFullYear();
        const month = `${date.getMonth() + 1}`.padStart(2, '0'); // 0-based
        const day = `${date.getDate()}`.padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        console.log('왜안됨:', result);
        const newLimit = {
            minDate: result?.selectableStartDate
                ? formatDateToString(selectableStartDate)
                : undefined,
            maxDate: result?.selectableEndDate ? formatDateToString(selectableEndDate) : undefined,
        };
        setLimitDate(newLimit);
    }, [result]);

    return (
        <>
            <View style={{ alignItems: 'center', paddingVertical: 15 }}>
                <Text style={{ fontSize: 18, fontWeight: 500 }}>일정 선택</Text>
            </View>

            <View>
                <Calendar
                    monthFormat="yyyy MM"
                    onDayPress={onDayPress}
                    markingType="period"
                    markedDates={markedDates}
                    theme={{
                        arrowColor: '#5B5B5B',
                    }}
                    minDate={limitDate.minDate}
                    maxDate={limitDate.maxDate}
                />
                <View style={Common.chips}>
                    <Chip startDate={startDate} endDate={endDate} onCancel={resetPeriod} />
                </View>
            </View>
        </>
    );
};
export default DateSelectorModal;
