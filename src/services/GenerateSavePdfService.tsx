import TemplatePdf from '../screens/shared/TemplatePdf';
import { IAssessmentScoreIndividual, PillarData } from '../types/globalTypes';
import { BlobProvider, PDFViewer, pdf } from '@react-pdf/renderer';

// import { ref as storageRef, uploadBytes } from 'firebase/storage';
// import { getStorage } from 'firebase/storage';

export const generateAndSavePdf = async (
  assessmentScoreIndividual: IAssessmentScoreIndividual,
  realMaturityLevel: string,
  personalFormData: string | null,
  _: PillarData[]
) => {
  // Render PDF component within BlobProvider
  const TemplatePDF = TemplatePdf(
    assessmentScoreIndividual,
    realMaturityLevel,
    personalFormData,
  );

  if (!TemplatePDF) return;

  const PdfViewer = (
    // <BlobProvider document={
      <PDFViewer width="100%" height="100%">
        {TemplatePDF}
      </PDFViewer>
    // }>
    //   {({ blob, url, loading, error }) => {
    //     // Log the blob data
    //     console.log("Blob Data:", blob);

    //     if (!blob) return null

    //     // Use the current timestamp as a unique filename
    //     const fileName = Date.now().toString();

    //     // Save PDF to Firebase Storage
    //     const storage = getStorage();
    //     const storageReference = storageRef(storage, `pdfs/${fileName}.pdf`);
    //     uploadBytes(storageReference, blob);

    //     console.log("PDF saved to Firebase Storage");

    //     return "aaaa"
    //   }}
    // </BlobProvider>
  );

  const blob = await pdf(TemplatePDF).toBlob();
  // Convert Blob to Base64
  const base64Promise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });

  const base64String = await base64Promise;

  // Open PDF in a new window or tab
  // window.open(base64String, '_blank');
  console.log("pdfViewer", PdfViewer)
  console.log("blobUrl", base64String)
  console.log("blob", blob)
};
