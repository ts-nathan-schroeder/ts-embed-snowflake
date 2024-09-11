import { useState } from 'react';
import './App.css';
import { AuthType, init, LiveboardEmbed, SageEmbed, SearchEmbed } from "@thoughtspot/visual-embed-sdk/react";
import logo from './logo.png'; // Assuming the logo.png is in the src folder

enum Page {
  HOME,
  SAGE,
  SEARCH,
  LIVEBOARD,
}

const TS_URL = "https://team3.thoughtspot.cloud/";
const LIVEBOARD_ID = "d084c256-e284-4fc4-b80c-111cb606449a";
const WORKSHEET_ID = "cd252e5c-b552-49a8-821d-3eadaa049cca";

function App() {
  const [page, setPage] = useState<Page>(Page.HOME);

  init({
    thoughtSpotHost: TS_URL,
    authType: AuthType.None
  });

  return (
    <div className='h-screen w-screen'>
      {/* Header Navigation */}
      <div className='h-16 items-center w-screen border-b-2 flex flex-row space-x-8 pl-4'>
        <div>
          <img src={logo} alt="Company Logo" className="h-12" /> {/* Logo added */}
        </div>
        <div className='hover:cursor-pointer hover:text-blue-400' onClick={() => setPage(Page.LIVEBOARD)}>
          Liveboard
        </div>
        <div className='hover:cursor-pointer hover:text-blue-400' onClick={() => setPage(Page.SAGE)}>
          Sage
        </div>
        <div className='hover:cursor-pointer hover:text-blue-400' onClick={() => setPage(Page.SEARCH)}>
          Search
        </div>
      </div>

      <div className='w-full' style={{ height: 'calc(100vh - 16rem)' }}>
        {page === Page.HOME && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <h1 className="text-3xl font-bold mb-4">Welcome to the ThoughtSpot & Snowflake Demo</h1>
            <p className="text-xl mb-8">
              Experience how ThoughtSpot and Snowflake work together to provide real-time analytics, AI-driven insights, and seamless data exploration.
            </p>
            <div className="flex space-x-4">
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => setPage(Page.LIVEBOARD)}>Explore Liveboard</button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => setPage(Page.SAGE)}>Try Sage AI</button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => setPage(Page.SEARCH)}>Search Insights</button>
            </div>
          </div>
        )}

        {page === Page.LIVEBOARD && (
          <LiveboardEmbed
            frameParams={{ height: '100%', width: '100%' }}
            liveboardId={LIVEBOARD_ID}
            fullHeight={true} />
        )}

        {page === Page.SAGE && (
          <SageEmbed
            frameParams={{ height: '100%', width: '100%' }}
            dataSource={WORKSHEET_ID} />
        )}
        {page === Page.SEARCH && (
          <SearchEmbed 
          frameParams={{ height: '100%', width: '100%' }}
          dataSource={WORKSHEET_ID} />
        )}

      </div>
    </div>
  );
}

export default App;
