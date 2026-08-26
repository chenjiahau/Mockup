# Network Topology 開發說明

## 使用的套件

- `@xyflow/react`：拓撲畫布、node、edge、handle、縮放、平移、Fit view 與 edge label。
- `elkjs`：Enterprise 與 Data Center Fabric 的初始節點自動排版。

這兩個套件各自負責不同工作：ELK 只計算初始 layout；React Flow 依 layout 渲染畫布並管理互動與連線。

## 資料模型

目前 `src/App.tsx` 內使用 fixture 模擬 API 資料：

- `nodeData`：設備 ID、名稱、MAC、設備類型與 Fabric role。
- `connections`：source、target、link type。

正式串接 API 時，應將 `devices[]` 轉成 node data，將 `links[]` 轉成 connection data；node ID 使用 `deviceId`，edge ID 使用 `links[].id`。

## Layout

畫面分成同一個 React Flow canvas 裡的兩個 group node：

- `enterprise`：一般 Enterprise 設備。
- `fabric`：淺灰背景的 Data Center Fabric area。

`useEffect` 呼叫 ELK 的 layered layout，分別計算兩個 area 的子節點：

- Enterprise：`DOWN` direction，依一般 wired links 形成樹狀層級。
- Fabric：`DOWN` direction，Spine 會在上方，Border Leaf／Leaf 在下方。

ELK 回傳的 `x`、`y` 直接寫入 React Flow node 的 `position`。Fabric layout 會依 group 寬高套用 offset 置中，避免節點固定在左上角。

不需要手動計算節點座標。

## Nodes 與收合

每個設備使用自訂 `DeviceNode`：

- React Flow `Handle` 定義連線可附著的 top／bottom anchor。
- status dot、switch／AP／client icon、名稱與 MAC 都在 node 內渲染。
- Enterprise 的 Core、Agg/Access、Finance、Lab switch 有 `+ / −` 收合按鈕。
- 點擊設備 icon 會呼叫 `event.stopPropagation()`，並在 browser console 輸出 `Device image clicked: {device name}`。目前僅作為互動驗證；未來可改為開啟既有 device drawer、選取／高亮相鄰 edge，或導向設備詳情頁。

收合狀態以 `collapsedNodes` 管理。按鈕會更新對應 node 的狀態，並將下游 fixture node 設為 `hidden`。正式版可由 graph traversal 根據 links 找出後代，不需要維護固定 ID 清單。

## Lines 與跨區連線

每個 `connections` 項目轉為 React Flow `Edge`：

- `type: "default"`：React Flow 產生 Bézier curve。
- 所有 edge 統一為 5px；以顏色區分 wired、high traffic、wireless、Fabric、cross-area。
- Fabric link 為綠色；wireless 為虛線；cross-area 為藍色。

因 edge 直接連接 node handle，節點經 ELK 重排、縮放、平移或 Fit view 後，端點與曲線會自動更新；不需要自行計算線路座標。

跨區 edge 可加 React Flow `label`。label 會綁定在 edge 路徑中點，並隨同 edge 自動移動。目前 mock 包含：

- `DMS-3130 Core ↔ Border Leaf 01`
- `DGS-1250 ↔ Leaf 01`

## 互動

React Flow 內建處理：

- Canvas pan
- Mouse-wheel zoom
- Zoom in／out
- Fit view
- 依 node handle 更新 edge

目前搜尋以 query 將不符合的 node 設為 `hidden`。此行為未改變 API 資料。

## 後續建議

1. 將 fixture 替換成 topology API 的 `devices[]` 與 `links[]`。
2. 對 Fabric role 使用 API 的 `topologyArea`、`fabricId`、`fabricRole`，不要以型號猜測。
3. 收合邏輯改成 graph traversal，支援任意數量的下游節點。
4. 當跨區 links 過多時，以可點選的 Uplink Tag 摘要顯示。
5. 建立視覺回歸測試，驗證 Fabric layers、edge 顏色與 Fit view。
