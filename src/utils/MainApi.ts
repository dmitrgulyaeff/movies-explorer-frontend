import { BASE_URL_MY_API } from './constants';
import {
  UserRegistration,
  UserAuthorization,
  UserUpdate,
  createMovie,
} from './types';

class MainApi {
  private baseUrl: string;

  constructor(url: string) {
    this.baseUrl = url;
  }

  private async sendRequest(url: string, method: string, body?: object) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    const options: RequestInit = {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    };

    const response = await fetch(`${this.baseUrl}${url}`, options);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return response;
  }

  async signup(user: UserRegistration) {
    return this.sendRequest('/signup', 'POST', user);
  }

  async signin(user: UserAuthorization) {
    return this.sendRequest('/signin', 'POST', user);
  }

  async getUser() {
    return this.sendRequest('/users/me', 'GET');
  }

  async updateUser(user: UserUpdate) {
    return this.sendRequest('/users/me', 'PATCH', user);
  }

  async getMovies() {
    return this.sendRequest('/movies', 'GET');
  }

  async createMovie(movie: createMovie) {
    return this.sendRequest('/movies', 'POST', movie);
  }

  async deleteMovie(movieId: string) {
    return this.sendRequest(`/movies/${movieId}`, 'DELETE');
  }
}

const mainApi = new MainApi(BASE_URL_MY_API);

export default mainApi;
