import { useState } from "react";

const KEY = "FAVORITES";

type FavoritesMap = {
  [key: string]: string;
};

abstract class FavoritesService {
  public static toggleFavorite = (id: string) => {
    const favoritesRaw = localStorage.getItem(KEY);

    if (!favoritesRaw) {
      localStorage.setItem(KEY, JSON.stringify({ [id]: id }));
    } else {
      const favorites: FavoritesMap = JSON.parse(favoritesRaw);

      if (favorites[id]) {
        delete favorites[id];
      } else {
        favorites[id] = id;
      }

      localStorage.setItem(KEY, JSON.stringify(favorites));
    }
  };

  public static getFavorites = (): FavoritesMap => {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  };
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(FavoritesService.getFavorites());

  const toggleFavorite = (id: string) => {
    FavoritesService.toggleFavorite(id);
    const faves = FavoritesService.getFavorites();
    setFavorites(faves);
  };

  return { favorites, toggleFavorite };
};
