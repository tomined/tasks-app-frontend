import React, { useEffect, useState } from 'react'
import httpClient from './utils/httpClient'
import userEvent from '@testing-library/user-event';
import { Button, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {

    const [user, setUser] = useState(null)
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        getData()
        // [] wnetrze useEffecta wywoła się raz przy montowaniu komponentu
    }, [])

    const getData = async () => {
        try {
            const { data } = await httpClient.get("/dashboard");
            setUser(data);
        } catch (error) {
            console.log(error);
        }
    };

    const logout = async () => {
        try {
            const { data } = await httpClient.get("/logout")
            toast({
                title: data.message,
                status: "success",
                duration: 3000,
                isClosable: true,
            })
            navigate("/login")
        } catch (error) {
            console.log(error)
        }


    }

    const backToLogin= () => navigate("/login")
    console.log(user);

    return <div>
        <h2>{user ? user.message : "Odmowa dostepu"}</h2>
        <Button onClick={user ? logout : backToLogin} colorScheme="green" size="lg">
            {user ? "Wyloguj" : "Zaloguj"}
        </Button>
    </div>;
};

export default HomePage
