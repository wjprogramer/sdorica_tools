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

<!-- TODO add fileds: 系列 -->

<div class="w3-container">
  <form id="maintainForm" class="w3-container" action="/action_page.php">
    <p>      
    <!-- Name and ID -->
    <label class="w3-text-brown"><b>名稱</b></label>
    <input id="nameInput" name="name" class="w3-input w3-border w3-sand" name="first" type="text"></p>
    <p>      
    
    <!-- position -->
    <label class="w3-text-brown"><b>站位</b></label><br>
    
    <label>
      <input class="w3-radio position-radio" type="radio" name="position" value="gold" checked>
      金位
    </label>

    <label>
      <input class="w3-radio position-radio" type="radio" name="position" value="black">
      黑位
    </label>

    <label>
      <input class="w3-radio position-radio" type="radio" name="position" value="white">
      白位
    </label>
    <p>      
    
    <!-- mainSkill -->
    <label class="w3-text-brown"><b>主要技能</b></label>
    <select id="mainSkillSelect" class="w3-select w3-border w3-sand" name="mainSkill">
      <option value="" disabled selected>請選擇技能</option>
    </select>
    <p>      
    
    <!-- subSkill -->
    <label class="w3-text-brown"><b>次要技能</b></label>
    <select id="subSkillSelect" class="w3-select w3-border w3-sand" name="subSkill">
      <option value="" disabled selected>請選擇技能</option>
    </select>
    <p>      
    
    <!-- avaiableMinStar -->
    <label class="w3-text-brown"><b>可獲得最小星數</b></label>
    <input id="avaiableMinStarInput" class="w3-input w3-border w3-sand" name="avaiableMinStar" type="number" min="1" max="10" value="1"></p>
    
    <p>
    <button id="submitButton" class="w3-button w3-brown w3-hover-sand">新增</button></p>
  </form>
</div>

</div>`