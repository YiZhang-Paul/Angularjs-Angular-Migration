import { Request, Response, Router } from 'express';
import { body, check, validationResult } from 'express-validator/check';

import ChannelRepositoryFactory from '../../../shared/repositories/channel-repository/channel-repository.factory';
import GameRepositoryFactory from '../../../shared/repositories/game-repository/game-repository.factory';
import ProviderRepositoryFactory from '../../../shared/repositories/provider-repository/provider-repository.factory';
import ViewHistoryRepositoryFactory from '../../../shared/repositories/view-history-repository/view-history-repository.factory';

const router = Router();
const providerRepository = new ProviderRepositoryFactory().createRepository();
const channelRepository = new ChannelRepositoryFactory().createRepository();
const gameRepository = new GameRepositoryFactory().createRepository();
const viewHistoryRepository = new ViewHistoryRepositoryFactory().createRepository();

router.post('/', [

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

    const result = await viewHistoryRepository.updateOne({}, { id: viewHistory.toObject()['id'] });

    res.sendStatus(result ? 204 : 400);
});

router.all('/', (_: Request, res: Response) => res.sendStatus(405));

export default router;

// provider_id: { type: Number, required: true, min: 0, validate: integerValidator },
// provider_channel_id: { type: Number, required: true, min: 0, validate: integerValidator }
// user_id: { type: Number, required: true, min: 0, validate: integerValidator },
// title: { type: String, maxlength: 150 },
// streamer_name: { type: String, maxlength: 50 },
// game_id: { type: Number, required: true, min: 0, validate: integerValidator },
// game_name: { type: String, required: true, maxlength: 100 },
// image: { type: String, required: true, validate: urlValidator }

// api/v1/user/histories - needs authentication
//     (1). GET - retrieve user view histories (200 OK/401 Unauthorized/403 Forbidden/404 Not Found)
//     (2). POST - create user view histories (201 Created/204 No Content/400 Bad Request/401 Unauthorized/403 Forbidden)
//     (3). DELETE - delete user view histories (200 OK/401 Unauthorized/403 Forbidden/404 Not Found)
//     (4). otherwise - 405 Method Not Allowed

// api/v1/user/histories/:id - needs authentication
//     (1). GET - retrieve user history (200 OK/401 Unauthorized/403 Forbidden/404 Not Found)
//     (2). DELETE - delete user history (204 No Content/401 Unauthorized/403 Forbidden/404 Not Found)
//     (3). otherwise - 405 Method Not Allowed
