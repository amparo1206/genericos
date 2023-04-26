function getArray(items : any []) : any [] {
    return new Array().concat(items);
}

let numberArray = getArray([5, 10, 15, 20]);
let stringArray = getArray(['Cats', 'Dogs', 'Birds'])

getArray(["string", 1, 2, 3])

// El problema del any es que se come todo sin distingir nada por lo tanto así no lo tendría que hacer, es mala práctica

function getArray1<T>(items : T[]) : T[] {
    return new Array<T>().concat(items)
}

let numberArray1 = getArray1([5, 10, 15, 20]);
let stringArray1 = getArray1(['Cats', 'Dogs', 'Birds'])

getArray1(["string", 1, 2, 3])

// Es un tipo que le llega por parámetro al que va a inferir y va a detectar de qué tipo es,
// La T es un ejemplo pero se podría llamar como quisiesemos.

function identity<T, U> (value: T, message: U) : T {
    console.log(message)
    return value
}

const value = identity<string, string>('hola', 'mesaje')
const value2 = identity<number,number>(1, 2)

//Es pasarle los tipos por parametro controlando nosotros en todo momento el tipo que es.

type ValidTypes = string | number;

function identity1<T extends ValidTypes, U> (value : T, message:U) {
    let result : ValidTypes = ''

    if(typeof value === 'number'){
        result = value + value //Aquí está ejecutando una suma
    } else if (typeof value === 'string') {
        result = value + value //Aquí está ejecutando una concatenación
    }

    console.log(message);
    return result
}

identity1<number, string>(1, 'hola')

//Solo se puede usar la resticción de tipos typeof para comprobar tipos primitivos
//string, number, bignit, boolean, function, symbol, object. Para comprobar el tipo clase
//tendría que utilizar la restricción de tipos instanceof

//**Con Interfaces y clases

interface Identity<T, U> {
    value: T
    message: U
}

const identity2: Identity<number, string> = {
    value : 1,
    message : 'Hola mundo'
}

const identity3: Identity<string, string> = {
    value : '1',
    message : 'Hola mundo'
}

const identity4: Identity<boolean, string> = {
    value : true,
    message : 'Hola mundo'
}

interface ProcessIdentity<T, U> {
    (value: T, message: U) : T
}

const process : ProcessIdentity<number, string> = (value, message) => {
    console.log(message)
    return value
}

process(1, 'hola mundo')

interface ProcessIdentity1<T, U> {
    value: T;
    message: U;
    process(): T;
}

class ProcessIdentity2<X, Y> implements ProcessIdentity1<X, Y> {
    value: X
    message: Y;

    constructor(value: X, message: Y) {
        this.value = value
        this.message = message
    }

    process():X {
        return this.value
    }
}

const process1 = new ProcessIdentity2<number, boolean>(1, false);