<?php
session_start();

if (!isset($_SESSION['transacciones'])) {
    $_SESSION['transacciones'] = [];
}

$totalContado = 0;
$interes = 0;
$totalConInteres = 0;
$cashBack = 0;
$montoFinal = 0;


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $descripcion = $_POST['descripcion'];
    $monto = $_POST['monto'];

    
    $_SESSION['transacciones'][] = ['descripcion' => $descripcion, 'monto' => $monto];
}


foreach ($_SESSION['transacciones'] as $transaccion) {
    $totalContado += $transaccion['monto'];
}


$interes = $totalContado * 0.026;
$totalConInteres = $totalContado + $interes;


$cashBack = $totalContado * 0.001;


$montoFinal = $totalConInteres - $cashBack;


?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Registro de Transacciones y Estado de Cuenta</title>
</head>
<body>

    <h2>Registrar Transacción</h2>
    <form method="post">
        <label for="descripcion">Descripción de la Transacción:</label>
        <input type="text" id="descripcion" name="descripcion" required><br><br>

        <label for="monto">Monto:</label>
        <input type="number" id="monto" name="monto" required><br><br>

        <input type="submit" value="Registrar Transacción">
    </form>

    <h2>Estado de Cuenta</h2>

    <h3>Transacciones Registradas:</h3>
    <ul>
        <?php
        foreach ($_SESSION['transacciones'] as $transaccion) {
            echo "<li>{$transaccion['descripcion']} - Monto: \$" . number_format($transaccion['monto'], 2) . "</li>";
        }
        ?>
    </ul>

    <p><strong>Monto Total de Contado:</strong> $<?php echo number_format($totalContado, 2); ?></p>
    <p><strong>Monto con Interés (2.6%):</strong> $<?php echo number_format($totalConInteres, 2); ?></p>
    <p><strong>Cash Back (0.1%):</strong> $<?php echo number_format($cashBack, 2); ?></p>
    <p><strong>Monto Final a Pagar:</strong> $<?php echo number_format($montoFinal, 2); ?></p>

    <p><strong>El estado de cuenta ha sido guardado en 'estado_cuenta.txt'.</strong></p>

    <?php
   
    $estadoCuenta = "Estado de Cuenta\n\n";
    foreach ($_SESSION['transacciones'] as $transaccion) {
        $estadoCuenta .= "Descripción: {$transaccion['descripcion']} - Monto: \$" . number_format($transaccion['monto'], 2) . "\n";
    }
    $estadoCuenta .= "\nMonto Total de Contado: \$" . number_format($totalContado, 2) . "\n";
    $estadoCuenta .= "Monto con Interés (2.6%): \$" . number_format($totalConInteres, 2) . "\n";
    $estadoCuenta .= "Cash Back (0.1%): \$" . number_format($cashBack, 2) . "\n";
    $estadoCuenta .= "Monto Final a Pagar: \$" . number_format($montoFinal, 2) . "\n";

    file_put_contents('estado_cuenta.txt', $estadoCuenta);
    ?>

</body>
</html>
