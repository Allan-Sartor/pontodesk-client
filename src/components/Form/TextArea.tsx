import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea as ChakraTextArea,
  useColorModeValue,
} from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";

interface TextAreaProps {
  name: string;
  label?: string;
  error?: FieldError;
}

const TextAreaBase: ForwardRefRenderFunction<HTMLTextAreaElement, TextAreaProps> = (
  { name, label, error = null, ...rest }, ref
) => {
  const bg = useColorModeValue('gray.100', 'gray.900')
  const focus = useColorModeValue('green.200', 'green.500')

  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}

      <ChakraTextArea
        placeholder='Digite aqui...'
        name={name}
        id={name}
        size="lg"
        bgColor={bg}
        variant="filled"
        focusBorderColor={focus}
        _hover={{
          bgColor: bg,
        }}
        ref={ref}
        {...rest}
      >
      </ChakraTextArea>

      {!!error && (
        <FormErrorMessage>
          {error.message}
        </FormErrorMessage>
      )}


    </FormControl>
  );
};

export const TextArea = forwardRef(TextAreaBase);
