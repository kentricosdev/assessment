import { collection, addDoc, doc, getDoc, query, where, getDocs, DocumentData } from 'firebase/firestore';
import { ComparativeResultItem, ComparativeResultResponse, IAssessmentScoreIndividual, IAssessmentScoreIndividualResponse, IPersonalFormData } from '../types/globalTypes';
import { db } from '../../firebase';
import { TotalScoreResult } from '../utils/TotalPillars';

class ResultService {

  static async postResult(assessmentScoreIndividual: IAssessmentScoreIndividual, personalData: IPersonalFormData): Promise<string> {
    try {
      const resultData = {
        assessmentScore: assessmentScoreIndividual,
        personalData
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

  static async getResultBySector(sector: string): Promise<ComparativeResultResponse | null> {
    try {
      const q = query(collection(db, 'results'), where('personalData.sector', '==', sector));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        return null; // No results found for the specified sector
      }

      // Initialize variables to calculate total scores
      let totalScoreSum = 0;
      const pillarTotalScores: { [key: number]: number } = {};

      // Iterate through results and calculate total scores
      querySnapshot.forEach((doc) => {
        const resultData = doc.data();
        const assessmentResult = resultData.assessmentScore as IAssessmentScoreIndividual;

        // Calculate total score for each pillar
        for (const [pillarId, score] of Object.entries(assessmentResult.scoresByPillar)) {
          const pillarIdNumber = parseInt(pillarId, 10);
          pillarTotalScores[pillarIdNumber] = (pillarTotalScores[pillarIdNumber] || 0) + score;
        }

        // Accumulate total scores
        totalScoreSum += assessmentResult.totalScore;
      });

      // Calculate average total score
      const averageTotalScore = totalScoreSum / querySnapshot.size;
      console.log("averageTotalScore", averageTotalScore)
      // Create an array of ComparativeResultItem objects
      const comparativeResultItems: ComparativeResultItem[] = querySnapshot.docs.map((doc) => {
        const resultData = doc.data();
        const assessmentScore: IAssessmentScoreIndividual = resultData.assessmentScore;
        return { scores: assessmentScore };
      });

      // Create the ComparativeResultResponse object
      const comparativeResultResponse: ComparativeResultResponse = {
        sector,
        results: comparativeResultItems,
      };

      return comparativeResultResponse;
    } catch (error) {
      console.error('Error getting results by sector:', error);
      throw error;
    }
  }
}

export default ResultService;
