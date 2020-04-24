<?php

    // headers
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    // set database
    $db_conn = mysqli_connect("localhost", "root", "", "users_list_db");

    // get user's id and new password
    $data = json_decode(file_get_contents("php://input"));

    // has password
    $password = $data->password;
    $password_hash = password_hash($password, PASSWORD_BCRYPT);

    // check for valid id and password
    if(isset($data->id) 
    && isset($password)
    && is_numeric($data->id)
    ){
        // update password
        $updateUser = mysqli_query($db_conn,"UPDATE users SET password='$password_hash' WHERE user_id='$data->id'");
        if($updateUser){
            echo json_encode(["success"=>1,"message"=>"User's password Updated."]);
        }
        else{
            echo json_encode(["success"=>0,"message"=>"Sorry, we couldn't update user's password."]);
        }
    }
    else{
        echo json_encode(["success"=>0,"message"=>"Sorry, we couldn't update user's password."]);
    }
?>