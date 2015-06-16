<?php

/*
 * This file is part of Phraseanet
 *
 * (c) 2005-2015 Alchemy
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Alchemy\Phrasea\Lightbox;

use Alchemy\Phrasea\Application as PhraseaApplication;
use Alchemy\Phrasea\ControllerProvider\ControllerProviderTrait;
use Alchemy\Phrasea\Model\Entities\Token;
use Alchemy\Phrasea\Model\Manipulator\TokenManipulator;
use Silex\ControllerProviderInterface;
use Silex\Application;
use Silex\ServiceProviderInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;

class LightboxServiceProvider implements ControllerProviderInterface, ServiceProviderInterface
{
    use ControllerProviderTrait;

    public function register(Application $app)
    {
        $app['twig.loader.filesystem']->addPath(
          __DIR__.'/views'
        );
        $app['controller.lightbox2'] = $app->share(function (PhraseaApplication $app) {
            return (new LightboxController($app))
              ->setDispatcher($app['dispatcher']);
        });
    }

    public function boot(Application $app)
    {

    }

    public function connect(Application $app)
    {
        $controllers = $this->createCollection($app);

        $controllers->before([$this, 'redirectOnLogRequests']);

        $firewall = $this->getFirewall($app);
        $firewall->addMandatoryAuthentication($controllers);

        $controllers
          // Silex\Route::convert is not used as this should be done prior the before middleware
          ->before($app['middleware.basket.converter'])
          ->before($app['middleware.basket.user-access']);

        $controllers->get('/', 'controller.lightbox2:rootAction')
          ->bind('lightbox2')
        ;

        return $controllers;
    }

    /**
     * @param Request            $request
     * @param PhraseaApplication $app
     * @return RedirectResponse|null
     */
    public function redirectOnLogRequests(Request $request, PhraseaApplication $app)
    {
        if (!$request->query->has('LOG')) {
            return null;
        }

        if ($app['authentication']->isAuthenticated()) {
            $app['authentication']->closeAccount();
        }

        if (null === $token = $app['repo.tokens']->findValidToken($request->query->get('LOG'))) {
            $app->addFlash('error', $app->trans('The URL you used is out of date, please login'));

            return $app->redirectPath('homepage');
        }

        /** @var Token $token */
        $app['authentication']->openAccount($token->getUser());

        switch ($token->getType()) {
            case TokenManipulator::TYPE_FEED_ENTRY:
                return $app->redirectPath('lightbox_feed_entry', ['entry_id' => $token->getData()]);
            case TokenManipulator::TYPE_VALIDATE:
            case TokenManipulator::TYPE_VIEW:
                return $app->redirectPath('lightbox_validation', ['basket' => $token->getData()]);
        }

        return null;
    }
}
