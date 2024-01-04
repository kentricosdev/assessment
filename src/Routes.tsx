import { Routes, Route, Navigate } from 'react-router-dom'

import { HomeScreen, PersonalFormScreen, PilarScreen } from './screens'

const pillarsData = [
  {
    id: 1,
    ordem: 1,
    texto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum..',
    aspecto: 'Cultura e EX',
    peso: 0.22,
    questoes: [
      {
        ordem: 1,
        texto: 'Lorem lorem?',
        opcoes: [
          {
            peso: 0,
            texto: 'Lorem'
          },
          {
            peso: 25,
            texto: 'Lorem'
          },
          {
            peso: 50,
            texto: 'Lorem'
          },
          {
            peso: 75,
            texto: 'Lorem'
          },
          {
            peso: 100,
            texto: 'Lorem'
          }
        ]
      },
    ]
  },
  {
    id: 2,
    ordem: 2,
    texto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    aspecto: 'Outro Aspecto',
    peso: 0.22,
    questoes: [
      {
        ordem: 1,
        texto: 'Lorem lorem?',
        opcoes: [
          {
            peso: 0,
            texto: 'Lorem'
          },
          {
            peso: 25,
            texto: 'Lorem'
          },
          {
            peso: 50,
            texto: 'Lorem'
          },
          {
            peso: 75,
            texto: 'Lorem'
          },
          {
            peso: 100,
            texto: 'Lorem'
          }
        ]
      },
    ]
  },
];

const AppRoutes = () => {
  const sortedPillars = pillarsData.sort((a, b) => a.ordem - b.ordem);

  return (
    <Routes>
      <Route path="/*" element={<Navigate to="/" />} />
      <Route path="/" element={<HomeScreen />} />
      <Route path="/assessment" element={<PersonalFormScreen />} />

      {sortedPillars.map((pillar) => (
        <Route key={pillar.id} path={`/assessment/pilar-${pillar.ordem}`} element={<PilarScreen pillarData={pillar} />} />
      ))}
    </Routes>
  )
}

export default AppRoutes


// import React from 'react';
// import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
// import { useTransition, a } from '@react-spring/web';

// import { HomeScreen, PersonalFormScreen, PilarScreen } from './screens';

// const pillarsData = [
//   {
//     id: 1,
//     ordem: 1,
//     texto: 'Lorem ipsum...',
//     aspecto: 'Cultura e EX',
//     peso: 0.22,
//     questoes: [
//       {
//         ordem: 1,
//         texto: 'Lorem lorem?',
//         opcoes: [
//           { peso: 0, texto: 'Lorem' },
//           { peso: 25, texto: 'Lorem' },
//           { peso: 50, texto: 'Lorem' },
//           { peso: 75, texto: 'Lorem' },
//           { peso: 100, texto: 'Lorem' },
//         ],
//       },
//     ],
//   },
//   {
//     id: 2,
//     ordem: 2,
//     texto: 'Lorem ipsum...',
//     aspecto: 'Outro Aspecto',
//     peso: 0.22,
//     questoes: [
//       {
//         ordem: 1,
//         texto: 'Lorem lorem?',
//         opcoes: [
//           { peso: 0, texto: 'Lorem' },
//           { peso: 25, texto: 'Lorem' },
//           { peso: 50, texto: 'Lorem' },
//           { peso: 75, texto: 'Lorem' },
//           { peso: 100, texto: 'Lorem' },
//         ],
//       },
//     ],
//   },
// ];

// const AppRoutes = () => {
//   const sortedPillars = pillarsData.sort((a, b) => a.ordem - b.ordem);
//   const location = useLocation()
//   const transitions = useTransition(location, {
//     from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
//     enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
//     leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
//   });

//   return (
//     <>
//       {transitions((styles, item) => (
//         <a.div style={styles}>
//           <Routes location={item}>
//             <Route path="/*" element={<Navigate to="/" />} />
//             <Route path="/" element={<HomeScreen />} />
//             <Route path="/assessment" element={<PersonalFormScreen />} />

//             {sortedPillars.map((pillar) => (
//               <Route key={pillar.id} path={`/assessment/pilar-${pillar.ordem}`} element={<PilarScreen pillarData={pillar} />} />
//             ))}
//             </Routes>
//         </a.div>
//       ))}
//     </>
//   );
// };

// export default AppRoutes;