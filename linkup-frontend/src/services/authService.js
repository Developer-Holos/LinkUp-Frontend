// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// export const authService = {
//   login: async (email, password) => {
//     try {
//       const response = await fetch(`${API_URL}/api/login`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });
//       return await response.json();
//     } catch (error) {
//       console.error(error);
//       throw new Error('Error al iniciar sesión: ' + (error && error.message ? error.message : String(error)));
//     }
//   },

//   logout: () => {
//     localStorage.removeItem('token');
//   },

//   getCurrentUser: () => {
//     return localStorage.getItem('token');
//   }
// };
