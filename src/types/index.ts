//Types asi se le llama a la descripcion que damos del objeto 
export type Guitar = {
    // interface Guitar{//Esto es un interface y es muy similar el funcionamiento al que tiene el type 

    id: number,
    name: string,
    image: string,
    description: string,
    price: number,
}

//Si requieres mas información puedes crear otro objeto que solo herede la informacion del original 
export type CartItem = Guitar & {
    // export interface CartItem extends Guitar & { Se hace de esta forma en caso de ser una interface es posible que herede de un type 

    quantity: number
} 
//Con esto permitimos que el elemento pueda cambiar de valor facilmente 
// export type GuitarID=Guitar['id']


//Utility Types 
//Pick permite elegir algunos elementos de otro type 
// export type CartItem =Pick<Guitar,'id'|'name'|'price'>&{ elementos extras que se le deben añadir  quantity:number}

//Omit permiteeliminar ciertos atributos del objeto o omitirlos 
// export type CartItem =Omit<Guitar,'id'|'name'|'price'>&{  quantity:number}
