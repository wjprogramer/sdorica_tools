const historyPageContent = `<div id="historyPage">
<div style="display: flex; flex-direction: row; align-items: center;">
  <div style="flex: 1;">
    <h1>歷史事件</h1>
  </div>
  <!-- TODO -->
  <div id="toggleClearEventsModalButton" onclick="document.getElementById('clearEventsModal').style.display='block'" class="w3-button w3-light-gray">
    清除全部
  </div>
</div>

<div class="w3-container">
  <ul id="eventList" class="w3-ul menu-list">
    <!-- ... -->
  </ul>
</div>


<!-- START: Delete Modal -->
<div id="clearEventsModal" class="w3-modal">
  <div class="w3-modal-content w3-card-4 w3-animate-zoom">
    <header class="w3-container w3-blue">
      <span onclick="document.getElementById('clearEventsModal').style.display='none'"
        class="w3-button w3-blue w3-xlarge w3-display-topright">&times;</span>
      <h2>清除事件</h2>
    </header>

    <div class="w3-container">
      <p>確定要清除事件嗎</p>
    </div>

    <div class="w3-container w3-light-grey w3-padding">
      <div class="w3-right">
        <button id="clearEventsButton" class="w3-button w3-red w3-hover-pale-red w3-border">
          刪除
        </button>
        <button class="w3-button w3-white w3-border"
          onclick="document.getElementById('clearEventsModal').style.display='none'">取消</button>
      </div>
    </div>
  </div>
</div>
<!-- END: Delete Modal -->
</div>`;