import mongoose from 'mongoose';
/*
Debemos instalar mongoose con npm i mongoose
El nombre de la base de datos en local y con el puerto por defecto será
en este caso "geometria"
Las funciones que exporto la usaré 
en el import con el mismo nombre y con {}

ATENCIÓN:
// Atención con el modificador useCreateIndex: true 
// se crea un índice único para el campo que tenga en el Schema la opción unique
*/

export const connect = async () => {
        await mongoose.connect('mongodb://localhost/geometria', {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true,   // Para que cree el índice único asociado al campo unique
            useFindAndModify: false  // para usar findOneAndDelete y findAndModify
        })
        .catch( (error) => {throw 'Error: '+ error}
        )
}

export const disconnect = async () => {
    try {
        await mongoose.disconnect();
    }
    catch (error){
        throw 'Error: ' + error;
    }
}

