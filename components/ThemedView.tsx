import { View, type ViewProps } from 'react-native';
import { useTheme } from '../context/theme/ThemeContext';

export type ThemedViewProps = ViewProps;

export function ThemedView({ style, ...otherProps }: ThemedViewProps) {
  const { theme } = useTheme();
  return <View style={style} {...otherProps} />;
}
