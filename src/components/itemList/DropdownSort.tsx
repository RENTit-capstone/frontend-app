import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import DropDown from '../Dropdown';
import DownArrow from '@/assets/images/down-arrow.svg';
import { itemList } from '@/styles/components/itemList';

type DropdownSortProps = {
    sortOptions?: string[];
    selected?: string;
    setSelected?: (option: string) => void;

    filterOptions?: string[];
    filtered?: string;
    setFiltered?: (option: string) => void;
};

const DropdownSort = (props: DropdownSortProps) => {
    const { selected, setSelected, sortOptions, filterOptions, setFiltered, filtered } = props;
    const [isOpen, setIsOpen] = useState(false);
    // const [selected, setSelected] = useState(SORT_OPTIONS[0]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSort = (option: string) => {
        setSelected && setSelected(option);
        setFiltered && setFiltered(option);
        setIsOpen(false);
    };

    return (
        <View style={{ position: 'relative' }}>
            <DropDown
                label={selected || filtered || ''}
                icon={<DownArrow />}
                selectedColor={undefined}
                onPress={toggleDropdown}
                style={[
                    {
                        borderWidth: 0,
                        width: 128,
                        zIndex: 100,
                    },
                ]}
            />
            {isOpen && (
                <View
                    style={[
                        itemList.SortDropdown,
                        {
                            position: 'absolute',
                            zIndex: 1000,
                            top: 32,
                            right: 32,
                        },
                    ]}
                >
                    {sortOptions &&
                        sortOptions.map((option) => (
                            <TouchableOpacity
                                key={option}
                                onPress={() => handleSort(option)}
                                style={itemList.sortOption}
                            >
                                <Text>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    {filterOptions &&
                        filterOptions.map((option) => (
                            <TouchableOpacity
                                key={option}
                                onPress={() => handleSort(option)}
                                style={itemList.sortOption}
                            >
                                <Text>{option}</Text>
                            </TouchableOpacity>
                        ))}
                </View>
            )}
        </View>
    );
};
export default DropdownSort;
