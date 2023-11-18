// import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next/types';
import ArticleButtonGroup from '../src/components/ArticleButton/ArticleButtonGroup';
import Navbar from '../src/components/NavBar/NavBar';
import SectionGroup from '../src/components/SectionGroup/SectionGroup';
import SettingsOverlay from '../src/components/SettingsPanel/SettingsOverlay';
import { useEffect, useState } from 'react';
import Auth from '../src/db/Auth';
import axios from 'axios';
import { Article } from '../src/components/types';

type SectionDataType = {
  status: string,
  copyright: string,
  section: string,
  last_updated: string,
  num_results: number,
  results: Article[],
};

interface SectionPageProps {
  data: SectionDataType;
  route: string;
}

export default function SectionPage({ data, route }: SectionPageProps) {
  const [showModal, setShowModal] = useState<'login' | 'settings' | null>(null);
  const [uid, setUid] = useState<string | undefined | null>(null);
  const [rootSections, setRootSections] = useState<string[]>([]);

  // Check if we're logged in onload. This info is supplied by Auth component
  useEffect(() => {
    if (uid === undefined) {
      setShowModal('login');
    }
    if (uid === null) {
      setShowModal(null);
    }
  }, [uid]);

  // Filter out articles without a title or summary
  let articlesFiltered: Article[] = [];
  if (data) {
    articlesFiltered = data.results.filter(({ title, abstract }) => title.length > 0 && abstract.length > 0);
  }

  return (
    <>
      <Auth setUidState={setUid} setRootSectionsTopLevel={setRootSections}>
        <div className={`root_component_wrap${showModal !== null ? '--hide' : '--show'}`}>
          <SettingsOverlay
            showModal={showModal}
            setShowModal={setShowModal}
            closeOverlay={setShowModal.bind(null, null)}
          >
            <Navbar
              openLogin={setShowModal.bind(null, 'login')}
              openSettings={setShowModal.bind(null, 'settings')}
            />
          </SettingsOverlay>
          <SectionGroup sections={rootSections} startingSection={route} />
          {data.results ? <ArticleButtonGroup articles={articlesFiltered} /> : <p>LOADING</p>}
        </div>
      </Auth>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const section = context.query.section;
  if (section === 'favicon.ico' || !section) {
    return {
      notFound: true,
    };
  }
  context.res.setHeader('Cache-Control', 'public, s-maxage=200, stale-while-revalidate=300');
  const nyt_key = process.env.NYT_API_KEY;
  const topStoriesUrl = `https://api.nytimes.com/svc/topstories/v2/${context.query.section}.json?api-key=${nyt_key}`;
  const response = await axios.get(topStoriesUrl);
  const data = response.data;
  return {
    props: {
      data,
      route: context.query.section
    }
  };
}
