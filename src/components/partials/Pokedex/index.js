import React from 'react';
import { PokeDiv } from './styled';

const Pokedex = (props) => {

    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    let tipos = [];

    props.pokémonTypes.map((i)=>
    
        tipos.push(capitalize(i.type.name))

    )

    return (
        <PokeDiv>
            <div className="pokéSprite">
                <img className="pokéImg" src={props.pokémonSprite} alt=""/>
            </div>
            <div className="pokéInfo">
                <div>
                    <span>Altura:</span> {props.pokémonHeight/10}m
                </div>
                <div>
                    <span>Peso:</span> {props.pokémonWeight/10}kg
                </div>
                <div>
                    <span>Tipos:</span> {tipos.join(', ')}
                </div>
            </div>
        </PokeDiv>
    );
}

export default Pokedex;