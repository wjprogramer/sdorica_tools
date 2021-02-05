const homePageContent = `<div id="homePage">
<h1>
  首頁
  <span id="versionLabel" style="font-size: 20px; color: lightgray;"></span>
</h1>

<input id='monstersJsonFileInput' hidden type="file" accept=".json," onChange={this.onSitesFileChange} />
<button id="importMonstersJsonButton" class="w3-button w3-blue w3-hover-light-blue">
  匯入
</button>

<button id="exportMonstersJsonButton" class="w3-button w3-blue w3-hover-light-blue">
  匯出
</button>

</div>`;