// Import necessary functions and types
import {
  collection,
  getDocs,
  DocumentData,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import { PillarData, PillarDataGet, QuestaoData, QuestaoDataGet, OpcaoData, OpcaoDataGet } from '../types/globalTypes';
import { db } from '../../firebase';

const getSubcollectionsData = async (doc: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
  const subcollections: Record<string, any[]> = {};
  const subcollectionNames = ['questoes'];

  for (const subcollectionName of subcollectionNames) {
    const subcollectionSnapshot = await getDocs(collection(doc.ref, subcollectionName));
    subcollections[subcollectionName] = await Promise.all(subcollectionSnapshot.docs.map(async subDoc => {
      const subDocData = subDoc.data() as QuestaoDataGet;

      const opcoesCollection = await getDocs(collection(subDoc.ref, 'opcoes'));
      const opcoes = opcoesCollection.docs.map(opcaoDoc => ({
        ...opcaoDoc.data() as OpcaoDataGet,
        id: opcaoDoc.id,
      } as OpcaoData));

      return {
        ...subDocData,
        id: subDoc.id,
        opcoes: opcoes,
      } as QuestaoData;
    }));
  }

  return subcollections;
};

const getPillarsData = async (): Promise<PillarData[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'pilares'));
    const pillarsData: PillarData[] = [];

    for (const doc of querySnapshot.docs) {
      const subcollectionsPromise = getSubcollectionsData(doc);
      const pillarDocData = doc.data() as PillarDataGet;
      const subcollections = await subcollectionsPromise;

      pillarsData.push({
        id: doc.id,
        ...pillarDocData,
        questoes: subcollections['questoes'],
      });
    }

    console.log('Fetched Pillars Data:', pillarsData);
    return pillarsData;
  } catch (error) {
    console.error('Error fetching pillars data:', error);
    throw error;
  }
};

export { getPillarsData };

