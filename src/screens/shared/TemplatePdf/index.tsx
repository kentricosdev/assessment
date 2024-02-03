import { Page, Text, View, Document,  StyleSheet } from '@react-pdf/renderer';
import { IAssessmentScoreIndividual, PillarData } from '../../../types/globalTypes';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import { explanationData } from '../../../components/ExplanationOverallResult/explanationData';

const TemplatePdf = (
  assessmentScoreIndividual: IAssessmentScoreIndividual,
  realMaturityLevel: string,
  personalFormData: string | null,
  pillarsData: PillarData[]
) => {
  if (!assessmentScoreIndividual || Object.keys(assessmentScoreIndividual).length === 0) return null;

  if (personalFormData === null) return null;

  const totalScore = assessmentScoreIndividual.totalScore;

  const { scoresByPillar }: { scoresByPillar?: { [key: number]: number } } = assessmentScoreIndividual;

  let overallResultResponse;
  switch (true) {
    case totalScore >= 0 && totalScore <= 19:
      overallResultResponse = explanationData[0].text
      break;
    case totalScore >= 20 && totalScore <= 39:
      overallResultResponse = explanationData[1].text
      break;
    case totalScore >= 40 && totalScore <= 59:
      overallResultResponse = explanationData[2].text
      break;
    case totalScore >= 60 && totalScore <= 79:
      overallResultResponse = explanationData[3].text
      break;
    case totalScore >= 80 && totalScore <= 100:
      overallResultResponse = explanationData[4].text
      break;
    default:
      overallResultResponse = "Indefinido.";
  }

  <Document>
    <Page>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Resultado</Text>

        {personalFormData && (
          <Text style={styles.companyName}>
            Empresa: <Text style={styles.bold}>{JSON.parse(personalFormData).company}</Text>
          </Text>
        )}

        {personalFormData && (
          <Text style={styles.maturityOptionChosen}>
            Antes de começar esta pesquisa, você respondeu a uma pergunta no cadastro dizendo qual era o nível de
            maturidade que você achava que sua empresa estava e sua escolha foi:{' '}
            <Text style={styles.italic}>{JSON.parse(personalFormData).maturityLevel}</Text>. Depois de respondido
            a esta pesquisa comparamos a resposta final com a resposta inicial. O resultado é esse:{' '}
            <Text style={styles.bold}>{realMaturityLevel}.</Text>
          </Text>
        )}

        <View style={styles.totalScoreContainer}>
          <View style={styles.scoreResultCard}>
            <Text style={styles.totalResultCardTitle}>Xcore Total</Text>
            <View style={styles.resultsFlex}>
              <View style={styles.progressBarContainer}>
                <CircularProgressbarWithChildren
                  strokeWidth={35}
                  value={assessmentScoreIndividual.totalScore && assessmentScoreIndividual.totalScore}
                  styles={buildStyles({
                    rotation: 0,
                    strokeLinecap: 'butt',
                    pathTransitionDuration: 0.5,
                    pathColor: `#89E3F5`,
                    textColor: '#89E3F5',
                    trailColor: '#E7F4FB',
                  })}
                />
              </View>
              <Text style={styles.scoreText}>
                {JSON.stringify(assessmentScoreIndividual.totalScore)}
                <Text style={styles.scoreSpan}>/100</Text>
              </Text>
            </View>
          </View>

          <Text style={styles.overallResponse}>{overallResultResponse}</Text>
        </View>

       <View style={styles.ScoresContainer}>
          <View style={styles.scoreWrapper}>
            {Object.entries(scoresByPillar).map(([pillarId, score]) => (
              <View key={pillarId} style={styles.individualPillarsContainer}>
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>Pilar {pillarId} - {pillarsData[Number(pillarId) - 1]?.nome}</Text>

                  <View style={styles.progressBarContainer}>
                    <CircularProgressbarWithChildren
                      counterClockwise={true}
                      strokeWidth={12}
                      value={score}
                      styles={buildStyles({
                        rotation: 0.75,
                        strokeLinecap: 'round',
                        pathTransitionDuration: 0.5,
                        pathColor: `#16B8CC`,
                        textColor: '#16B8CC',
                        trailColor: '#E4E9F2',
                      })}
                    >
                      <Text style={styles.result}>{score}<span>/100</span></Text>
                    </CircularProgressbarWithChildren>
                  </View>
                </View>
                <View>
                  <Text style={styles.individualPillarName}>{pillarName}</Text>
                  <Text style={styles.explanationText}>{pillarScoreText}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </Page>
  </Document>
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    maxWidth: 1440,
    margin: '0 auto',
    padding: '20px 60px 83px',
  },
  title: {
    color: '#242125',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: '140%',
  },
  companyName: {
    fontSize: 32,
    marginTop: 20,
    marginBottom: 20,
    fontWeight: 300,
  },
  bold: {
    fontWeight: 'bold',
  },
  maturityOptionChosen: {
    fontSize: 18,
    marginBottom: 20,
    lineHeight: '130%',
    fontWeight: 400,
  },
  italic: {
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  totalScoreContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 22,
    marginTop: 58,
    marginBottom: 70,
  },
  scoreResultCard: {
    borderRadius: 8,
    border: '1px solid #CACACA',
    padding: '19px 27px 82px 20px',
    width: '100%',
    minWidth: 347,
    maxWidth: 347,
    minHeight: 314,
  },
  resultsFlex: {
    display: 'flex',
    alignItems: 'center',
    gap: 19,
    marginTop: 34,
  },
  progressBarContainer: {
    width: '50%',
  },
  scoreText: {
    color: '#242125',
    fontSize: 58.3328,
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: '120%',
    width: '50%',
  },
  scoreSpan: {
    overflow: 'hidden',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 1,
    color: '#242125',
    textOverflow: 'ellipsis',
    fontSize: 29.1664,
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: '120%',
  },
  totalResultCardTitle: {
    color: '#242125',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: '140%',
  },
  pillarsComparativeContainer: {
    display: 'flex',
    gap: 45,
    alignItems: 'center',
  },
  overallResponse: {
    whiteSpace: 'pre-line',
    fontSize: 16,
    lineHeight: '130%',
    background: 'aliceblue',
    padding: 20,
    borderRadius: 8,
  },
  individualPillarsContainer: {
    display: 'flex',
    gap: 12,
    alignItems: 'flex-start',
  },
  card: {
    display: 'flex',
    padding: '24px 32px',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 20,
    borderRadius: 8,
    border: '1px solid #CACACA',
    maxWidth: 202,
  },
  cardTitle: {
    overflow: 'hidden',
    color: '#888788',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: 14,
    fontWeight: 700,
    lineHeight: '160%',
    width: 137,
    textAlign: 'center',
  },
  result: {
    overflow: 'hidden',
    color: '#242125',
    textOverflow: 'ellipsis',
    fontSize: 28,
    fontWeight: 700,
    lineHeight: '120%',
    span: {
      overflow: 'hidden',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: 1,
      color: '#242125',
      textOverflow: 'ellipsis',
      fontSize: 16,
      fontWeight: 700,
      lineHeight: '120%',
    },
  },
  ScoresContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 25,
  },
  scoreWrapper: {
    display: 'flex',
    gap: 50,
    flexWrap: 'wrap',
  },
  individualPillarName: {
    marginBottom: 16,
  },
  explanationText: {
    width: '100%',
    whiteSpace: 'pre-line',
    letterSpacing: '-0.4px',
    fontWeight: 400,
    fontSize: 17,
  }
});

export default TemplatePdf;
