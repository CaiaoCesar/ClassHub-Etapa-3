import React from "react";
import { Text, Image, Pressable, PressableProps, StyleProp, ViewStyle, TextStyle, ImageStyle } from "react-native";
import { themes } from "../../global/themes";

interface ButtonProps extends PressableProps {
  iconSource?: any;
  buttonText?: string;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  iconStyle?: StyleProp<ImageStyle>;
  isSelected?: boolean;
  isLoading?: boolean; // Adicione a propriedade isLoading
}

export const Button: React.FC<ButtonProps> = ({
  iconSource,
  buttonText,
  buttonStyle,
  textStyle,
  iconStyle,
  isSelected,
  isLoading, // Adicione isLoading às props desestruturadas
  ...props
}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        buttonStyle,
        {
          backgroundColor:
            isSelected !== undefined
              ? isSelected
                ? themes.colors.verdeEscuro
                : themes.colors.branco
              : pressed
                ? themes.colors.verdeEscuro
                : themes.colors.branco,
        },
      ]}
      disabled={isLoading} // Use a propriedade isLoading para desabilitar o botão
      {...props}
    >
      {({ pressed }) => (
        <>
          {iconSource && (
            <Image
              source={iconSource}
              style={[
                iconStyle,
                {
                  tintColor:
                    isSelected !== undefined
                      ? isSelected
                        ? themes.colors.branco
                        : themes.colors.verdeEscuro
                      : pressed
                        ? themes.colors.branco
                        : themes.colors.verdeEscuro,
                },
              ]}
              resizeMode="contain"
              testID="button-icon"
            />
          )}
          {buttonText && (
            <Text
              style={[
                textStyle,
                {
                  color:
                    isSelected !== undefined
                      ? isSelected
                        ? themes.colors.branco
                        : themes.colors.verdeEscuro
                      : pressed
                        ? themes.colors.branco
                        : themes.colors.verdeEscuro,
                },
              ]}
            >
              {buttonText}
            </Text>
          )}
        </>
      )}
    </Pressable>
  );
};