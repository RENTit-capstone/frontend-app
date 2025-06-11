import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DropDown from '../Dropdown';
import DownArrow from '@/assets/images/down-arrow.svg';
import { itemList } from '@/styles/components/itemList';
import { FilterOption, SortOption } from '@/types/types';

export type DropdownSortProps<T> = {
    options: T[];
    selected: T;
    setSelected: (option: T) => void;
    getLabel: (option: T) => string;
};

const DropdownSort = <T,>({ options, selected, setSelected, getLabel }: DropdownSortProps<T>) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);
    const handleSelect = (option: T) => {
        setSelected(option);
        setIsOpen(false);
    };

    return (
        <View style={{ position: 'relative' }}>
            <DropDown
                label={getLabel(selected)}
                icon={<DownArrow />}
                onPress={toggleDropdown}
                selectedColor="#111111"
                style={{
                    borderWidth: 0,
                    width: 128,
                    zIndex: 100,
                }}
            />
            {isOpen && (
                <View
                    style={[
                        itemList.SortDropdown,
                        {
                            position: 'absolute',
                            zIndex: 1000,
                            top: 32,
                            right: 0,
                            backgroundColor: 'white',
                            borderRadius: 8,
                        },
                    ]}
                >
                    {options.map((option, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleSelect(option)}
                            style={itemList.sortOption}
                        >
                            <Text>{getLabel(option)}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
};

export default DropdownSort;
