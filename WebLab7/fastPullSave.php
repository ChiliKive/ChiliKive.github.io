<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = file_get_contents('php://input');

    file_put_contents('fastdata.json', $data, FILE_APPEND);
}
?>
