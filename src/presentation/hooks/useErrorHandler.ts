import {AccessDeniedError} from '@/domain/errors';
import {useAuth} from '../context/auth-context';

type CallBackType = (error: Error) => void;
type ResultType = CallBackType;

export const useErrorHandler = (callback: CallBackType): ResultType => {
  const {setCurrentAccount} = useAuth();
  return (error: Error): void => {
    if (error instanceof AccessDeniedError) {
      setCurrentAccount(undefined);
    } else {
      callback(error);
    }
  };
};
