import { collection, addDoc, doc, getDoc } from 'firebase/firestore';
import { IAssessmentScoreIndividual, IAssessmentScoreIndividualResponse } from '../types/globalTypes';
import { db } from '../../firebase';

class ResultService {

  static async postResult(assessmentScoreIndividual: IAssessmentScoreIndividual, setor: string): Promise<string> {
    try {
      const resultData = {
        assessmentScore: assessmentScoreIndividual,
        setor: setor,
      };

      const resultRef = await addDoc(collection(db, 'results'), resultData);
      return resultRef.id;
    } catch (error) {
      console.error('Error posting result:', error);
      throw new Error('Failed to post result');
    }
  }

  static async getResultById(resultId: string): Promise<IAssessmentScoreIndividualResponse | null> {
    try {
      const resultDoc = await getDoc(doc(db, 'results', resultId));
      if (resultDoc.exists()) {
        return resultDoc.data() as IAssessmentScoreIndividualResponse;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting result by ID:', error);
      throw new Error('Failed to get result');
    }
  }

  static async getAllResultsBySector(sectorName: string): Promise<IAssessmentScoreIndividualResponse[] | null> {
    try {
      const resultDoc = await getDoc(doc(db, 'results', resultId));
      if (resultDoc.exists()) {
        return resultDoc.data() as IAssessmentScoreIndividualResponse;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting result by ID:', error);
      throw new Error('Failed to get result');
    }
  }
}

export default ResultService;
