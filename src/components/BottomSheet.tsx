import useBottomSheetStore from '@/stores/useBottomSheetStore';
import BottomScrollSheet from './BottomScrollSheet';
import DateSelectorModal from './items/DateSelectorModal';
import { View } from 'react-native';
import PolicyModal from './items/PolicyModal';
import ButtonBar from './ButtonBar';
import Button from './Button';
import useDateSelectorStore from '@/stores/useDateSelectorStore';
import usePolicyStore from '@/stores/usePolicyStore';

const BottomSheet = () => {
    const { visible, type, props, close } = useBottomSheetStore();
    const { closeDateSelector } = useDateSelectorStore();
    const { closePolicy } = usePolicyStore();

    if (!visible) return null;

    return (
        <>
            <BottomScrollSheet snapPointList={['65%']} style={{ backgroundColor: '#fff' }}>
                <View>
                    {type === 'dateSelector' && <DateSelectorModal {...props} onClose={close} />}
                    {type === 'policyConsenting' && <PolicyModal {...props} onClose={close} />}
                </View>
            </BottomScrollSheet>
            <ButtonBar>
                {type === 'dateSelector' && (
                    <Button type="primary" onPress={() => closeDateSelector(true)}>
                        저장
                    </Button>
                )}
                {type === 'policyConsenting' && (
                    <Button type="primary" onPress={() => closePolicy(true)}>
                        저장
                    </Button>
                )}
            </ButtonBar>
        </>
    );
};
export default BottomSheet;
