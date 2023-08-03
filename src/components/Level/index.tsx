import { useEffect } from 'react';
import { Pressable, PressableProps, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor
} from 'react-native-reanimated';

import { THEME } from '../../styles/theme';
import { styles } from './styles';

const PressableAnimated = Animated.createAnimatedComponent(Pressable);

const TYPE_COLORS = {
  EASY: THEME.COLORS.BRAND_LIGHT,
  HARD: THEME.COLORS.DANGER_LIGHT,
  MEDIUM: THEME.COLORS.WARNING_LIGHT,
}

type Props = PressableProps & {
  title: string;
  isChecked?: boolean;
  type?: keyof typeof TYPE_COLORS;
}

export function Level({ title, type = 'EASY', isChecked = false, ...rest }: Props) {
  const scale = useSharedValue(1);
  const checked = useSharedValue(1);
  const COLOR = TYPE_COLORS[type];

  const animetedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      backgroundColor: interpolateColor(
        checked.value,
        [0, 1],
        ['transparent', COLOR]
      )
    }
  })

  const animetedTextStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        checked.value,
        [0, 1],
        [COLOR, THEME.COLORS.GREY_100]
      )
    }
  })

  function onPressIn() {
    // scale.value = withTiming(1.2, { easing: Easing.bounce, duration: 700 });
    scale.value = withTiming(1.1);
  }

  function onPressOut() {
    scale.value = withTiming(1);
  }

  useEffect(() => {
    checked.value = withTiming(isChecked ? 1 : 0);
  }, [isChecked])

  return (
    <PressableAnimated
      {...rest}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[styles.container, { borderColor: COLOR }, animetedContainerStyle ]}
    >
        <Animated.Text style={[
          styles.title,
          animetedTextStyle,
        ]}>
          {title}
        </Animated.Text>
    </PressableAnimated>
  );
}
