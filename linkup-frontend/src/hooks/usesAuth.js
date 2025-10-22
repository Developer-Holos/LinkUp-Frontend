// import { useState } from 'react';
// import { authService } from '../services/authService';

// export const useAuth = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const login = async (email, password) => {
//     setLoading(true);
//     setError(null);
//     try {   
//       const response = await authService.login(email, password);
//       localStorage.setItem('token', response.token);
//       return response;
//     } catch (err) {
//       setError(err.message);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { login, loading, error };
// };