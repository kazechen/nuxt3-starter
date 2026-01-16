<script setup>
import { useEventListener } from '@vueuse/core'
import dayjs from 'dayjs'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

const defaultValue = 300
const countdown = ref(defaultValue)
const expiryTime = ref(null) // 給 el-time-picker 使用的 Date 物件
const isCounting = ref(false)
const timer = ref(null)
const recordList = ref([])
const consoleList = ref([])

const customizedLog = (...args) => {
  console.log(...args)

  consoleList.value.unshift({
    time: new Date().toLocaleTimeString(),
    data: args.join(', '),
  })
}

// --- 核心邏輯：同步秒數與到期時間 ---

// 初始化或手動更改秒數時，更新到期時間
const updateExpiryByCountdown = () => {
  if (isCounting.value)
    return // 計時中不自動同步，避免干擾
  const now = new Date()
  expiryTime.value = new Date(now.getTime() + countdown.value * 1000)
}

// 在 time-picker 手動更改時間時，反推秒數
const handleExpiryChange = (val) => {
  if (!val)
    return
  const now = Date.now()
  const diff = Math.round((val.getTime() - now) / 1000)
  // 如果選的時間比現在早，視為無效或隔天（此處簡單處理為至少 0 秒）
  countdown.value = diff > 0 ? diff : 0
}

// 監聽 countdown 變化（當使用者在 input 輸入時）
watch(countdown, () => {
  if (!isCounting.value)
    updateExpiryByCountdown()
})

const stopTimer = () => {
  if (timer.value) {
    isCounting.value = false
    clearInterval(timer.value)
    timer.value = null
    customizedLog('停止計時', countdown.value, dayjs(expiryTime.value).format('YYYY-MM-DD HH:mm:ss'))
  }
}

// --- 計時器功能 ---

const handleStart = () => {
  if (timer.value)
    clearInterval(timer.value)

  if (countdown.value <= 0) {
    countdown.value = defaultValue
    updateExpiryByCountdown()
  }

  // 以啟動瞬間的 expiryTime 為準（或是根據當前 countdown 重新計算）
  const targetTime = expiryTime.value.getTime()

  isCounting.value = true
  timer.value = setInterval(() => {
    const now = Date.now()
    const remaining = Math.round((targetTime - now) / 1000)

    if (remaining <= 0) {
      countdown.value = 0
      stopTimer()
    }
    else {
      countdown.value = remaining
    }

    recordList.value.unshift({
      time: new Date().toLocaleTimeString(),
      countdown: countdown.value,
    })
  }, 1000)
}

onMounted(() => {
  updateExpiryByCountdown() // 頁面載入立即計算預設 expiryTime

  useEventListener(document, 'visibilitychange', () => {
    // 只有在回到頁面 (visible) 且計時器是「停止」狀態時才同步
    if (document.visibilityState === 'visible' && !isCounting.value) {
      customizedLog('頁面喚醒：同步待命狀態的秒數', countdown.value, dayjs(expiryTime.value).format('YYYY-MM-DD HH:mm:ss'))
      handleStart() // 恢復計時
      if (expiryTime.value) {
        const now = Date.now()
        const diff = Math.round((expiryTime.value.getTime() - now) / 1000)

        // 更新 countdown，確保它反應了當前時間到 expiryTime 的真實距離
        countdown.value = diff > 0 ? diff : 0
      }
    }
  })
})

onUnmounted(() => stopTimer())
</script>

<template>
  <div class="lab-page p-4">
    <section class="hero rounded-xl">
      <h1 class="text-4xl font-bold">
        Lab: {{ countdown }}s
      </h1>
      <div class="mt-2 opacity-80">
        state: {{ isCounting ? "計時中" : "待命" }}
      </div>
    </section>

    <div class="sticky top-20 bg-white py-4">
      <div class="text-sm text-gray-500 font-bold">
        Set countdown or time：
      </div>
      <div class="flex flex-wrap gap-2">
        <el-time-picker
          v-model="expiryTime"
          placeholder="選擇結束時間"
          :disabled="isCounting"
          format="HH:mm:ss"
          @change="handleExpiryChange"
        />

        <el-input
          v-model.number="countdown"
          type="number"
          placeholder="秒數"
          class="!w-32"
          :disabled="isCounting"
        />
        <div>
          <el-button type="primary" :disabled="isCounting" @click="handleStart">
            {{ countdown === 0 ? "Restart" : "Start" }}
          </el-button>
          <el-button type="danger" :disabled="!isCounting" @click="stopTimer">
            Pause
          </el-button>
        </div>
      </div>
    </div>
    <div
      class="flex flex-col space-y-2 p-4 border rounded-lg bg-white shadow-sm"
    >
      <el-card>
        <div class="flex justify-between items-center">
          Time record：

          <el-button size="small" @click="recordList = []">
            Clean
          </el-button>
        </div>
        <ul
          class="relative overflow-y-auto max-h-[50vh] bg-neutral-100 list-none px-2"
        >
          <li v-for="item in recordList" :key="item">
            <el-tag>
              {{ item.time }}
            </el-tag>
            {{ item.countdown }}
            <span v-show="item.countdown === 0" class="text-neutral-400">
              END
            </span>
            <el-divider class="my-0.5!" />
          </li>
        </ul>
      </el-card>
      <el-card>
        <div class="flex justify-between items-center">
          Log：

          <el-button size="small" @click="consoleList = []">
            Clean
          </el-button>
        </div>
        <ul
          class="relative overflow-y-auto max-h-[50vh] bg-neutral-100 list-none px-2"
        >
          <li v-for="item in consoleList" :key="item">
            <el-tag>
              {{ item.time }}
            </el-tag>
            {{ item.data }}
            <!-- <span v-show="item.countdown === 0" class="text-neutral-400">
              END
            </span> -->
            <el-divider class="my-0.5!" />
          </li>
        </ul>
      </el-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lab-page {
  font-family: "Roboto", sans-serif;
}
.hero {
  padding: 4rem 2rem;
  text-align: center;
  color: white;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  position: relative;
  overflow: hidden;
}
</style>
