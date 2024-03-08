<?php

$app->get($url . '/test', function ($request, $response, $args) use ($idsMerchantOrders) {
    echo "Sistema CMSIS buscando ID\n";
    if (count($idsMerchantOrders) > 0) {
        $idResponse = $idsMerchantOrders[0];
        return $response->withStatus(200)->withJson(['id' => $idResponse]);
    } else {
        return $response->withStatus(204)->withJson(['error' => 'not data']);
    }
});

$app->delete($url . '/test', function ($request, $response, $args) use ($idsMerchantOrders) {
    echo "Borrando\n";
    $idDeleted = array_shift($idsMerchantOrders);
    return $response->withStatus(200)->withJson(['idBorrado' => $idDeleted]);
});

$app->post($url . '/test', function ($request, $response, $args) use ($idsMerchantOrders) {
    echo "Respuesta MP Recibida\n";
    $body = $request->getParsedBody();
    var_dump($body);
    if ($body['topic'] == "merchant_order") {
        $parts = explode("/", $body['resource']);
        $idMerchantOrder = end($parts);
        if (!in_array($idMerchantOrder, $idsMerchantOrders)) {
            $idsMerchantOrders[] = $idMerchantOrder;
        }
    }
    return $response->withStatus(200)->withJson([
        'code' => '200',
        'status' => 'OK',
    ]);
});

$port = getenv('PORT') ?: 3001;
$app->run();

?>