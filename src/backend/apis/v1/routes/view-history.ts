import { Request, Response, Router } from 'express';
import { body, check } from 'express-validator/check';

import ChannelRepositoryFactory from '../../../shared/repositories/channel-repository/channel-repository.factory';
import { checkBadRequest } from '../services/express-validator-utility';
import { authenticate } from '../authentication/fake-authenticator';
import GameRepositoryFactory from '../../../shared/repositories/game-repository/game-repository.factory';
import KeyRemover from '../../../shared/services/key-remover/key-remover';
import ProviderRepositoryFactory from '../../../shared/repositories/provider-repository/provider-repository.factory';
import services from '../services';
import ViewHistoryRepositoryFactory from '../../../shared/repositories/view-history-repository/view-history-repository.factory';

const router = Router();
const service = services.viewHistory;
const remover = new KeyRemover();
const providerRepository = new ProviderRepositoryFactory().createRepository();
const channelRepository = new ChannelRepositoryFactory().createRepository();
const gameRepository = new GameRepositoryFactory().createRepository();
const viewHistoryRepository = new ViewHistoryRepositoryFactory().createRepository();

router.get('/', [

    authenticate('user_id'),
    check('user_id').isInt({ min: 0 }),
    checkBadRequest()

], async (req: Request, res: Response) => {

    const id = +req.body['user_id'];
    const result = await service.getHistories(id);

    if (!result.length) {

        return res.sendStatus(404);
    }

    res.status(200).send(result);
});
// TODO: need refactor
router.post('/', [

    authenticate('user_id'),
    check('provider_id').isInt({ min: 0 }),
    check('provider_channel_id').isInt({ min: 0 }),
    check('user_id').isInt({ min: 0 }),
    check('game_id').isInt({ min: 0 }),
    body('title').optional().isLength({ max: 150 }).trim().escape(),
    body('streamer_name').not().isEmpty().isLength({ max: 50 }).trim().escape(),
    body('game_name').not().isEmpty().isLength({ max: 100 }).trim().escape(),
    body('image').optional().isURL(),
    checkBadRequest()

], async (req: Request, res: Response) => {

    const userId = +req.body['user_id'];
    const providerId = +req.body['provider_id'];
    const gameId = +req.body['game_id'];
    const gameName = req.body['game_name'];
    const streamerName = req.body['streamer_name'];
    const title = req.body['title'] || '';
    const image = req.body['image'] || '';

    if (!await providerRepository.has(providerId) || !await gameRepository.has(gameId)) {

        return res.sendStatus(400);
    }

    let data: any = {

        provider_id: providerId,
        provider_channel_id: +req.body['provider_channel_id']
    };

    let channel = await channelRepository.findOne(data);

    if (!channel) {

        channel = await channelRepository.insertOne(data);
    }

    if (!channel) {

        return res.sendStatus(400);
    }

    const channelId = channel.toObject()['id'];
    data = { user_id: userId, channel_id: channelId };
    const viewHistory = await viewHistoryRepository.findOne(data);

    if (!viewHistory) {

        data = {

            user_id: userId,
            game_id: gameId,
            channel_id: channelId,
            streamer_name: streamerName,
            game_name: gameName,
            title,
            image
        };

        const result = await viewHistoryRepository.insertOne(data);

        return res.sendStatus(result ? 201 : 400);
    }

    data = {

        timestamp: new Date(),
        game_id: gameId,
        streamer_name: streamerName,
        game_name: gameName
    };

    if (title) { data['title'] = title; }
    if (image) { data['image'] = image; }

    const historyId = viewHistory.toObject()['id'];
    const result = await viewHistoryRepository.updateOne(data, { id: historyId });

    res.sendStatus(result ? 204 : 400);
});

router.delete('/', [

    authenticate('user_id'),
    check('user_id').isInt({ min: 0 }),
    checkBadRequest()

], async (req: Request, res: Response) => {

    const id = +req.body['user_id'];
    const result = await service.clearHistories(id);

    res.sendStatus(result ? 200 : 404);
});

router.get('/:id', [

    authenticate('user_id'),
    check('id').isInt({ min: 0 }),
    check('user_id').isInt({ min: 0 }),
    checkBadRequest()

], async (req: Request, res: Response) => {

    const id = +req.params['id'];
    const userId = +req.body['user_id'];
    const result = await service.getHistory(id, userId);

    if (!result) {

        return res.sendStatus(404);
    }

    res.status(200).send(result);
});

router.delete('/:id', [

    authenticate('user_id'),
    check('id').isInt({ min: 0 }),
    check('user_id').isInt({ min: 0 }),
    checkBadRequest()

], async (req: Request, res: Response) => {

    const id = +req.params['id'];
    const userId = +req.body['user_id'];
    const result = await service.clearHistory(id, userId);

    res.sendStatus(result ? 204 : 404);
});

router.all('/', (_: Request, res: Response) => res.sendStatus(405));
router.all('/:id', (_: Request, res: Response) => res.sendStatus(405));

export default router;

// api/v1/user/histories - needs authentication
//     (1). GET - retrieve user view histories (200 OK/401 Unauthorized/403 Forbidden/404 Not Found)
//     (2). POST - create user view histories (201 Created/204 No Content/400 Bad Request/401 Unauthorized/403 Forbidden)
//     (3). DELETE - delete user view histories (200 OK/401 Unauthorized/403 Forbidden/404 Not Found)
//     (4). otherwise - 405 Method Not Allowed

// api/v1/user/histories/:id - needs authentication
//     (1). GET - retrieve user history (200 OK/401 Unauthorized/403 Forbidden/404 Not Found)
//     (2). DELETE - delete user history (204 No Content/401 Unauthorized/403 Forbidden/404 Not Found)
//     (3). otherwise - 405 Method Not Allowed
