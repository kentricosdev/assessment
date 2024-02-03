import { Page, Text, View, Document,  StyleSheet } from '@react-pdf/renderer';
import { IAssessmentScoreIndividual } from '../../../types/globalTypes';
import { explanationData } from '../../../components/ExplanationOverallResult/explanationData';
import { pillarsExplanations } from '../../../components/ModalPillarExplanation/PillarsTexts';

const TemplatePdf = (
  assessmentScoreIndividual: IAssessmentScoreIndividual,
  realMaturityLevel: string,
  personalFormData: string | null,
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

  return (
    <Document>
      <Page size="A4" style={styles.wrapper}>
        <View>
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

          <Text style={styles.xcoreTotal}>Xcore Total: {assessmentScoreIndividual.totalScore}
            <Text style={styles.xcoreTotal100}>/100</Text>
          </Text>

          <View style={styles.totalScoreContainer}>
            {/* <View style={styles.scoreResultCard}>
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
            </View> */}

            <Text style={styles.overallResponse}>{overallResultResponse}</Text>
          </View>

          <View style={styles.ScoresContainer}>
            <View style={styles.scoreWrapper}>
              {Object.entries(scoresByPillar).map(([pillarId, score]) => {
                const currentPillar = pillarsExplanations.pillars.find(pillar => pillar.id === Number(pillarId))?.texts;

                if (!currentPillar) return null;

                let currentScoreText = '';
                switch (true) {
                  case score >= 0 && score <= 19:
                    currentScoreText = currentPillar[0];
                    break;
                  case score >= 20 && score <= 39:
                    currentScoreText = currentPillar[1];
                    break;
                  case score >= 40 && score <= 59:
                    currentScoreText = currentPillar[2];
                    break;
                  case score >= 60 && score <= 79:
                    currentScoreText = currentPillar[3];
                    break;
                  case score >= 80 && score <= 100:
                    currentScoreText = currentPillar[4];
                    break;
                  default:
                    currentScoreText = 'Indefinido.';
                }

                let currentPillarName = '';
                switch (Number(pillarId)) {
                  case 1:
                    currentPillarName = 'Compreensão';
                    break;
                  case 2:
                    currentPillarName = 'Medição';
                    break;
                  case 3:
                    currentPillarName = 'Design de Experiência';
                    break;
                  case 4:
                    currentPillarName = 'Cultura e EX';
                    break;
                  case 5:
                    currentPillarName = 'Governança';
                    break;
                  case 6:
                    currentPillarName = 'Estratégia';
                    break;
                  default:
                    currentPillarName = '';
                }

                return (
                  <View key={pillarId} style={styles.individualPillarsContainer}>
                    {/* <View style={styles.card}>
                      <Text style={styles.cardTitle}>Pilar {pillarId} - {currentPillarName}</Text>

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
                          <Text style={styles.result}>{score}<Text style={styles.resultSpan}>/100</Text></Text>
                        </CircularProgressbarWithChildren>
                      </View>
                    </View> */}
                    <View>
                      <Text style={styles.individualPillarName}>{currentPillarName}</Text>
                      <Text style={styles.individualPillarScore}>
                        {score}
                        <Text style={styles.individualPillarScore100}>
                          /100
                        </Text>
                      </Text>
                      <Text style={styles.explanationText}>{currentScoreText}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
};

const styles = StyleSheet.create({
  wrapper: {
    padding: '30px 60px',
  },
  title: {
    color: '#242125',
    fontSize: 14,
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
    color: '#184E77'
  },
  maturityOptionChosen: {
    fontSize: 12,
    marginBottom: 20,
    lineHeight: '130%',
    fontWeight: 400,
  },
  italic: {
    fontStyle: 'italic',
    fontWeight: 500,
    color: '#184E77'
  },
  totalScoreContainer: {
    marginTop: 20,
    marginBottom: 20,
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
    fontSize: 13,
    lineHeight: '130%',
    background: 'aliceblue',
  },
  individualPillarsContainer: {
    marginBottom: '40px'
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
  },
  resultSpan: {
    overflow: 'hidden',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 1,
    color: '#242125',
    textOverflow: 'ellipsis',
    fontSize: 14,
    fontWeight: 700,
    lineHeight: '120%',
  },
  ScoresContainer: {
    width: '100%',
  },
  scoreWrapper: {
  },
  individualPillarName: {
    fontWeight: 500,
    color: '#184E77',
    marginBottom: 8,
  },
  explanationText: {
    width: '100%',
    whiteSpace: 'pre-line',
    letterSpacing: '-0.4px',
    fontWeight: 400,
    fontSize: 13,
  },
  xcoreTotal: {
    fontSize: 18,
    fontWeight: 500,
    color: '#184E77',
  },
  xcoreTotal100: {
    fontSize: 14,
    fontWeight: 500,
    color: '#184E77',
  },
  individualPillarScore: {
    fontSize: 18,
    fontWeight: 500,
    color: '#184E77',
    marginBottom: 16,
  },
  individualPillarScore100: {
    fontSize: 14,
    fontWeight: 500,
    color: '#184E77',
  }
});

export default TemplatePdf;
