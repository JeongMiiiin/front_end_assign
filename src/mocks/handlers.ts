import UserResultHandler from './api/UserResult';
import PostResultHandler from './api/PostResult';

const handlers = [...UserResultHandler, ...PostResultHandler];

export default handlers;