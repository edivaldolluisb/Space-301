const API_BASE_URL = 'http://localhost:8080/api/v1';

class ApiConsumer {

    static async get(endpoint) {
        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }
        return await response.json();
    }

    static async post(endpoint, data) {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(`Error posting data: ${response.statusText}`);
        }
        return await response.json();
    }

    static async put(endpoint, id, data) {
        const response = await fetch(`${API_BASE_URL}${endpoint}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(`Error updating data: ${response.statusText}`);
        }
        return await response.json();
    }

    static async delete(endpoint) {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error(`Error deleting data: ${response.statusText}`);
        }
        return response.text(); // DELETE doesn't usually return data in the body
    }

    // Specific methods for my controllers

    static async getQuotes() {
        return await this.get('/quotes');
    }

    static async addQuote(quote, movieId) {
        return await this.post(`/quotes/show/${movieId}`, quote);
    }

    static async getQuoteById(quoteId) {
        return await this.get(`/quotes/${quoteId}`);
    }

    static async updateQuote(quoteId, quoteDetails) {
        return await this.put(`/quotes`, quoteId, quoteDetails);
    }

    static async deleteQuote(quoteId) {
        return await this.delete(`/quotes/${quoteId}`);
    }

    static async getQuotesByMovieId(movieId) {
        return await this.get(`/quotes/show/${movieId}`);
    }

    static async addMovie(movie) {
        return await this.post('/shows', movie);
    }

    static async getAllMovies() {
        return await this.get('/shows');
    }
}

export default ApiConsumer;