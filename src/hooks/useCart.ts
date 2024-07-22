import { useState, Fragment, useEffect, useMemo } from "react";
import { db } from "../data/db";
import type { Guitar, CartItem } from "../types";
export default function useCart() {
  const initialCart = (): CartItem[] => {
    const localStorageCart = localStorage.getItem("cart");
    //Si tiene algun contenido local storage se van a obtener los valores que contiene
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };
  //No se pueden colocar hooks dentro de funciones
  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);
  const MAX_ITEMS = 5,
    MIN_ITEMS = 1;
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  function addToCart(item: Guitar) {
    //Verificamos si el elemento existe
    //si un elemento no existe findIndex arroja -1
    const itemExist = cart.findIndex((guit) => guit.id === item.id);
    if (itemExist >= 0) {
      if (cart[itemExist].quantity >= MAX_ITEMS) return;
      //Aumentamos la cantidad de guitarras sin alterar el arreglo original
      const updatedCart = [...cart];
      updatedCart[itemExist].quantity++;
      setCart(updatedCart);
    } else {
      const newItem: CartItem = { ...item, quantity: 1 }
      setCart((prevCart) => [...prevCart, newItem]);
    }
  }
  function removeFromCart(id: Guitar['id']) {
    //Filtramos todo lo que sea diferentes del id que eliminamos para solo quedarnos con eso valores
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
  }
  function increaseQuantity(id: Guitar['id']) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
  }
  function decreaseQuantity(id: Guitar['id']) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
  }
  function clearCart() {
    setCart([]);
  }
  //State Derivado
  //Codigo sin useMemo
  // const isEmpty = () => cart.length === 0;
  // //Obtenemos el total de todo el carrito
  // const cartTotal=() => cart.reduce((total,item)=> total + (item.quantity * item.price),0)

  //No siempre se recomienda utilizar useMemo
  //useMemo hace que si no ha pasado ningun cambio en el codigo que contiene hace que este no se ejecute
  const isEmpty = useMemo(() => cart.length === 0, [cart]); //Solo realizara el cabmio si cart cambia
  //Obtenemos el total de todo el carrito
  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.quantity * item.price, 0),
    [cart]
  );

  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    increaseQuantity,
    clearCart,
    isEmpty,
    cartTotal
  };
}
