# Software Studio 2022 Spring
## Assignment 01 Web Canvas


### Scoring

| **Basic components**                             | **Score** | **Check** |
| :----------------------------------------------- | :-------: | :-------: |
| Basic control tools                              | 30%       | Y         |
| Text input                                       | 10%       | Y         |
| Cursor icon                                      | 10%       | Y         |
| Refresh button                                   | 5%       | Y         |

| **Advanced tools**                               | **Score** | **Check** |
| :----------------------------------------------- | :-------: | :-------: |
| Different brush shapes                           | 15%       | Y         |
| Un/Re-do button                                  | 10%       | Y         |
| Image tool                                       | 5%        | Y         |
| Download                                         | 5%        | Y         |

| **Other useful widgets**                         | **Score** | **Check** |
| :----------------------------------------------- | :-------: | :-------: |
| Name of widgets                                  | 1~5%     | Y        |


---

### How to use 
spec裡每個功能都有對應的按鍵，有文字標清。

操作流程: 先選取筆/文字/圖形，再選取顏色。

clear會把undo,redo紀錄清空。

比較不一樣的地方有幾點:
1. 文字以及筆刷套用一樣的顏色控制、尺寸控制(橡皮擦也可調整大小)。
2. 第三排由左數來第一個物件為color picker，可自行選取顏色。
<!-- (<input type=color>) -->
3. 第三排由左數來第二個物件為size控制條，可調整尺寸大小。 
<!-- (<input type=range>) -->
4. 第三排最右選單可調整字形。 <!-- ( <select> ) -->

text的輸入:
輸入完畢後，用滑鼠點擊畫布或功能鍵(筆/橡皮擦等皆可)即可完成影印。
若無輸入，則會取消input框。
(生成框:  document.createElement("INPUT") )
(消除框:    document.body.removeChild(text_temp); )

### Function description
BONUS:
類似動畫的發光的邊框。(利用setInterval()，並再逐漸改變邊框大小)
color-picker選取任意色。(使用input 的 color type)
圖形可更改顏色。
paste功能:
paste亦即「貼上」，在使用過text影印文字後，可立即使用paste無限次影印剛才輸入的內容。(用一個var儲存text印下的內容，無內容則略過)


### Gitlab page link

    https://software-studio-89433.web.app/

### Others (Optional)
謝謝助教們在討論區辛勤的、不分晝夜的回覆大家，辛苦了!
   

<style>
table th{
    width: 100%;
}
</style>
