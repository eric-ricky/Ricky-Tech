<?php 

    //Error mesage
    $msg = '';


    // Check for Submit
    if(filter_has_var(INPUT_POST, 'submit')) {
        // Get the form data
        $name = htmlspecialchars($_POST['name']);
        $email = htmlspecialchars($_POST['email']);
        $message = htmlspecialchars($_POST['comment']);

        // Check required fields
        if(!empty($email)  && !empty($name) && !empty($message)) {
            // Check email
            if(filter_var($email, FILTER_VALIDATE_EMAIL)) {
                // Send the info through email
                //recepient email
                $toEmail = 'ericricky200@gmail.com';
                $subject = 'Contact Request From ' . $name;
                $body = '<h2>Contact Request</h2>
                        <h4>Name:</h4><P>'.$name.'</p>
                        <h4>Email:</h4><P>'.$email.'</p>
                        <h4>Message:</h4><P>'.$message.'</p>';
                // email headers
                $headers = "MIME-Version: 1.0"."\r\n";
                $headers .= "Content-Type:text/html;charset=UTF-8" ."\r\n";

                $headers .= "From: " . $name . "<". $email .">"."\r\n";

                
                //mail functions
                if(mail($toEmail, $subject, $body, $headers)) {
                    //email sent successfully
                    $msg = "<script>alert('Email sent SUCCESSFFULLY')</script>";
                    echo ($msg != '') ? $msg : '';
                } else {
                    $msg = "<script>alert('Email Not Sent!!')</script>";
                    echo ($msg != '') ? $msg : '';
                }                

            } else {
                // valid email failed
                $msg = "<script>alert('Please Enter a Valid Email Address')</script>";
                echo ($msg != '') ? $msg : '';
            }
            
        } else {
            // fill all fields failed
            $msg = "<script>alert('please fill in all fields')</script>";
            // echo ($msg != '') ? $msg : '';
            echo $msg;
        }
    }

?>