import React from 'react'
import { useForms } from '../../context/forms';
import { TalkToUsAction, TalkToUsCard } from './styles';


const TalkToUs: React.FC  = () => {
  const { setIsContactModalOpen } = useForms();
  return (
    <TalkToUsCard>
      <img src="/icons/rocket.png" alt="Rocket" />
      <p>Quer ir mais a fundo nessa análise?</p>
      <TalkToUsAction onClick={() => setIsContactModalOpen(true)}>
        Fale com a gente
      </TalkToUsAction>
    </TalkToUsCard>
  )
}

export default TalkToUs
