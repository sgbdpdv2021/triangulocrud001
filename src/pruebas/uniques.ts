import mongoose from 'mongoose';
import {Schema, model } from 'mongoose'

// Atención con el modificador useCreateIndex: true 
// se crea un índice para el campo name llamado name_1


export const connect = async () => {
    try{
        await mongoose.connect('mongodb://localhost/test', {
            useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
        })
    }catch(err){
        throw 'Error: '+ err
    }
}

export const disconnect = async () => {
    await mongoose.disconnect();
}

// Empieza el ejemplo:
const schema = new Schema({
    name: { type: String, unique: true }
  });
const Model = model('Test', schema);


const main = async () => {
    
    try {
        await connect()
 
        let oSchema = new Model({ name: 'Val2' })
        await oSchema.save()
            .then( () => {
                console.log('Correcto')
            })
            .catch( (err) => {
                console.log('Error al salvar: '+err)  // concatenando con una cadena solo sale el mensaje
            })
    
        await disconnect()


    }catch(err){
        console.log(err)
    }

}
main()
