<?php
//array indexado
$frutas = array("Manzana","Fresa","Banano");
array_push($frutas,"Peras","Sandia");
echo $frutas[0] ;
echo $frutas[4] ;

$posicion= array_search("Fresa", $frutas);
echo $posicion;
//array asociativo
$edades = array("Juan" => 25,"Ana" => 22,"Pedro"=> 30);
echo $edades['Juan'];

//arreglo multidimensional
$personas = array(
    array("Nombre"=> "Juan", "Edad" => 25),
    array("Nombre"=> "Ana","Edad" => 22)
);
echo $personas[1]["Nombre"] ;

//funcion de arreglos
$arreglo1 = array("Rojo","Verde");
$arreglo2 = array("Azul","Amarillo");
$arregloFusionado = array_merge($arreglo1, $arreglo2);
print_r( $arregloFusionado );

//funcion simple
function saludar($nombre) {
    return "Hola". $nombre ."";
}
echo saludar("Ryan");
//funcion anonima
$suma = function ($a,$b){
    return $a + $b;
};

echo $suma (0,1);

//funcion de flecha
$duplicar = fn($n) => $n * 2;
echo $duplicar (10);

//funcion integrada
$texto = "Hola mundo";
echo strlen( $texto );

//crear y escribir en un archivo
$archivo = fopen("ejemplo.txt","w") or die("No se puede abrir el archivo");
$txt = "Hola muundo \n";
fwrite( $archivo, $txt );
$txt = "PHP esta ak7";
fwrite( $archivo, $txt );
fclose( $archivo );

//leer un archivo
$archivoPorLeer = fopen("ejemplo.txt","r") or die("No se puede abrir");

while( !feof($archivoPorLeer)  ){
    echo fgets( $archivoPorLeer);

}

fclose( $archivoPorLeer );

?>
