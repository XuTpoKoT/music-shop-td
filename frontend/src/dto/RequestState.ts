export enum RequestStatus {
    Idle = 'idle',
    Loading = 'loading',
    Success = 'success',
    Error = 'error',
}

export type ErrorResponse = {
    message: string;
    code?: number;
}

// export interface RequestState<T> {
//     status: 'idle' | 'loading' | 'success' | 'error';
//     data: T | null;
//     errorMessage: string | null;
// }