import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. ייבוא ה-Hook לניווט
import { PokemonArr } from '../My_Components/PokemonArr';
import Img from '../My_Components/img';

const PokemonInfo = () => {
    return (
        <>
        <Img fileName={PokemonArr[0].image} /><br></br>
        </>
    // <div className="present">
    //   {products.map(obj1 => (
    //     <nav key={obj1.code} className="imageDesc">
    //       <Img fileName={obj1.image} /><br></br>
    //       {obj1.description}<br />
    //       {obj1.price} {"₪"}<br />
    //       <button onClick={() => addToCart(obj1)}>
    //         הוסף לעגלת הקניות
    //       </button>
    //     </nav>
    //   ))}
    // </div>
     );
}

export default PokemonInfo;