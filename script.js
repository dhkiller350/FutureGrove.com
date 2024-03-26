// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQCJ3oYZsrWOfC33JjA_TBFtM3dTBFeZ6Q9qPJW70NpbmMitmnOcFpgL2JpFp8uqKA-5yoS67yCsOIRCcuxJDIf5UBAvFUb5yrQeKct6M3EUlIPFFSOEbxkvQzZqyHOIasRvC4o2ozUjOMGVKknCN8VQrdIZsbm5DO7xpd-ZQ7csIM9Lj3xChQv1Q9eK359iLggv1b3AWbdKsuC2SRzykoJQ9ZBtsm8wyW6TpiGjbmHAmndBdHd7VpnFfvyY9SEWjxOkQ0I3aJ5C5ASzFL-0';
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body:JSON.stringify(body)
  });
  return await res.json();
}

async function getTopTracks(){
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return (await fetchWebApi(
    'v1/me/top/tracks?time_range=long_term&limit=5', 'GET'
  )).items;
}

const topTracks = await getTopTracks();
console.log(
  topTracks?.map(
    ({name, artists}) =>
      `${name} by ${artists.map(artist => artist.name).join(', ')}`
  )
);

// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQCJ3oYZsrWOfC33JjA_TBFtM3dTBFeZ6Q9qPJW70NpbmMitmnOcFpgL2JpFp8uqKA-5yoS67yCsOIRCcuxJDIf5UBAvFUb5yrQeKct6M3EUlIPFFSOEbxkvQzZqyHOIasRvC4o2ozUjOMGVKknCN8VQrdIZsbm5DO7xpd-ZQ7csIM9Lj3xChQv1Q9eK359iLggv1b3AWbdKsuC2SRzykoJQ9ZBtsm8wyW6TpiGjbmHAmndBdHd7VpnFfvyY9SEWjxOkQ0I3aJ5C5ASzFL-0';
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body:JSON.stringify(body)
  });
  return await res.json();
}

const topTracksIds = [
  '5j0Jfr2yehJ4xXq7XuQPs9','4KKW1xJyUoqAa8NgTSsaUg','0iBdjtSnf51q1M7ywAAxNg','3oS9E4e9ZmKMGmnICiiz9p','0rkHYLKfxKoJIgLiKsxr6x'
];

async function getRecommendations(){
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-recommendations
  return (await fetchWebApi(
    `v1/recommendations?limit=5&seed_tracks=${topTracksIds.join(',')}`, 'GET'
  )).tracks;
}

const recommendedTracks = await getRecommendations();
console.log(
  recommendedTracks.map(
    ({name, artists}) =>
      `${name} by ${artists.map(artist => artist.name).join(', ')}`
  )
);



// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQCJ3oYZsrWOfC33JjA_TBFtM3dTBFeZ6Q9qPJW70NpbmMitmnOcFpgL2JpFp8uqKA-5yoS67yCsOIRCcuxJDIf5UBAvFUb5yrQeKct6M3EUlIPFFSOEbxkvQzZqyHOIasRvC4o2ozUjOMGVKknCN8VQrdIZsbm5DO7xpd-ZQ7csIM9Lj3xChQv1Q9eK359iLggv1b3AWbdKsuC2SRzykoJQ9ZBtsm8wyW6TpiGjbmHAmndBdHd7VpnFfvyY9SEWjxOkQ0I3aJ5C5ASzFL-0';
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body:JSON.stringify(body)
  });
  return await res.json();
}

const tracksUri = [
  'spotify:track:5j0Jfr2yehJ4xXq7XuQPs9','spotify:track:0lrrOTSB1vEOEphSG8CSsD','spotify:track:4KKW1xJyUoqAa8NgTSsaUg','spotify:track:4PxhcaK06tMkZY4lO636ys','spotify:track:0iBdjtSnf51q1M7ywAAxNg','spotify:track:1bHsh7qMkmTz1cxsygMa3q','spotify:track:3oS9E4e9ZmKMGmnICiiz9p','spotify:track:1YyO0tXr2xt7LhWbw1PBFn','spotify:track:0rkHYLKfxKoJIgLiKsxr6x','spotify:track:4hArxLcGoeEMYHzqfgffT4'
];

async function createPlaylist(tracksUri){
  const { id: user_id } = await fetchWebApi('v1/me', 'GET')

  const playlist = await fetchWebApi(
    `v1/users/${user_id}/playlists`, 'POST', {
      "name": "My recommendation playlist",
      "description": "Playlist created by the tutorial on developer.spotify.com",
      "public": false
  })

  await fetchWebApi(
    `v1/playlists/${playlist.id}/tracks?uris=${tracksUri.join(',')}`,
    'POST'
  );

  return playlist;
}

const createdPlaylist = await createPlaylist(tracksUri);
console.log(createdPlaylist.name, createdPlaylist.id);




const playlistId = '28te6h1oyOPPRhJfJhU48I';

<iframe
  title="Spotify Embed: Recommendation Playlist "
  src={`https://open.spotify.com/embed/playlist/28te6h1oyOPPRhJfJhU48I?utm_source=generator&theme=0`}
  width="100%"
  height="100%"
  style={{ minHeight: '360px' }}
  frameBorder="0"
  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
  loading="lazy"
/>
