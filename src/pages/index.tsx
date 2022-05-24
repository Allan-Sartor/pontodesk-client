import { Flex, Button, Stack, Text, Link } from "@chakra-ui/react";
import { Input } from "../components/Form/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

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

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    await signIn(values)
  };

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center" flexDirection="column">
      <Text
        fontSize={["2xl", "3xl"]}
        fontWeight="bold"
        marginBottom="5"
      >
        Pontodesk
        <Text as="span" color="pink.500">
          .
        </Text>
      </Text>
      <Flex
        as="form"
        w="100%"
        maxWidth={360}
        bg="gray.800"
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

        <Link>
          Criar conta
        </Link>

        <Button
          type="submit"
          mt="6"
          colorScheme="pink"
          size="lg"
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}
