// Helper class  - taken mostly from Treehouse React-Authentication course

import config from './config';

export default class Data {
  // Setting up api get method
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    // Setting up request path using baseurl
    const url = config.apiBaseUrl + path;

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };
    
    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    // Checking if authorization is required
    if (requiresAuth) {
      // Encoding username and password credentials
      const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
      // Setting authorization headers
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }
    // Performing fetch 
    return fetch(url, options);
  }

  
  // Making get request for users credentials
  async getUser(username, password) {
    const response = await this.api(`/users`, 'GET', null, true, { username, password });
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }

  // Making post request to create user
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }
}