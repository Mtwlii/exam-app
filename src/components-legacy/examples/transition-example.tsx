import { startTransition, useEffect, useState, } from "react";

function TransitionExample() {
  const [tab, setTab] = useState('about');

  function selectTab(nextTab) {
    startTransition(() => {
      setTab(nextTab); // marked as low priority
    });
  }

  useEffect(() => {
    startTransition(() => {
      setTab('posts')
    })
  }, [tab])


  return (
    <>
      {isPending && <Spinner />}
      <TabButton onClick={() => selectTab('posts')}>Posts</TabButton>
      <PostsTab active={tab === 'posts'} />
    </>
  );
}