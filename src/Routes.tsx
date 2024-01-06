import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useTransition, a } from '@react-spring/web';

import { HomeScreen, PersonalFormScreen, PillarScreen, ThanksScreen, IndividualResultScreen } from './screens';
import { useForms } from './context/forms';

const AppRoutes = () => {
  const { pillarsData, handleExit } = useForms();
  const sortedPillars = pillarsData.sort((a, b) => a.ordem - b.ordem);
  const location = useLocation();
  const transitions = useTransition(location, {
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
  });

  return (
    <>
      {transitions((styles, item) => (
        <a.div style={styles}>
          <Routes location={item}>
            <Route path="/*" element={<Navigate to="/" />} />
            <Route path="/" element={<HomeScreen />} />
            <Route path="/assessment" element={<PersonalFormScreen />} />

            {sortedPillars.map((pillar) => (
              <Route
                key={pillar.id}
                path={`/assessment/pilar-${pillar.ordem}`}
                element={<PillarScreen />}
              />
            ))}

            <Route path="/assessment/agradecimento" element={<ThanksScreen />} />
            <Route path="/assessment/resultado" element={<IndividualResultScreen />} />
          </Routes>
        </a.div>
      ))}
    </>
  );
};

export default AppRoutes;
