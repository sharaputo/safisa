<?php

require 'phpmailer/Exception.php';
require 'phpmailer/PHPMailer.php';

$name = $_POST['name'];
$honeypot = $_POST['surname'];
$phone = $_POST['phone'];
$email = $_POST['email'];

$subject = 'New contact form Safisa website';
$body = '<h1>User Contact Details</h1>';

$mail = new PHPMailer\PHPMailer\PHPMailer();
$mail->Charset = 'UTF-8';
$mail->IsHTML(true);

$mail->setFrom('info@safisa.shop', 'Safisa website');
$mail->addAddress('sharaputo@icloud.com');

if(trim(!empty($name))){
  $body .= '<p><strong>Name:</strong> '.$name.'</p>';
}
trim($honeypot);
if(!empty($honeypot)) {
  echo "Spam!";
  exit;
}
if(trim(!empty($phone))){
  $body .= '<p><strong>Phone:</strong> '.$phone.'</p>';
}
if(trim(!empty($email))){
  $body .= '<p><strong>Email:</strong> '.$email.'</p>';
}

$mail->Subject = $subject;
$mail->Body = $body;

if (!$mail->send()) {
  $message = 'Error!';
} else {
  $message = 'Success!';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);
?>