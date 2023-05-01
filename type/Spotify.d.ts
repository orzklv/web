export interface Context {
  external_urls: {
    spotify: string
  }
  href: string
  type: string
  uri: string
}

export interface Album {
  album_group: string
  album_type: string
  artists: {
    external_urls: {
      [key: string]: string
    }
    href: string
    id: string
    name: string
    type: string
    uri: string
  }[]
  available_markets: string[]
  external_urls: {
    [key: string]: string
  }
  href: string
  id: string
  images: {
    height: number
    url: string
    width: number
  }[]
  name: string
  release_date: string
  release_date_precision: string
  total_tracks: number
  type: string
  uri: string
}

export interface Artist {
  external_urls: {
    [key: string]: string
  }
  href: string
  id: string
  name: string
  type: string
  uri: string
}

export interface Item {
  album: Album
  artists: Artist[]
  available_markets: string[]
  disc_number: number
  duration_ms: number
  explicit: boolean
  external_ids: {
    [key: string]: string
  }
  external_urls: {
    [key: string]: string
  }
  href: string
  id: string
  is_local: boolean
  name: string
  popularity: number
  preview_url: string
  track_number: number
  type: string
  uri: string
}

interface Spotify {
  timestamp: number
  context: Context
  progress_ms: number
  item: Item
  currently_playing_type: string
  actions: {
    disallows: {
      resuming: boolean
    }
  }
  is_playing: boolean
}
