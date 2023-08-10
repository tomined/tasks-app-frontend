import { Button, Card, CardBody, CardFooter, CardHeader, Heading, Text } from '@chakra-ui/react';
import React from 'react';

const TaskCard = ({task, onDelete}) => {

    console.log(task)
    return (
        <Card>
            <CardHeader>
                <Text>{task.category}</Text>
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
