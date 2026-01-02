/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import GeminiSlingshot from './components/Slingshot';
import { LanguageProvider } from './contexts/LanguageContext';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <div className="w-full h-full">
        <GeminiSlingshot />
      </div>
    </LanguageProvider>
  );
};

export default App;
