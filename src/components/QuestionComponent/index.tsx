import React, { useEffect, useState } from 'react';
import { Container, OptionsList, Option } from './styles';
import NavigationButtons from '../../components/NavigationButtons';
import { useForms } from '../../context/forms';
import { useNavigate } from 'react-router-dom';
import { calculateScoresIndividual } from '../../Functions/calculateScoresIndividual';
import { PillarData } from '../../types/globalTypes';

interface Question {
  texto: string;
  ordem: number;
  opcoes: {
    peso: number;
    texto: string;
  }[]
}

interface QuestionComponentProps {
  questions: Question[];
  currentPillar: PillarData;
}

const QuestionComponent: React.FC<QuestionComponentProps> = ({ questions, currentPillar }) => {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, number>>({});
  const { updateAnswers, pillarsData, updateScore } = useForms();
  const navigate = useNavigate();
  const storedSelectedOptions = localStorage.getItem('selectedOptions');
  const [isOptionSelected, setIsOptionSelected] = useState(storedSelectedOptions ? true : false);

  useEffect(() => {
    if (storedSelectedOptions) {
      setSelectedOptions(JSON.parse(storedSelectedOptions));
    }
  }, []);

  useEffect(() => {
    const storedOptions = localStorage.getItem('selectedOptions');
    const currentOptions = storedOptions ? JSON.parse(storedOptions) : {};

    const updatedOptions = {
      ...currentOptions,
      ...selectedOptions
    };

    localStorage.setItem('selectedOptions', JSON.stringify(updatedOptions));
  }, [selectedOptions]);


  const handleOptionChange = (questionOrder: number, optionWeight: number) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [`${questionOrder}-${currentPillar.ordem}`]: optionWeight,
    }));
    setIsOptionSelected(true);
  };

  const handleSeeResultClick = () => {
    const answers = Object.keys(selectedOptions).map((key) => {
      const [questionOrder, pillarId] = key.split('-');
      const currentPillarData = pillarsData.find(pillar => pillar.ordem === parseInt(pillarId, 10));

      return {
        pilarId: parseInt(pillarId, 10),
        pilarPeso: currentPillarData?.peso || 0,
        perguntas: [
          {
            ordem: questionOrder,
            resposta: {
              peso: selectedOptions[key],
            },
          },
        ],
      };
    });
    const result = { respostasPessoa: answers };
    updateAnswers(result);

    const scores = calculateScoresIndividual(result)
    updateScore(scores);

    navigate('/assessment/agradecimento')
  };



  return (
    <Container>
      {questions
      .sort((a, b) => a.ordem - b.ordem)
      .map((currentQuestion) => (
        <div key={currentQuestion.ordem}>
          {/* <h3>
            {pillarsData.some(pillar => pillar.questoes.length > 1) ?
               currentQuestion.ordem : currentPillar.ordem
            }. {currentQuestion.texto}
          </h3> */}
          <OptionsList>
            {currentQuestion.opcoes
              .sort((a, b) => a.peso - b.peso)
              .map((option, optionIndex) => (
                <Option key={optionIndex}>
                  <input
                    type="radio"
                    name={`question-${currentQuestion.ordem}-${currentPillar.ordem}`}
                    id={`option-${currentQuestion.ordem}-${option.peso}-${currentPillar.ordem}`}
                    value={option.peso}
                    checked={selectedOptions[`${currentQuestion.ordem}-${currentPillar.ordem}`] === option.peso}
                    onChange={() => handleOptionChange(currentQuestion.ordem, option.peso)}
                  />
                  <label htmlFor={`option-${currentQuestion.ordem}-${option.peso}-${currentPillar.ordem}`}>
                    {option.texto}
                  </label>
                </Option>
              ))}
          </OptionsList>
        </div>
      ))}
      <NavigationButtons onSeeResultClick={handleSeeResultClick} isOptionSelected={isOptionSelected}/>
    </Container>
  );
};

export default QuestionComponent;
