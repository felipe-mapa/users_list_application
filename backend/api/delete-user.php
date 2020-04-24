<?php
    // headers
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    // set database
    $db_conn = mysqli_connect("localhost", "root", "", "users_list_db");

    // get user to be deleted id
    $data = json_decode(file_get_contents("php://input"));

    // check for valid id
    if(isset($data->id) && is_numeric($data->id)){
        $delID = $data->id;
        // delete user
        $deleteUser = mysqli_query($db_conn,"DELETE FROM users WHERE user_id=$delID");
        if($deleteUser){
            http_response_code(200);
            echo json_encode(["success"=> 1,"message"=>"User Deleted"]);
        }
        else{
            echo json_encode(["success"=> 0,"message"=>"Not able to delete user."]);
        }
    }
    else{
        echo json_encode(["success"=> 0,"message"=>"Not able to delete user."]);
    }
?>