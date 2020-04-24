<?php
class User
{
    private $conn;
    private $table_name = "users";

    // properties
    public $user_id;
    public $firstName;
    public $lastName;
    public $email;
    public $is_admin;
    public $password;

    // constructor
    public function __construct($db)
    {
        $this->conn = $db;
    }

    // create new user
    function create()
    {
        $query = "INSERT INTO " . $this->table_name . "
                    SET
                        firstName = :firstName,
                        lastName = :lastName,
                        email = :email,
                        is_admin = :is_admin,
                        password = :password";

        // prepare the query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->firstName = htmlspecialchars(strip_tags($this->firstName));
        $this->lastName = htmlspecialchars(strip_tags($this->lastName));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->is_admin = htmlspecialchars(strip_tags($this->is_admin));
        $this->password = htmlspecialchars(strip_tags($this->password));

        // bind the values
        $stmt->bindParam(':firstName', $this->firstName);
        $stmt->bindParam(':lastName', $this->lastName);
        $stmt->bindParam(':is_admin', $this->is_admin);
        $stmt->bindParam(':email', $this->email);

        // hash the password before saving to database
        $password_hash = password_hash($this->password, PASSWORD_BCRYPT);
        $stmt->bindParam(':password', $password_hash);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    // check if given email exist in the database
    function emailExists() {
        // query to check if email exists
        $query = "SELECT user_id, firstName, lastName, is_admin, password
                    FROM " . $this->table_name . "
                    WHERE email = ?
                    LIMIT 0,1";

        // prepare the query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->email = htmlspecialchars(strip_tags($this->email));

        // bind given email value
        $stmt->bindParam(1, $this->email);

        // execute the query
        $stmt->execute();

        // get number of rows
        $num = $stmt->rowCount();

        // if email exists, assign values to object properties for easy access and use for php sessions
        if ($num > 0) {

            // get record details / values
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            // assign values to object properties
            $this->user_id = $row['user_id'];
            $this->firstName = $row['firstName'];
            $this->lastName = $row['lastName'];
            $this->is_admin = $row['is_admin'];
            $this->password = $row['password'];

            // return true because email exists in the database
            return true;
        }

        // return false if email does not exist in the database
        return false;
    }

    // update a user 
    public function update()  {
        // if password needs to be updated
        $password_set = !empty($this->password) ? ", password = :password" : "";

        // if no posted password, do not update the password
        $query = "UPDATE " . $this->table_name . "
            SET
                firstName = :firstName,
                lastName = :lastName,
                is_admin = :is_admin,
                email = :email
                {$password_set}
            WHERE user_id = :user_id";

        // prepare the query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->firstName = htmlspecialchars(strip_tags($this->firstName));
        $this->lastName = htmlspecialchars(strip_tags($this->lastName));
        $this->is_admin = htmlspecialchars(strip_tags($this->is_admin));
        $this->email = htmlspecialchars(strip_tags($this->email));

        // bind the values from the form
        $stmt->bindParam(':firstName', $this->firstName);
        $stmt->bindParam(':lastName', $this->lastName);
        $stmt->bindParam(':is_admin', $this->is_admin);
        $stmt->bindParam(':email', $this->email);

        // hash the password before saving to database
        if (!empty($this->password)) {
            $this->password = htmlspecialchars(strip_tags($this->password));
            $password_hash = password_hash($this->password, PASSWORD_BCRYPT);
            $stmt->bindParam(':password', $password_hash);
        }

        // unique ID of record to be edited
        $stmt->bindParam(':user_id', $this->user_id);

        // execute the query
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
}
