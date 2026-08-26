# LLDP_FDB Summary Report

## 目的

此 Mockup 模擬 Nuclias 風格的網路分析報表，用於測試前端直接下載 PDF。報表包含側欄、時間範圍選擇、報表分頁、搜尋欄位，以及含有資訊、警告與嚴重事件的長日誌表格。

## PDF 匯出行為

- 點擊 **Export** 後，會下載 `LLDP_FDB-summary-report.pdf`。
- 匯出範圍僅限從 `Analytic › LLDP_FDB` 開始的完整報表卡。
- 側欄、全域頁首、組織選擇器與頁面背景不會出現在 PDF 中。
- PDF 採用依內容高度產生的單頁自訂尺寸，因此不會分頁，也不會切斷任一日誌列。
- 匯出前會等待網頁字型載入完成，並固定擷取座標，讓 PDF 版面盡可能與畫面一致。

## 實作方式

- 介面程式：`src/App.tsx`
- 樣式：`src/App.css`
- PDF 套件：`html2canvas`、`jspdf`
- `reportRef` 用於指定需要被擷取的報表卡。
- `html2canvas` 將該報表卡轉為高解析度 Canvas。
- `jsPDF` 依 Canvas 尺寸建立自訂單頁 PDF，並將其儲存為 PDF 檔案。

## 手動測試

1. 啟動網站並開啟 Summary Report 頁面。
2. 可選擇不同時間範圍，或使用搜尋欄篩選日誌。
3. 點擊 **Export**。
4. 開啟下載的 PDF，確認內容只有報表卡、維持單一長頁，且日誌列沒有被裁切或錯位。

## 注意事項

目前採用影像式匯出，以優先維持 Mockup 的視覺還原度。因此 PDF 內文字不可選取。若未來需要可選取文字、重複表格標題或固定 A4／A3 紙張尺寸，則需要改為向量或 PDF 表格方式產生。
