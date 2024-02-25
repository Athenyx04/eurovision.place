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
        title: "La Noia",
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
        title: "No Rules",
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
      {
        id: "5",
        title: "Zemrën n'dorë",
        artist: {
          id: "5",
          name: "Besa",
          imageUrl: "./imgs/al.webp",
        },
        country: {
          code: "AL",
          name: "Albania",
        },
        audioUrl:
          "https://p.scdn.co/mp3-preview/26c5f55dd590f2043a7caf9698a74259940772a7",
      },
      {
        id: "6",
        title: "Before the Party's Over",
        artist: {
          id: "6",
          name: "Mustii",
          imageUrl: "./imgs/be.webp",
        },
        country: {
          code: "BE",
          name: "Belgium",
        },
        audioUrl:
          "https://p.scdn.co/mp3-preview/2bff619e3979e8b8b08c9282b15b0b42580b3842",
      },
      {
        id: "7",
        title: "Pedestal",
        artist: {
          id: "7",
          name: "Aiko",
          imageUrl: "./imgs/cz.webp",
        },
        country: {
          code: "CZ",
          name: "Czechia",
        },
        audioUrl:
          "https://p.scdn.co/mp3-preview/9a880b10fce03fcbb548495e00e92491b05cddd2",
      },
      {
        id: "8",
        title: "SAND",
        artist: {
          id: "8",
          name: "SABA",
          imageUrl: "./imgs/dk.webp",
        },
        country: {
          code: "DK",
          name: "Denmark",
        },
        audioUrl:
          "https://p.scdn.co/mp3-preview/6dd4a0dafe301fad848c1ad1b685b400e756ebdc",
      },
      {
        id: "9",
        title: "(Nendest) narkootikumidest ei tea me (küll) midagi",
        artist: {
          id: "9",
          name: "5miinust & Puuluup",
          imageUrl: "./imgs/ee.webp",
        },
        country: {
          code: "EE",
          name: "Estonia",
        },
        audioUrl:
          "https://p.scdn.co/mp3-preview/4e300cd4d44729f6c874ac8aaa841f4c41971702",
      },
      {
        id: "10",
        title: "Mon Amour",
        artist: {
          id: "10",
          name: "Slimane",
          imageUrl: "./imgs/fr.webp",
        },
        country: {
          code: "FR",
          name: "France",
        },
        audioUrl:
          "https://p.scdn.co/mp3-preview/ad89fa428c447ac3926785c0c56fd9e6af4641e5",
      },
      {
        id: "11",
        title: "Always On The Run",
        artist: {
          id: "11",
          name: "Isaak",
          imageUrl: "./imgs/de.webp",
        },
        country: {
          code: "DE",
          name: "Germany",
        },
        audioUrl:
          "https://p.scdn.co/mp3-preview/a8471549e28c5388b2b2760725e25ec55cff8395",
      },
      {
        id: "12",
        title: "Doomsday Blue",
        artist: {
          id: "12",
          name: "Bambie Thug",
          imageUrl: "./imgs/ie.webp",
        },
        country: {
          code: "IE",
          name: "Ireland",
        },
        audioUrl:
          "https://p.scdn.co/mp3-preview/49fde0058f2cf8ca85f6dcabf529e56643e9d8f5",
      },
      {
        id: "13",
        title: "Hollow",
        artist: {
          id: "13",
          name: "Dons",
          imageUrl: "./imgs/lv.webp",
        },
        country: {
          code: "LV",
          name: "Latvia",
        },
        audioUrl:
          "https://p.scdn.co/mp3-preview/4e49f11f042ddee7c36a9d6041594d59ad54ba64",
      },
      {
        id: "14",
        title: "Fighter",
        artist: {
          id: "14",
          name: "TALI",
          imageUrl: "./imgs/lu.webp",
        },
        country: {
          code: "LU",
          name: "Luxembourg",
        },
        audioUrl:
          "https://p.scdn.co/mp3-preview/338a9e8fc79e721ef67fd4dc8ac8b8d7fc52abba",
      },
      {
        id: "15",
        title: "Loop",
        artist: {
          id: "15",
          name: "Sarah Bonnici",
          imageUrl: "./imgs/mt.webp",
        },
        country: {
          code: "MT",
          name: "Malta",
        },
        audioUrl: "",
      },
      {
        id: "16",
        title: "In The Middle",
        artist: {
          id: "16",
          name: "Natalia Barbu",
          imageUrl: "./imgs/md.webp",
        },
        country: {
          code: "MD",
          name: "Moldova",
        },
        audioUrl:
          "https://p.scdn.co/mp3-preview/639e961474e1eb8f24ab11cea8c7cb9300a95f50",
      },
      {
        id: "17",
        title: "Ulveham",
        artist: {
          id: "17",
          name: "Gåte",
          imageUrl: "./imgs/no.webp",
        },
        country: {
          code: "NO",
          name: "Norway",
        },
        audioUrl:
          "https://p.scdn.co/mp3-preview/6f2df3586fdb897955cae0cc35a88c1fb93b28e4",
      },
      {
        id: "18",
        title: "The Tower",
        artist: {
          id: "18",
          name: "LUNA",
          imageUrl: "./imgs/pl.webp",
        },
        country: {
          code: "PL",
          name: "Poland",
        },
        audioUrl:
          "https://p.scdn.co/mp3-preview/141694f25b972ad32930e8f5b3e9a3aad2ed83e4",
      },
      {
        id: "19",
        title: "Veronika",
        artist: {
          id: "19",
          name: "Raiven",
          imageUrl: "./imgs/si.webp",
        },
        country: {
          code: "SI",
          name: "Slovenia",
        },
        audioUrl:
          "https://p.scdn.co/mp3-preview/54e8a258fe9a3a4131b013d5d23bdd88848faa3e",
      },
      {
        id: "20",
        title: "Teresa & Maria",
        artist: {
          id: "20",
          name: "alyona alyona & Jerry Heil",
          imageUrl: "./imgs/ua.webp",
        },
        country: {
          code: "UA",
          name: "Ukraine",
        },
        audioUrl:
          "https://p.scdn.co/mp3-preview/8465d47338a7aa21397aa565eebfe24c2f561fb4",
      },
      {
        id: "21",
        title: "11:11",
        artist: {
          id: "21",
          name: "Megara",
          imageUrl: "./imgs/sm.webp",
        },
        country: {
          code: "SM",
          name: "San Marino",
        },
        audioUrl:
          "https://p.scdn.co/mp3-preview/0dd06ce62f44a10ed35a9c14114d78d9ed1de28f",
      },
    ],
  },
];
