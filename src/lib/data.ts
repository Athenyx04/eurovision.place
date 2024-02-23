export interface Artist {
  id: string;
  name: string;
  imageUrl: string;
}

export interface Country {
  code: string;
  name: string;
}

export interface Song {
  id: string;
  title: string;
  artist: Artist;
  country: Country;
  audioUrl: string;
}

export interface Playlist {
  id: string;
  title: string;
  songs: Song[];
}

export const playlists: Playlist[] = [
  {
    id: "1",
    title: "Eurovision 2024",
    songs: [
      {
        id: "1",
        title: "ZORRA",
        artist: {
          id: "1",
          name: "Nebulossa",
          imageUrl: "./imgs/es.webp",
        },
        country: {
          code: "ES",
          name: "Spain",
        },
        audioUrl:
          "https://p.scdn.co/mp3-preview/9282f511673c6ef9466ac9ae3226c5567cc10e0f",
      },
      {
        id: "2",
        title: "La noia",
        artist: {
          id: "2",
          name: "Angelina Mango",
          imageUrl: "./imgs/it.webp",
        },
        country: {
          code: "IT",
          name: "Italy",
        },
        audioUrl:
          "https://p.scdn.co/mp3-preview/30d0318fb9390a0760632d45df42bdb9505c7a04",
      },
      {
        id: "3",
        title: "No rules!",
        artist: {
          id: "3",
          name: "Windows95man",
          imageUrl: "./imgs/fi.webp",
        },
        country: {
          code: "FI",
          name: "Finland",
        },
        audioUrl:
          "https://p.scdn.co/mp3-preview/005801d73892012d798b1020f04f2709a48f0739",
      },
      {
        id: "4",
        title: "Luktelk",
        artist: {
          id: "4",
          name: "Silvester Belt",
          imageUrl: "./imgs/lt.webp",
        },
        country: {
          code: "LT",
          name: "Lithuania",
        },
        audioUrl:
          "https://p.scdn.co/mp3-preview/58f6dcc8d9504cbc574aea7ccdaebef5aee616e4",
      },
    ],
  },
];
