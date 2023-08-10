import React, { useEffect, useState } from 'react'
import httpClient from '../utils/httpClient'
import userEvent from '@testing-library/user-event';
import { Button, Container, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import TaskCard from '../components/TaskCard';
import { deleteTask } from '../utils/deleteTask';

const HomePage = () => {

    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        getData();
        // [] wnetrze useEffecta wywoła się raz przy montowaniu komponentu
    }, [])

    const getData = async () => {
        try {
            const { data } = await httpClient.get("/dashboard");
            setUser(data);
            setTasks(data.data.tasks);
        } catch (error) {
            console.log(error);
        }
    };

    console.log(tasks);

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

    const backToLogin = () => navigate("/login");
    console.log(user);

    const handleDelete = async (taskName) => {
        const { data } = await deleteTask(taskName);
        try {
            getData();
            toast({
                title: data.message,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'Trwa usuwanie',
                status: "warning",
                duration: 3000,
                isClosable: true,
            });
        }

    };

    return (
        <Container maxW="6xl">
            <h2>{user ? user.message : "Odmowa dostepu"}</h2>
            <Button onClick={user ? logout : backToLogin} colorScheme="green" size="lg">
                {user ? "Wyloguj" : "Zaloguj"}
            </Button>

            <div>
                {tasks.map((item) => <TaskCard onDelete={() => handleDelete(item.task)} key={item.task} task={item} />)}
            </div>

        </Container>
    )

};

export default HomePage
