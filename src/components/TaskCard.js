import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Heading, Text } from '@chakra-ui/react';
import React from 'react';

const TaskCard = ({ task, onDelete }) => {

    const categoryTheme = () => {
        switch (task.category) {
            case "frontend":
                return "pink";
            case "backend":
                return "cyan"
            case "testy":
                return "yellow"
            default:
                return "green"
        }
    }

    return (
        <Card>
            <CardHeader>
                <Badge padding={1} variant='solid' colorScheme={categoryTheme()}>
                    {task.category}
                </Badge>
                <Heading size='md'> {task.task}</Heading>
            </CardHeader>
            <CardBody>
                <Text>{task.description}</Text>
                <Text>{task.email_author}</Text>
            </CardBody>
            <CardFooter>
                <Button onClick={onDelete} colorScheme='red'>Usuń zadanie</Button>
            </CardFooter>
        </Card>
    );
};

export default TaskCard
