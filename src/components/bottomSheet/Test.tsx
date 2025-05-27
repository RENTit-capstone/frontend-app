import Button from '../Button';

const handlePress = () => {
    console.log('pressed');
};

const Test = () => {
    return (
        <Button type="secondary" onPress={handlePress}>
            press
        </Button>
    );
};
export default Test;
