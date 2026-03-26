<script setup>
import { ref } from 'vue'

const query = ref('')
const results = ref([])
const loading = ref(false)
const error = ref('')

const TAVILY_API_KEY = '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'
const SITE_URL = 'https://guoxue-platform.github.io/guoxue-static'

async function search() {
  if (!query.value.trim()) return
  
  loading.value = true
  error.value = ''
  results.value = []
  
  try {
    const response = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        api_key: TAVILY_API_KEY,
        query: query.value + ' site:' + SITE_URL,
        max_results: 10,
        include_answer: true,
        include_raw_content: false
      })
    })
    
    if (!response.ok) throw new Error('Search failed')
    
    const data = await response.json()
    results.value = data.results || []
  } catch (e) {
    error.value = '搜索失败，请稍后重试'
  } finally {
    loading.value = false
  }
}
</script>

# 国学搜索

<style>
.search-box {
  max-width: 600px;
  margin: 2rem auto;
}
.search-input {
  width: 100%;
  padding: 0.8rem 1rem;
  font-size: 1rem;
  border: 2px solid #e5e5e5;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.2s;
}
.search-input:focus {
  border-color: #c41e3a;
}
.search-btn {
  margin-top: 1rem;
  padding: 0.6rem 2rem;
  background: #c41e3a;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
}
.search-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}
.result-item {
  padding: 1rem;
  margin: 1rem 0;
  border: 1px solid #eee;
  border-radius: 8px;
}
.result-title {
  color: #c41e3a;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}
.result-snippet {
  color: #666;
  line-height: 1.6;
}
.result-url {
  color: #999;
  font-size: 0.85rem;
  margin-top: 0.5rem;
}
.loading {
  text-align: center;
  color: #999;
  padding: 2rem;
}
.error {
  color: #c41e3a;
  text-align: center;
  padding: 1rem;
}
</style>

<div class="search-box">
  <input 
    v-model="query" 
    class="search-input" 
    placeholder="输入关键词搜索国学内容..."
    @keyup.enter="search"
  />
  <button class="search-btn" @click="search" :disabled="loading">
    {{ loading ? '搜索中...' : '搜索' }}
  </button>
</div>

<div v-if="loading" class="loading">正在搜索...</div>
<div v-if="error" class="error">{{ error }}</div>

<div v-if="results.length > 0">
  <div v-for="(r, i) in results" :key="i" class="result-item">
    <div class="result-title">{{ r.title }}</div>
    <div class="result-snippet">{{ r.snippet }}</div>
    <div class="result-url">{{ r.url }}</div>
  </div>
</div>
