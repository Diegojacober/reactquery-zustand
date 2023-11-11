import { useCallback } from "react";
import "./App.css";
import Card from "./components/Card";
import useFetchRepos from "./queries/repo";
import useFavoriteRepoStore from "./store/useFavoriteRepos";

function App() {
  const { data } = useFetchRepos("diegojacober");

  const [favorites, addToFavorites, removeFromFavorites] = useFavoriteRepoStore(
    (state) => [
      state.favoriteRepoIds,
      state.addToFavorites,
      state.removeToFavorites,
    ]
  );

  const handleAddToFavorites = useCallback((repoId: number) => {
    addToFavorites(repoId)
  }, [])

  const handleRemoveFromFavorites = useCallback((repoId: number) => {
    removeFromFavorites(repoId)
  }, [])

  return (
    <>
      {data?.map((repo) => (
        <Card
          key={repo.id}
          repo={repo}
          addToFavorites={handleAddToFavorites}
          removeFromFavorites={handleRemoveFromFavorites}
          isFavorite={favorites.includes(repo.id)}
        />
      ))}
    </>
  );
}

export default App;
