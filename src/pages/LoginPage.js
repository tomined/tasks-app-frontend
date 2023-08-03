import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, Spinner, Stack, Text, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { PiBalloonFill, PiPassword } from "react-icons/pi"
import { Link, useNavigate } from 'react-router-dom';

import httpClient from '../utils/httpClient';

function LoginPage() {
    const toast = useToast()
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const changeEmail = (e) => setEmail(e.target.value)
    const changePassword = (e) => setPassword(e.target.value)

    //console.log(email,password)

    const loginUser = async () => {


        if (!email || !password) {
            setError(true)
            return;
        }

        setLoading(true)

        try {
            
            const {data} = await httpClient.post("/login",{
                email,
                password
            })
            console.log(data)

            toast({
                title: data.message,
                status: data.ok ? 'success' : 'error',
                duration: 3000,
                isClosable: true,
            })
            navigate("/")
        } catch (error) {
            console.log(error)

            toast({
                title: 'Błąd serwera',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        } finally{
            setError(false)
        }
        setLoading(false)
    }

    return (
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
                <PiBalloonFill color='#38A169' />
                Tasker
            </Heading>

            <Stack spacing={3} w='100%'>

                <FormControl isInvalid={error}>
                    <FormLabel>Email</FormLabel>
                    <Input onChange={changeEmail} placeholder='Podaj adres email' />
                    {error && <FormErrorMessage>To pole jest wymagane</FormErrorMessage>}
                </FormControl>

                <FormControl isInvalid={error}>
                    <FormLabel>Hasło</FormLabel>
                    <Input onChange={changePassword} placeholder='Podaj swoje hasło' />
                    {error && <FormErrorMessage>To pole jest wymagane</FormErrorMessage>}
                </FormControl>

                <Button
                    onClick={loginUser}
                    colorScheme='green'
                    size='lg'
                >
                    {loading ? <Spinner color='green.500' /> : 'Zaloguj'}
                </Button>

                <Text textAlign="center" mt="10px">
                    Nie masz konta?
                    <Link style={{ color: '#38A169' }} to="/register">Zarejestruj się</Link>
                </Text>

            </Stack>
        </Box>
    )
}

export default LoginPage
