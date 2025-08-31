
class GroqSuggestionService {
  private apiKey: string
  private baseUrl = 'https://api.groq.com/openai/v1/chat/completions'

  constructor() {
    this.apiKey = import.meta.env.VITE_GROQ_API_KEY
    if (!this.apiKey) {
      console.warn('Groq API key not found in environment variables')
    }
  }

  async generateSuggestions(query: string): Promise<string[]> {
    if (!this.apiKey || !query.trim()) {
      return []
    }

    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [
            {
              role: 'system',
              content: `You are a smart search suggestion generator. Given a partial search query, generate 6-8 relevant URL suggestions that a user might want to visit. 

Rules:
- Return only valid URLs starting with https://
- Include popular websites that match the query
- Include specific pages/searches when relevant
- Mix general sites with specific content
- Keep suggestions diverse and useful
- Return ONLY a JSON array of strings, no other text

Examples:
Query: "you" → ["https://youtube.com", "https://youtube.com/trending", "https://youtu.be", "https://young.com"]
Query: "git" → ["https://github.com", "https://gitlab.com", "https://git-scm.com", "https://github.com/trending"]`
            },
            {
              role: 'user',
              content: `Generate URL suggestions for: "${query}"`
            }
          ],
          max_tokens: 200,
          temperature: 0.7,
        }),
      })

      if (!response.ok) {
        throw new Error(`Groq API error: ${response.status}`)
      }

      const data = await response.json()
      const content = data.choices[0]?.message?.content

      if (!content) {
        return []
      }

      // Parse the JSON response
      try {
        const suggestions = JSON.parse(content)
        return Array.isArray(suggestions) ? suggestions.slice(0, 8) : []
      } catch {
        // Fallback: extract URLs from text response
        const urlRegex = /https?:\/\/[^\s\]"]+/g
        const matches = content.match(urlRegex) || []
        return matches.slice(0, 8)
      }
    } catch (error) {
      console.error('Error generating AI suggestions:', error)
      return []
    }
  }
}

export const groqSuggestions = new GroqSuggestionService()
