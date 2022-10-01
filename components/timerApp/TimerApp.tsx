import dynamic from 'next/dynamic';

const DynamicComponentWithNoSSR = dynamic(() => import('./TimerAppInner'), {
  ssr: false
});

function Home() {
  return (
    <div>
      <p>here...</p>
      <DynamicComponentWithNoSSR />
    </div>
  );
}

export default Home;
