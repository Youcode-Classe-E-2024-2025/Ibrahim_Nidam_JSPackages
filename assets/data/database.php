<?php

$dsn = "mysql:host=localhost;dbname=packages_js_db";
$user = "root";
$pass = "";

try{
    $db = new PDO($dsn, $user, $pass);
    $db -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // AUTOMATIC DATABASE CREATION start
    // $sqlScript = file_get_contents("Package_javascript.sql");
    // if(!$sqlScript){
    //     throw new Exception("Could Not read the sql file.");
    // }

    // $db -> exec($sqlScript);
    // echo "Database and tables created successfully.";
    // AUTOMATIC DATABASE CREATION end
    
    // Test if connection is successful start
    $query = $db->query("SELECT 1");
    if ($query) {
        echo "Database connected successfully.";
    }
    // Test if connection is successful end

}
catch (PDOException $e){
    die("DataBase error: " . $e -> getMessage());
}
?>