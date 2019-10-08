<?php 
    file_put_contents('users.json', file_get_contents('php://input'));

    echo json_encode(file_get_contents('users.json'));
?>