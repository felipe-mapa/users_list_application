<?php
    // headers
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    // files needed to connect to database
    include_once 'config/database.php';
    include_once 'objects/user.php';

    // get database connection
    $database = new Database();
    $db = $database->getConnection();

    // instantiate user object
    $user = new User($db);

    // get posted data
    $data = json_decode(file_get_contents("php://input"));
    
    // set product property values
    $user->email = $data->email;
    $email_exists = $user->emailExists();

    // generate json web token
    include_once 'config/core.php';
    include_once 'libs/php-jwt-master/src/BeforeValidException.php';
    include_once 'libs/php-jwt-master/src/ExpiredException.php';
    include_once 'libs/php-jwt-master/src/SignatureInvalidException.php';
    include_once 'libs/php-jwt-master/src/JWT.php';
    use \Firebase\JWT\JWT;

    // check if email exists and if password is correct
    if ($email_exists) {
        if(password_verify($data->password, $user->password)) {
            $token = array(
                "data" => array(
                    "user_id" => $user->user_id,
                    "firstName" => $user->firstName,
                    "lastName" => $user->lastName,
                    "is_admin" => $user->is_admin,
                    "email" => $user->email
                )
            );
    
            // set response code
            http_response_code(200);
    
            // generate jwt
            $jwt = JWT::encode($token, $key);
            echo json_encode(
                    array(
                        "message" => "Successful login.",
                        "jwt" => $jwt,
                        "id" =>  $user->user_id,
                        "firstName" =>  $user->firstName,
                        "lastName" =>  $user->lastName,
                        "email" =>  $user->email,
                        "is_admin" =>  $user->is_admin
                    ));
        } else {
            // tell the user login failed
            echo json_encode(array("message" => "Incorrect password."));

            // set response code
            http_response_code(401);
        }
    } else {
        // tell the user login failed
        echo json_encode(array("message" => "Email not registered."));
        
        // set response code
        http_response_code(401);
    }
?>