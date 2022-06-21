import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select as ChakraSelect,
  useColorModeValue,
} from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";
interface SelectProps {
  name: string;
  label?: string;
  error?: FieldError;
  options: Option[];
}

type Option = {
  id: number;
  name: string;
}

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = (
  { name, label, error = null, options, ...rest }, ref
) => {
  const bg = useColorModeValue('gray.100', 'gray.900')
  const focus = useColorModeValue('green.200', 'green.500')

  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}

      <ChakraSelect
        placeholder='Selecione uma'
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
        {options.map(option => {
          return (
            <option key={option.id} value={option.name}>{option.name}</option>
          )
        })}
      </ChakraSelect>

      {!!error && (
        <FormErrorMessage>
          {error.message}
        </FormErrorMessage>
      )}


    </FormControl>
  );
};

export const Select = forwardRef(SelectBase);
