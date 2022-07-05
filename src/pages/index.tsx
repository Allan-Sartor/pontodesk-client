import { Flex, Button, Stack, Text, Link, useColorModeValue, Box } from "@chakra-ui/react";
import { Input } from "../components/Form/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"
import { useContext } from "react";
import { AuthContext } from "../services/contexts/AuthContext";
import ButtonLightOrDark from "../components/ButtonLightOrDark";
import { Logo } from "../components/Header/Logo";
import { Title } from "../components/Title";

type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória'),
})

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema)
  });
  const { signIn } = useContext(AuthContext);

  const { errors } = formState;

  const bg = useColorModeValue('gray.50', 'gray.800')
  const color = useColorModeValue('green', 'green.600')

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    await signIn(values)
  };

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center" flexDirection="column">
      <Title name="Pontodesk. | Login"/>
      <Logo
        fontsize={["3xl", "5xl"]}
        marginBottom={5}
        width={0}
      />

      <Flex
        as="form"
        w="100%"
        maxWidth={360}
        bg={bg}
        p="8" // medida chakra
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Input
            name="email"
            type="email"
            label="E-mail"
            error={errors.email}
            {...register("email")}
          />

          <Input
            name="password"
            type="password"
            label="Senha"
            error={errors.password}
            {...register("password")}
          />
        </Stack>

        <Button
          type="submit"
          mt="6"
          colorScheme="green"
          size="lg"
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>

        <Flex justify="space-between" align="flex-start">
          <Text mr={3} mt={4} color={color}>
            Não possui conta?
            <Link ml={2} href="/signup">
              Clique aqui!
            </Link>
          </Text>
        </Flex>
      </Flex>
      <Flex mt={2}>
        <ButtonLightOrDark />
      </Flex>
    </Flex>
  );
}
