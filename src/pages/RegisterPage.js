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
  
  function RegisterPage() {
  
    const toast = useToast()
  
  
    const [user, setUser] = useState({
      username:"",
      email:"",
      password:"",
      password2:""
    })
  
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
  
  
    const handleChange = (e) => {
       setUser({
         ...user,
         [e.target.name]:e.target.value
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
        const {data} = await httpClient.post("/register",{
          username: user.username,
          email: user.email, 
          password: user.password
        })
        toast({
          title: data.message,
          status: data.ok ? 'success' : 'error',
          duration: 3000,
          isClosable: true,
        })
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
            <FormControl isInvalid={error && !user.username}>
              <FormLabel>
                <IoLogoReddit />
                Nazwa użytkownika
              </FormLabel>
              <Input name="username" onChange={handleChange} placeholder='Podaj nazwę użytkownika' value={user.username} />
              {<FormErrorMessage>To pole jest wymagane</FormErrorMessage>}
            </FormControl>
  
            <FormControl isInvalid={error && !user.email}>
              <FormLabel>
                <PiRedditLogoDuotone />
                Email
              </FormLabel>
              <Input name="email" onChange={handleChange} placeholder='Podaj adres email' value={user.email}/>
              {<FormErrorMessage>To pole jest wymagane</FormErrorMessage>}
            </FormControl>
  
            <FormControl isInvalid={error && !user.password}>
              <FormLabel>
                <PiGitlabLogoLight />
                Hasło
              </FormLabel>
              <Input name="password" onChange={handleChange} placeholder='Podaj swoje hasło' value={user.password} />
              {<FormErrorMessage>To pole jest wymagane</FormErrorMessage>}
            </FormControl>
  
            <FormControl isInvalid={error && !user.password2}>
              <FormLabel>
                <PiGitlabLogoLight />
                Powtórz hasło
              </FormLabel>
              <Input name="password2" onChange={handleChange} placeholder='Powtórz swoje hasło' value={user.password2} />
              {<FormErrorMessage>To pole jest wymagane</FormErrorMessage>}
            </FormControl>
  
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