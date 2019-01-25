import { Request, Response, Router } from 'express';
import { body, check, validationResult } from 'express-validator/check';

import ChannelRepositoryFactory from '../../../shared/repositories/channel-repository/channel-repository.factory';
import { authenticate } from '../authentication/fake-authenticator';
import GameRepositoryFactory from '../../../shared/repositories/game-repository/game-repository.factory';
import ProviderRepositoryFactory from '../../../shared/repositories/provider-repository/provider-repository.factory';
import UserRepositoryFactory from '../../../shared/repositories/user-repository/user-repository.factory';
import ViewHistoryRepositoryFactory from '../../../shared/repositories/view-history-repository/view-history-repository.factory';

const router = Router();
const providerRepository = new ProviderRepositoryFactory().createRepository();
const channelRepository = new ChannelRepositoryFactory().createRepository();
const gameRepository = new GameRepositoryFactory().createRepository();
const userRepository = new UserRepositoryFactory().createRepository();
const viewHistoryRepository = new ViewHistoryRepositoryFactory().createRepository();

router.get('/', authenticate('user_id'), [

    check('user_id').isInt({ min: 0 })

], async (req: Request, res: Response) => {

    const error = validationResult(req);

    if (!error.isEmpty()) {

        return res.sendStatus(400);
    }

    const id = +req.body['user_id'];
    const user = await userRepository.findById(id);
    // TODO: add to base repository?
    if (!user) {

        return res.sendStatus(404);
    }

    const histories = await viewHistoryRepository.find({ user_id: id });

    if (!histories.length) {

        return res.sendStatus(404);
    }

    res.status(200).send(histories);
});

router.post('/', authenticate('user_id'), [

    check('provider_id').isInt({ min: 0 }),
    check('provider_channel_id').isInt({ min: 0 }),
    check('user_id').isInt({ min: 0 }),
    check('game_id').isInt({ min: 0 }),
    body('title').optional().isLength({ max: 150 }).trim().escape(),
    body('streamer_name').not().isEmpty().isLength({ max: 50 }).trim().escape(),
    body('game_name').not().isEmpty().isLength({ max: 100 }).trim().escape(),
    body('image').optional().isURL()

], async (req: Request, res: Response) => {

    const error = validationResult(req);

    if (!error.isEmpty()) {

        return res.sendStatus(400);
    }

    const user = await userRepository.findById(+req.body['user_id']);
    // TODO: add to base repository?
    if (!user) {

        return res.sendStatus(400);
    }

    const provider = await providerRepository.findById(+req.body['provider_id']);

    if (!provider) {

        return res.sendStatus(400);
    }

    const game = await gameRepository.findById(+req.body['game_id']);

    if (!game) {

        return res.sendStatus(400);
    }

    let data: any = {

        provider_id: +req.body['provider_id'],
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
    const viewHistory = await viewHistoryRepository.findOne({ user_id: +req.body['user_id'], channel_id: channelId });

    if (!viewHistory) {

        data = {

            user_id: +req.body['user_id'],
            game_id: +req.body['game_id'],
            channel_id: channelId,
            streamer_name: req.body['streamer_name'],
            game_name: req.body['game_name'],
            title: req.body['title'] || '',
            image: req.body['image'] || ''
        };

        const result = await viewHistoryRepository.insertOne(data);

        return res.sendStatus(result ? 201 : 400);
    }

    data = {

        timestamp: new Date(),
        game_id: +req.body['game_id'],
        streamer_name: req.body['streamer_name'],
        game_name: req.body['game_name']
    };

    if (req.body['title']) {

        data['title'] = req.body['title'];
    }

    if (req.body['image']) {

        data['image'] = req.body['image'];
    }

    const result = await viewHistoryRepository.updateOne(data, { id: viewHistory.toObject()['id'] });

    res.sendStatus(result ? 204 : 400);
});

router.delete('/', authenticate('user_id'), [

    check('user_id').isInt({ min: 0 })

], async (req: Request, res: Response) => {

    const error = validationResult(req);

    if (!error.isEmpty()) {

        return res.sendStatus(400);
    }

    const id = +req.body['user_id'];
    const user = await userRepository.findById(id);
    // TODO: add to base repository?
    if (!user) {

        return res.sendStatus(404);
    }

    const totalDeleted = await viewHistoryRepository.delete({ user_id: id });

    res.sendStatus(totalDeleted ? 200 : 404);
});

router.get('/:id', authenticate('user_id'), [

    check('id').isInt({ min: 0 }),
    check('user_id').isInt({ min: 0 })

], async (req: Request, res: Response) => {

    const error = validationResult(req);

    if (!error.isEmpty()) {

        return res.sendStatus(400);
    }

    const id = +req.params['id'];
    const userId = +req.body['user_id'];
    const user = await userRepository.findById(userId);
    // TODO: add to base repository?
    if (!user) {

        return res.sendStatus(404);
    }

    const history = await viewHistoryRepository.findOne({ id, user_id: userId });

    if (!history) {

        return res.sendStatus(404);
    }

    // TODO: remove _id and __v
    res.status(200).send(history.toObject());
});

router.delete('/:id', authenticate('user_id'), [

    check('id').isInt({ min: 0 }),
    check('user_id').isInt({ min: 0 })

], async (req: Request, res: Response) => {

    const error = validationResult(req);

    if (!error.isEmpty()) {

        return res.sendStatus(400);
    }

    const id = +req.params['id'];
    const userId = +req.body['user_id'];
    const user = await userRepository.findById(userId);
    // TODO: add to base repository?
    if (!user) {

        return res.sendStatus(404);
    }

    const result = await viewHistoryRepository.deleteOne({ id, user_id: userId });

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
