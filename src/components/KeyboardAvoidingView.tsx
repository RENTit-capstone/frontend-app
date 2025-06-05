import { Common } from '@/styles/common';
import { ReactNode } from 'react';
import { KeyboardAvoidingView as DefaultKeyboardAvoidingView, Platform } from 'react-native';
import { StyleProps } from 'react-native-reanimated';

type KeyboardAvoidingViewProps = {
    children: ReactNode;
    style?: StyleProps;
};

const KeyboardAvoidingView = (props: KeyboardAvoidingViewProps) => {
    const { children, style } = props;
    return (
        <DefaultKeyboardAvoidingView
            style={[Common.container, style]}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
        >
            {children}
        </DefaultKeyboardAvoidingView>
    );
};
export default KeyboardAvoidingView;
