import { useState, useEffect } from 'react';

import axios, { AxiosError } from 'axios';

import type { Event } from '../types/Event.ts';

// TODO: move into /types
enum AuthStatus {
  SignedOut = "SIGNED_OUT",
  Unauthorized = "UNAUTHORIZED",
  Authorized = "AUTHORIZED"
}

function Calendar() {
  const [authStatus, setAuthStatus] = useState(AuthStatus.SignedOut);
  const [events, setEvents] = useState([] as Event[]);

  const checkAuth = async () => {
    try {
      const response = await axios.get('/calendar/checkauth');
      if (response.data === true) {
        setAuthStatus(AuthStatus.Authorized);
        getEvents();
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

  const getEvents = async () => {
    try {
      const response = await axios.get('/calendar');
      setEvents(response.data);
    } catch (error) {
      console.error('Failed to get calendar events:', error);
    }
  };

  useEffect(() => {
    // TODO: if Calendar inherits a user through props, it may be possible to skip checking auth if we know the user is signed out
    checkAuth();
  }, []);

  const renderEvents = () => {
    switch (authStatus) {
      case AuthStatus.SignedOut:
        return <p>Please sign in.</p>;
        break;
      case AuthStatus.Unauthorized:
        return (
          <a href='/auth/calendar'>Authorize Calendar</a>
        )
        break;
      case AuthStatus.Authorized:
        if (events.length > 0) {
          return events.map((event) => {
            return (
              <div>
                <p>{event.summary}</p>
              </div>
            )
          });
        } else {
          return <p>No events found.</p>;
        }
        break;
    }

  };

  return (
    <div>
      <h6>Calendar</h6>
      {renderEvents()}
    </div>
  );
}

export default Calendar;
