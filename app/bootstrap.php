<?php

require __DIR__ . '/../vendor/autoload.php';

$dotenv = new \Symfony\Component\Dotenv\Dotenv();
$dotenv->load(__DIR__ . '/../.env');

$configurator = new Nette\Configurator;

if(getenv('NETTE_DEBUG') === "1") {
    $configurator->setDebugMode(TRUE);
}

$configurator->enableDebugger(__DIR__ . '/../log');

$configurator->setTimeZone('Europe/Prague');
$configurator->setTempDirectory(__DIR__ . '/../temp');

$configurator->createRobotLoader()
    ->addDirectory(__DIR__)
    ->addDirectory(__DIR__ . '/../temp/propel')
    ->register();

$configurator->addConfig(__DIR__ . '/config/app.neon');

$container = $configurator->createContainer();

return $container;