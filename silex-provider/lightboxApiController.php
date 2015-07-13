<?php

namespace Alchemy\Phrasea\Lightbox;

use Alchemy\Phrasea\Application\Helper\DispatcherAware;
use Alchemy\Phrasea\Controller\Controller;
use Alchemy\Phrasea\Core\Event\ValidationEvent;
use Alchemy\Phrasea\Core\PhraseaEvents;
use Alchemy\Phrasea\Exception\SessionNotFound;
use Alchemy\Phrasea\Model\Entities\Basket;
use Alchemy\Phrasea\Model\Entities\BasketElement;
use Alchemy\Phrasea\Model\Entities\FeedEntry;
use Alchemy\Phrasea\Model\Entities\Token;
use Alchemy\Phrasea\Model\Entities\ValidationData;
use Alchemy\Phrasea\Model\Repositories\BasketElementRepository;
use Alchemy\Phrasea\Model\Repositories\BasketRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class LightboxApiController extends Controller
{
    use DispatcherAware;

    public function rootAction()
    {
    }

    public function apiBasketListAction() {
        try {
            \Session_Logger::updateClientInfos($this->app, 6);
        } catch (SessionNotFound $e) {
            return $this->app->json(array(), 403);

        }

        /** @var BasketRepository $repository */
        $repository = $this->app['repo.baskets'];
        $basketCollection = array_merge(
          $repository->findActiveByUser($this->getAuthenticatedUser()),
          $repository->findActiveValidationByUser($this->getAuthenticatedUser())
        );

        $output = [];
        foreach($basketCollection as $basket) {
            $output[] = $this->app['lightboxApiHelper']->listBasket($basket);
        }

        return $this->app->json($output);
    }

    /**
     * Retrieve a basket
     *
     * @param  Request $request
     * @param  Basket  $basket
     *
     * @return Response
     */
    public function apiGetBasketAction(Request $request, Basket $basket)
    {
        $returnBasket = $this->app['lightboxApiHelper']->listBasket($basket);
        $returnBasket['elements'] = $this->app['lightboxApiHelper']->listBasketContent($request, $basket);

        return $this->app->json($returnBasket);
    }
}