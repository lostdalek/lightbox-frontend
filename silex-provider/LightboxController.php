<?php

namespace Alchemy\Phrasea\Lightbox;

use Alchemy\Phrasea\Application\Helper\DispatcherAware;
use Alchemy\Phrasea\Controller\Controller;
use Alchemy\Phrasea\Core\Event\ValidationEvent;
use Alchemy\Phrasea\Core\PhraseaEvents;
use Alchemy\Phrasea\Exception\SessionNotFound;
use Alchemy\Phrasea\Model\Entities\Basket;
use Alchemy\Phrasea\Model\Entities\FeedEntry;
use Alchemy\Phrasea\Model\Entities\Token;
use Alchemy\Phrasea\Model\Entities\ValidationData;
use Alchemy\Phrasea\Model\Repositories\BasketElementRepository;
use Alchemy\Phrasea\Model\Repositories\BasketRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class LightboxController extends Controller
{
    use DispatcherAware;

    public function rootAction()
    {
        try {
            \Session_Logger::updateClientInfos($this->app, 6);
        } catch (SessionNotFound $e) {
            return $this->app->redirectPath('logout');
        }

        /** @var BasketRepository $repository */
        $repository = $this->app['repo.baskets'];
        $basket_collection = array_merge(
          $repository->findActiveByUser($this->getAuthenticatedUser()),
          $repository->findActiveValidationByUser($this->getAuthenticatedUser())
        );

        $template = 'lightboxLayout.twig';

        return $this->renderResponse($template, []);
    }

    /**
     * @return bool
     */
    private function isBrowserNewGenerationOrMobile()
    {
        /** @var \Browser $browser */
        $browser = $this->app['browser'];
        return $browser->isNewGeneration() || $browser->isMobile();
    }
}