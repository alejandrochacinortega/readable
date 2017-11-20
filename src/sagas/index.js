import mySaga from './sagas';
import postsSaga from './posts_saga';
import commentsSaga from './comments_saga';

export default function* rootSaga() {
  yield [mySaga(), postsSaga(), commentsSaga()];
}
