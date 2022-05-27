import { useEffect , useRef } from 'react';

function Cubo3D( props ){
    //inicia variável de referência do canvas
    const ref_canvas = useRef() ;
    
    //desenha canvas do cubomagico
    useEffect(() => {
        DesenhaCubo3D() ; 
    }, [props.cubo] )

    //funções com canvas-HTML para desenhar o cubo inicial
    //definir celulas com 5 de margem
    function DesenhaCubo3D(){
        const my_ctx = ref_canvas.current.getContext('2d');

        //FACE FRONTAL
        DesenhaCubo3D_Aux( "LemonChiffon" , 158 , 158 , 158 , 316 , 0 , 237 , 0 , 79 , 158 , 158 ) ;
        //FA1
        DesenhaCubo3D_Aux( RetornaCorCSS("FA1") , 5 , 87 , 51 , 110 , 51 , 156 , 5 , 133 , 5 , 87 ) ;
        //FA2
        DesenhaCubo3D_Aux( RetornaCorCSS("FA2") , 5 , 138 , 51 , 161 , 51 , 207 , 5 , 184 , 5 , 138 ) ;
        //FA3
        DesenhaCubo3D_Aux( RetornaCorCSS("FA3") , 5 , 189 , 51 , 212 , 51 , 258 , 5 , 235 , 5 , 189 ) ;
        //FB1
        DesenhaCubo3D_Aux( RetornaCorCSS("FB1") , 56 , 113 , 102 , 136 , 102 , 182 , 56 , 159 , 56 , 113 ) ;
        //FB2
        DesenhaCubo3D_Aux( RetornaCorCSS("FB2") , 56 , 164 , 102 , 187 , 102 , 233 , 56 , 210 , 56 , 164 ) ;
        //FB3
        DesenhaCubo3D_Aux( RetornaCorCSS("FB3") , 56 , 215 , 102 , 238 , 102 , 284 , 56 , 261 , 56 , 215 ) ;
        //FC1
        DesenhaCubo3D_Aux( RetornaCorCSS("FC1") , 107 , 139 , 153 , 162 , 153 , 208 , 107 , 185 , 107 , 139 ) ;
        //FC2
        DesenhaCubo3D_Aux( RetornaCorCSS("FC2") , 107 , 190 , 153 , 213 , 153 , 259 , 107 , 236 , 107 , 190 ) ;
        //FC3
        DesenhaCubo3D_Aux( RetornaCorCSS("FC3") , 107 , 241 , 153 , 264 , 153 , 310 , 107 , 287 , 107 , 241 ) ;

        //FACE DIREITA
        DesenhaCubo3D_Aux( "LightGreen" , 158 , 158 , 158 , 316 , 316 , 237 , 316 , 79 , 158 , 158 ) ;
        //DA1
        DesenhaCubo3D_Aux( RetornaCorCSS("DA1") , 163 , 162 , 209 , 139 , 209 , 185 , 163 , 208 , 163 , 139 ) ;
        //DA2
        DesenhaCubo3D_Aux( RetornaCorCSS("DA2") , 163 , 213 , 209 , 190 , 209 , 236 , 163 , 259 , 163 , 190 ) ;
        //DA3
        DesenhaCubo3D_Aux( RetornaCorCSS("DA3") , 163 , 264 , 209 , 241 , 209 , 287 , 163 , 310 , 163 , 241 ) ;
        //DB1
        DesenhaCubo3D_Aux( RetornaCorCSS("DB1") , 214 , 136 , 260 , 113 , 260 , 159 , 214 , 182 , 214 , 136 ) ;
        //DB2
        DesenhaCubo3D_Aux( RetornaCorCSS("DB2") , 214 , 187 , 260 , 164 , 260 , 210 , 214 , 233 , 214 , 187 ) ;
        //DB3
        DesenhaCubo3D_Aux( RetornaCorCSS("DB3") , 214 , 238 , 260 , 215 , 260 , 261 , 214 , 284 , 214 , 238 ) ;
        //DC1
        DesenhaCubo3D_Aux( RetornaCorCSS("DC1") , 265 , 111 , 311 , 88 , 311 , 134 , 265 , 157 , 265 , 111 ) ;
        //DC2
        DesenhaCubo3D_Aux( RetornaCorCSS("DC2") , 265 , 162 , 311 , 139 , 311 , 185 , 265 , 208 , 265 , 162 ) ;
        //DC3
        DesenhaCubo3D_Aux( RetornaCorCSS("DC3") , 265 , 213 , 311 , 190 , 311 , 236 , 265 , 259 , 265 , 213 ) ;

        //FACE SUPERIOR
        DesenhaCubo3D_Aux( "LightSkyBlue" , 158 , 158 , 0 , 79 , 158 , 0 , 316 , 79 , 158 , 158 ) ;
        //SA1
        DesenhaCubo3D_Aux( RetornaCorCSS("SA1") , 112 , 28 , 158 , 5 , 204 , 28 , 158 , 51 , 112 , 28 ) ;
        //SA2
        DesenhaCubo3D_Aux( RetornaCorCSS("SA2") , 61 , 54 , 107 , 31 , 153 , 54 , 107 , 77 , 61 , 54 ) ;
        //SA3
        DesenhaCubo3D_Aux( RetornaCorCSS("SA3") , 8 , 79 , 56 , 56 , 100 , 79 , 54 , 102 , 8 , 79 ) ;
        //SB1
        //                                        x1   y1    x2   y2   x3     y3   x4    y4    x5    y5
        DesenhaCubo3D_Aux( RetornaCorCSS("SB1") , 163 , 54 , 209 , 31 , 255 , 54 , 209 , 77 , 163 , 54 ) ;
        //SB2
        DesenhaCubo3D_Aux( RetornaCorCSS("SB2") , 112 , 80 , 158 , 57 , 204 , 80 , 158 , 103 , 112 , 80 ) ;
        //SB3
        DesenhaCubo3D_Aux( RetornaCorCSS("SB3") , 59 , 105 , 105 , 82 , 151 , 105 , 105 , 128 , 59 , 105 ) ;
        //SC1
        DesenhaCubo3D_Aux( RetornaCorCSS("SC1") , 214 , 80 , 260 , 57 , 306 , 80 , 260 , 103 , 214 , 80 ) ;
        //SC2
        DesenhaCubo3D_Aux( RetornaCorCSS("SC2") , 163 , 106 , 209 , 83 , 255 , 106 , 209 , 129 , 163 , 106 ) ;
        //SC3
        DesenhaCubo3D_Aux( RetornaCorCSS("SC3") , 110 , 131 , 156 , 108 , 202 , 131 , 156 , 154 , 110 , 131 ) ;

        //a face a seguir são considerando a vista frontal do cubo 3D girando 180o em nossa direção, portanto as celulas mudam de posição

        //FACE ESQUERDA
        DesenhaCubo3D_Aux( "Silver" , 158+cub2 , 158 , 158+cub2 , 316 , 0+cub2 , 237 , 0+cub2 , 79 , 158+cub2 , 158 ) ;
        //EA1
        DesenhaCubo3D_Aux( RetornaCorCSS("EC3") , 5+cub2 , 87 , 51+cub2 , 110 , 51+cub2 , 156 , 5+cub2 , 133 , 5+cub2 , 87 ) ;
        //EA2
        DesenhaCubo3D_Aux( RetornaCorCSS("EC2") , 5+cub2 , 138 , 51+cub2 , 161 , 51+cub2 , 207 , 5+cub2 , 184 , 5+cub2 , 138 ) ;
        //EA3
        DesenhaCubo3D_Aux( RetornaCorCSS("EC1") , 5+cub2 , 189 , 51+cub2 , 212 , 51+cub2 , 258 , 5+cub2 , 235 , 5+cub2 , 189 ) ;
        //EB1
        DesenhaCubo3D_Aux( RetornaCorCSS("EB3") , 56+cub2 , 113 , 102+cub2 , 136 , 102+cub2 , 182 , 56+cub2 , 159 , 56+cub2 , 113 ) ;
        //EB2
        DesenhaCubo3D_Aux( RetornaCorCSS("EB2") , 56+cub2 , 164 , 102+cub2 , 187 , 102+cub2 , 233 , 56+cub2 , 210 , 56+cub2 , 164 ) ;
        //EB3
        DesenhaCubo3D_Aux( RetornaCorCSS("EB1") , 56+cub2 , 215 , 102+cub2 , 238 , 102+cub2 , 284 , 56+cub2 , 261 , 56+cub2 , 215 ) ;
        //EC1
        DesenhaCubo3D_Aux( RetornaCorCSS("EA3") , 107+cub2 , 139 , 153+cub2 , 162 , 153+cub2 , 208 , 107+cub2 , 185 , 107+cub2 , 139 ) ;
        //EC2
        DesenhaCubo3D_Aux( RetornaCorCSS("EA2") , 107+cub2 , 190 , 153+cub2 , 213 , 153+cub2 , 259 , 107+cub2 , 236 , 107+cub2 , 190 ) ;
        //EC3
        DesenhaCubo3D_Aux( RetornaCorCSS("EA1") , 107+cub2 , 241 , 153+cub2 , 264 , 153+cub2 , 310 , 107+cub2 , 287 , 107+cub2 , 241 ) ;

        //FACE TRASEIRA
        DesenhaCubo3D_Aux( "MediumPurple" , 158+cub2 , 158 , 158+cub2 , 316 , 316+cub2 , 237 , 316+cub2 , 79 , 158+cub2 , 158 ) ;
        //TA1
        DesenhaCubo3D_Aux( RetornaCorCSS("TC3") , 163+cub2 , 162 , 209+cub2 , 139 , 209+cub2 , 185 , 163+cub2 , 208 , 163+cub2 , 139 ) ;
        //TA2
        DesenhaCubo3D_Aux( RetornaCorCSS("TC2") , 163+cub2 , 213 , 209+cub2 , 190 , 209+cub2 , 236 , 163+cub2 , 259 , 163+cub2 , 190 ) ;
        //TA3
        DesenhaCubo3D_Aux( RetornaCorCSS("TC1") , 163+cub2 , 264 , 209+cub2 , 241 , 209+cub2 , 287 , 163+cub2 , 310 , 163+cub2 , 241 ) ;
        //TB1
        DesenhaCubo3D_Aux( RetornaCorCSS("TB3") , 214+cub2 , 136 , 260+cub2 , 113 , 260+cub2 , 159 , 214+cub2 , 182 , 214+cub2 , 136 ) ;
        //TB2
        DesenhaCubo3D_Aux( RetornaCorCSS("TB2") , 214+cub2 , 187 , 260+cub2 , 164 , 260+cub2 , 210 , 214+cub2 , 233 , 214+cub2 , 187 ) ;
        //TB3
        DesenhaCubo3D_Aux( RetornaCorCSS("TB1") , 214+cub2 , 238 , 260+cub2 , 215 , 260+cub2 , 261 , 214+cub2 , 284 , 214+cub2 , 238 ) ;
        //TC1
        DesenhaCubo3D_Aux( RetornaCorCSS("TA3") , 265+cub2 , 111 , 311+cub2 , 88 , 311+cub2 , 134 , 265+cub2 , 157 , 265+cub2 , 111 ) ;
        //TC2
        DesenhaCubo3D_Aux( RetornaCorCSS("TA2") , 265+cub2 , 162 , 311+cub2 , 139 , 311+cub2 , 185 , 265+cub2 , 208 , 265+cub2 , 162 ) ;
        //TC3
        DesenhaCubo3D_Aux( RetornaCorCSS("TA1") , 265+cub2 , 213 , 311+cub2 , 190 , 311+cub2 , 236 , 265+cub2 , 259 , 265+cub2 , 213 ) ;

        //FACE INFERIOR
        DesenhaCubo3D_Aux( "LightPink" , 158+cub2 , 158 , 0+cub2 , 79 , 158+cub2 , 0 , 316+cub2 , 79 , 158+cub2 , 158 ) ;
        //IA1
        DesenhaCubo3D_Aux( RetornaCorCSS("IC1") , 112+cub2 , 28 , 158+cub2 , 5 , 204+cub2 , 28 , 158+cub2 , 51 , 112+cub2 , 28 ) ;
        //IA2
        DesenhaCubo3D_Aux( RetornaCorCSS("IB1") , 61+cub2 , 54 , 107+cub2 , 31 , 153+cub2 , 54 , 107+cub2 , 77 , 61+cub2 , 54 ) ;
        //IA3
        DesenhaCubo3D_Aux( RetornaCorCSS("IA1") , 8+cub2 , 79 , 56+cub2 , 56 , 100+cub2 , 79 , 54 +cub2, 102 , 8+cub2 , 79 ) ;
        //IB1
        DesenhaCubo3D_Aux( RetornaCorCSS("IC2") , 163+cub2 , 54 , 209+cub2 , 31 , 255+cub2 , 54 , 209+cub2 , 77 , 163+cub2 , 54 ) ;
        //IB2
        DesenhaCubo3D_Aux( RetornaCorCSS("IB2") , 112+cub2 , 80 , 158+cub2 , 57 , 204+cub2 , 80 , 158+cub2 , 103 , 112+cub2 , 80 ) ;
        //IB3
        DesenhaCubo3D_Aux( RetornaCorCSS("IA2") , 59+cub2 , 105 , 105+cub2 , 82 , 151+cub2 , 105 , 105+cub2 , 128 , 59+cub2 , 105 ) ;
        //IC1
        DesenhaCubo3D_Aux( RetornaCorCSS("IC3") , 214+cub2 , 80 , 260+cub2 , 57 , 306+cub2 , 80 , 260+cub2 , 103 , 214+cub2 , 80 ) ;
        //IC2
        DesenhaCubo3D_Aux( RetornaCorCSS("IB3") , 163+cub2 , 106 , 209+cub2 , 83 , 255+cub2 , 106 , 209+cub2 , 129 , 163+cub2 , 106 ) ;
        //IC3
        DesenhaCubo3D_Aux( RetornaCorCSS("IA3") , 110+cub2 , 131 , 156+cub2 , 108 , 202+cub2 , 131 , 156+cub2 , 154 , 110+cub2 , 131 ) ;

        //função para gerar o canvas-HTML da face
        function DesenhaCubo3D_Aux( minha_cor , X1 , Y1 , X2 , Y2 , X3 , Y3 , X4 , Y4 , X5 , Y5 ){
            my_ctx.fillStyle = minha_cor ;
            my_ctx.beginPath() ;
            my_ctx.moveTo( X1 , Y1 ) ;
            my_ctx.lineTo( X2 , Y2 ) ;
            my_ctx.lineTo( X3 , Y3 ) ;
            my_ctx.lineTo( X4 , Y4 ) ;
            my_ctx.lineTo( X5 , Y5 ) ;
            my_ctx.fill();
            my_ctx.closePath();
            //desenha borda preta
            my_ctx.fillStyle = "black" ;
            my_ctx.lineWidth = 2 ;
            my_ctx.moveTo( X1 , Y1 ) ;
            my_ctx.lineTo( X2 , Y2 ) ;
            my_ctx.lineTo( X3 , Y3 ) ;
            my_ctx.lineTo( X4 , Y4 ) ;
            my_ctx.lineTo( X5 , Y5 ) ;
            my_ctx.stroke();
        }
    }

    //função para retornar a cor da célula
    function RetornaCorCSS( face_celula ){
        var minha_cor = "" ;
        for( var i=0 ; i < props.cubo.length ; i++ ){
            if( props.cubo[i][0] === face_celula ){
                minha_cor = props.cubo[i][1] ;
            }
        }
        if( minha_cor === "A"){ return "yellow"; }
        else if( minha_cor === "B"){ return "white"; }
        else if( minha_cor === "V"){ return "red"; }
        else if( minha_cor === "L"){ return "orangered"; }
        else if( minha_cor === "G"){ return "green"; }
        else if( minha_cor === "Z"){ return "blue"; }
    }

    return(
        <div>
            <canvas ref={ref_canvas} width="652" height="316" />
        </div>
    )
}

export default Cubo3D
