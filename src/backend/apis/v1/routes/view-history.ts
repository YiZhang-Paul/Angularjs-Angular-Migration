import { Request, Response, Router } from 'express';

const router = Router();

router.all('/', (_: Request, res: Response) => res.sendStatus(405));

export default router;

// api/v1/user/histories - needs authentication
//     (1). GET - retrieve user view histories (200 OK/401 Unauthorized/403 Forbidden/404 Not Found)
//     (2). POST - create user view histories (201 Created/401 Unauthorized/403 Forbidden)
//     (3). DELETE - delete user view histories (200 OK/401 Unauthorized/403 Forbidden/404 Not Found)
//     (4). otherwise - 405 Method Not Allowed

// api/v1/user/histories/:id - needs authentication
//     (1). GET - retrieve user history (200 OK/401 Unauthorized/403 Forbidden/404 Not Found)
//     (2). DELETE - delete user history (204 No Content/401 Unauthorized/403 Forbidden/404 Not Found)
//     (3). otherwise - 405 Method Not Allowed
