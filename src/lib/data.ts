export const CLOUDFRONT_DOMAIN = 'https://d9b4wd4n2m1ts.cloudfront.net'

export interface Artist {
  id: string
  name: string
  imageUrl: string
}

export interface Country {
  code: string
  name: string
}

export interface Song {
  id: string
  title: string
  artist: Artist
  country: Country
  groups: string[]
  audioUrl: string
}

export interface Playlist {
  id: string
  title: string
  songs: Song[]
}

export const playlists: Playlist[] = [
  {
    id: '1',
    title: 'Eurovision 2024',
    songs: [
      {
        id: '2',
        title: 'La Noia',
        artist: {
          id: '2',
          name: 'Angelina Mango',
          imageUrl: `${CLOUDFRONT_DOMAIN}/imgs/it.webp`
        },
        country: {
          code: 'IT',
          name: 'Italy'
        },
        groups: ['Big 5 + Host'],
        audioUrl:
          'https://p.scdn.co/mp3-preview/30d0318fb9390a0760632d45df42bdb9505c7a04'
      },
      {
        id: '4',
        title: 'Luktelk',
        artist: {
          id: '4',
          name: 'Silvester Belt',
          imageUrl: `${CLOUDFRONT_DOMAIN}/imgs/lt.webp`
        },
        country: {
          code: 'LT',
          name: 'Lithuania'
        },
        groups: ['Semifinal 1', 'Baltics'],
        audioUrl:
          'https://p.scdn.co/mp3-preview/58f6dcc8d9504cbc574aea7ccdaebef5aee616e4'
      },
      {
        id: '24',
        title: 'We Will Rave',
        artist: {
          id: '24',
          name: 'Kaleen',
          imageUrl: `${CLOUDFRONT_DOMAIN}/imgs/at.webp`
        },
        country: {
          code: 'AT',
          name: 'Austria'
        },
        groups: ['Semifinal 2'],
        audioUrl:
          'https://p.scdn.co/mp3-preview/35a1c0b5c8d9918d620e1e6e551309468ec15432?cid=8701b86cc5714dbaba06f075ea5c4745'
      },
      {
        id: '36',
        title: 'The Code',
        artist: {
          id: '36',
          name: 'Nemo',
          imageUrl: `${CLOUDFRONT_DOMAIN}/imgs/ch.webp`
        },
        country: {
          code: 'CH',
          name: 'Switzerland'
        },
        groups: ['Semifinal 2'],
        audioUrl:
          'https://p.scdn.co/mp3-preview/e2cef9b3f240bcef7771b1e8b0edc2d6e17e8635'
      },
      {
        id: '18',
        title: 'The Tower',
        artist: {
          id: '18',
          name: 'LUNA',
          imageUrl: `${CLOUDFRONT_DOMAIN}/imgs/pl.webp`
        },
        country: {
          code: 'PL',
          name: 'Poland'
        },
        groups: ['Semifinal 1'],
        audioUrl:
          'https://p.scdn.co/mp3-preview/141694f25b972ad32930e8f5b3e9a3aad2ed83e4'
      },
      {
        id: '1',
        title: 'ZORRA',
        artist: {
          id: '1',
          name: 'Nebulossa',
          imageUrl: `${CLOUDFRONT_DOMAIN}/imgs/es.webp`
        },
        country: {
          code: 'ES',
          name: 'Spain'
        },
        groups: ['Big 5 + Host'],
        audioUrl:
          'https://p.scdn.co/mp3-preview/9282f511673c6ef9466ac9ae3226c5567cc10e0f'
      },
      {
        id: '7',
        title: 'Pedestal',
        artist: {
          id: '7',
          name: 'Aiko',
          imageUrl: `${CLOUDFRONT_DOMAIN}/imgs/cz.webp`
        },
        country: {
          code: 'CZ',
          name: 'Czechia'
        },
        groups: ['Semifinal 2'],
        audioUrl:
          'https://p.scdn.co/mp3-preview/9a880b10fce03fcbb548495e00e92491b05cddd2'
      },
      {
        id: '32',
        title: 'Europapa',
        artist: {
          id: '32',
          name: 'Joost Klein',
          imageUrl: `${CLOUDFRONT_DOMAIN}/imgs/nl.webp`
        },
        country: {
          code: 'NL',
          name: 'Netherlands'
        },
        groups: ['Semifinal 2'],
        audioUrl:
          'https://p.scdn.co/mp3-preview/212bf69504040f28afc9bf6cee27c7795d963f3c'
      },
      {
        id: '12',
        title: 'Doomsday Blue',
        artist: {
          id: '12',
          name: 'Bambie Thug',
          imageUrl: `${CLOUDFRONT_DOMAIN}/imgs/ie.webp`
        },
        country: {
          code: 'IE',
          name: 'Ireland'
        },
        groups: ['Semifinal 1'],
        audioUrl:
          'https://p.scdn.co/mp3-preview/49fde0058f2cf8ca85f6dcabf529e56643e9d8f5'
      },
      {
        id: '3',
        title: 'No Rules',
        artist: {
          id: '3',
          name: 'Windows95man',
          imageUrl: `${CLOUDFRONT_DOMAIN}/imgs/fi.webp`
        },
        country: {
          code: 'FI',
          name: 'Finland'
        },
        groups: ['Semifinal 1', 'Nordics'],
        audioUrl:
          'https://p.scdn.co/mp3-preview/005801d73892012d798b1020f04f2709a48f0739'
      },
      {
        id: '6',
        title: "Before the Party's Over",
        artist: {
          id: '6',
          name: 'Mustii',
          imageUrl: `${CLOUDFRONT_DOMAIN}/imgs/be.webp`
        },
        country: {
          code: 'BE',
          name: 'Belgium'
        },
        groups: ['Semifinal 2'],
        audioUrl:
          'https://p.scdn.co/mp3-preview/2bff619e3979e8b8b08c9282b15b0b42580b3842'
      },
      {
        id: '21',
        title: '11:11',
        artist: {
          id: '21',
          name: 'Megara',
          imageUrl: `${CLOUDFRONT_DOMAIN}/imgs/sm.webp`
        },
        country: {
          code: 'SM',
          name: 'San Marino'
        },
        groups: ['Semifinal 2'],
        audioUrl:
          'https://p.scdn.co/mp3-preview/0dd06ce62f44a10ed35a9c14114d78d9ed1de28f'
      },
      {
        id: '20',
        title: 'Teresa & Maria',
        artist: {
          id: '20',
          name: 'alyona alyona & Jerry Heil',
          imageUrl: `${CLOUDFRONT_DOMAIN}/imgs/ua.webp`
        },
        country: {
          code: 'UA',
          name: 'Ukraine'
        },
        groups: ['Semifinal 1'],
        audioUrl:
          'https://p.scdn.co/mp3-preview/8465d47338a7aa21397aa565eebfe24c2f561fb4'
      },
      {
        id: '37',
        title: 'Dizzy',
        artist: {
          id: '37',
          name: 'Olly Alexander',
          imageUrl: `${CLOUDFRONT_DOMAIN}/imgs/gb.webp`
        },
        country: {
          code: 'GB',
          name: 'United Kingdom'
        },
        groups: ['Big 5 + Host'],
        audioUrl:
          'https://p.scdn.co/mp3-preview/8bb33c85bba957840c1f6539db12c649b39d9f07'
      },
      {
        id: '10',
        title: 'Mon Amour',
        artist: {
          id: '10',
          name: 'Slimane',
          imageUrl: `${CLOUDFRONT_DOMAIN}/imgs/fr.webp`
        },
        country: {
          code: 'FR',
          name: 'France'
        },
        groups: ['Big 5 + Host'],
        audioUrl:
          'https://p.scdn.co/mp3-preview/ad89fa428c447ac3926785c0c56fd9e6af4641e5'
      },
      {
        id: '19',
        title: 'Veronika',
        artist: {
          id: '19',
          name: 'Raiven',
          imageUrl: `${CLOUDFRONT_DOMAIN}/imgs/si.webp`
        },
        country: {
          code: 'SI',
          name: 'Slovenia'
        },
        groups: ['Semifinal 1', 'Balkans'],
        audioUrl:
          'https://p.scdn.co/mp3-preview/54e8a258fe9a3a4131b013d5d23bdd88848faa3e'
      },
      {
        id: '8',
        title: 'SAND',
        artist: {
          id: '8',
          name: 'SABA',
          imageUrl: `${CLOUDFRONT_DOMAIN}/imgs/dk.webp`
        },
        country: {
          code: 'DK',
          name: 'Denmark'
        },
        groups: ['Semifinal 2', 'Nordics'],
        audioUrl:
          'https://p.scdn.co/mp3-preview/6dd4a0dafe301fad848c1ad1b685b400e756ebdc'
      },
      {
        id: '9',
        title: '(Nendest) narkootikumidest ei tea me (küll) midagi',
        artist: {
          id: '9',
          name: '5miinust & Puuluup',
          imageUrl: `${CLOUDFRONT_DOMAIN}/imgs/ee.webp`
        },
        country: {
          code: 'EE',
          name: 'Estonia'
        },
        groups: ['Semifinal 2', 'Baltics'],
        audioUrl:
          'https://p.scdn.co/mp3-preview/4e300cd4d44729f6c874ac8aaa841f4c41971702'
      },
      {
        id: '34',
        title: 'Ramonda',
        artist: {
          id: '34',
          name: 'Teya Dora',
          imageUrl: `${CLOUDFRONT_DOMAIN}/imgs/rs.webp`
        },
        country: {
          code: 'RS',
          name: 'Serbia'
        },
        groups: ['Semifinal 1', 'Balkans'],
        audioUrl:
          'https://p.scdn.co/mp3-preview/61ce3a423bb1ded421b2148fa3e53e7bb972f53a'
      },
      {
        id: '14',
        title: 'Fighter',
        artist: {
          id: '14',
          name: 'TALI',
          imageUrl: `${CLOUDFRONT_DOMAIN}/imgs/lu.webp`
        },
        country: {
          code: 'LU',
          name: 'Luxembourg'
        },
        groups: ['Semifinal 1'],
        audioUrl:
          'https://p.scdn.co/mp3-preview/338a9e8fc79e721ef67fd4dc8ac8b8d7fc52abba'
      },
      {
        id: '11',
        title: 'Always On The Run',
        artist: {
          id: '11',
          name: 'Isaak',
          imageUrl: `${CLOUDFRONT_DOMAIN}/imgs/de.webp`
        },
        country: {
          code: 'DE',
          name: 'Germany'
        },
        groups: ['Big 5 + Host'],
        audioUrl:
          'https://p.scdn.co/mp3-preview/a8471549e28c5388b2b2760725e25ec55cff8395'
      },
      {
        id: '27',
        title: 'Liar',
        artist: {
          id: '27',
          name: 'Silia Kapsis',
          imageUrl: `${CLOUDFRONT_DOMAIN}/imgs/cy.webp`
        },
        country: {
          code: 'CY',
          name: 'Cyprus'
        },
        groups: ['Semifinal 1'],
        audioUrl:
          'https://p.scdn.co/mp3-preview/1bd07c733544c350e5c849a85009aa2dfc555a74'
      },
      {
        id: '26',
        title: 'Rim Tim Tagi Dim',
        artist: {
          id: '26',
          name: 'Baby Lasagna',
          imageUrl: `${CLOUDFRONT_DOMAIN}/imgs/hr.webp`
        },
        country: {
          code: 'HR',
          name: 'Croatia'
        },
        groups: ['Semifinal 1', 'Balkans'],
        audioUrl:
          'https://p.scdn.co/mp3-preview/ae09dedf617df294dc767e51396a085e158c54c4'
      },
      {
        id: '16',
        title: 'In The Middle',
        artist: {
          id: '16',
          name: 'Natalia Barbu',
          imageUrl: `${CLOUDFRONT_DOMAIN}/imgs/md.webp`
        },
        country: {
          code: 'MD',
          name: 'Moldova'
        },
        groups: ['Semifinal 1'],
        audioUrl:
          'https://p.scdn.co/mp3-preview/639e961474e1eb8f24ab11cea8c7cb9300a95f50'
      },
      {
        id: '17',
        title: 'Ulveham',
        artist: {
          id: '17',
          name: 'Gåte',
          imageUrl: `${CLOUDFRONT_DOMAIN}/imgs/no.webp`
        },
        country: {
          code: 'NO',
          name: 'Norway'
        },
        groups: ['Semifinal 2', 'Nordics'],
        audioUrl:
          'https://p.scdn.co/mp3-preview/6f2df3586fdb897955cae0cc35a88c1fb93b28e4'
      },
      {
        id: '5',
        title: 'TiTAN',
        artist: {
          id: '5',
          name: 'Besa',
          imageUrl: `${CLOUDFRONT_DOMAIN}/imgs/al.webp`
        },
        country: {
          code: 'AL',
          name: 'Albania'
        },
        groups: ['Semifinal 2', 'Balkans'],
        audioUrl:
          'https://p.scdn.co/mp3-preview/cb28cbb33387f7765da43b7193d21ca068d68219'
      },
      {
        id: '15',
        title: 'Loop',
        artist: {
          id: '15',
          name: 'Sarah Bonnici',
          imageUrl: `${CLOUDFRONT_DOMAIN}/imgs/mt.webp`
        },
        country: {
          code: 'MT',
          name: 'Malta'
        },
        groups: ['Semifinal 2'],
        audioUrl:
          'https://p.scdn.co/mp3-preview/19e672681da624bad492a6c7ebf1181e021a9696'
      },
      {
        id: '13',
        title: 'Hollow',
        artist: {
          id: '13',
          name: 'Dons',
          imageUrl: `${CLOUDFRONT_DOMAIN}/imgs/lv.webp`
        },
        country: {
          code: 'LV',
          name: 'Latvia'
        },
        groups: ['Semifinal 2', 'Baltics'],
        audioUrl:
          'https://p.scdn.co/mp3-preview/4e49f11f042ddee7c36a9d6041594d59ad54ba64'
      },
      {
        id: '30',
        title: 'Scared Of Heights',
        artist: {
          id: '30',
          name: 'Hera Björk',
          imageUrl: `${CLOUDFRONT_DOMAIN}/imgs/is.webp`
        },
        country: {
          code: 'IS',
          name: 'Iceland'
        },
        groups: ['Semifinal 1', 'Nordics'],
        audioUrl:
          'https://p.scdn.co/mp3-preview/c0bdea115967a84838331f013a9243bc1bcd2511'
      },
      {
        id: '29',
        title: 'Zari',
        artist: {
          id: '29',
          name: 'Marina Satti',
          imageUrl: `${CLOUDFRONT_DOMAIN}/imgs/gr.webp`
        },
        country: {
          code: 'GR',
          name: 'Greece'
        },
        groups: ['Semifinal 2', 'Balkans'],
        audioUrl:
          'https://p.scdn.co/mp3-preview/8045da7e62384a51b05f5ee1b7881c2048757fd6'
      },
      {
        id: '28',
        title: 'Firefighter',
        artist: {
          id: '28',
          name: 'Nutsa Buzaladze',
          imageUrl: `${CLOUDFRONT_DOMAIN}/imgs/ge.webp`
        },
        country: {
          code: 'GE',
          name: 'Georgia'
        },
        groups: ['Semifinal 2'],
        audioUrl:
          'https://p.scdn.co/mp3-preview/8c02deb99dd0e99954e00d13266c36d8b71bc347'
      },
      {
        id: '31',
        title: 'Hurricane',
        artist: {
          id: '31',
          name: 'Eden Golan',
          imageUrl: `${CLOUDFRONT_DOMAIN}/imgs/il.webp`
        },
        country: {
          code: 'IL',
          name: 'Israel'
        },
        groups: ['Semifinal 2'],
        audioUrl: ''
      },
      {
        id: '22',
        title: 'Jako',
        artist: {
          id: '22',
          name: 'LADANIVA',
          imageUrl: `${CLOUDFRONT_DOMAIN}/imgs/am.webp`
        },
        country: {
          code: 'AM',
          name: 'Armenia'
        },
        groups: ['Semifinal 2'],
        audioUrl:
          'https://p.scdn.co/mp3-preview/2d43fe264f0f57b62996f3bccbde74c1f7731cc5'
      },
      {
        id: '23',
        title: 'One Milkali (One Blood)',
        artist: {
          id: '23',
          name: 'Electric Fields',
          imageUrl: `${CLOUDFRONT_DOMAIN}/imgs/au.webp`
        },
        country: {
          code: 'AU',
          name: 'Australia'
        },
        groups: ['Semifinal 1'],
        audioUrl:
          'https://p.scdn.co/mp3-preview/606433c98fd1f294980ac69de0225e21dc5c0e02'
      },
      {
        id: '25',
        title: 'Özünlə Apar',
        artist: {
          id: '25',
          name: 'FAHREE feat. Ilkin Dovlatov',
          imageUrl: `${CLOUDFRONT_DOMAIN}/imgs/az.webp`
        },
        country: {
          code: 'AZ',
          name: 'Azerbaijan'
        },
        groups: ['Semifinal 1'],
        audioUrl: ''
      },
      {
        id: '33',
        title: 'Grito',
        artist: {
          id: '33',
          name: 'Iolanda',
          imageUrl: `${CLOUDFRONT_DOMAIN}/imgs/pt.webp`
        },
        country: {
          code: 'PT',
          name: 'Portugal'
        },
        groups: ['Semifinal 1'],
        audioUrl:
          'https://p.scdn.co/mp3-preview/ee4d2cb4f31e1f65a4038ed4806808e525ce0376'
      },
      {
        id: '35',
        title: 'Unforgettable',
        artist: {
          id: '35',
          name: 'Marcus & Martinus',
          imageUrl: `${CLOUDFRONT_DOMAIN}/imgs/se.webp`
        },
        country: {
          code: 'SE',
          name: 'Sweden'
        },
        groups: ['Big 5 + Host', 'Nordics'],
        audioUrl:
          'https://p.scdn.co/mp3-preview/b0f8146b036f3b5ef6d5abf877dea327bfe6c606'
      }
    ]
  }
]
