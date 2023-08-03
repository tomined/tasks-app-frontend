import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    Spinner,
    Stack,
    useToast
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { IoLogoReddit, IoLogoUsd } from 'react-icons/io'
import { PiGitlabLogoLight, PiRedditLogoDuotone } from 'react-icons/pi'
import httpClient from '../utils/httpClient'
import FormField from '../components/FormField'
import { useNavigate } from 'react-router'

function RegisterPage() {

    const toast = useToast()
    const navigate = useNavigate()


    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        password2: ""
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)


    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }


    const registerUser = async () => {

        if (!user.username || !user.email || !user.password || !user.password2) {
            setError(true);
            return;
        }

        if (user.password !== user.password2) {
            toast({
                title: "Hasła nie są idenczyczne",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }


        setLoading(true)
        try {
            const { data } = await httpClient.post("/register", {
                username: user.username,
                email: user.email,
                password: user.password
            })

            const { data: loginData } = await httpClient.post("/login", {
                email: user.email,
                password: user.password,
            })

            toast({
                title: data.message,
                status: data.ok ? "success" : "error",
                duration: 3000,
                isClosable: true,
            });

            toast({
                title: loginData.message,
                status: data.ok ? "success" : "error",
                duration: 3000,
                isClosable: true,
            });

            navigate('/')

        } catch (error) {
            console.log(error)
            toast({
                title: "Błąd servera",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        } finally {
            setLoading(false)
        }

    }
    return (
        <div>
            <Box
                p={4}
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh"
                maxWidth="400px"
                mx="auto"
                flexDirection="column"
            >
                <Heading
                    display="flex"
                    alignItems="center"
                    fontSize="50px"
                    mb="30px"
                >
                    <IoLogoUsd color="#38A169" />
                    Register
                </Heading>

                <Stack spacing={3} w="100%">

                    <FormField
                        isInvalid={error && !user.username}
                        label="Nazwa uzytkownika"
                        name="username"
                        placeholder="Podaj nazwę uzytkownika"
                        onChange={handleChange}
                        value={user.username}
                    />

                    <FormField
                        isInvalid={error && !user.email}
                        label="Email"
                        name="email"
                        placeholder="Podaj adres email"
                        onChange={handleChange}
                        value={user.email}
                    />

                    <FormField
                        isInvalid={error && !user.password}
                        label="Hasło"
                        name="password"
                        placeholder="Podaj hasło"
                        onChange={handleChange}
                        value={user.password}
                    />

                    <FormField
                        isInvalid={error && !user.password2}
                        label="Powtórz hasło"
                        name="password2"
                        placeholder="Ponownie wprowadz hasło"
                        onChange={handleChange}
                        value={user.password2}
                    />

                    <Button
                        onClick={registerUser}
                        size="lg"
                        colorScheme='green'>
                        {loading ? <Spinner color='white.500' /> : 'Zarejestruj się'}
                    </Button>

                </Stack>

            </Box>
        </div>
    )
}
export default RegisterPage