const maintainMonsterPageContent = `<div id="maintainMonsterPage">
  
<div style="display: flex; flex-direction: row; align-items: center;">
  <div class="w3-margin-right">
    <button id="goBackButton" class="w3-button w3-light-gray">
      &lt;
    </button>
  </div>
  <div style="flex: 1;">
    <h1 id="pageTitle">
      新增/維護野獸 <!-- for replace -->
    </h1>
  </div>
</div>

<p>
  Coming Soon...
</p>

<p>
<b class="w3-text-red">
  未實作此頁面
</b>
（這頁面沒有任何功能的意思~）
</p>

<div class="w3-container">
  <form id="maintainForm" class="w3-container" action="/action_page.php">
    <p>      
    <!-- Name and ID -->
    <label class="w3-text-brown"><b>名稱</b></label>
    <input class="w3-input w3-border w3-sand" name="first" type="text"></p>
    <p>      
    <!-- position -->
    <label class="w3-text-brown"><b>站位</b></label>
    <input class="w3-input w3-border w3-sand" name="last" type="text"></p>
    <p>      
    <!-- mainSkill -->
    <label class="w3-text-brown"><b>主要技能</b></label>
    <input class="w3-input w3-border w3-sand" name="last" type="text"></p>
    <p>      
    <!-- subSkill -->
    <label class="w3-text-brown"><b>次要技能</b></label>
    <input class="w3-input w3-border w3-sand" name="last" type="text"></p>
    <p>      
    <!-- avaiableMinStar -->
    <label class="w3-text-brown"><b>可獲得最小星數</b></label>
    <input class="w3-input w3-border w3-sand" name="last" type="text"></p>
    <p>
    <button class="w3-button w3-brown w3-hover-sand">新增</button></p>
  </form>
</div>

</div>`;