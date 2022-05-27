import React , { useState , useEffect } from 'react';
import { FaFacebook , FaGithub , FaLinkedin , FaTwitterSquare , FaInstagram } from 'react-icons/fa'
import { SiGmail } from "react-icons/si";
import MeuCubo from './MeuCubo';
import styles from './App.module.css';
import Cubo3D from './Cubo3D';
import cmlogo from './cm.png';
import flag_en from './en.png';
import flag_ptbr from './ptbr.png' ;
import { Traducoes } from './Traducoes' ;

//variáveis globais para o temporizador do embaralhador
var meu_timer_embaralhador = false ;
var meu_timer_temporizador = false ;
var numero_vezes_timer = 0 ;
var id_temporizador = 0 ;

function App(){
    //define array com condição inicial das cores do cubo mágico
    //Faces: F=frontal, T=traseira, E=esquerda, D=direita, S=superior, I=inferior
    const array_faces = [ "F" , "T" , "E" , "D" , "S" , "I" ] ;
    // A=amarelo, B=branco, V=vermelho, L=laranja, G=verde, Z=azul
    const array_cores = [ "A" , "B" , "V" , "L" , "G" , "Z" ] ;
    //celulas de cada face
    const array_celulas = [ "A1" , "B1" , "C1" , "A2" , "B2" , "C2" , "A3" , "B3" , "C3" ] ;
    //array de direção de botões de movimento
    const dircel = [ [ "A" , "D" ] , [ "B" , "D" ] , [ "C" , "D" ] , [ "1" , "R" ] , 
                     [ "1" , "L" ] , [ "2" , "R" ] , [ "2" , "L" ] , [ "3" , "R" ] ,
                     [ "3" , "L" ] , [ "A" , "U" ] , [ "B" , "U" ] , [ "C" , "U" ] ] ;
    //array useState das cores do cubo
    var array_tmp = [] ;
    for( var i=0 ; i < array_faces.length ; i++ ){
        for( var j=0 ; j < array_celulas.length ; j++ ){
            array_tmp.push( [ array_faces[i] + array_celulas[j] , array_cores[i] ] );
        }
    }
    const [ array_cubomagico , setArray_cubomagico ] = useState( array_tmp ) ;
    const array_inicial = array_tmp ;

    const [ jogo_acontencendo , setJogo_acontencendo ] = useState( false ) ;

    //define idioma padrão
    const [ us_idioma_padrao , setUS_idioma_padrao ] = useState( "pt-BR" ) ;
    if( navigator.language !== "pt-BR" ){ setUS_idioma_padrao( "en-US" ) ; }
    
    //verifica se terminou a montagem correta das faces = fim de jogo
    useEffect( () => { 
        if( jogo_acontencendo && VerificaMontagemFinal() ){
            alert( Traducoes[ us_idioma_padrao ].app_fimdejogo + document.getElementById( "pTempo" ).textContent ) ;
            ParaCuboMagico() ;
        }
    } , [ array_cubomagico , jogo_acontencendo ] )

    // Função para mover as cores das celulas do cubo
    // face --> F=frontal' , T=traseiro , E=esquerda , D=direita , S=superior , I=inferior
    // LorL --> letras das colunas A, B ou C ou número das linhas 1, 2, 3
    // direcao --> U=sobe, D=desce, R=direita, L=esquerda
    function MoveCel( face , LorL , direcao ){ 
        //console.log( "Entrou MovelCel " + face + LorL + direcao );
        var ordem_faces = [] ;
        var ordem_rotacao = [] ;

        //define sentido da rotação 90º em função da face e da direção de giro
        var arot_LorLN = [ LorL + "1" , LorL + "2" , LorL + "3" ] ;
        var arot_LLorL = [ "A" + LorL , "B" + LorL , "C" + LorL ] ;
        var arot_iLorLiN = [ MoveCel_InverteCelula( "i" + LorL ) + "3" , MoveCel_InverteCelula( "i" + LorL ) + "2" , MoveCel_InverteCelula( "i" + LorL ) + "1" ] ;
        var arot_LniLorL = [ "A" + MoveCel_InverteCelula( "in" + LorL) , "B" + MoveCel_InverteCelula( "in" + LorL) , "C" + MoveCel_InverteCelula( "in" + LorL) ] ;
        var arot_iLnLorL = [ "C" + MoveCel_InverteCelula( "n" + LorL ) , "B" + MoveCel_InverteCelula( "n" + LorL ) , "A" + MoveCel_InverteCelula( "n" + LorL ) ] ;
        var arot_lLorLiN = [ MoveCel_InverteCelula( "l" + LorL ) + "3" , MoveCel_InverteCelula( "l" + LorL ) + "2" , MoveCel_InverteCelula( "l" + LorL ) + "1" ] ;
        var arot_inLorLiL = [ "C" + MoveCel_InverteCelula( "i" + LorL ) , "B" + MoveCel_InverteCelula( "i" + LorL ) , "A" + MoveCel_InverteCelula( "i" + LorL ) ] ;
        var arot_ilLorLN = [ MoveCel_InverteCelula( "il" + LorL ) + "1" , MoveCel_InverteCelula( "il" + LorL ) + "2" , MoveCel_InverteCelula( "il" + LorL ) + "3" ] ;

        if( face === "F" && direcao === "U" ){ 
            ordem_faces = [ "F" , "I" , "T" , "S" ] ;
            ordem_rotacao = [ arot_LorLN , arot_LorLN , arot_iLorLiN , arot_LorLN ] ;
        }
        else if( face === "F" && direcao === "D" ){
            ordem_faces = [ "F" , "S" , "T" , "I" ] ; 
            ordem_rotacao = [ arot_LorLN , arot_LorLN , arot_iLorLiN , arot_LorLN ] ;
        }
        else if( ( face === "F" ) && ( direcao === "R" ) ){ 
            ordem_faces = [ "F" , "E" , "T" , "D" ] ;
            ordem_rotacao = [ arot_LLorL , arot_LLorL , arot_LLorL , arot_LLorL ] ; 
        }
        else if( ( face === "F" ) && ( direcao === "L" ) ){ 
            ordem_faces = [ "F" , "D" , "T" , "E" ] ; 
            ordem_rotacao = [ arot_LLorL , arot_LLorL , arot_LLorL , arot_LLorL ] ; 
        }
        else if( ( face === "T" ) && ( direcao === "U" ) ){ 
            ordem_faces = [ "T" , "I" , "F" , "S" ] ; 
            ordem_rotacao = [ arot_LorLN , arot_iLorLiN , arot_iLorLiN , arot_iLorLiN ] ; 
        }
        else if( ( face === "T" ) && ( direcao === "D" ) ){ 
            ordem_faces = [ "T" , "S" , "F" , "I" ] ; 
            ordem_rotacao = [ arot_LorLN , arot_iLorLiN , arot_iLorLiN , arot_iLorLiN ] ; 
        }
        else if( ( face === "T" ) && ( direcao === "R" ) ){ 
            ordem_faces = [ "T" , "D" , "F" , "E" ] ; 
            ordem_rotacao = [ arot_LLorL , arot_LLorL , arot_LLorL , arot_LLorL ] ; 
        }
        else if( ( face === "T" ) && ( direcao === "L" ) ){ 
            ordem_faces = [ "T" , "E" , "F" , "D" ] ; 
            ordem_rotacao = [ arot_LLorL , arot_LLorL , arot_LLorL , arot_LLorL ] ; 
        }
        else if( ( face === "E" ) && ( direcao === "U" ) ){ 
            ordem_faces = [ "E" , "I" , "D" , "S" ] ; 
            ordem_rotacao = [ arot_LorLN , arot_LniLorL , arot_iLorLiN , arot_iLnLorL ] ; 
        }
        else if( ( face === "E" ) && ( direcao === "D" ) ){ 
            ordem_faces = [ "E" , "S" , "D" , "I" ] ; 
            ordem_rotacao = [ arot_LorLN , arot_iLnLorL , arot_iLorLiN , arot_LniLorL ] ; 
        }
        else if( ( face === "E" ) && ( direcao === "R" ) ){ 
            ordem_faces = [ "E" , "T" , "D" , "F" ] ; 
            ordem_rotacao = [ arot_LLorL , arot_LLorL , arot_LLorL , arot_LLorL ] ; 
        }
        else if( ( face === "E" ) && ( direcao === "L" ) ){ 
            ordem_faces = [ "E" , "F" , "D" , "T" ] ; 
            ordem_rotacao = [ arot_LLorL , arot_LLorL , arot_LLorL , arot_LLorL ] ; 
        }
        else if( ( face === "D" ) && ( direcao === "U" ) ){ 
            ordem_faces = [ "D" , "I" , "E" , "S" ] ; 
            ordem_rotacao = [ arot_LorLN , arot_iLnLorL , arot_iLorLiN , arot_LniLorL ] ; 
        }
        else if( ( face === "D" ) && ( direcao === "D" ) ){ 
            ordem_faces = [ "D" , "S" , "E" , "I" ] ; 
            ordem_rotacao = [ arot_LorLN , arot_LniLorL , arot_iLorLiN , arot_iLnLorL ] ; 
        }
        else if( ( face === "D" ) && ( direcao === "R" ) ){ 
            ordem_faces = [ "D" , "F" , "E" , "T" ] ; 
            ordem_rotacao = [ arot_LLorL , arot_LLorL , arot_LLorL , arot_LLorL ] ; 
        }
        else if( ( face === "D" ) && ( direcao === "L" ) ){ 
            ordem_faces = [ "D" , "T" , "E" , "F" ] ; 
            ordem_rotacao = [ arot_LLorL , arot_LLorL , arot_LLorL , arot_LLorL ] ; 
        }
        else if( ( face === "S" ) && ( direcao === "U" ) ){ 
            ordem_faces = [ "S" , "F" , "I" , "T" ] ; 
            ordem_rotacao = [ arot_LorLN , arot_LorLN , arot_LorLN , arot_iLorLiN ] ;
        }
        else if( ( face === "S" ) && ( direcao === "D" ) ){ 
            ordem_faces = [ "S" , "T" , "I" , "F" ] ;
            ordem_rotacao = [ arot_LorLN , arot_iLorLiN , arot_LorLN , arot_LorLN ] ;
        }
        else if( ( face === "S" ) && ( direcao === "R" ) ){ 
            ordem_faces = [ "S" , "E" , "I" , "D" ] ; 
            ordem_rotacao = [ arot_LLorL , arot_lLorLiN , arot_inLorLiL , arot_ilLorLN ] ;
        }
        else if( ( face === "S" ) && ( direcao === "L" ) ){ 
            ordem_faces = [ "S" , "D" , "I" , "E" ] ; 
            ordem_rotacao = [ arot_LLorL , arot_ilLorLN , arot_inLorLiL , arot_lLorLiN ] ;
        }
        else if( ( face === "I" ) && ( direcao === "U" ) ){ 
            ordem_faces = [ "I" , "T" , "S" , "F" ] ;
            ordem_rotacao = [ arot_LorLN , arot_iLorLiN , arot_LorLN , arot_LorLN ] ;
        }
        else if( ( face === "I" ) && ( direcao === "D" ) ){ 
            ordem_faces = [ "I" , "F" , "S" , "T" ] ;
            ordem_rotacao = [ arot_LorLN , arot_LorLN , arot_LorLN , arot_iLorLiN ] ;
        }
        else if( ( face === "I" ) && ( direcao === "R" ) ){ 
            ordem_faces = [ "I" , "E" , "S" , "D" ] ; 
            ordem_rotacao = [ arot_LLorL , arot_ilLorLN , arot_inLorLiL , arot_lLorLiN ] ;
        }
        else if( ( face === "I" ) && ( direcao === "L" ) ){ 
            ordem_faces = [ "I" , "D" , "S" , "E" ] ; 
            ordem_rotacao = [ arot_LLorL , arot_lLorLiN , arot_inLorLiL , arot_ilLorLN ] ;
        }

        //efetua a rotacao
        var cor1temp , cor2temp , cor3temp = "" ;
        for( var i=0 ; i < ordem_faces.length ; i++ ){
            //pega valores da primeira sequencia
            if( i === 0 ){
                cor1temp = ProcuraCorArray( ordem_faces[i] + ordem_rotacao[i][0] ) ;
                cor2temp = ProcuraCorArray( ordem_faces[i] + ordem_rotacao[i][1] ) ;
                cor3temp = ProcuraCorArray( ordem_faces[i] + ordem_rotacao[i][2] ) ;
            }
            
            if( i === (ordem_faces.length-1) ){
                TrocaCorArray( ordem_faces[i] + ordem_rotacao[i][0] , cor1temp ) ;
                TrocaCorArray( ordem_faces[i] + ordem_rotacao[i][1] , cor2temp ) ;
                TrocaCorArray( ordem_faces[i] + ordem_rotacao[i][2] , cor3temp ) ;
            }
            else{
                TrocaCorArray( ordem_faces[i] + ordem_rotacao[i][0] , ProcuraCorArray( ordem_faces[i+1] + ordem_rotacao[i+1][0] ) ) ;
                TrocaCorArray( ordem_faces[i] + ordem_rotacao[i][1] , ProcuraCorArray( ordem_faces[i+1] + ordem_rotacao[i+1][1] ) ) ;
                TrocaCorArray( ordem_faces[i] + ordem_rotacao[i][2] , ProcuraCorArray( ordem_faces[i+1] + ordem_rotacao[i+1][2] ) ) ;
            }            
        } 

        function MoveCel_InverteCelula( parte_celula ){
            if( parte_celula === "iA" ){ return "C" ; }
            else if( parte_celula === "iB" ){ return "B" ; }
            else if( parte_celula === "iC" ){ return "A" ; }
            else if( parte_celula === "nA" ){ return "1" ; }
            else if( parte_celula === "nB" ){ return "2" ; }
            else if( parte_celula === "nC" ){ return "3" ; }
            else if( parte_celula === "inA" ){ return "3" ; }
            else if( parte_celula === "inB" ){ return "2" ; }
            else if( parte_celula === "inC" ){ return "1" ; }
            else if( parte_celula === "l1" ){ return "A" ; }
            else if( parte_celula === "l2" ){ return "B" ; }
            else if( parte_celula === "l3" ){ return "C" ; }
            else if( parte_celula === "i1" ){ return "3" ; }
            else if( parte_celula === "i2" ){ return "2" ; }
            else if( parte_celula === "i3" ){ return "1" ; }
            else if( parte_celula === "il1" ){ return "C" ; }
            else if( parte_celula === "il2" ){ return "B" ; }
            else if( parte_celula === "il3" ){ return "A" ; }
        }
    }

    //função que retorna a cor da celula dentro do array
    function ProcuraCorArray( face_celula ){
        for( var i=0 ; i < array_cubomagico.length ; i++ ){
            if( array_cubomagico[i][0] === face_celula ) {
                return array_cubomagico[i][1] ;
            }
        }
    }

    //função para trocar a cor no array
    function TrocaCorArray( face_celula , cor ){
        for( var i=0 ; i < array_cubomagico.length ; i++ ){
            if( array_cubomagico[i][0] === face_celula ) {
                setArray_cubomagico( [ ...array_cubomagico , array_cubomagico[i][1] = cor ] );
            }
        }
    }

    //função para resetar o cubo mágico
    function ResetaCuboMagico(){
        setArray_cubomagico( [ ...array_inicial ] ) ;
        document.getElementById( "pTempo" ).textContent = "00:00:00" ;
        ParaCuboMagico();
    }

    //função auxiliar para resetar o cubo mágico
    function ParaCuboMagico(){
        numero_vezes_timer = 0 ;
        meu_timer_temporizador = false ;
        ExibeBotoesMovimento(false) ;
        setJogo_acontencendo( false ) ;
        clearInterval( id_temporizador ) ;
        document.getElementById( "aResetar" ).style.visibility = "hidden" ;
        document.getElementById( "aEmbaralhar" ).style.visibility = "visible" ;
    }

    //função para embaralhar o cubo mágico
    function EmbaralharCuboMagico(){
        //embaralha cada face 3x
        array_tmp = [] ;
        for( var i=0 ; i <= 2 ; i++ ){
            //uma rotacão por cada face
            for( var j=0 ; j < array_faces.length ; j++ ){
                    //pega um número entre 1 e 12 = botões de giro de cada face
                var numbot = Math.ceil( Math.random() * (12 - 1) );
                //console.log( "Embaralha " + array_faces[j] + dircel[numbot][0] + dircel[numbot][1] );
                array_tmp.push( [ array_faces[j] , dircel[numbot][0] , dircel[numbot][1] ] ) ;
            }
        }
        numero_vezes_timer = 0 ;
        meu_timer_embaralhador = true ;
        id_temporizador = setInterval( EmbaralharCuboMagico_Auxiliar , 100 ) ;
    }

    function EmbaralharCuboMagico_Auxiliar(){
        if( meu_timer_embaralhador === true && numero_vezes_timer < array_tmp.length ){
            MoveCel( array_tmp[ numero_vezes_timer ][ 0 ] , array_tmp[ numero_vezes_timer ][ 1 ] , array_tmp[ numero_vezes_timer ][ 2 ] ) ;
            numero_vezes_timer++ ;
        }
        else if( meu_timer_embaralhador === true && numero_vezes_timer === array_tmp.length ){
            clearInterval( id_temporizador ) ;
            meu_timer_embaralhador = false ;
            numero_vezes_timer = 0 ;
            ExibeBotoesMovimento(true) ;
            document.getElementById( "aResetar" ).style.visibility = "visible" ;
            document.getElementById( "aEmbaralhar" ).style.visibility = "hidden" ;
            setJogo_acontencendo( true ) ;
            meu_timer_temporizador = true ;
            document.getElementById( "pTempo" ).textContent = "00:00:00" ;
            id_temporizador = setInterval( ContadorTempoJogo , 1000 ) ;
        }
    }
    
    function ContadorTempoJogo(){
        if( meu_timer_temporizador === true ){
            numero_vezes_timer++ ;
            document.getElementById( "pTempo" ).textContent = FormataTempo( numero_vezes_timer ) ;
        }
    }

    function FormataTempo( tempo ){
        var segundos = 0 ;
        var minutos = 0;
        var horas = 0 ;
        if( tempo < 60 )
        {
            segundos = tempo ;
        }
        else if( tempo > 59 && tempo <= 3600 )
        {
            minutos = Math.trunc( tempo / 60 ) ;
            segundos = tempo - ( minutos * 60 ) ;
            
        }
        else if( tempo > 3600 )
        {
            horas = Math.trunc( tempo / 3600 ) ;
            minutos = Math.trunc( (tempo - ( horas * 3600 )) / 60 ) ;
            segundos = tempo - ( horas * 3600 ) - ( minutos * 60 ) ;
        }
        return ( ( (horas < 10) ? "0" : "") + horas ) + 
               ( ( (minutos < 10) ? ":0" : ":") + minutos ) + 
               ( ( (segundos < 10) ? ":0" : ":") + segundos ) ;
    }

    //função para exibir ou esconder os botões de movimentação das células, que devem ser exibidos somente no estado de jogo depois de embaralhar
    function ExibeBotoesMovimento( habilita ){
        var estilo_botao_movimento = '' ;
        if( habilita === true){
            estilo_botao_movimento = "inline" ;
        }
        else if( habilita === false){
            estilo_botao_movimento = "none" ;
        }
        for( var i=0 ; i < dircel.length ; i++ ){
            for( var j=0 ; j < array_faces.length ; j++ ){
                document.getElementById( "a" + array_faces[j] + dircel[i][0] + dircel[i][1] ).style.display = estilo_botao_movimento ;
            }
        }
        return true;
    }

    //função que verifica se o cubo foi montado = fim de jogo
    function VerificaMontagemFinal(){
        var cores_iguais = true ;
        var ultima_cor = "" ;
        for( var i=0 ; i < array_faces.length ; i++ ){
            ultima_cor = "" ;
            for( var j=0 ; j < array_celulas.length ; j++ ){
                for( var k=0 ; k < array_cubomagico.length ; k++ ){
                    if( array_cubomagico[k][0] === ( array_faces[i] + array_celulas[j] ) && ultima_cor === "" ){
                        ultima_cor = array_cubomagico[k][1] ;
                    }
                    else if( array_cubomagico[k][0] === ( array_faces[i] + array_celulas[j] ) && ultima_cor != "" ){
                        if( ultima_cor != array_cubomagico[k][1] )
                        {
                            cores_iguais = false ;
                            break ;
                        }

                    }
                }
                if( cores_iguais === false ) break ;
            }
            if( cores_iguais === false ) break ;
        }
        return cores_iguais ;
    }

    return(
        <div>
            <nav>
                <ul>
                    <li className={styles.esquerda}><img src={cmlogo} className={styles.logo} /><p className={styles.titulo}>{ Traducoes[ us_idioma_padrao ].app_titulo }</p></li>
                    <li className={styles.centro}><p id="pTempo" className={styles.contador}>00:00:00</p></li>
                    <li>
                        <ul>
                            <li className={styles.direita}><a href="#" id="aResetar" className={styles.a_resetar} onClick={ResetaCuboMagico}>{ Traducoes[ us_idioma_padrao ].app_resetar }</a></li>
                            <li className={styles.direita}><a href="#" id="aEmbaralhar" className={styles.a_embaralhar} onClick={EmbaralharCuboMagico}>{ Traducoes[ us_idioma_padrao ].app_embaralhar }</a></li>
                            <li className={styles.direita}><a href="#" id="aLingPT-BR" className={styles.a_menu} onClick={ () => setUS_idioma_padrao( "pt-BR") }><img src={flag_ptbr} className={styles.bandeiras}/></a></li>
                            <li className={styles.direita}><a href="#" id="aLingEN" className={styles.a_menu} onClick= { () => setUS_idioma_padrao( "en-US" ) }><img src={flag_en} className={styles.bandeiras}/></a></li>
                        </ul>
                    </li>
                </ul>
            </nav>
            <table className={styles.tabela_container}>
                <tbody>
                    <tr>
                        <td>&ensp;</td>
                        <td>&ensp;</td>
                        <td>&ensp;</td>
                        <td>&ensp;</td>
                        <td>&ensp;</td>
                        <td rowSpan="6"><Cubo3D cubo={array_cubomagico} /> </td>
                    </tr>
                    <tr>
                        <td>&ensp;</td>
                        <td><MeuCubo face="S" cubo={array_cubomagico} movecel={MoveCel} idioma={us_idioma_padrao} /></td>
                        <td>&ensp;</td>
                        <td>&ensp;</td>
                        <td>&ensp;</td>
                        <td>&ensp;</td>
                    </tr>
                    <tr>
                        <td><MeuCubo face="E" cubo={array_cubomagico} movecel={MoveCel} idioma={us_idioma_padrao} /></td>
                        <td><MeuCubo face="F" cubo={array_cubomagico} movecel={MoveCel} idioma={us_idioma_padrao} /></td>
                        <td><MeuCubo face="D" cubo={array_cubomagico} movecel={MoveCel} idioma={us_idioma_padrao} /></td>
                        <td><MeuCubo face="T" cubo={array_cubomagico} movecel={MoveCel} idioma={us_idioma_padrao} /></td>
                        <td>&ensp;</td>
                    </tr>
                    <tr>
                        <td>&ensp;</td>
                        <td><MeuCubo face="I" cubo={array_cubomagico} movecel={MoveCel} idioma={us_idioma_padrao} /></td>
                        <td>&ensp;</td>
                        <td>&ensp;</td>
                        <td>&ensp;</td>
                    </tr>
                </tbody>
            </table>
            <footer>
                <ul>            
                    <li className={styles.esquerda}><p className={styles.filhas}>{ Traducoes[ us_idioma_padrao ].app_rod_filhas }&#128151;</p></li>
                    <li className={styles.centro}>
                        <ul>
                            <li><a href="https://github.com/maferraph/CuboMagico2D" target="_blank"><FaGithub /></a></li>
                            <li><a href="https://www.linkedin.com/in/maferraph/" target="_blank"><FaLinkedin /></a></li>
                            <li><a href="https://www.facebook.com/mauricio.fernandesraphael/" target="_blank"><FaFacebook /></a></li>
                            <li><a href="https://twitter.com/Maferraph" target="_blank"><FaTwitterSquare /></a></li>
                            <li><a href="https://www.instagram.com/maferraph/" target="_blank"><FaInstagram /></a></li>
                            <li><a href="mailto:maferraph@gmail.com"><SiGmail /></a></li>
                        </ul>
                    </li> 
                    <li className={styles.direita}><p className={styles.criacao}>{ Traducoes[ us_idioma_padrao ].app_rod_criado } Maurício Fernandes Raphael &copy; 2022</p></li>
                </ul>
            </footer>
        </div>
    );
}

export default App;