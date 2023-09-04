import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    FormLabel,
    Toast
} from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { Button, Input } from "@chakra-ui/react";
import FormField from '../components/FormField'
import { Select } from '@chakra-ui/react'
import { UserContext } from '../context/UserContext';
import httpClient from '../utils/httpClient';
import { useToast } from '@chakra-ui/react';

export function DrawerComponent({callbackData}) {

    const { user } = useContext(UserContext)
    const toast = useToast();

    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const [newTask, setNewTask] = useState({
        task: "",
        description: "",
        category: "",
        urgency: ""
    });

    const handleChange = (e) => {
        setNewTask({
            ...newTask,
            [e.target.name]: e.target.value
        });
    };

    const addTask = async () => {
        const taskToSend = {
            ...newTask,
            email_author: user,
            email_Employee: "",
            date: new Date()
        }

        if (
            !newTask.task ||
            !newTask.description ||
            !newTask.category ||
            !newTask.urgency
          ) {
            toast({
              title: "Uzupełnij wszystkie pola",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
            return;
          }

        try {
            const { data } = await httpClient.post("/create-task", taskToSend)
            await callbackData()
            onClose()
            toast({
                title: data.message,
                status: data.ok ? "success" : "error",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Zadanie już istnieje",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }

    }

    return (
        <>
            <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
                Open
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Dodaj zadanie</DrawerHeader>

                    <DrawerBody>

                        <FormField
                            //isInvalid={error && !user.username}
                            label="Zadanie"
                            name="task"
                            placeholder="Podaj nazwę zadania"
                            onChange={handleChange}
                            value={newTask.task}
                        />

                        <FormField
                            //isInvalid={error && !user.username}
                            label="Opis"
                            name="description"
                            placeholder="Podaj opis zadania"
                            onChange={handleChange}
                            value={newTask.description}
                        />

                        <FormLabel>
                            Kategoria
                        </FormLabel>
                        <Select onChange={handleChange} name="category" placeholder='Wybierz kategorie'>
                            <option value='testy'>Testy</option>
                            <option value='frontend'>Frontend</option>
                            <option value='backend'>Backend</option>
                        </Select>

                        <FormLabel>
                            Priorytet
                        </FormLabel>
                        <Select onChange={handleChange} name="urgency" placeholder='Wybierz priorytet'>
                            <option value={1}>Niski</option>
                            <option value={2}>Średni</option>
                            <option value={3}>Wysoki</option>
                        </Select>

                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Anuluj
                        </Button>
                        <Button onClick={addTask} colorScheme='green'>Dodaj</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}