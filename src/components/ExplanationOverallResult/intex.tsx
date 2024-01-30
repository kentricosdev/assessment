import { useEffect, useState } from "react";
import { explanationData } from "./explanationData";
import { Text } from "./styles";


interface overallResultProps {
  totalScore: number
}

const ExplanationOverallResult: React.FC<overallResultProps> = ({ totalScore }) => {
  const [resposta, setResposta] = useState('')

  useEffect(() => {
    switch (true) {
      case totalScore >= 0 && totalScore <= 19:
        setResposta(explanationData[0].text)
        break;
      case totalScore >= 20 && totalScore <= 39:
        setResposta(explanationData[1].text)
        break;
      case totalScore >= 40 && totalScore <= 59:
        setResposta(explanationData[2].text)
        break;
      case totalScore >= 60 && totalScore <= 79:
        setResposta(explanationData[3].text)
        break;
      case totalScore >= 80 && totalScore <= 100:
        setResposta(explanationData[4].text)
        break;
      default:
        setResposta("Indefinido.");
    }
  }, [])

  return (
    <Text>{resposta}</Text>
  )
};

export default ExplanationOverallResult;
