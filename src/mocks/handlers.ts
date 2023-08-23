import UserResultHandler from './api/UserResult';
import PostResultHandler from './api/PostResult';
import CommentResultHandler from './api/CommentResult';

const handlers = [...UserResultHandler, ...PostResultHandler, ...CommentResultHandler];

export default handlers;