<?php
switch ($_SERVER['REQUEST_METHOD']) {
    case ("OPTIONS"): //Allow preflighting to take place.
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: content-type");
        exit;

    case("POST"): //Send the email;
        header("Access-Control-Allow-Origin: *");
        header("Content-Type: application/json");

        // Payload is not sent to $_POST Variable,
        // is sent to php:input as text
        $json = file_get_contents('php://input');

        //parse the Payload from text format to Object
        $params = json_decode($json);

        // Debug-Ausgabe in eine Datei schreiben
        file_put_contents('debug_mail.log', date('Y-m-d H:i:s') . " - Request: " . $json . "\n", FILE_APPEND);

        // Überprüfen, ob JSON korrekt geparst wurde
        if ($params === null) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Ungültiges JSON-Format']);
            file_put_contents('debug_mail.log', date('Y-m-d H:i:s') . " - JSON Parsing Error\n", FILE_APPEND);
            exit;
        }

        $email = $params->email;
        $name = $params->name;
        $message = $params->message;

        $recipient = 'kontakt@ha-dao.de';
        $subject = "Contact From <$email>";
        $messageBody = "From: " . $name . "<br>" . $message;

        $headers = [
            'MIME-Version: 1.0',
            'Content-type: text/html; charset=utf-8',
            'From: noreply@ha-dao.de',
            'Reply-To: ' . $email
        ];

        // Versuche, die E-Mail zu senden
        $mailSuccess = mail($recipient, $subject, $messageBody, implode("\r\n", $headers));

        // Ergebnis protokollieren
        file_put_contents('debug_mail.log', date('Y-m-d H:i:s') . " - Mail sent: " . ($mailSuccess ? "Success" : "Failed") . "\n", FILE_APPEND);

        // Rückgabe des Ergebnisses als JSON
        if ($mailSuccess) {
            echo json_encode(['success' => true, 'message' => 'Nachricht wurde erfolgreich gesendet']);
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'E-Mail konnte nicht gesendet werden']);
        }
        break;

    default: //Reject any non POST or OPTIONS requests.
        header("Allow: POST", true, 405);
        exit;
}
?>
