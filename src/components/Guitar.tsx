import type { Guitar } from "../types"
    
type GuitarProps = {
    guitar: Guitar, addToCart: (item: Guitar) => void
}
//Primera forma de evitar los eany en typescript 
// export default function Guitar({guitar,addToCart}:{guitar:Guitar, addToCart:(item:Guitar)=>void}) {
//Evitando el any manteniendo la logica separada 
export default function Guitar({ guitar, addToCart }: GuitarProps) {

    const { description, image, name, price } = guitar
    // const handleClick=(guitar) => {
    //     //Vamos agregando al carrito una nueva guitarra copiando el cart para que no se pierda el valor anterior 
    //  setCart(prevCart=> [...prevCart,guitar])
    // }
    return (
        <div className="col-md-6 col-lg-4 my-4 row align-items-center">
            <div className="col-4">
                <img className="img-fluid" src={`/img/${image}.jpg`} alt="imagen guitarra" />
            </div>
            <div className="col-8">
                <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
                <p>{description}</p>
                <p className="fw-black text-primary fs-3">${price}</p>
                <button
                    type="button"
                    className="btn btn-dark w-100"
                    onClick={() => addToCart(guitar)}
                >Agregar al Carrito</button>
            </div>
        </div>
    )
}