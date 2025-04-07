import type { BaseQueryFn } from '@reduxjs/toolkit/query';

const _NEVER = /* @__PURE__ */ Symbol();
export type NEVER = typeof _NEVER;

/**
 * Creates a "fake" baseQuery to be used if your api *only* uses the `queryFn` definition syntax.
 * This also allows you to specify a specific error type to be shared by all your `queryFn` definitions.
 */
export const axiosBaseQuery = (): BaseQueryFn<void, NEVER, object> => {
    return function () {
        throw new Error(
            'When using `axiosBaseQuery`, all queries & mutations must use the `queryFn` definition syntax.'
        );
    };
};
