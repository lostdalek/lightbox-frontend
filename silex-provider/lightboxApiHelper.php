<?php
namespace Alchemy\Phrasea\Lightbox;

use Alchemy\Phrasea\Application;
use Alchemy\Phrasea\Model\Entities\Basket;
use Alchemy\Phrasea\Model\Entities\BasketElement;
use Alchemy\Phrasea\Model\Entities\ValidationData;
use Alchemy\Phrasea\Model\Entities\User;
use Alchemy\Phrasea\Model\Repositories\BasketElementRepository;
use Alchemy\Phrasea\Model\Repositories\BasketRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

Class LightboxApiHelper {
    const OBJECT_TYPE_USER = 'http://api.phraseanet.com/api/objects/user';
    const OBJECT_TYPE_STORY = 'http://api.phraseanet.com/api/objects/story';
    const OBJECT_TYPE_STORY_METADATA_BAG = 'http://api.phraseanet.com/api/objects/story-metadata-bag';

    /** @var Application */
    protected $app;

    public function __construct(Application $app)
    {
        $this->app = $app;
    }

    /**
     * Retrieve elements of one basket
     *
     * @param Request $request
     * @param Basket $basket
     * @return array
     */
    public function listBasketContent(Request $request, Basket $basket)
    {


        return array_map(function (BasketElement $element) use ($request) {
            return $this->listBasketElement($request, $element);
        }, iterator_to_array($basket->getElements()));
    }



    public function listUser(User $user)
    {
        switch ($user->getGender()) {
            case User::GENDER_MRS:
                $gender = 'Mrs';
                break;
            case User::GENDER_MISS:
                $gender = 'Miss';
                break;
            case User::GENDER_MR:
            default:
                $gender = 'Mr';
        }

        return [
          '@entity@'        => self::OBJECT_TYPE_USER,
          'id'              => $user->getId(),
          'email'           => $user->getEmail() ?: null,
          'login'           => $user->getLogin() ?: null,
          'first_name'      => $user->getFirstName() ?: null,
          'last_name'       => $user->getLastName() ?: null,
          'display_name'    => $user->getDisplayName() ?: null,
          'gender'          => $gender,
          'address'         => $user->getAddress() ?: null,
          'zip_code'        => $user->getZipCode() ?: null,
          'city'            => $user->getCity() ?: null,
          'country'         => $user->getCountry() ?: null,
          'phone'           => $user->getPhone() ?: null,
          'fax'             => $user->getFax() ?: null,
          'job'             => $user->getJob() ?: null,
          'position'        => $user->getActivity() ?: null,
          'company'         => $user->getCompany() ?: null,
          'geoname_id'      => $user->getGeonameId() ?: null,
          'last_connection' => $user->getLastConnection() ? $user->getLastConnection()->format(DATE_ATOM) : null,
          'created_on'      => $user->getCreated() ? $user->getCreated()->format(DATE_ATOM) : null,
          'updated_on'      => $user->getUpdated() ? $user->getUpdated()->format(DATE_ATOM) : null,
          'locale'          => $user->getLocale() ?: null,
        ];
    }


    public function listEmbeddableMedia(Request $request, \record_adapter $record, \media_subdef $media)
    {
        if (!$media->is_physically_present()) {
            return null;
        }

        if ($this->getAuthenticator()->isAuthenticated()) {
            $acl = $this->getAclForUser();
            if ($media->get_name() !== 'document'
              && false === $acl->has_access_to_subdef($record, $media->get_name())
            ) {
                return null;
            }
            if ($media->get_name() === 'document'
              && !$acl->has_right_on_base($record->get_base_id(), 'candwnldhd')
              && !$acl->has_hd_grant($record)
            ) {
                return null;
            }
        }

        if ($media->get_permalink() instanceof \media_Permalink_Adapter) {
            $permalink = $this->listPermalink($media->get_permalink());
        } else {
            $permalink = null;
        }

        $urlTTL = (int) $request->get(
          'subdef_url_ttl',
          $this->getConf()->get(['registry', 'general', 'default-subdef-url-ttl'])
        );
        if ($urlTTL < 0) {
            $urlTTL = -1;
        }
        $issuer = $this->getAuthenticatedUser();

        return [
          'name' => $media->get_name(),
          'permalink' => $permalink,
          'height' => $media->get_height(),
          'width' => $media->get_width(),
          'filesize' => $media->get_size(),
          'devices' => $media->getDevices(),
          'player_type' => $media->get_type(),
          'mime_type' => $media->get_mime(),
          'substituted' => $media->is_substituted(),
          'created_on'  => $media->get_creation_date()->format(DATE_ATOM),
          'updated_on'  => $media->get_modification_date()->format(DATE_ATOM),
          'url' => $this->generateSubDefinitionUrl($issuer, $media, $urlTTL),
          'url_ttl' => $urlTTL,
        ];
    }


    /**
     * Retrieve detailed information about one record
     *
     * @param Request          $request
     * @param \record_adapter $record
     * @return array
     */
    public function listRecord(Request $request, \record_adapter $record)
    {
        $technicalInformation = [];
        foreach ($record->get_technical_infos() as $name => $value) {
            $technicalInformation[] = ['name' => $name, 'value' => $value];
        }

        $data = [
          'databox_id'             => $record->get_sbas_id(),
          'record_id'              => $record->get_record_id(),
          'mime_type'              => $record->get_mime(),
          'title'                  => $record->get_title(),
          'original_name'          => $record->get_original_name(),
          'updated_on'             => $record->get_modification_date()->format(DATE_ATOM),
          'created_on'             => $record->get_creation_date()->format(DATE_ATOM),
          'collection_id'          => \phrasea::collFromBas($this->app, $record->get_base_id()),
          'sha256'                 => $record->get_sha256(),
          'thumbnail'              => $this->listEmbeddableMedia($request, $record, $record->get_thumbnail()),
          'technical_informations' => $technicalInformation,
          'phrasea_type'           => $record->get_type(),
          'uuid'                   => $record->get_uuid(),
        ];

        if ($request->attributes->get('_extended', false)) {
            $subdefs = $caption = [];

            foreach ($record->get_embedable_medias([], []) as $name => $media) {
                if (null !== $subdef = $this->listEmbeddableMedia($request, $record, $media)) {
                    $subdefs[] = $subdef;
                }
            }

            foreach ($record->get_caption()->get_fields() as $field) {
                $caption[] = [
                  'meta_structure_id' => $field->get_meta_struct_id(),
                  'name'              => $field->get_name(),
                  'value'             => $field->get_serialized_values(';'),
                ];
            }

            $extendedData = [
              'subdefs'  => $subdefs,
              'metadata' => $this->listRecordCaption($record->get_caption()),
              'status'   => $this->listRecordStatus($record),
              'caption'  => $caption
            ];

            $data = array_merge($data, $extendedData);
        }

        return $data;
    }

    /**
     * Retrieve information about one basket
     *
     * @param  Basket $basket
     *
     * @return array
     */
    public function listBasket(Basket $basket)
    {
        $ret = [
          'basket_id' => $basket->getId(),
          'owner' => $this->listUser($basket->getUser()),
          'created_on' => $basket->getCreated()->format(DATE_ATOM),
          'description' => (string) $basket->getDescription(),
          'name' => $basket->getName(),
          'pusher_usr_id'     => $basket->getPusher() ? $basket->getPusher()->getId() : null,
          'pusher'            => $basket->getPusher() ? $this->listUser($basket->getPusher()) : null,
          'updated_on'        => $basket->getUpdated()->format(DATE_ATOM),
          'unread'            => !$basket->getIsRead(),
          'validation_basket' => !!$basket->getValidation(),
        ];

        if ($basket->getValidation()) {
            $users = array_map(function (ValidationParticipant $participant) {
                $user = $participant->getUser();

                return [
                  'usr_id' => $user->getId(),
                  'usr_name' => $user->getDisplayName(),
                  'confirmed' => $participant->getIsConfirmed(),
                  'can_agree' => $participant->getCanAgree(),
                  'can_see_others' => $participant->getCanSeeOthers(),
                  'readonly' => $user->getId() != $this->getAuthenticatedUser()->getId(),
                  'user' => $this->listUser($user),
                ];
            }, iterator_to_array($basket->getValidation()->getParticipants()));

            $expires_on_atom = $basket->getValidation()->getExpires();

            if ($expires_on_atom instanceof \DateTime) {
                $expires_on_atom = $expires_on_atom->format(DATE_ATOM);
            }

            $ret = array_merge([
              'validation_users'          => $users,
              'expires_on'                => $expires_on_atom,
              'validation_infos'          => $basket->getValidation()
                ->getValidationString($this->app, $this->getAuthenticatedUser()),
              'validation_confirmed'      => $basket->getValidation()
                ->getParticipant($this->getAuthenticatedUser())
                ->getIsConfirmed(),
              'validation_initiator'      => $basket->getValidation()
                ->isInitiator($this->getAuthenticatedUser()),
              'validation_initiator_user' => $this->listUser($basket->getValidation()->getInitiator()),
            ], $ret);
        }

        return $ret;
    }

    /**
     * Retrieve detailed information about a basket element
     *
     * @param Request        $request
     * @param BasketElement $basket_element
     * @return array
     */
    public function listBasketElement(Request $request, BasketElement $basket_element)
    {
        $ret = [
          'basket_element_id' => $basket_element->getId(),
          'order'             => $basket_element->getOrd(),
          'record'            => $this->listRecord($request, $basket_element->getRecord($this->app)),
          'validation_item'   => null != $basket_element->getBasket()->getValidation(),
        ];

        if ($basket_element->getBasket()->getValidation()) {
            $choices = [];
            $agreement = null;
            $note = '';

            /** @var ValidationData $validationData */
            foreach ($basket_element->getValidationDatas() as $validationData) {
                $participant = $validationData->getParticipant();
                $user = $participant->getUser();
                $choices[] = [
                  'validation_user' => [
                    'usr_id'         => $user->getId(),
                    'usr_name'       => $user->getDisplayName(),
                    'confirmed'      => $participant->getIsConfirmed(),
                    'can_agree'      => $participant->getCanAgree(),
                    'can_see_others' => $participant->getCanSeeOthers(),
                    'readonly'       => $user->getId() != $this->getAuthenticatedUser()->getId(),
                    'user'           => $this->listUser($user),
                  ],
                  'agreement'       => $validationData->getAgreement(),
                  'updated_on'      => $validationData->getUpdated()->format(DATE_ATOM),
                  'note'            => null === $validationData->getNote() ? '' : $validationData->getNote(),
                ];

                if ($user->getId() == $this->getAuthenticatedUser()->getId()) {
                    $agreement = $validationData->getAgreement();
                    $note = null === $validationData->getNote() ? '' : $validationData->getNote();
                }

                $ret['validation_choices'] = $choices;
            }

            $ret['agreement'] = $agreement;
            $ret['note'] = $note;
        }

        return $ret;
    }
}