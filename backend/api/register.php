<?php
    // headers
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    // files needed to connect to database
    include_once './config/database.php';
    include_once 'objects/user.php';

    // get database connection
    $database = new Database();
    $db = $database->getConnection();

    // instantiate product object
    $user = new User($db);

    // get posted data
    $data = json_decode(file_get_contents("php://input"));

    // set product property values
    $user->firstName = $data->firstName;
    $user->lastName = $data->lastName;
    $user->email = $data->email;
    $user->password = $data->password;
    $user->is_admin = $data->is_admin;

    // set product property values
    $user->email = $data->email;
    $email_exists = $user->emailExists();

    // register user
    if ($email_exists) {

        // tell the user login failed
        echo json_encode(array("message" => "Email already registered."));
        
        // set response code
        http_response_code(401);
    } else {
        if (
            !empty($user->firstName) &&
            !empty($user->lastName) &&
            !empty($user->email) &&
            !empty($user->password) &&
            $user->create()
        ) {
            http_response_code(200);
            echo json_encode(array("message" => "User was created."));
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Unable to create user."));
        }
    }

?>