import httpClient from "./httpClient"

export const deleteTask = async (task) => {
    try {
        const response = await httpClient.post('/delete-task',{task})
        return response;
    } catch (error) {
        console.log(error)
        return error;
    }
}