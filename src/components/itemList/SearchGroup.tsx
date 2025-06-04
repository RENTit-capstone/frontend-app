import { Pressable, View } from 'react-native';
import DropDown from '../Dropdown';
import { Common } from '@/styles/common';
import { useEffect, useState } from 'react';
import Calendar from '@/assets/images/calendar.svg';
import DownArrow from '@/assets/images/down-arrow.svg';
import TextInput from '../TextInput';
import SearchIcon from '@/assets/images/search.svg';
import formatISOToDate from '@/utils/formatDateString';
import { useBottomSheetStore } from '@/stores/useBottomSheetStore';
import { Colors } from '@/styles/tokens';
import DropdownSort from './DropdownSort';
import Checkbox from 'expo-checkbox';
import { Text } from 'react-native';

const SORT_OPTIONS = ['최신순', '인기순', '가격 낮은순', '가격 높은순'];

const SearchGroup = (props: any) => {
    const { onChange } = props;
    const { openBottomSheet } = useBottomSheetStore();
    const [startDate, setStartDate] = useState<Date | null>();
    const [endDate, setEndDate] = useState<Date | null>();
    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(0);
    const [keyword, setKeyword] = useState('');
    const [selected, setSelected] = useState(SORT_OPTIONS[0]);
    const [availableOnly, setAvailableOnly] = useState(false);

    useEffect(() => {
        onChange({ status: availableOnly });
        console.log(selected);
    }, [selected, availableOnly]);

    const handleDateSelect = async () => {
        const {
            result: { startDate, endDate },
        } = await openBottomSheet('dateSelector');
        setStartDate(startDate);
        setEndDate(endDate);
        if (!(startDate && endDate)) setEndDate(startDate);
        onChange({ startDate, endDate });
    };

    const handlePriceSelect = async () => {
        const {
            result: { minPrice, maxPrice },
        } = await openBottomSheet('priceSelector');
        setMinPrice(minPrice);
        setMaxPrice(maxPrice);
        onChange({ minPrice, maxPrice });
    };

    const handleKeywordSearch = () => {
        onChange({ keyword });
    };

    const dateSelected = !!startDate && !!endDate;
    const priceSelected = !!minPrice && !!maxPrice;
    const selectedColor = Colors.brown;
    const dateLabel = dateSelected
        ? `${formatISOToDate(startDate)} ~ ${formatISOToDate(endDate)}`
        : '날짜 선택';
    const priceLabel = priceSelected ? `${minPrice} - ${maxPrice}` : '가격대';

    return (
        <View style={[Common.searchGroup, { paddingHorizontal: '4%' }]}>
            <TextInput
                label=""
                name="keyword"
                handleChangeText={setKeyword}
                placeholder="검색어를 입력해주세요"
                value={keyword}
                style={{ width: '100%', borderRadius: 50 }}
                // style={{ paddingRight: 42, marginHorizontal: 32, marginTop: 15, borderRadius: 50 }}
                returnKeyType="search"
                onSubmitEditing={handleKeywordSearch}
            />
            <Pressable
                style={Common.floatingIcon}
                onPress={handleKeywordSearch}
                hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
            >
                <SearchIcon />
            </Pressable>

            <View style={[Common.XStack, { width: '100%', marginVertical: 10 }]}>
                <View style={{ flex: 1 }}>
                    <DropDown
                        label={dateLabel}
                        icon={dateSelected ? null : <Calendar />}
                        selectedColor={!!startDate && !!endDate ? selectedColor : undefined}
                        onPress={handleDateSelect}
                        style={{ width: '100%' }}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <DropDown
                        label={priceLabel}
                        icon={priceSelected ? null : <DownArrow />}
                        selectedColor={!!minPrice && !!maxPrice ? selectedColor : undefined}
                        onPress={handlePriceSelect}
                        style={{ width: '100%' }}
                    />
                </View>
            </View>
            <View
                style={[
                    Common.XStack,
                    {
                        width: '100%',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginVertical: 5,
                    },
                ]}
            >
                <View style={[Common.XStack, { gap: 10 }]}>
                    <Checkbox
                        value={availableOnly}
                        onValueChange={setAvailableOnly}
                        hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
                    />
                    <Text>대여 가능한 물품만 보기</Text>
                </View>
                <DropdownSort
                    selected={selected}
                    setSelected={setSelected}
                    sortOptions={SORT_OPTIONS}
                />
            </View>
        </View>
    );
};

export default SearchGroup;
