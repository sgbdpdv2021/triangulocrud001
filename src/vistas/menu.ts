import { leerTeclado } from '../vistas/lecturaTeclado'

export const menuTriangulo = async () => {
    let n: number
    console.log('\n')
    console.log('1.- Crear Triángulo')
    console.log('2.- Área')
    console.log('3.- Perímetro')
    console.log('4.- Cambiar altura')
    console.log('5.- Salvar en BD')
    console.log('6.- Cargar Triángulo de la BD')
    console.log('7.- Modificar Triángulo de la BD')
    console.log('8.- Borrar Triángulo de la BD')
    console.log('9.- Mostrar Triángulo')
    console.log('10.- Listar superficies de triángulos')
    console.log('0.- SALIR')
    n = parseInt( await leerTeclado('--OPCIÓN--') )
    return n
}

