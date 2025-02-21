<!DOCTYPE html>
<html>
    <head>
        <title>Hola mundo en PHP</title>
    </head>
    <body>
        <?php
        echo "<p>Hola mundo en PHP</p>";
        
        $contador = 9;
        $nombre = "Diego";
        $peso = 69.7;
        $mayorEdad = true;

        function miFunction(){
            $variableLocal = "Variable Local";
            $nombre = "LaMelo";
            echo $variableLocal;
            echo $nombre;
        }

        echo $nombre;

        miFunction();
        
        $edad = 22;
        if($edad < 18){
            echo "Es menor de edad";
        }else if($edad == 18){
            echo "tienes 18";
        }else{
            echo "eres mayor de edad";
        }

        //aninados
        $membresia = true;

        if($edad >=18){
            echo "adulto";
            if($membresia){
              echo  "  miembro";
            }



        }else{
            echo "menor de edad";
            if($membresia){
                echo "y miembro";
            }
        }

        //switch
        $nota = "F";
        switch($nota){
            case "A":
                echo "excelente";
                break;
            case "B":
                echo "muy Bien";
                break;
            case "C":
                echo "Bien";
                break;
            default:
                echo "necesitas mejorar";
            break;
        }

            





        ?>
    </body>
</html>