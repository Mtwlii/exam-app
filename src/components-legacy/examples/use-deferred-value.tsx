import { useDeferredValue, useState } from "react";

export function SearchPage() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  return (
    <>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      {/* SearchResults re-renders with the deferred (possibly stale) query */}
      <SearchResults query={deferredQuery} />
    </>
  );
}

function SearchResults({ query }) {
  const items = Array.from({ length: 100000 }, (_, index) => ({
    id: index,
    title: `Item ${index}`,
  }));


  return <div>SearchResults: {items.filter(item => item.title.includes(query)).map(item => item.title).join(', ')}</div>;
}