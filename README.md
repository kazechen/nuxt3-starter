# Nuxt 3 企業級入門套件

<p align="right">
  <a href="./README.en.md">English</a> | <b>繁體中文</b>
</p>

一個功能豐富、企業級的 Nuxt 3 入門套件。旨在為構建現代化、可擴展且易於維護的 Web 應用程序提供堅實的開發基礎。

---

## ✨ 功能特性

該入門套件預置了豐富的功能，旨在加速您的開發流程：

-   **🚀 現代化技術棧**: 基於 **Nuxt 3**、**Vite** 和 **TypeScript**，提供強大且類型安全的開發體驗。
-   **🎨 UI 與樣式**:
    -   **Element Plus**: 集成了廣受歡迎的 UI 組件庫。
    -   **UnoCSS**: 按需、原子的 CSS 引擎，實現快速高效的樣式開發。
    -   **Iconify**: 通過 `@nuxt/icon` 輕鬆使用數萬個圖標，已預設 Carbon 圖標集。
-   **🗃️ 狀態管理**:
    -   **Pinia**: Vue 官方推薦的、直觀的狀態管理庫。
    -   **持久化狀態**: 使用 `pinia-plugin-persistedstate` 插件，輕鬆實現會話保持。
-   **🌐 國際化 (i18n)**:
    -   **@nuxtjs/i18n**: 全面支持多語言。
    -   **自動語言檢測**: 可根據用戶瀏覽器語言自動重定向。
-   **🔐 高級權限控制**:
    -   **路由級守衛**: 全局中間件，用於在路由切換前進行用戶身份驗證。
    -   **組件級控制**: 自定義 `v-permission` 指令，可根據用戶角色和權限精細控制頁面元素的可見性。
-   **🛠️ 開發者體驗**:
    -   **ESLint**: 使用 `@antfu/eslint-config` 進行嚴格的代碼規範檢查。
    -   **VueUse**: 提供一整套實用的組合式函數集合。
    -   **自動導入**: 組件、組合式函數和工具函數均可自動導入。
    -   **Dotenv 支持**: 輕鬆管理不同環境（如 `.env.dev`, `.env.production`）的配置文件。
-   **🔌 預集成模塊**:
    -   **富文本編輯器**: `WangEditor` 用於內容創建。
    -   **圖片裁剪**: `vue-cropper` 用於圖像處理。
    -   **拖拽功能**: `vue-draggable-next` 用於實現交互式列表。
-   **📦 網絡請求與上傳**:
    -   **請求封裝**: 基於 `$fetch` 封裝了 `useRequest`，提供統一的 `BaseURL`、認證頭和錯誤處理。
    -   **圖片上傳**: 封裝了 `useImageUpload`，簡化了文件上傳邏輯並提供加載狀態。

---

## ⚙️ 權限指令 (`v-permission`)

通過精細的邏輯控制元素的可見性。

-   **用法**: `v-permission="[權限ID, 用戶類型, 品牌名稱]"`
-   **示例**:
    -   `v-permission="[22, 1, 'some-brand']"`: 檢查權限 `22`、用戶類型 `1` 和品牌名稱 `'some-brand'`。
    -   `v-permission="[22, [1, 2]]"`: 檢查權限 `22` 以及用戶類型是否為 `1` 或 `2`。
    -   `v-permission="[22, null, 'covos']"`: 跳過用戶類型檢查。
    -   `v-permission="[22]"`: 僅檢查權限 `22`。
    -   `v-permission:debug="[22]"`: 啟用指令的調試模式，日誌將輸出到控制檯。

---

## 🚀 服務端部署

### 環境要求

-   Node.js >= 22
-   pnpm
-   pm2

### 安裝步驟

1.  **安裝 NVM (Node 版本管理器)**
    ```bash
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
    source ~/.bashrc
    ```

2.  **安裝並使用 Node.js v22**
    ```bash
    nvm install 22
    nvm use 22
    ```

3.  **安裝全局依賴**
    ```bash
    npm install -g pnpm pm2
    ```

4.  **安裝項目依賴**
    ```bash
    pnpm install
    ```

5.  **啟動服務**
    ```bash
    pnpm dev
