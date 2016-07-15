<?php
header('Access-Control-Allow-Origin: https://localhost');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
$name=filter_var($_POST['name'], FILTER_SANITIZE_STRING);
$email=filter_var($_POST['email'], FILTER_SANITIZE_STRING);
$message=filter_var($_POST['message'], FILTER_SANITIZE_STRING);
$secret="6LeLHyUTAAAAAOrf8A_xqpAYS8vUKP234B2lIAbJ";
$response=$_POST["captcha"];

$emailmessage = 
	'<h3>Message from ' .$name. '</h3>
	<p>' .$message. '</p>';
$emailto = 'forhire@5guysbrass.com';
$subject = 'Message from ' .$name. ' via 5guysbrass';
$headers = 
	'Return-Path: ' . $email . "\r\n" . 
	'From: ' . $email . "\r\n" . 
	'X-Priority: 3' . "\r\n" . 
	'X-Mailer: PHP ' . phpversion() .  "\r\n" . 
	'Reply-To: ' . $name . ' <' . $email . '>' . "\r\n" .
	'MIME-Version: 1.0' . "\r\n" . 
	'Content-Transfer-Encoding: 8bit' . "\r\n" . 
	"Content-type:text/html; charset=iso-8859-1\n" . "\r\n";
$params = '-f ' . $email;

$verify=file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$secret}&response={$response}");

if ($verify.success==false) {
  $response_array['status'] = 'error'; /* match error string in jquery if/else */ 
  $response_array['message'] = 'Could not verify you.';   /* add custom message */ 
  header('Content-type: application/json');
  echo json_encode($response_array);

}
else if ($verify.success==true) {
  if(mail($emailto, $subject, $emailmessage, $headers, $params)) {
  	$response_array['status'] = 'success'; /* match error string in jquery if/else */ 
  	$response_array['message'] = 'Message Sent!';   /* add custom message */
  	$response_array['email'] = $name; 
  	header('Content-type: application/json');
  	echo json_encode($response_array);
  } else {
  	$response_array['status'] = 'error'; /* match error string in jquery if/else */ 
  	$response_array['message'] = 'Verified, but email not sent!';   /* add custom message */ 
  	header('Content-type: application/json');
  	echo json_encode($response_array);
  }
}
?>