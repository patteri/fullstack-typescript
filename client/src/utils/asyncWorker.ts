import { AsyncActionCreators } from 'typescript-fsa';
import { AxiosPromise } from 'axios';
import { Dispatch } from 'redux';

function asyncWorker<TParameters, TSuccess, TError>(
  asyncAction: AsyncActionCreators<TParameters, TSuccess, TError>,
  worker: (params: TParameters) => AxiosPromise<TSuccess>
) {
  return function wrappedWorker(dispatch: Dispatch, params: TParameters): Promise<TSuccess> {
    dispatch(asyncAction.started(params));
    return worker(params).then(
      result => {
        dispatch(asyncAction.done({ params, result: result.data }));
        return result.data;
      },
      (error: TError) => {
        dispatch(asyncAction.failed({ params, error }));
        throw error;
      }
    );
  };
}

export default asyncWorker;
