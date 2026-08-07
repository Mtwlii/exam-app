
import { useOptimistic, useState } from 'react';

export function LikeButtonOptimistic({ post }) {
  const [likes, setLikes] = useState(post.likes);
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    likes,
    (currentLikes, incrementBy) => currentLikes + incrementBy
  );

  async function handleLike() {
    addOptimisticLike(1); // instantly bump the displayed count
    const updated = await likePostOnServer(post.id); // real request
    setLikes(updated.likes); // sync with actual server value
  }

  return (
    <button onClick={handleLike}>
      ❤️ {optimisticLikes}
    </button>
  );
}

export function LikeButton({ post }) {
  const [likes, setLikes] = useState(post.likes);
  const [displayLikes, setDisplayLikes] = useState(post.likes);
  const [isPending, setIsPending] = useState(false);

  async function handleLike() {
    const previousLikes = displayLikes;

    // manually apply the optimistic update
    setDisplayLikes(prev => prev + 1);
    setIsPending(true);

    try {
      const updated = await likePostOnServer(post.id);
      setLikes(updated.likes);
      setDisplayLikes(updated.likes); // reconcile with real value
    } catch (err) {
      // manually revert on failure
      setDisplayLikes(previousLikes);
      console.error('Like failed, reverting', err);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <button onClick={handleLike} disabled={isPending}>
      ❤️ {displayLikes}
    </button>
  );
}