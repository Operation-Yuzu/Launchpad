import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';

import { AuthStatus } from '../types/AuthStatus.ts';

function Email () {
  const [authStatus, setAuthStatus] = useState(AuthStatus.SignedOut);

  const checkAuth = async () => {
    try {
      const response = await axios.get('/checkauth/gmail');
      if (response.data === true) {
        setAuthStatus(AuthStatus.Authorized);
      } else if (response.data === false) {
        setAuthStatus(AuthStatus.Unauthorized);
      } else {
        console.error('Unexpected response from auth check: expected true or false, got', response.data);
      }
    } catch (error) {
      if ((error as AxiosError).status === 401) {
        setAuthStatus(AuthStatus.SignedOut);
      } else {
        console.error('Failed to check auth status:', error);
      }
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div>
      <h6>Email</h6>
      <p>Auth status: {authStatus}</p>
    </div>
  );
}

export default Email;