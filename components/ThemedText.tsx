import { Text, type TextProps } from 'react-native';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const getTextStyle = () => {
    switch (type) {
      case 'title':
        return 'text-3xl font-bold';
      case 'subtitle':
        return 'text-xl font-bold';
      case 'link':
        return 'text-base text-blue-500 underline';
      case 'defaultSemiBold':
        return 'text-base font-semibold';
      default:
        return 'text-base';
    }
  };

  return (
    <Text
      className={`text-black dark:text-white ${getTextStyle()}`}
      style={style}
      {...rest}
    />
  );
}
