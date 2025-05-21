import Colors from "@/constants/Colors";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

type TimerProps = {
    isTimerRunning: boolean;
    setTimerRunning: (state: boolean) => void;
}

const Timer = (props: TimerProps) => {
    const {isTimerRunning, setTimerRunning} = props;
    const [secondsLeft, setSecondsLeft] = useState(60);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (!isTimerRunning)    setSecondsLeft(60);

        if (isTimerRunning && secondsLeft>0) {
            interval = setInterval(() => {
                setSecondsLeft((prev) => prev - 1);
            }, 1000);
        }

        if (secondsLeft===0)    setTimerRunning(false);
        return () => clearInterval(interval);
    }, [isTimerRunning, secondsLeft]);

    const startTimer = () => {
        setSecondsLeft(60);
        setTimerRunning(true);
    }

    return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{ fontSize: 18 }}>00:{String(secondsLeft).padStart(2, '0')}</Text>
      </View>
    );
}
export default Timer;