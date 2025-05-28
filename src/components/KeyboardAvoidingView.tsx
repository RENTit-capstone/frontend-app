import { Common } from '@/styles/common';
import { ReactNode } from 'react';
import { KeyboardAvoidingView as DefaultKeyboardAvoidingView, Platform } from 'react-native';

type KeyboardAvoidingViewProps = {
    children: ReactNode;
};

const KeyboardAvoidingView = (props: KeyboardAvoidingViewProps) => {
    const { children } = props;
    return (
        <DefaultKeyboardAvoidingView
            style={Common.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
        >
            {children}
        </DefaultKeyboardAvoidingView>
    );
};
export default KeyboardAvoidingView;
