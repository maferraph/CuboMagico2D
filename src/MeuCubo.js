import styles from './MeuCubo.module.css'
import { FaArrowAltCircleDown , FaArrowAltCircleLeft , FaArrowAltCircleRight , FaArrowAltCircleUp } from 'react-icons/fa'
import { Traducoes } from './Traducoes' ;

function MeuCubo( props ){

    //função para retornar o nome da face
    function RetornaNomeFace(){
        // face --> F=frontal' , T=traseiro , E=esquerda , D=direita , S=superior , I=inferior
        if( props.face === "F"){ return Traducoes[ props.idioma ].meucubo_frontal ; }
        else if( props.face === "T"){ return Traducoes[ props.idioma ].meucubo_traseiro ; }
        else if( props.face === "E"){ return Traducoes[ props.idioma ].meucubo_esquerda ; }
        else if( props.face === "D"){ return Traducoes[ props.idioma ].meucubo_direita ; }
        else if( props.face === "S"){ return Traducoes[ props.idioma ].meucubo_superior ; }
        else if( props.face === "I"){ return Traducoes[ props.idioma ].meucubo_inferior ; }
    }

    //função para retornar a cor da célula
    function RetornaCorCelula( celula ){
        for( var i=0 ; i < props.cubo.length ; i++ ){
            if( props.cubo[i][0] === props.face + celula ){
                return props.cubo[i][1] ;
            }
        }
    }

    //função para trocar o estilo CSS da célula e assim trocar a cor
    function RetornaCSSCorCelula( cor ){
        // A=amarelo, B=branco, V=vermelho, L=laranja, G=verde, Z=azul
        if( cor === "A"){ return styles.celula_amarelo; }
        else if( cor === "B"){ return styles.celula_branco; }
        else if( cor === "V"){ return styles.celula_vermelho; }
        else if( cor === "L"){ return styles.celula_laranja; }
        else if( cor === "G"){ return styles.celula_verde; }
        else if( cor === "Z"){ return styles.celula_azul; }
    }

    //função para retornar o nome da face
    function RetornaCorFace(){
        if( props.face === "F"){ return styles.face_frontal; }
        else if( props.face === "T"){ return styles.face_traseiro; }
        else if( props.face === "E"){ return styles.face_esquerda; }
        else if( props.face === "D"){ return styles.face_direita; }
        else if( props.face === "S"){ return styles.face_superior; }
        else if( props.face === "I"){ return styles.face_inferior; }
    }

    return( 
        <table className={RetornaCorFace()}>
            <thead>
                <tr>
                    <td className={styles.tituloface} colSpan={5}><p className={styles.face}>{RetornaNomeFace()}</p></td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>&ensp;</td>
                    <td><a id={"a" + props.face + "AD"} onClick={() => props.movecel( props.face , "A" , "D" )}><FaArrowAltCircleDown /></a></td>
                    <td><a id={"a" + props.face + "BD"} onClick={() => props.movecel( props.face , "B" , "D" )}><FaArrowAltCircleDown /></a></td>
                    <td><a id={"a" + props.face + "CD"} onClick={() => props.movecel( props.face , "C" , "D" )}><FaArrowAltCircleDown /></a></td>
                    <td>&ensp;</td>
                </tr>
                <tr>
                    <td><a id={"a" + props.face + "1R"} onClick={() => props.movecel( props.face , "1" , "R" )}><FaArrowAltCircleRight /></a></td>
                    <td><button id={"bt" + props.face + "A1"} className={ RetornaCSSCorCelula( RetornaCorCelula( "A1" ) ) } ></button></td>
                    <td><button id={"bt" + props.face + "B1"} className={ RetornaCSSCorCelula( RetornaCorCelula( "B1" ) ) } ></button></td>
                    <td><button id={"bt" + props.face + "C1"} className={ RetornaCSSCorCelula( RetornaCorCelula( "C1" ) ) } ></button></td>
                    <td><a id={"a" + props.face + "1L"} onClick={() => props.movecel( props.face , "1" , "L" )}><FaArrowAltCircleLeft /></a></td>
                </tr>
                <tr>
                    <td><a id={"a" + props.face + "2R"} onClick={() => props.movecel( props.face , "2" , "R" )}><FaArrowAltCircleRight /></a></td>
                    <td><button id={"bt" + props.face + "A2"} className={ RetornaCSSCorCelula( RetornaCorCelula( "A2" ) ) } ></button></td>
                    <td><button id={"bt" + props.face + "B2"} className={ RetornaCSSCorCelula( RetornaCorCelula( "B2" ) ) } ></button></td>
                    <td><button id={"bt" + props.face + "C2"} className={ RetornaCSSCorCelula( RetornaCorCelula( "C2" ) ) } ></button></td>
                    <td><a id={"a" + props.face + "2L"} onClick={() => props.movecel( props.face , "2" , "L" )}><FaArrowAltCircleLeft /></a></td>
                </tr>
                <tr>
                    <td><a id={"a" + props.face + "3R"} onClick={() => props.movecel( props.face , "3" , "R" )}><FaArrowAltCircleRight /></a></td>
                    <td><button id={"bt" + props.face + "A3"} className={ RetornaCSSCorCelula( RetornaCorCelula( "A3" ) ) } ></button></td>
                    <td><button id={"bt" + props.face + "B3"} className={ RetornaCSSCorCelula( RetornaCorCelula( "B3" ) ) } ></button></td>
                    <td><button id={"bt" + props.face + "C3"} className={ RetornaCSSCorCelula( RetornaCorCelula( "C3" ) ) } ></button></td>
                    <td><a id={"a" + props.face + "3L"} onClick={() => props.movecel( props.face , "3" , "L" )}><FaArrowAltCircleLeft /></a></td>
                </tr>
              <tr>
                  <td>&ensp;</td>
                    <td><a id={"a" + props.face + "AU"} onClick={() => props.movecel( props.face , "A" , "U" )}><FaArrowAltCircleUp /></a></td>
                    <td><a id={"a" + props.face + "BU"} onClick={() => props.movecel( props.face , "B" , "U" )}><FaArrowAltCircleUp /></a></td>
                    <td><a id={"a" + props.face + "CU"} onClick={() => props.movecel( props.face , "C" , "U" )}><FaArrowAltCircleUp /></a></td>
                    <td>&ensp;</td>
                </tr>
            </tbody>
        </table>
    );
}
  
export default MeuCubo;