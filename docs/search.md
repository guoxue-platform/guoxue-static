---
layout: doc
---

<script setup>
import { ref, onMounted } from 'vue'

const query = ref('')
const results = ref([])
const loading = ref(false)
const error = ref('')

// Tavily Search API - 直接前端调用
const TAVILY_API_KEY = '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'

async function search() {
  if (!query.value.trim()) return
  loading.value = true
  error.value = ''
  results.value = []
  
  try {
    const resp = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: TAVILY_API_KEY,
        query: query.value.trim(),
        max_results: 8,
        include_answer: true,
        include_raw_content: false
      })
    })
    if (!resp.ok) throw new Error('API请求失败')
    const data = await resp.json()
    results.value = data.results || []
    if (data.answer) {
      results.value.unshift({
        title: 'AI 摘要回答',
        snippet: data.answer,
        url: ''
      })
    }
  } catch (e) {
    error.value = '搜索失败，请稍后重试'
  } finally {
    loading.value = false
  }
}
</script>

# 🔍 国学智能搜索

::: tip 国学搜索测试版
基于 Tavily AI 搜索，整合互联网权威经典文献资料，支持经史子集四部内容智能检索。
:::

<div class="search-wrap">
  <div class="search-box">
    <input 
      v-model="query" 
      class="search-input"
      placeholder="输入关键词，如：论语、孟子、诗经、桃花源记..."
      @keyup.enter="search"
    />
    <button class="search-btn" @click="search" :disabled="loading">
      {{ loading ? '搜索中...' : '🔍 搜索' }}
    </button>
  </div>
</div>

<div v-if="error" class="error-msg">{{ error }}</div>

<div v-if="loading" class="loading">
  <div class="spinner"></div>
  <p>正在搜索...</p>
</div>

<div v-if="results.length > 0" class="results">
  <div v-for="(r, i) in results" :key="i" class="result-card">
    <div class="result-title">{{ r.title }}</div>
    <div class="result-snippet">{{ r.snippet }}</div>
    <div v-if="r.url" class="result-url">来源：{{ r.url }}</div>
  </div>
</div>

<div v-if="!loading && results.length === 0 && query" class="empty-state">
  未找到相关结果，请尝试其他关键词。
</div>

<style scoped>
.search-wrap {
  max-width: 720px;
  margin: 2rem auto;
}
.search-box {
  display: flex;
  gap: 0.5rem;
}
.search-input {
  flex: 1;
  padding: 0.75rem 1rem;
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
  padding: 0.75rem 1.5rem;
  background: #c41e3a;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  white-space: nowrap;
}
.search-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}
.result-card {
  padding: 1rem;
  margin: 1rem 0;
  border: 1px solid #eee;
  border-radius: 8px;
  background: #fafafa;
}
.result-title {
  color: #c41e3a;
  font-size: 1.05rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}
.result-snippet {
  color: #444;
  line-height: 1.7;
  font-size: 0.95rem;
}
.result-url {
  color: #999;
  font-size: 0.8rem;
  margin-top: 0.5rem;
  word-break: break-all;
}
.loading {
  text-align: center;
  padding: 3rem;
  color: #888;
}
.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #eee;
  border-top-color: #c41e3a;
  border-radius: 50%;
  margin: 0 auto 1rem;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
.error-msg {
  color: #c41e3a;
  text-align: center;
  padding: 1rem;
  background: #fff5f5;
  border-radius: 8px;
  margin-top: 1rem;
}
.empty-state {
  text-align: center;
  color: #999;
  padding: 3rem;
}
</style>
