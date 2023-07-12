import { baseUrlMyApi } from "./constants";
import { UserRegistration, UserAuthorization, UserUpdate } from "./types";

interface Movie {
  country: string;
  director: string;
  duration: number;
  year: number;
  description: string;
  image: string;
  trailer: string;
  nameRU: string;
  nameEN: string;
  thumbnail: string;
  movieId: number;
}

class MainApi {
  private baseUrl: string;

  constructor(url: string) {
    this.baseUrl = url;
  }

  async signup(user: UserRegistration): Promise<Response> {
    const response = await fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    return response;
  }

  async signin(user: UserAuthorization): Promise<Response> {
    const response = await fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    return response;
  }

  async getUser(): Promise<Response> {
    const response = await fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    return response;
  }

  async updateUser(user: UserUpdate): Promise<Response> {
    const response = await fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(user),
    });

    return response;
  }

  async getMovies(): Promise<Response> {
    const response = await fetch(`${this.baseUrl}/movies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    return response;
  }

  async createMovie(movie: Movie): Promise<Response> {
    const response = await fetch(`${this.baseUrl}/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(movie),
    });

    return response;
  }

  async deleteMovie(movieId: string): Promise<Response> {
    const response = await fetch(`${this.baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    return response;
  }
}
const mainApi = new MainApi(
  baseUrlMyApi
);

export default mainApi;