<?php

//if ($_SERVER['REMOTE_ADDR'] !== '178.255.168.32') require_once __DIR__ . '/.maintenance.php';
$container = require __DIR__ . '/../app/bootstrap.php';
$container->getByType(Nette\Application\Application::class)->run();