import { Module, Global } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as serviceAccount from '../config/firebase-service-account.json';

@Global()
@Module({})
export class FirebaseModule {
  constructor() {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: serviceAccount.project_id,
          clientEmail: serviceAccount.client_email,
          privateKey: serviceAccount.private_key,
        }),
      });
    }
  }
}