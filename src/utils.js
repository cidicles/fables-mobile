export function truncate(str, len) {
  return str.length > len ? `${str.substring(0,len)}...` : str;
}

export const goFetch = (method, url, postData, jwt) => {

  let settings = {
    method,
    credentials: 'omit',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };

  if(postData){
    settings.body = JSON.stringify(postData);
  }

  if(jwt){
    settings.headers['Authorization'] = `Bearer ${jwt}`;
  }

  return fetch(url, settings).then(response => {
    if(response.status === 401){
      return Object.assign({ error: { message: 'You must be signed in to perform this action.' }})
    }
    return response.json().then(json => {
      return response.ok ? json : Object.assign({ error: json });
    });
  });
}

export const AuthenticatedOwner = (creator, owner) => {
  if(creator === owner){
    return true;
  }
  return false;
}
