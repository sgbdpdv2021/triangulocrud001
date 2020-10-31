import { menuTriangulo } from './vistas/menu'
import { leerTeclado } from './vistas/lecturaTeclado'
import { Triangulo, Triangulos, tTriangulo} from './model/Triangulo'
import { connect, disconnect } from './database/database'

const main = async () => {
    let n: number
    let query: any

    let nombre: string, base: number, altura: number, lado1: number, lado2: number
    let triangulo: Triangulo = new Triangulo("",0,0,0)

    // await connect()

    do {
        n = await menuTriangulo()

        switch(n){
            case 1:
                nombre = await leerTeclado('Introduzca el nombre único del triángulo')
                base =  parseInt( await leerTeclado('Introduzca la base del triángulo'))
                altura =  parseInt( await leerTeclado('Introduzca la altura del triángulo'))
                lado1 =  parseInt( await leerTeclado('Introduzca otro lado del triángulo'))
                lado2 =  parseInt( await leerTeclado('Introduzca el último lado del triángulo'))
                triangulo = new Triangulo(nombre, base, lado1, lado2)
                try {
                    triangulo.altura = altura
                }catch(error){
                    console.log(error)
                    triangulo = new Triangulo("",0,0,0)
                }
                break
            case 2:
                try{
                    let area = triangulo.area()
                    console.log(`Área del triángulo= ${area} cm2`)
                }catch (e){
                    console.log("No ha entrado en la opción 1: " + e)
                }
                break
            case 3:
                try{
                    let perimetro = triangulo.perimetro()
                    console.log(`Perímetro del triángulo= ${perimetro} cm`)
                }catch (e){
                    console.log("No ha entrado en la opción 1: " + e)
                }
                break
            case 4:
                altura =  parseInt( await leerTeclado('Introduzca la altura del triángulo'))
                triangulo.altura = altura
                break
            case 5:
                await connect()
                const dSchema = {
                    _nombre: triangulo.nombre,
                    _base: triangulo.base,
                    _lado2: triangulo.lado2,
                    _lado3: triangulo.lado3,
                    _altura: triangulo.altura
                }
                const oSchema = new Triangulos(dSchema)
                // Controlamos el error de validación
                // Hay que hacer el control con then y catch 
                // Con el callback de save salta a la siguiente instrucción 
                // mientras se resuelve el callback y se desconecta y sigue el switch


                await oSchema.save()
                .then( (doc) => console.log('Salvado Correctamente: '+ doc) )
                .catch( (err: any) => console.log('Error: '+ err)) // concatenando con cadena muestra mensaje

        /*  
        ESTA FORMA NO VALE EN ESTE CASO PORQUE SE EJECUTARÍAN LAS SIGUIENTES INSTRUCCIONES 
        ANTES DE LA VALIDACIÓN, en concreto disconnect

                await oSchema.save( (error, doc) => {
                    if(error) console.log('error: ' + error)
                    if (doc == null) console.log('no salvado')
                    else console.log('salvado')
                })
*/
                await disconnect()
                break
            case 6:
                await connect()
                nombre = await leerTeclado('Introduzca el nombre único del triángulo')
/*
DOS FORMAS DE HACERLO EN LA SEGUNDA RECIBO EL DOCUMENTO EN EL CALLBACK
                query = await Triangulos.findOne( {_nombre: nombre} )
                if (query === null){
                    console.log('No existe')
                }else{
                    triangulo = 
                        new Triangulo(query._nombre, query._base, query._lado2, query._lado3)
                    triangulo.altura = query._altura  
                }

*/
                await Triangulos.findOne( {_nombre: nombre}, 
                    (error, doc: any) => {
                        if(error) console.log(error)
                        else{
                            if (doc == null) console.log('No existe')
                            else {
                                console.log('Existe: '+ doc)
                                triangulo = 
                                    new Triangulo(doc._nombre, doc._base, doc._lado2, doc._lado3)
                                triangulo.altura = doc._altura  
                            }
                        }
                    } )
                await disconnect()
                break
            case 7:
                await connect()
                // Controlamos el error de validación
                // Recordar que hay que poner la opción useFindAndModify: false
                await Triangulos.findOneAndUpdate( 
                    { _nombre: triangulo.nombre }, 
                    {
                        _nombre: triangulo.nombre,
                        _base: triangulo.base,
                        _lado2: triangulo.lado2,
                        _lado3: triangulo.lado3,
                        _altura: triangulo.altura
                    },
                    {
                        runValidators: true // para que se ejecuten las validaciones del Schema
                    }  
                )                
                .then(() => console.log('Modificado Correctamente') )
                .catch( (err) => console.log('Error: '+err)) // concatenando con cadena muestra mensaje
                await disconnect()
                break
            case 8:
                await connect()
                await Triangulos.findOneAndDelete(
                    { _nombre: triangulo.nombre }, 
                    (err: any, doc) => {
                        if(err) console.log(err)
                        else{
                            if (doc == null) console.log(`No encontrado`)
                            else console.log('Borrado correcto: '+ doc)
                        }
                    })
                await disconnect()
                break
            case 9:
                console.log(`Nombre: ${triangulo.nombre}`)
                console.log(`Base: ${triangulo.base}`)
                console.log(`Altura: ${triangulo.altura}`)
                console.log(`Lado 2: ${triangulo.lado2}`)
                console.log(`Lado 3: ${triangulo.lado3}`)                               
                break
            case 10:
                await connect()
                let tmpTriangulo: Triangulo
                let dTriangulo: tTriangulo
                query =  await Triangulos.find( {} )
                for (dTriangulo of query){
                    tmpTriangulo = 
                        new Triangulo(dTriangulo._nombre, dTriangulo._base, 
                                dTriangulo._lado2, dTriangulo._lado3)
                    tmpTriangulo.altura = dTriangulo._altura 
                    console.log(`Triángulo ${tmpTriangulo.nombre} Área: ${tmpTriangulo.area()}`)
                }
                await disconnect()                          
                break
            case 0:
                console.log('\n--ADIÓS--')
                break
            default:
                console.log("Opción incorrecta")
                break
        }
    }while (n != 0)
}
main()