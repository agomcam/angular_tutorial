import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'angular-tutorial-f9f07',
        appId: '1:239544362482:web:c132097512464cb5f0776b',
        storageBucket: 'angular-tutorial-f9f07.firebasestorage.app',
        apiKey: 'AIzaSyDBYaql5wnd0YAQyj1xATzcVu_PH7-F11s',
        authDomain: 'angular-tutorial-f9f07.firebaseapp.com',
        messagingSenderId: '239544362482',
        databaseURL: 'https://angular-tutorial-f9f07-default-rtdb.europe-west1.firebasedatabase.app'
      })
    ),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase())
  ]
};
