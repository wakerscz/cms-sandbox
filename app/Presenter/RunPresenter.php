<?php
/**
 * Copyright (c) 2018 Wakers.cz
 *
 * @author Jiří Zapletal (http://www.wakers.cz, zapletal@wakers.cz)
 *
 */


namespace Wakers\App\Presenter;


use Wakers\PageModule\Presenter\FrontendPresenter;


class RunPresenter extends FrontendPresenter
{
    public function beforeRender() : void
    {
        parent::beforeRender();

        $this->setLayout(__DIR__ . '/../template/page/@layout.latte');
    }
}