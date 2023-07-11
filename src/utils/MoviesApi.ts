import { baseUrlYaApi } from './constants';

class MoviesApi {
  private baseUrl: string;

  constructor(url: string) {
    this.baseUrl = url;
  }

  async getMovies(): Promise<Response> {
    const response = await fetch(`${this.baseUrl}/beatfilm-movies`, {
      method: 'GET',
    });

    return response;
  }
}

const moviesApi = new MoviesApi(baseUrlYaApi);
export default moviesApi;
