import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { Input } from "../../components/Form/Input";

import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "../../services/api";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import Card from "../../components/Card";
import { Select } from "../../components/Form/Select";
import { TextArea } from "../../components/Form/TextArea";

type CreateCallFormData = {
  title: string;
  priority_level: string;
  anydesk_number: string;
  description: string;
  // image_url: string;
  // call_status: boolean;
};

const createCallFormSchema = yup.object().shape({
  title: yup.string().required("Título obrigatório"),
  priority_level: yup.string().required('Selecione uma opção'),
  anydesk_number: yup.string().required("Código obrigatório").max(9, "O código precisa ter 9 caracteres"),
  description: yup.string().required()
});

const levels = [
  {
    id: 1,
    name: "Baixa"
  },
  {
    id: 2,
    name: "Média"
  },
  {
    id: 3,
    name: "Alta"
  }
]

export default function CreateCall() {
  const Router = useRouter();
  const toast = useToast();
  
  const bg = useColorModeValue('gray.50', 'gray.800');
  
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createCallFormSchema),
  });
  const { errors } = formState;

  async function handleCreateCallForUser({ 
    title, 
    priority_level, 
    anydesk_number, 
    description
  }: CreateCallFormData) {
    let image_url = 'image.jpg'
    let call_status = true

    const callData = { title, priority_level, anydesk_number, description, image_url, call_status};

    try {
      await api.post('calls', callData)

      toast({
        title: 'Chamado criado com sucesso!',
        position: 'top-right',
        status: 'success',
        duration: 2000, // 2 seconds
        isClosable: true
      })

      setTimeout(() => { Router.push('/calls') }, 1000); // delay 1 second

    } catch (error) {
      toast({
        title: 'Não foi possível criar seu chamado!',
        position: 'top-right',
        status: 'error',
        duration: 2000, // 2 seconds
        isClosable: true
      })
    }
  }


  return (
    <Card>
      <Box as="form"
        flex="1"
        borderRadius={8}
        bg={bg}
        p={["6", "8"]}
        onSubmit={handleSubmit(handleCreateCallForUser)}
      >
        <Heading size="lg" fontWeight="normal">
          Criar chamado
        </Heading>

        <Divider my="6" borderColor="gray.700" />

        <VStack spacing="8">
          <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
            <Input
              name="title"
              type="text"
              label="Titulo"
              error={errors.title}
              {...register("title")}
            />

            <Input
              name="anydesk_number"
              type="number"
              label="Número do anydesk"
              error={errors.anydesk_number}
              {...register("anydesk_number")}
            />

            <Select
              name="priority_level"
              label="Nivel de prioridade"
              error={errors.priority_level}
              options={levels}
              ref={register("priority_level")}
              {...register("priority_level")}
            />
          </SimpleGrid>

          <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
            <TextArea
              name="description"
              label="Descrição"
              error={errors.description}
              {...register("description")}
            />
          </SimpleGrid>
        </VStack>

        <Flex mt="8" justify="flex-end">
          <HStack spacing="4">
            <Link href="/calls">
              <Button as="a" colorScheme="gray">
                Cancelar
              </Button>
            </Link>
            <Button colorScheme="green" type="submit" isLoading={formState.isSubmitting}>Salvar</Button>
          </HStack>
        </Flex>
      </Box>
    </Card>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { ['pontodesk.token']: token } = parseCookies(context)

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}