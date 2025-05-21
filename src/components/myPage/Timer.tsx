import Colors from "@/constants/Colors";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

type TimerProps = {
    resetKey: number;
    setResetKey: (state: number) => void;
}

const Timer = (props: TimerProps) => {
    const {resetKey, setResetKey} = props;
    const [isTimerRunning, setTimerRunning] = useState(true);
    const [secondsLeft, setSecondsLeft] = useState(60);

    useEffect(() => {
        setSecondsLeft(60);    
        setTimerRunning(true);   
    }, [resetKey]); 

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isTimerRunning && secondsLeft>0) {
            interval = setInterval(() => {
                setSecondsLeft((prev) => prev - 1);
            }, 1000);
        }

        if (secondsLeft===0)    setTimerRunning(false);
        return () => clearInterval(interval);
    }, [isTimerRunning, secondsLeft]);

    return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{ fontSize: 18 }}>00:{String(secondsLeft).padStart(2, '0')}</Text>
      </View>
    );
}
export default Timer;