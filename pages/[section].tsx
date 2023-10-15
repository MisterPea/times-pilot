// import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next/types';
import ArticleButtonGroup, { Article } from '../src/components/ArticleButton/ArticleButtonGroup';
import Navbar from '../src/components/NavBar/NavBar';
import SectionGroup from '../src/components/SectionGroup/SectionGroup';
import newsSections from '@/helpers/newsSections';

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
}

export default function SectionPage({ data }: SectionPageProps) {
  // Filter out articles without a title or summary
  let articlesFiltered: Article[] = [];
  console.log(data);
  if (data) {
    articlesFiltered = data.results.filter(({ title, abstract }) => title.length > 0 && abstract.length > 0);
  }
  return (
    <>
      <Navbar />
      <SectionGroup sections={newsSections} startingSection="us" />
      {data.results ? <ArticleButtonGroup articles={articlesFiltered} /> : <p>LOADING</p>}
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const topStoriesUrl = `https://api.nytimes.com/svc/topstories/v2/${context.query.section}.json?api-key=${process.env.NYT_API_KEY}`;
  const result = await fetch(topStoriesUrl);
  const data = await result.json();
  return {
    props: {
      data
    }
  };
}