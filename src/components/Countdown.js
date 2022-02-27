import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { colors } from '../utils/colors';
import { fontSizes, spacing } from '../utils/sizes';

const minutesToMilis = (min) => min * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({ minutes = 0.1, isPaused, onProgress, onEnd }) => {
  const interval = React.useRef(null);

  const [milis, setMilis] = useState(minutesToMilis(minutes));

  const countDown = () => {
    setMilis((time) => {
      if (time === 0) {
        //do more stuff here
        clearInterval(interval.current);
        return time;
      }

      const timeLeft = time - 1000;

      return timeLeft;
    });
  };

  useEffect(() => {
    setMilis(minutesToMilis(minutes));
  }, [minutes]);

  useEffect(() => {
    onProgress(milis / minutesToMilis(minutes));

    if (milis === 0) {
      onEnd();
    }
  }, [milis]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }

    interval.current = setInterval(countDown, 1000);

    return () => clearInterval(interval.current);
  }, [isPaused]);

  const minute = Math.floor(milis / 1000 / 60) % 60;
  const seconds = Math.floor(milis / 1000) % 60;

  return (
    <Text style={styles.text}>
      {formatTime(minute)}: {formatTime(seconds)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    color: colors.white,
    padding: spacing.lg,
    backgroundColor: 'rgba(94, 132, 226, 0.3)',
  },
});
