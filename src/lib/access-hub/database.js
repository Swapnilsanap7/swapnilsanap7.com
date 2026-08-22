import { Timestamp } from 'firebase-admin/firestore';
import { getAccessHubFirestore } from './firebase-admin';

const COLLECTION = 'accessRequests';
const DATE_FIELDS = new Set([
  'created_at',
  'updated_at',
  'reviewed_at',
  'approved_at',
  'access_expires_at',
  'revoked_at',
  'access_email_sent_at',
]);

function serializeValue(value) {
  if (value instanceof Timestamp) return value.toDate().toISOString();
  if (Array.isArray(value)) return value.map(serializeValue);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, serializeValue(child)]));
  }
  return value;
}

function serializeDocument(snapshot) {
  if (!snapshot.exists) return null;
  return serializeValue({ id: snapshot.id, ...snapshot.data() });
}

function isExpiredRequest(request) {
  return request?.status === 'approved'
    && request.access_expires_at
    && new Date(request.access_expires_at).getTime() <= Date.now();
}

function prepareUpdates(updates) {
  return Object.fromEntries(Object.entries(updates).map(([key, value]) => {
    if (DATE_FIELDS.has(key) && value) return [key, Timestamp.fromDate(new Date(value))];
    return [key, value];
  }));
}

export async function createAccessRequest(request) {
  const collection = getAccessHubFirestore().collection(COLLECTION);
  const reference = collection.doc();
  const now = Timestamp.now();
  await reference.create({ ...request, created_at: now, updated_at: now });
  return serializeDocument(await reference.get());
}

export async function getAccessRequest(id) {
  const reference = getAccessHubFirestore().collection(COLLECTION).doc(id);
  const request = serializeDocument(await reference.get());
  if (!isExpiredRequest(request)) return request;
  const now = Timestamp.now();
  await reference.update({ status: 'expired', updated_at: now });
  return { ...request, status: 'expired', updated_at: now.toDate().toISOString() };
}

export async function listAccessRequests({ limit = 200 } = {}) {
  const database = getAccessHubFirestore();
  const snapshot = await database
    .collection(COLLECTION)
    .orderBy('created_at', 'desc')
    .limit(Math.min(Math.max(limit, 1), 1000))
    .get();
  const requests = snapshot.docs.map(serializeDocument);
  const expiredIndexes = requests
    .map((request, index) => (isExpiredRequest(request) ? index : -1))
    .filter((index) => index >= 0);

  for (let start = 0; start < expiredIndexes.length; start += 500) {
    const batch = database.batch();
    const now = Timestamp.now();
    for (const index of expiredIndexes.slice(start, start + 500)) {
      requests[index] = { ...requests[index], status: 'expired', updated_at: now.toDate().toISOString() };
      batch.update(snapshot.docs[index].ref, { status: 'expired', updated_at: now });
    }
    await batch.commit();
  }

  return requests;
}

export async function updateAccessRequest(id, updates) {
  const reference = getAccessHubFirestore().collection(COLLECTION).doc(id);
  await reference.update({ ...prepareUpdates(updates), updated_at: Timestamp.now() });
  return serializeDocument(await reference.get());
}
