import * as firebase from 'firebase-functions';
import * as cors from 'cors';
import { hashCode } from '../../src/hash-code';

const admin = require('firebase-admin');

admin.initializeApp(firebase.config().firebase);
const corsHandler = cors({ origin: true });
// https://firebase.google.com/docs/functions/typescript

const l = firebase.logger;

const idFrom = (s: String) => s.replace(/\//g, '__');

const verifyAndDecode = (encodedRequest: string, ua: string) => {
  try {
    const decoded = JSON.parse(
      Buffer.from(encodedRequest || '', 'base64').toString('utf8')
    );
    const localHash = hashCode(ua);
    if (localHash !== decoded.verify) {
      l.error('verify hash error');
      return {
        error: `Wrong hash: SHOULD <${localHash}>, IS <${decoded.verify}>`,
      };
    }
    return { decoded: decoded.payload };
  } catch (error) {
    return {
      error: `Parse error: <${error.message}>, incoming: <${encodedRequest}>`,
    };
  }
};

export const getApplause = firebase
  // here's the code
  .region('europe-west1')
  .https.onRequest(
    async (request: firebase.Request, response: firebase.Response) => {
      corsHandler(request, response, () => {});
      const encodedRequest = request.query.d as string;
      const decodedRequest = verifyAndDecode(
        encodedRequest,
        request.get('User-Agent') || ''
      );
      if (decodedRequest.error) {
        firebase.logger.error(`Potential Attack`, ` ${decodedRequest.error}`);
        response.status(400).send('malformed payload');
      } else {
        const snapshot = await admin
          .database()
          .ref(`/${idFrom(decodedRequest.decoded.pageId)}`)
          .get();
        if (snapshot.exists()) {
          response.json(snapshot.val());
        } else {
          response.json({ silentApplause: 0, activeApplause: 0 });
        }
      }
    }
  );

export const addApplause = firebase
  .region('europe-west1')
  .https.onRequest(
    async (request: firebase.Request, response: firebase.Response) => {
      corsHandler(request, response, () => {});
      const encodedRequest = request.query.d as string;
      const decodedRequest = verifyAndDecode(
        encodedRequest,
        request.get('User-Agent') || ''
      );
      if (decodedRequest.error) {
        firebase.logger.error(`Potential Attack`, ` ${decodedRequest.error}`);
        response.status(400).send('malformed payload');
      } else {
        const snapshot = await admin
          .database()
          .ref(`/${idFrom(decodedRequest.decoded.pageId)}`)
          .get();

        const base = snapshot.exists()
          ? snapshot.val()
          : { silentApplause: 0, activeApplause: 0 };

        const newValue = {
          silentApplause:
            base.silentApplause +
            decodedRequest.decoded.increment.silentApplause,
          activeApplause:
            base.activeApplause +
            decodedRequest.decoded.increment.activeApplause,
        };

        await admin
          .database()
          .ref(`/${idFrom(decodedRequest.decoded.pageId)}`)
          .set(newValue);

        response.end();
      }
    }
  );
