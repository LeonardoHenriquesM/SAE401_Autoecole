<?php
session_start();
echo "Session ID : " . session_id() . "<br>";
echo "Session path : " . session_save_path() . "<br>";
echo "Contenu de la session : ";
print_r($_SESSION);
?>  