import TemplatePdf from '../screens/shared/TemplatePdf';
import { IAssessmentScoreIndividual, PillarData } from '../types/globalTypes';
import { pdf } from '@react-pdf/renderer';

import { getDownloadURL, getStorage, ref as storageRef, uploadBytes } from 'firebase/storage';

export const generateAndSavePdf = async (
  assessmentScoreIndividual: IAssessmentScoreIndividual,
  realMaturityLevel: string,
  personalFormData: string | null,
  _: PillarData[]
) => {
  try {
    const TemplatePDF = TemplatePdf(
      assessmentScoreIndividual,
      realMaturityLevel,
      personalFormData,
    );

    if (!TemplatePDF || !personalFormData) return null;

    const blob = await pdf(TemplatePDF).toBlob();

    // Save PDF to Firebase Storage
    const storage = getStorage();
    const storageReference = storageRef(storage, `pdfs/${Date.now()}-${JSON.parse(personalFormData).company}.pdf`);
    await uploadBytes(storageReference, blob);

    // Get the URL of the stored PDF
    const downloadURL = await getDownloadURL(storageReference);
    return downloadURL;
  } catch (error) {
    console.error('Error generating and saving PDF:', error);
    return null;
  }
};
