import React, { useState } from 'react';
import { Container, OptionsList, Option } from './styles';
import NavigationButtons from '../../components/NavigationButtons';

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
  currentPillar: number;
}

const QuestionComponent: React.FC<QuestionComponentProps> = ({ questions, currentPillar }) => {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, number>>({});

  const handleOptionChange = (questionOrder: number, optionWeight: number) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [`${questionOrder}-${currentPillar}`]: optionWeight,
    }));
  };

  return (
    <Container>
      {questions.map((currentQuestion) => (
        <div key={currentQuestion.ordem}>
          <h3>{currentPillar}. {currentQuestion.texto}</h3>
          <OptionsList>
            {currentQuestion.opcoes
              .sort((a, b) => a.peso - b.peso)
              .map((option, index) => (
                <Option key={index}>
                  <input
                    type="radio"
                    name={`question-${currentQuestion.ordem}-${currentPillar}`}
                    id={`option-${currentQuestion.ordem}-${option.peso}-${currentPillar}`}
                    value={option.peso}
                    checked={selectedOptions[`${currentQuestion.ordem}-${currentPillar}`] === option.peso}
                    onChange={() => handleOptionChange(currentQuestion.ordem, option.peso)}
                  />
                  <label htmlFor={`option-${currentQuestion.ordem}-${option.peso}-${currentPillar}`}>
                    {option.texto}
                  </label>
                </Option>
              ))}
          </OptionsList>
        </div>
      ))}
      <NavigationButtons currentPillar={currentPillar}/>
    </Container>
  );
};

export default QuestionComponent;
