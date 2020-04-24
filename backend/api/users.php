<?php
    // headers
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    // set database
    $db_conn = mysqli_connect("localhost", "root", "", "users_list_db");

    $allUsers = mysqli_query($db_conn,"SELECT user_id, firstName, lastName, email, is_admin from users");

    // get all users
    if(mysqli_num_rows($allUsers) > 0){
        $all_users = mysqli_fetch_all($allUsers,MYSQLI_ASSOC);

        http_response_code(200);
        echo json_encode(["success"=> 1,"message"=>"Users retrieved successfully.","users"=>$all_users]);
    }
    else{
        echo json_encode(["success"=> 0,"message"=>"Not able to retrieve users. Try refreshing the page."]);
    }
?>