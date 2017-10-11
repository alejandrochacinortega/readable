import mySaga from './sagas';
import postsSaga from './posts_saga';

export default function* rootSaga() {
  yield [mySaga(), postsSaga()];
}
