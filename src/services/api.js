import PocketBase from 'pocketbase';

const URL = "http://127.0.0.1:8090"

export const getTasks = async ()=>{


    try{
        const pb = new PocketBase(`${URL}`)
        const records = await pb.collection('tasks').getFullList({
            sort: '-created',
        });
        return records
    }
    catch(err){
        console.error("error al obtener los productos: ", err)
        throw err;
    }
}

export const updateTask = async (recorId, updateTaskData)=>{
    try{
      const pb = new PocketBase(`${URL}`) 
      await pb.collection('tasks').update(recorId, updateTaskData)
    }
    catch (err){
        console.error('error al actualizar la tarea', err)
        throw err;
    }
}
export const createTask = async (data)=>{
    try {
        const pb = new PocketBase(`${URL}`)
        await pb.collection('taks').create(data)
    } catch (err) {
        console.error('error al actualizar la tarea', err)
        throw err;
    }
}