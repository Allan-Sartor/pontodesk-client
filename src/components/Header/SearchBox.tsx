import { Flex, Icon, Input, useColorModeValue } from "@chakra-ui/react";
import { useRef } from "react";
import { RiSearchLine } from "react-icons/ri";

// debounce -> Faz com que a busca seja feita após o usuário terminar de digitar

// ControllerComponent => permite controlar o estado do componente para
// const [search, setSearch] = useState('');
// dentro do input inserir 
// value={search}
// onChange={() => setSearch(event.target.value)}

// Uncontrolled the search input - Imperativa vs Declativa 
// searchInputRef.current.focus() (Imperativo) 
// 
// 

interface SearchBoxProps {
  showSearchBox?: boolean;
}

export function SearchBox({ showSearchBox }: SearchBoxProps) {
  const searchInputRef = useRef<HTMLInputElement>(null)

  const bg = useColorModeValue('gray.50', 'gray.800')
  const color = useColorModeValue('gray.900', 'gray.200')

  return (
    <>
      {
        showSearchBox &&
        (
          <Flex
            as="label"
            flex="1"
            py="4"
            px="6"
            ml="8"
            bg={bg}
            maxWidth={400}
            color={color}
            alignSelf="center"
            position="relative"
            borderRadius="7"
          >
            <Input
              color={color}
              variant="unstyled"
              px="4"
              mr="3"
              placeholder="Buscar chamado..."
              _placeholder={{ color }}
              ref={searchInputRef}
            />

            <Icon as={RiSearchLine} fontSize="20" />
          </Flex>
        )
      }
    </>
  );
}
