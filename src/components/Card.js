import React, { useRef, useState } from "react";
import { useCart, useDispatchCart } from "./ContextReducer";
import { useNavigate } from "react-router-dom";

export default function Card(props) {
  const dispatch = useDispatchCart();
  const data = useCart();
  let priceRef = useRef();
  let foodItem = props.item;
  const options = props.options;
  const priceOptions = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(priceOptions[0]); 

  const handleAddToCart = async () => {
    let finalPrice = qty * parseInt(options[size]);

    let food = []
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;

        break;
      }
    }
    console.log(food)
    console.log(new Date())
    if (food !== []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
        console.log("Size different so simply ADD one more to the list")
        return
      }
      return
    }

    await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })
    

    await dispatch({
      type: "ADD",
      id: props.foodItem.id,
      name: props.foodItem.name,
      qty: qty,
      size: size,
      price: finalPrice,
      img: props.foodItem.img,
    });
    console.log(data);
  };

  return (
    <div>
      <div>
        <div className="card mt-3 " style={{ width: "17rem", height: "360px" }}>
          <img
            src={props.foodItem.img}
            className="card-img-top"
            alt=""
            style={{ height: "170px", objectFit: "cover" }}
          />
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>
            <div className="container w-100">
              <select
                className="m-2 h-100 bg-danger rounded"
                onChange={(e) => setQty(e.target.value)}
              >
                {Array.from(Array(6), (e, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <select
                className="m-2 h-100 bg-danger rounded"
                ref={priceRef}
                onChange={(e) => setSize(e.target.value)}
              >
                {priceOptions.map((data) => (
                  <option key={data} value={data}>
                    {data}
                  </option>
                ))}
              </select>
              <div className="fs-5 d-inline">
                ${size ? qty * parseInt(options[size]) : 0}/-
              </div>
              <hr />
              <button
                className="btn btn-danger text-white justify-center ms-2"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
