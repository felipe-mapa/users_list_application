<?php
    // headers
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    // set database
    $db_conn = mysqli_connect("localhost", "root", "", "users_list_db");

    // get new user data
    $data = json_decode(file_get_contents("php://input"));

    // check if has all the information needed
    if(isset($data->id) 
    && isset($data->firstName) 
    && isset($data->lastName) 
    && isset($data->email) 
    && is_numeric($data->id)
    ){
        // update user information
        $updateUser = mysqli_query($db_conn,"UPDATE users SET firstName='$data->firstName', lastName='$data->lastName', email='$data->email' WHERE user_id='$data->id'");
        if($updateUser){
            echo json_encode(["success"=>1,"message"=>"User Updated."]);
        }
        else{
            echo json_encode(["success"=>0,"message"=>"Sorry, we couldn't update the user."]);
        }
    }
    else{
        echo json_encode(["success"=>0,"message"=>"Sorry, we couldn't update the user."]);
    }
?>