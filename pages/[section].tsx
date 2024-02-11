// import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next/types';
import Navbar from '../src/components/NavBar/NavBar';
import SectionGroup from '../src/components/SectionGroup/SectionGroup';
import SettingsOverlay from '../src/components/SettingsPanel/SettingsOverlay';
import { useEffect, useState, useRef } from 'react';
import Auth from '../src/db/Auth';
import axios from 'axios';
import { Article } from '../src/components/types';
import ShowArticleWithPlaceholder from '@/components/ShowArticlesWithPlaceholder/ShowArticlesWithPlaceholder';
import { LRUCache } from 'lru-cache';

export type SectionDataType = {
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
  const [isNavigating, setIsNavigating] = useState<boolean>(true);
  const prevProps = useRef<SectionDataType>();
  // Check if we're logged in onload. This info is supplied by Auth component
  useEffect(() => {
    if (uid === undefined) {
      setShowModal('login');
    }
    if (uid === null) {
      setShowModal(null);
    }
  }, [uid]);


  useEffect(() => {
    if (data && prevProps.current !== data) {
      setIsNavigating(false);
    }
    if (data) {
      prevProps.current = data;
    }
  }, [data]);

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
          <SectionGroup
            setIsNav={setIsNavigating}
            sections={rootSections} startingSection={route}
          />
          <ShowArticleWithPlaceholder setIsNavigating={setIsNavigating} isNavigating={isNavigating} data={data} />
        </div>
      </Auth>
    </>
  );
}

const options = {
  max: 1000 * 60 * 5, // maxAge 5 minutes
};
const cache = new LRUCache(options);

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const section = context.query.section;
  if (section === 'favicon.ico' || !section) {
    return {
      notFound: true,
    };
  }

  let data;
  const cacheKey = `topStories-${section}`;
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    console.log('Serving from cache');
    data = cachedData;
  } else {
    console.log('Fetching from API');
    const topStoriesUrl = `https://api.nytimes.com/svc/topstories/v2/${context.query.section}.json?api-key=${process.env.NYT_API_KEY}`;
    const response = await axios.get(topStoriesUrl);
    data = response.data;
    cache.set(cacheKey, data);
  }

  context.res.setHeader('Cache-Control', 'public, s-maxage=720, stale-while-revalidate=820');

  return {
    props: {
      data,
      route: context.query.section
    }
  };
}
