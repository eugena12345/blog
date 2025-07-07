// import { useSelector } from 'react-redux';
// import { selectUserSession } from '../selectors/selectUserSession';
// import { server } from '../bff/bff';
// import { useCallback } from 'react';

// export const useServerRequest = () => {
//   const session = useSelector(selectUserSession);

//   return useCallback(
//     (serverOperationName, ...params) => {
//       const request = [
//         'authorize',
//         'register',
//         'fetchPost',
//         'fetchPosts',
//       ].includes(serverOperationName)
//         ? [...params]
//         : [session, ...params];

//       return server[serverOperationName](...request);
//     },
//     [session]
//   );
// };
