//CrackinPMG Old Menu

// Load inversities utility
var inversitiesScript = document.createElement("script");
inversitiesScript.src = "./inversities.js";
document.head.appendChild(inversitiesScript);

var script = document.createElement("script");
script.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
document.head.appendChild(script);

// Wait for both scripts to load
Promise.all([
  new Promise(resolve => inversitiesScript.onload = resolve),
  new Promise(resolve => script.onload = resolve)
]).then(function() {
  console.log("SweetAlert2 loaded!");

  // Create style element
  var style = document.createElement("style");
  style.innerHTML = `
    /* Style for the cheat menu */
    #cheatMenu {
      position: fixed;
      top: -100%;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.9);
      color: #000;
      z-index: 10000;
      padding: 20px;
      overflow: auto;
      box-sizing: border-box;
      transition: top 0.25s ease-in-out;
    }
    #cheatMenu.visible {
      top: 0;
      transition: top 0.25s ease-in-out;
    }
    #cheatMenu.hidden {
      top: -100%;
      transition: top 0.25s ease-in-out;
    }
    #cheatMenu.hiding {
      animation: slideUp 0.25s ease-in-out;
    }
    @keyframes slideUp {
      0% {
        top: 0;
      }
      100% {
        top: -100%;
      }
    }
    #cheatMenu h1 {
      text-align: center;
      color: #333;
    }
    #cheatMenu h1 + p {
      text-align: center;
    }
    #cheatMenu .section {
      margin: 20px 0;
    }
    #cheatMenu .section h2 {
      color: #444;
      margin-bottom: 10px;
    }
    #cheatMenu .section .button-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
    }
    #cheatMenu .button-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: calc(30% - 10px);
      margin: 5px;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      background: #f9f9f9;
    }
    #cheatMenu button {
      padding: 10px;
      background: #fa8a28;
      border: none;
      color: #fff;
      cursor: pointer;
      text-align: center;
      box-sizing: border-box;
      width: 100%;
      margin-bottom: 10px;
    }
    #cheatMenu button:hover {
      background: #fa7828;
    }
    #cheatMenu .description {
      font-size: 12px;
      color: #666;
      padding: 5px;
    }
    /* Style for the toggle arrow button */
    #toggleMenu {
      position: fixed;
      top: 0;
      left: 0;
      background: rgba(255, 255, 255, 0.8);
      color: #000;
      padding: 5px;
      cursor: pointer;
      z-index: 10001;
      border: 1px solid #ddd;
      border-radius: 4px;
      transition: background 0.3s ease, transform 0.3s ease;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      font-size: 14px;
      width: 30px;
      height: 30px;
      text-align: center;
      line-height: 18px;
    }
    #toggleMenu:before {
      content: '\\25BC';
      font-size: 20px;
    }
    #toggleMenu.rotated:before {
      content: '\\25B2';
    }
    .my-swal {
      z-index: 30000;
    }
    .my-popup {
      width: 400px;
    }
    /* Toggle switch styles */
    .toggle-switch {
      position: relative;
      display: inline-block;
      width: 60px;
      height: 34px;
    }
    .toggle-switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    .toggle-switch .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      -webkit-transition: .4s;
      transition: .4s;
    }
    .toggle-switch .slider:before {
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      -webkit-transition: .4s;
      transition: .4s;
    }
    .toggle-switch input:checked + .slider {
      background-color: #2196F3;
    }
    .toggle-switch input:focus + .slider {
      box-shadow: 0 0 1px #2196F3;
    }
    .toggle-switch input:checked + .slider:before {
      -webkit-transform: translateX(26px);
      -ms-transform: translateX(26px);
      transform: translateX(26px);
    }
  `;
  document.head.appendChild(style);

// Create cheat menu element
  var cheatMenu = document.createElement("div");
  cheatMenu.id = "cheatMenu";
  cheatMenu.className = "hidden";
  cheatMenu.innerHTML = `
    <h1>CrackinPMG Hack Menu X</h1>
    <p>Join our discord community to stay up-to-date on the latest hacks and receive helpful support from our team. Simply click this link: <a href="https://discord.gg/KXDrcZQV6R" target="_blank">https://discord.gg/KXDrcZQV6R</a> or check out our channel: <a href="https://www.youtube.com/@CrackinPMG" target="_blank">https://www.youtube.com/@CrackinPMG</a></p>
<div class="section">
  <h2>Character Enhancements</h2>
  <div class="button-row">
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="set_gold">Set Gold</button>
      <div class="description">[SERVER SIDE] Set your player's gold to a specific amount (0-10,000,000).</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="set_tower_level">Set Dark Tower Level</button>
      <div class="description">[SERVER SIDE] Set your player's Dark Tower level to a specific value (0-1,000).</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="set_bounty_score">Set Bounty Score</button>
      <div class="description">[SERVER SIDE] Set your player's bounty score to a specific amount (0-e+308).</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="set_player_level">Set Player Level</button>
      <div class="description">[SERVER SIDE] Set your player's level to a specific value (1-100).</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="set_grade">Set Grade</button>
      <div class="description">[SERVER SIDE] Set your player's grade to a specific value (1-8).</div>
    </div>
  </div>
  <div class="button-row">
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="set_player_walkspeed">Set Player Walkspeed</button>
      <div class="description">[CLIENT SIDE] Set your player's walkspeed to a specific value (0-e+308).</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="set_player_member_stars">Set Player Member Stars</button>
      <div class="description">[SERVER SIDE] Set your player's member stars to a specific amount (0-e+308).</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
  <button id="set_player_size">Set Player Size</button>
  <div class="description">[CLIENT SIDE] Set your player's size to a specific value (0-3).</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="set_player_morph">Set Player Morph</button>
      <div class="description">[SERVER SIDE] Set your player's character to a pet, follow, or furniture.</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
  <button id="set_player_name">Set Player Name</button>
  <div class="description">[SERVER SIDE] Set your player's name.</div>
    </div>
  </div>
  <div class="button-row">
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="set_custom_player_name">Set Custom Player Name</button>
      <div class="description">[CLIENT SIDE] Set your player's name to a custom string.</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="set_custom_player_level">Set Custom Player Level</button>
      <div class="description">[CLIENT SIDE] Set your player's level to a custom value.</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
     
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      
    </div>
  </div>
</div>
<div class="section">
  <h2>Miscellaneous</h2>
  <div class="button-row">
    <div class="button-container">
      <label class="toggle-switch">
        <input type="checkbox" id="noclip-toggle">
        <span class="slider"></span>
      </label>
      <span>Toggle Noclip</span>
      <div class="description">[CLIENT SIDE] Walk through walls and obstacles.</div>
    </div>
    <div class="button-container">
      <label class="toggle-switch">
        <input type="checkbox" id="teleport-click-toggle">
        <span class="slider"></span>
      </label>
      <span>Toggle Teleport Click</span>
      <div class="description">[CLIENT SIDE] Teleport to the location you click on the map.</div>
    </div>
    <div class="button-container">
      <label class="toggle-switch">
        <input type="checkbox" id="invisibility-toggle">
        <span class="slider"></span>
      </label>
      <span>Toggle Invisibility</span>
      <div class="description">[CLIENT SIDE] Make your character invisible to your screen.</div>
    </div>
   <div class="button-container">
  <label class="toggle-switch">
    <input type="checkbox" id="hide-name-toggle">
    <span class="slider"></span>
  </label>
  <span>Toggle Hide Player Name</span>
  <div class="description">[CLIENT SIDE] Hides your character's name.</div>
    </div>
    <div class="button-container">
  <label class="toggle-switch">
    <input type="checkbox" id="togglePauseGame">
    <span class="slider"></span>
  </label>
  <span>Toggle Pause Game</span>
  <div class="description">[CLIENT SIDE] Pauses or resumes the game.</div>
    </div>
  </div>
  <div class="button-row">
    <div class="button-container">
  <label class="toggle-switch">
    <input type="checkbox" id="basic-membership-toggle">
    <span class="slider"></span>
  </label>
  <span>Toggle Basic Membership</span>
  <div class="description">[SERVER SIDE] Temporarily enable or disable basic membership.</div>
  </div>
  <div class="button-container">
    <label class="toggle-switch">
    <input type="checkbox" id="plus-membership-toggle">
      <span class="slider"></span>
    </label>
    <span>Toggle Plus Membership</span>
    <div class="description">[SERVER SIDE] Temporarily enable or disable plus membership.</div>
  </div>
  <div class="button-container">
    <label class="toggle-switch">
    <input type="checkbox" id="ultra-membership-toggle">
      <span class="slider"></span>
    </label>
    <span>Toggle Ultra Membership</span>
    <div class="description">[SERVER SIDE] Temporarily enable or disable ultra membership.</div>
  </div>
  <div class="button-container">
    <label class="toggle-switch">
    <input type="checkbox" id="players-removal-toggle">
      <span class="slider"></span>
    </label>
    <span>Toggle Players Removal</span>
    <div class="description">[CLIENT SIDE] Hides or shows players.</div>
  </div>
  <div class="button-container">
    <label class="toggle-switch">
    <input type="checkbox" id="ui-removal-toggle">
      <span class="slider"></span>
    </label>
    <span>Toggle UI Removal</span>
    <div class="description">[CLIENT SIDE] Hides or shows player UI (CURRENTLY BEING LOOKED INTO).</div>
  </div>
  </div>
</div>
<div class="section">
  <h2>Utility</h2>
  <div class="button-row">
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="save_game">Save Game</button>
      <div class="description">[SERVER SIDE] Saves and updates your game.</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="wheel_spins">Unlimited Wheel Spins</button>
      <div class="description">[SERVER SIDE] Gives you unlimited Wheel of Wonder and Wheel of Twighlight spins.</div>
    </div>
   <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="crash_game">Crash Game</button>
      <div class="description">[SERVER SIDE] Freezes and breaks your game.</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
     <button id="fix_morph_crash">Fix Morph Crash</button>
      <div class="description">[SERVER SIDE] Fixes the morph glitch caused by incomplete game data.</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="player_teleporter">Player Teleporter</button>
      <div class="description">[SERVER SIDE] Teleports the player to their chosen zone, map, and coordinates.</div>
    </div>
  </div>
  <div class="button-row">
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="house_teleporter">Player House Teleporter</button>
      <div class="description">[SERVER SIDE] A teleporter made specifically for the house maps.</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="buy_house">Buy House</button>
      <div class="description">[SERVER SIDE] Buy the house you are currently in. Note: You cannot buy your own house or maps that don't include a house (e.g. backyard).</div>
    </div>
   <div class="button-container" style="width: calc(33.33% - 10px);">
      
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
     
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      
    </div>
  </div>
</div>
<div class="section">
  <h2>Inventory</h2>
  <div class="button-row">
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="getAllItems">Get All Items</button>
      <div class="description">[SERVER SIDE] Get all items in the player's backpack.</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="clearAllItems">Clear All Items</button>
      <div class="description">[SERVER SIDE] Clear all items from the player's backpack.</div>
    </div>
    <!-- Blank button containers -->
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="get_all_gems">Get All Keystones</button>
      <div class="description">[SERVER SIDE] Gets all gems added into the player's backpack.</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="get_all_epic_buddies">Get All Epics</button>
      <div class="description">[SERVER SIDE] Gets all Epics added into the player's backpack.</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="get_specific_epic_buddy">Get Specific Epic</button>
      <div class="description">[SERVER SIDE] Gets a specific Epic added into the player's backpack.</div>
    </div>
  </div>
  <div class="button-row">
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="get_all_furniture">Get All Furniture</button>
      <div class="description">[SERVER SIDE] Gets all furniture added to the player's inventory.</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="get_specific_furniture">Get Specific Furniture</button>
      <div class="description">[SERVER SIDE] Gets specific furniture added to the player's inventory.</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="get_specific_pet">Get Specific Pet</button>
      <div class="description">[SERVER SIDE] Gets a specific pet added to the player's inventory.</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="get_all_pets">Get All Pets</button>
      <div class="description">[SERVER SIDE] Gets all pets added to the player's inventory.</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="get_specific_item">Get Specific Item</button>
      <div class="description">[SERVER SIDE] Gets a specific item added to the player's inventory.</div>
    </div>
  </div>
  <div class="button-row">
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="delete_all_pets">Delete All Pets</button>
      <div class="description">[SERVER SIDE] Deletes all pets from the player's kennel.</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="get_all_pet_gear">Get All Pet Gear</button>
      <div class="description">[CLIENT SIDE] Adds all pet gear to the player's inventory. DOES NOT SAVE, JUST FOR VISUALS!</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="get_specific_pet_hat">Get Specific Pet Hat</button>
      <div class="description">[CLIENT SIDE] Adds a specific pet hat to the player's inventory. DOES NOT SAVE, JUST FOR VISUALS!</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="get_specific_pet_relic">Get Specific Pet Relic</button>
      <div class="description">[CLIENT SIDE] Adds a specific pet relic to the player's inventory. DOES NOT SAVE, JUST FOR VISUALS!</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="get_magicoin">Get Magicoin</button>
      <div class="description">[CLIENT SIDE] Adds a specified amount of magicoins to the player's inventory. DOES NOT SAVE, JUST FOR VISUALS!</div>
    </div>
  </div>
  <div class="button-row">
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="delete_all_furniture">Delete All Furniture</button>
      <div class="description">[SERVER SIDE] Deletes all ACTIVE furniture from player's house. Just a quick way to empty house.</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="delete_specific_pet">Delete Specific Pet</button>
      <div class="description">[SERVER SIDE] Deletes a speicifc pet from the player's inventory.</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      
    </div>
  </div>
</div>
<div class="section">
  <h2>Battle and Monsters</h2>
  <div class="button-row">
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="remove_monsters">Remove Monsters in Area</button>
      <div class="description">[SERVER SIDE] Deletes all monsters in player's current area.</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="add_monster">Spawn Monster</button>
      <div class="description">[SERVER SIDE] Spawns a monster/s of player's choice. (BETA Version)</div>
    </div>
    <!-- Blank button containers -->
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="exit_battle">Exit Battle</button>
      <div class="description">[SERVER SIDE] Exits player from current battle.</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="battle_camera_zoom">Battle Zoom</button>
      <div class="description">[SERVER SIDE] Adjust zoom of battle.</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="show_battle_message">Show Battle Message</button>
      <div class="description">[SERVER SIDE] Adds a message into the battle for a specified amount of time.</div>
    </div>
  </div>
  <div class="button-row">
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="show_pinned_battle_message">Show Pinned Battle Message</button>
      <div class="description">[SERVER SIDE] Adds a pinned message into the battle.</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="unpin_battle_message">Unpin Battle Message</button>
      <div class="description">[SERVER SIDE] Unpins pinned message in the battle.</div>
    </div>
    <!-- Blank button containers -->
    <div class="button-container" style="width: calc(33.33% - 10px);">
      
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      
    </div>
  </div>
</div>
<div class="section">
  <h2>Special</h2>
  <div class="button-row">
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="get_wizard_name">Get Wizard Name</button>
      <div class="description">[SERVER SIDE] Changes player's name to be 'Wizard'. Note: To you it displays your account username, but to the server, it displays: 'Wizard'.</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="bobbify_account">Bobbify Account</button>
      <div class="description">
        [SERVER SIDE] Makes player look like Bobby Fancywoman.
         <a href="https://prodigy-game.fandom.com/wiki/Bobby_Fancywoman_Incident" target="_blank" rel="noopener noreferrer">For more information visit here</a>.
         Note: The items are set, not added to the inventory.
      </div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="open_promo_egg">Open Promo Egg</button>
      <div class="description">[SERVER SIDE] Opens one of the now-unobtainable promo eggs. It has been customy coded to give 3 random legacy epics.</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="open_name_selector">Open Wizard Name Selector</button>
      <div class="description">[SERVER SIDE] Opens the Wizard Name Selector.</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="fill_house_with_furniture">Fill House With Furniture</button>
      <div class="description">[SERVER SIDE] Fills the player's house with furniture (may be a bit laggy). Small chance of saving lol.</div>
    </div>
  </div>
</div>
<div class="section">
  <h2>Minigames</h2>
  <div class="button-row">
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="dyno_dig_oasis">Dyno Dig Oasis</button>
      <div class="description">[SERVER SIDE] Add later.</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="teky4">TEK-Y4</button>
      <div class="description">[SERVER SIDE] Add later.</div>
    </div>
    <!-- Blank button containers -->
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="academy_archives">Academy Archives</button>
      <div class="description">[SERVER SIDE] Add later.</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      
    </div>
  </div>
</div>
  `;
  document.body.appendChild(cheatMenu);

// Additional functions

function reloadSave() {
  Boot.prototype.game._state._current.user.source._saveEnabled = true;
  Boot.prototype.game._state._current.user.source.appearanceChanged = true;
  Boot.prototype.game._state._current.user.source.updated = true;
  Boot.prototype.game._state._current.user.source.forceSaveCharacter();

  let world = Boot.prototype.game._state._current._world;
  let currentZone = world.getCurrentZone();
  let { x, y } = Boot.prototype.game._state._current.user.position;
  world.zones[currentZone].teleport(world.getCurrentMapTag(), x, y, {}, {});
}

async function initializeGameData() {
  let gameData = {};
  
  await Promise.all(Array.from(document.scripts).map(async function(script) {
    if (script.src.includes('game-data')) {
      try {
        await (await fetch(script.src)).text();
        let gameState = Boot.prototype.game._state._states.get('Boot')._gameData;
        
        gameState._registeredHandlers.data.forEach(function(key, value) {
          try {
            let data = gameState.get(value);
            if (data && typeof data === 'object') {
              for (let prop of Object.getOwnPropertyNames(data)) {
                gameData[prop] = data[prop];
              }
              for (let proto = Object.getPrototypeOf(data); proto && proto !== Object.prototype;) {
                for (let prop of Object.getOwnPropertyNames(proto)) {
                  if (!(prop in gameData)) {
                    gameData[prop] = data[prop];
                  }
                }
                proto = Object.getPrototypeOf(proto);
              }
            }
          } catch (err) {}
        });
      } catch (err) {}
    }
  }));

  window._ = gameData;
}

function changeName(nameType) {
  var options = {};
  if (nameType === 'nickname') {
    options[0] = 'None'; 
    Boot.prototype.game._state._states.get('Boot')._gameData.nickname.forEach((e) => {
      options[e.ID] = `${e.data.value} (${e.ID})`;
    });
  } else {
    Boot.prototype.game._state._states.get('Boot')._gameData.name.filter(item => item.data.type === {'first': 0, 'middle': 1, 'last': 2}[nameType]).forEach((e) => {
      options[e.ID] = `${e.data.name} (${e.ID})`;
    });
  }

  var title = nameType === 'nickname' ? 'Set Nickname' : `Set ${{'first': 'First', 'middle': 'Middle', 'last': 'Last'}[nameType]} Name`;
  var confirmButtonText = nameType === 'nickname' ? 'Set' : 'Continue';

  Swal.fire({
    title: title,
    input: 'select',
    inputOptions: options,
    inputValidator: (e) => e ? '' : `Please select a ${{'first': 'first', 'middle': 'middle', 'last': 'last', 'nickname': 'nick'}[nameType]} name.`,
    showCancelButton: true,
    confirmButtonText: confirmButtonText,
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    }
  }).then((result) => {
    if (!result.value) {
      return;
    }
    var nameId = result.value;
    var source = Boot.prototype.game._state._current.user.source;
    if (nameType === 'nickname') {
      if (nameId === '0') {
        source.appearance._name.nickname = null;
      } else {
        source.appearance._name.nickname = parseInt(nameId);
      }
    } else {
      source.appearance._name[{'first': 'firstName', 'middle': 'middleName', 'last': 'lastName'}[nameType]] = parseInt(nameId);
    }

    if (nameType === 'first') {
      changeName('middle');
    } else if (nameType === 'middle') {
      changeName('last');
    } else if (nameType === 'last') {
      changeName('nickname');
    } else {
      source.appearance.updated = true;
      source.updated = true;
      source.saveEnabled = true;
      source.forceSaveCharacter();
      source.appearanceChanged = true;
      Swal.fire({
        title: 'Success!',
        text: 'Name changed successfully.',
        icon: 'success',
        customClass: {
          container: 'my-swal',
          popup: 'my-popup'
        }
      });
    }
  });
}

  // Get toggle buttons
  var noclipToggle = document.getElementById("noclip-toggle");
  var teleportClickToggle = document.getElementById("teleport-click-toggle");
  var invisibilityToggle = document.getElementById("invisibility-toggle");
  var setGoldButton = document.getElementById("set_gold");
  var setTowerButton = document.getElementById("set_tower_level");
var setBountyScoreButton = document.getElementById("set_bounty_score");
var setPlayerLevelButton = document.getElementById("set_player_level");
var setGradeButton = document.getElementById("set_grade");
var setPlayerWalkspeedButton = document.getElementById("set_player_walkspeed");
var setPlayerMemberStarsButton = document.getElementById("set_player_member_stars");
var saveGameButton = document.getElementById("save_game");
var spinButton = document.getElementById("wheel_spins");
var hideNameToggle = document.getElementById("hide-name-toggle");
    var crashGameButton = document.getElementById("crash_game");
    var togglePauseGameButton = document.getElementById("togglePauseGame");
    var setPlayerSizeButton = document.getElementById("set_player_size");
var setPlayerMorphButton = document.getElementById("set_player_morph");
var fixMorphCrashButton = document.getElementById("fix_morph_crash");
    var basicMembershipToggle = document.getElementById("basic-membership-toggle");
    var setPlayerNameButton = document.getElementById("set_player_name");
    var SetPlayerCustomNameButton = document.getElementById("set_custom_player_name");
var getAllItemsButton = document.getElementById("getAllItems");
var clearAllItemsButton = document.getElementById("clearAllItems");

var remove_monsters = document.getElementById("remove_monsters");
var add_monster = document.getElementById("add_monster");
var exit_battle = document.getElementById("exit_battle");
var battle_message = document.getElementById("battle_message");
var battle_zoom = document.getElementById("battle_zoom");
var dyno_dig_oasis = document.getElementById("dyno_dig_oasis");
var teky4 = document.getElementById("teky4");
var academy_archives = document.getElementById("academy_archives");
var get_all_gems = document.getElementById("get_all_gems");
var get_specific_epic_buddy = document.getElementById("get_specific_epic_buddy");
var get_all_epic_buddies = document.getElementById("get_all_epic_buddies");
var set_custom_player_level = document.getElementById("set_custom_player_level");
var player_teleporter = document.getElementById("player_teleporter");
var get_all_furniture = document.getElementById("get_all_furniture");
var get_specific_furniture = document.getElementById("get_specific_furniture");
var get_specific_pet = document.getElementById("get_specific_pet");
var get_all_pets = document.getElementById("get_all_pets");
var show_battle_message = document.getElementById("show_battle_message");
var show_pinned_battle_message = document.getElementById("show_pinned_battle_message");
var unpin_battle_message = document.getElementById("unpin_battle_message");
var battle_camera_zoom = document.getElementById("battle_camera_zoom");
var get_specific_item = document.getElementById("get_specific_item");
var add_monster = document.getElementById("add_monster")
var delete_all_pets = document.getElementById("delete_all_pets");
var players_removal_toggle = document.getElementById("players-removal-toggle");

// Verson 1.1 things:

var get_all_pet_gear = document.getElementById("get_all_pet_gear");
var get_specific_pet_hat = document.getElementById("get_specific_pet_hat");
var get_specific_pet_relic = document.getElementById("get_specific_pet_relic");
var get_magicoin = document.getElementById("get_magicoin");
var plus_membership_toggle = document.getElementById("plus-membership-toggle");
var ultra_membership_toggle = document.getElementById("ultra-membership-toggle");

var get_wizard_name = document.getElementById("get_wizard_name");
var bobbify_account = document.getElementById("bobbify_account");
var open_promo_egg = document.getElementById("open_promo_egg");
var open_name_selector = document.getElementById("open_name_selector");
var fill_house_with_furniture = document.getElementById("fill_house_with_furniture");
var delete_all_furniture = document.getElementById("delete_all_furniture");
var house_teleporter = document.getElementById("house_teleporter");
var delete_specific_pet = document.getElementById("delete_specific_pet");
var buy_house = document.getElementById("buy_house");

// Add event listeners


buy_house.addEventListener("click", function() {
  Swal.fire({
    title: "Warning!",
    text: "This will buy the house the player is currently in! (read desc)",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Buy House",
    cancelButtonText: "Cancel",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    }
  }).then(function(result) {
    if (result.value) {
      
      let preview = Boot.prototype.game._state._current._world.getCurrentZoneObject()._teleportData.mapKey;
      Boot.prototype.game._state._current._world.zones.house.maps[preview]?.showPurchasePopup();


    Swal.fire({
          title: 'Success!',
          text: "Buy House Transaction has been triggered!",
          icon: 'success',
          customClass: {
            container: 'my-swal',
            popup: 'my-popup'
          }
        });
    }
  });
});


delete_specific_pet.addEventListener("click", function() {
  let user = Boot.prototype.game._state._current.user.source;
  let kennel = user.kennel._petData; 
  let petData = Boot.prototype.game._state._states.get("Boot")._gameData.pet;

  if (kennel.length === 0) {
    Swal.fire({
      title: "No Pets",
      text: "You have no pets to delete.",
      icon: "info",
      customClass: {
        container: "my-swal",
        popup: "my-popup"
      }
    });
    return;
  }

  let options = kennel.map((pet, index) => {
    let petName = petData[pet.ID]?.data?.name || "Unknown";
    return `<option value="${index}">${petName} (ID: ${pet.ID}, Level: ${pet.level})</option>`;
  }).join("");

  Swal.fire({
    title: "Delete a Pet",
    html: `<select id="petSelect" class="swal2-select">${options}</select>`,
    showCancelButton: true,
    confirmButtonText: "Delete",
    cancelButtonText: "Cancel",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    },
    preConfirm: () => {
      let select = document.getElementById("petSelect");
      if (!select || select.value === "") {
        Swal.showValidationMessage("Please select a pet!");
        return false;
      }
      return parseInt(select.value);
    }
  }).then((result) => {
    if (result.isConfirmed) {
      let selectedIndex = result.value;
      kennel.splice(selectedIndex, 1);

      // Force update kennel data reference to apply changes
      user.kennel._petData = [...kennel];

      Boot.prototype.game._state._current.user.source._saveEnabled = true;
      Boot.prototype.game._state._current.user.source.kennel.updated = true;
      Boot.prototype.game._state._current.user.source.updated = true;
      Boot.prototype.game._state._current.user.source.forceSaveCharacter();

      Swal.fire({
        title: "Success!",
        text: "The selected pet has been deleted!",
        icon: "success",
        customClass: {
          container: "my-swal",
          popup: "my-popup"
        }
      });
    }
  });
});





bobbify_account.addEventListener("click", function() {
  Swal.fire({
    title: "Warning!",
    text: "This will bobbify the player's account (read description)!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Bobbify Account",
    cancelButtonText: "Cancel",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    }
  }).then(function(result) {
    if (result.value) {
      
      var player = Boot.prototype.game._state._current.user.source
      player.name.data.nickname = null;
      player.name.data.firstName = 44;
      player.name.data.middleName = 754;
      player.name.data.lastName = 882;
      player.data.stars = -1e22;
      player.data.level = 69;
  
      player.appearance.setEyeColor(1);
      player.appearance.setFace(4);
      player.appearance.setHair(19, 1);
      player.appearance.setSkinColor(1);
      player.equipment.setFollow(19);
      player.equipment.setHat(19);
      player.equipment.setBoots(19);
      player.equipment.setOutfit(19);
      player.equipment.setWeapon(19);

      // Thank you to PXI-Fusion for the pre-made script.

    Swal.fire({
          title: 'Success!',
          text: "Account has been bobbified",
          icon: 'success',
          customClass: {
            container: 'my-swal',
            popup: 'my-popup'
          }
        });
    }
  });
});



open_name_selector.addEventListener("click", function() {
  Swal.fire({
    title: "Warning!",
    text: "This will open the Wizard Name Selector!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Open Name Selector",
    cancelButtonText: "Cancel",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    }
  }).then(function(result) {
    if (result.value) {
      function openNameSelector() {
        // Open the wizard name selector UI
        _.openNameSelector(false, true, true, []);

        Swal.fire({
          title: 'Success!',
          text: "The Wizard Name Selector has been opened!",
          icon: 'success',
          customClass: {
            container: 'my-swal',
            popup: 'my-popup'
          }
        });
    }

open_name_selector.addEventListener("click", function() {
  Swal.fire({
    title: "Warning!",
    text: "This will open the Wizard Name Selector!",
    icon: "warning", 
    showCancelButton: true,
    confirmButtonText: "Open Name Selector",
    cancelButtonText: "Cancel",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    }
  }).then(function(result) {
    if (result.value) {
      openNameSelector();
    }
  });
});


open_promo_egg.addEventListener("click", function() {
  Swal.fire({
    title: "Warning!",
    text: "This will open a promo egg!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Open Promo Egg", 
    cancelButtonText: "Cancel",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    }
  }).then(function(result) {
    if (result.value) {
      // Get pet data
      const petData = _.game.state.current.world.zones.pet.data;
      
      // Available promo pets
      const promoPets = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      
      // Get owned pet IDs
      const ownedPetIds = _.pets.data.map(pet => pet.ID);
      
      // Filter to unowned promo pets
      const availablePets = promoPets.filter(id => !ownedPetIds.includes(id));
      
      // Randomly select a pet
      const randomPet = availablePets[Math.floor(Math.random() * availablePets.length)];
      
      // Open promo egg with random pet
      _.openPromoEgg(null, [randomPet], {id: ""}, []);

      Swal.fire({
        title: 'Success!',
        text: "A Promo Egg has been opened. Enjoy your reward!",
        icon: 'success',
        customClass: {
          container: 'my-swal',
          popup: 'my-popup'
        }
      });
    }
  });
});
house_teleporter.addEventListener("click", function() {
  let maps = Boot.prototype.game._state._current._world.zones.house.maps;

  // Filter maps to include only those with 'preview' in their key name, or keys that are 'exit', 'exterior', or 'warden'
  let filteredMaps = Object.keys(maps).filter(mapKey => 
    mapKey.includes('preview') || ['exit', 'exterior', 'warden'].includes(mapKey)
  );

  // Create an options object with map keys as the key and map names as the value
  let options = {};
  filteredMaps.forEach(mapKey => {
    options[mapKey] = maps[mapKey].name;  // Display the map's name (e.g., 'Modern Design')
  });

  // If there are no valid options, display an error
  if (Object.keys(options).length === 0) {
    Swal.fire({
      title: 'Error!',
      text: 'No available maps to teleport to.',
      icon: 'error',
      customClass: {
        container: 'my-swal',
        popup: 'my-popup'
      }
    });
    return;
  }

  // Show the SweetAlert UI with the available maps
  Swal.fire({
    title: "Select a House",
    input: "select",
    inputOptions: options,
    showCancelButton: true,
    confirmButtonText: "Teleport",
    cancelButtonText: "Cancel",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    }
  }).then(function(result) {
    if (result.value) {
      let selectedMapKey = result.value;  // This is the map key (tag), not the full map object

      if (maps[selectedMapKey]) {
        // Teleport using the selected map key
        Boot.prototype.game._state._current._world.zones.house.teleport(selectedMapKey);

        Swal.fire({
          title: 'Success!',
          text: `Teleported to ${maps[selectedMapKey].name} successfully.`,
          icon: 'success',
          customClass: {
            container: 'my-swal',
            popup: 'my-popup'
          }
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: "Failed to teleport, map is invalid.",
          icon: 'error',
          customClass: {
            container: 'my-swal',
            popup: 'my-popup'
          }
        });
      }
    }
  });
});


delete_all_furniture.addEventListener("click", function() {
  Swal.fire({
    title: "Warning!",
    text: "This will delete all ACTIVE furniture in your house!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Delete All Furniture",
    cancelButtonText: "Cancel",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    }
  }).then(function(result) {
    if (result.value) {
      Boot.prototype.game._state._current.user.source.house.data.active.length = 0;
      Boot.prototype.game._state._current.user.source.house.updated = true;
      Boot.prototype.game._state._current.user.source._saveEnabled = true;
      Boot.prototype.game._state._current.user.source.appearanceChanged = true;
      Boot.prototype.game._state._current.user.source.updated = true;
      Boot.prototype.game._state._current.user.source.forceSaveCharacter();

    Swal.fire({
          title: 'Success!',
          text: "All furniture has been deleted successfully. Re-enter house if needed!",
          icon: 'success',
          customClass: {
            container: 'my-swal',
            popup: 'my-popup'
          }
        });
    }
  });
});


fill_house_with_furniture.addEventListener("click", function() {
  Swal.fire({
    title: "Warning!",
    text: "This will add a LOT of furniture into your house!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Fill House with Furniture",
    cancelButtonText: "Cancel",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    }
  }).then(function(result) {
    if (result.value) {
      Boot.prototype.game._state._current.user.source.house.data.active.splice(0, Boot.prototype.game._state._current.user.source.house.data.active.length);
      for (var dormData = Boot.prototype.game._state._states.get("Boot")._gameData.dorm, i = dormData.length - 1; 0 < i; i--) {
        var j = Math.floor(Math.random() * (i + 1)),
          temp = dormData[i];
        dormData[i] = dormData[j], dormData[j] = temp
      }
      for (var minX = 0, maxX = 1300, minY = 0, maxY = 750, i = 0; i < dormData.length; i++)
        for (var objectID = dormData[i].ID, j = 0; j < 1000; j++) {
          var newObject = {
            ID: objectID,
            anchorY: 0,
            dx: 0,
            dy: 0,
            r: 0,
            stack: [],
            x: Math.floor(Math.random() * (maxX - minX + 1)) + minX,
            y: Math.floor(Math.random() * (maxY - minY + 1)) + minY,
            z: 1
          };
          Boot.prototype.game._state._current.user.source.house.data.active.push(newObject)
        }
      
      Boot.prototype.game._state._current.user.source.house.updated = true;
      Boot.prototype.game._state._current.user.source._saveEnabled = true;
      Boot.prototype.game._state._current.user.source.appearanceChanged = true;
      Boot.prototype.game._state._current.user.source.updated = true;
      Boot.prototype.game._state._current.user.source.forceSaveCharacter();

    Swal.fire({
          title: 'Success!',
          text: "Furniture has been added successfully. Re-enter house if needed!",
          icon: 'success',
          customClass: {
            container: 'my-swal',
            popup: 'my-popup'
          }
        });
    }
  });
});


get_wizard_name.addEventListener("click", function() {
  Swal.fire({
    title: "Warning!",
    text: "This will set the player's name to 'Wizard'!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Get Wizard Name",
    cancelButtonText: "Cancel",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    }
  }).then(function(result) {
    if (result.value) {
      
      Boot.prototype.game._state._current.user.source.name.data.firstName = null;
      Boot.prototype.game._state._current.user.source.name.data.middleName = null;
      Boot.prototype.game._state._current.user.source.name.data.lastName = null;
      Boot.prototype.game._state._current.user.source.name.data.nicknameName = null;
      // Not necessary but here just in case: Boot.prototype.game._state._current.user.source.name._fallbackName = null;
      
      let source = Boot.prototype.game._state._current.user.source;
      source.appearance.updated = true;
      source.updated = true;
      source.saveEnabled = true;
      source.forceSaveCharacter();
      source.appearanceChanged = true;


    Swal.fire({
          title: 'Success!',
          text: "Name has been set successfully.",
          icon: 'success',
          customClass: {
            container: 'my-swal',
            popup: 'my-popup'
          }
        });
    }
  });
});


ultra_membership_toggle.addEventListener("click", function() {
  if (this.checked) {
    Boot.prototype.game._state._current.user.source.hasMembership = function() {
      return true;
    };
    _._segment._activePlayer._player.getMemberTier = () => {return 103};
    Boot.prototype.game._state._current.user.source.appearanceChanged = true;
    reloadSave()
    Swal.fire({
      title: "Ultra Membership Enabled",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
      customClass: {
        container: "my-swal",
        popup: "my-popup"
      }
    });
  } else {
    _._segment._activePlayer._player.getMemberTier = () => {return 0};
    Boot.prototype.game._state._current.user.source.hasMembership = function() {
      return false;
    };
    _._segment._activePlayer._player.getMemberTier = () => {return 0};
    Boot.prototype.game._state._current.user.source.appearanceChanged = true;
    Swal.fire({
      title: "Ultra Membership Disabled",
      icon: "error",
      timer: 1500,
      showConfirmButton: false,
      customClass: {
        container: "my-swal",
        popup: "my-popup"
      }
    });
  }
});


plus_membership_toggle.addEventListener("click", function() {
    if (this.checked) {
    Boot.prototype.game._state._current.user.source.hasMembership = function() {
      return true;
    };
     _._segment._activePlayer._player.getMemberTier = () => {return 102};
    Boot.prototype.game._state._current.user.source.appearanceChanged = true;
    reloadSave()
    Swal.fire({
      title: "Plus Membership Enabled",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
      customClass: {
        container: "my-swal",
        popup: "my-popup"
      }
    });
  } else {
    _._segment._activePlayer._player.getMemberTier = () => {return 0};
    Boot.prototype.game._state._current.user.source.hasMembership = function() {
      return false;
    };
    _._segment._activePlayer._player.getMemberTier = () => {return 0};
    Boot.prototype.game._state._current.user.source.appearanceChanged = true;
    Swal.fire({
      title: "Plus Membership Disabled",
      icon: "error",
      timer: 1500,
      showConfirmButton: false,
      customClass: {
        container: "my-swal",
        popup: "my-popup"
      }
    });
  }
});




// Magicoin script v v v v v v

var magicoinHandler = fetchInversities;

get_magicoin.addEventListener("click", async function() {
  var inputConfig = {
    min: "0",
    max: "999999999999999999999999999", 
    step: "1"
  };

  var customClasses = {
    container: "my-swal",
    popup: "my-popup"
  };

  var result = await Swal.fire({
    title: "Set Magicoin Amount",
    text: "Enter the new amount for Magicoins. Ensure you're in the correct game context.",
    input: "number",
    inputAttributes: inputConfig,
    showCancelButton: true,
    confirmButtonText: "Set Value",
    cancelButtonText: "Cancel", 
    customClass: customClasses
  });

  if (result.value !== undefined) {
    window._ = await magicoinHandler();

    var amount = Math.min(Math.max(parseInt(result.value, 10), 0), 999999999999999999999999999);

    if (_ && _._secureInventory && _._secureInventory.currency && _._secureInventory.currency.stackable[27]) {
      _._secureInventory.currency.stackable[27].quantity = amount;

      Swal.fire({
        title: "Success!",
        text: "Magicoins have been set to " + amount + ".",
        icon: "success",
        customClass: customClasses
      });

    } else {
      Swal.fire({
        title: "Error!",
        text: "Could not update Magicoins. Ensure you're in the correct game context.",
        icon: "error",
        customClass: customClasses
      });
    }
  }
});

get_specific_pet_hat.addEventListener("click", async function() {
  var _ = await fetchInversitiesAlt();

  const petHats = _._state.states.get("Boot")._gameData.petHat;

  const options = petHats.map((hat) => ({
    text: `${hat.data.name} (ID: ${hat.ID})`,
    value: hat.ID
  }));

  Swal.fire({
    title: "Select a Pet Hat",
    text: "Please select the pet hat you wish to add to your inventory.",
    input: "select", 
    inputOptions: options.reduce((acc, {text, value}) => {
      acc[value] = text;
      return acc;
    }, {}),
    inputPlaceholder: "Select a pet hat...",
    showCancelButton: true,
    confirmButtonText: "Add Hat",
    cancelButtonText: "Cancel",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    }
  }).then(function(result) {
    if (result.value) {
      const selectedHatID = Number(result.value);
      const selectedHat = petHats.find(hat => hat.ID === selectedHatID);
      const timestamp = Date.now();
      
      const newItem = {
        userID: _.userID,
        itemID: `petHat-${selectedHatID}`,
        uuid: crypto.randomUUID(),
        quantity: 1,
        tags: ['petGear'],
        data: {
          asset: {
            id: selectedHatID,
            type: 'petHat'
          },
          createdAt: timestamp,
          seenAt: timestamp
        }
      };

      function addItemsToInventory(target, location) {
        target.then(items => {
          if (Array.isArray(items)) {
            items.push(newItem);
            console.log('Updated ' + location + ':', items);
          } else if (items?.items && Array.isArray(items.items)) {
            items.items.push(newItem);
            console.log('Updated ' + location + ' (items array):', items.items);
          } else {
            console.error('Error: ' + location + ' is not an array or doesn\'t have an \'items\' array.');
          }
        }).catch(console.error);
      }

      addItemsToInventory(_._petGearInventory.petHats, '_petGearInventory.petHats');
      addItemsToInventory(_._petGearInventory.fetchPetGear(), '_petGearInventory.fetchPetGear()');

      Swal.fire({
        title: 'Success!',
        text: `Pet Hat "${selectedHat.data.name}" (ID: ${selectedHatID}) has been added to your inventory.`,
        icon: 'success',
        customClass: {
          container: 'my-swal',
          popup: 'my-popup'
        }
      });
    }
  });
});

get_specific_pet_relic.addEventListener("click", async function() {
  var _ = await fetchInversitiesAlt();
  // Retrieve available pet relics
  const petRelics = _._state.states.get("Boot")._gameData.petRelic;

  // Build the options for the SweetAlert dropdown
  const options = petRelics.map((relic) => ({
    text: `${relic.data.name} (ID: ${relic.ID})`,
    value: relic.ID
  }));

  // Show SweetAlert with the pet relic selector
  Swal.fire({
    title: "Select a Pet Relic",
    text: "Please select the pet relic you wish to add to your inventory.",
    input: "select",
    inputOptions: options.reduce((acc, { text, value }) => {
      acc[value] = text;
      return acc;
    }, {}),
    inputPlaceholder: "Select a pet relic...",
    showCancelButton: true,
    confirmButtonText: "Add Relic",
    cancelButtonText: "Cancel",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    }
  }).then(function (result) {
    if (result.value) {
      function addPetRelic(relicID, relicName) {
        const timestamp = Date.now();
        const newItem = {
          userID: _.userID,
          itemID: `petRelic-${relicID}`,
          uuid: crypto.randomUUID(),
          quantity: 1,
          tags: ['petRelic'],
          data: {
            asset: {
              id: relicID,
              type: 'petRelic'
            },
            createdAt: timestamp,
            seenAt: timestamp
          }
        };

        function addItemsToInventory(inventory, inventoryName) {
          inventory.then(inv => {
            if (Array.isArray(inv)) {
              inv.push(newItem);
              console.log(`Updated ${inventoryName}:`, inv);
            } else if (inv?.items && Array.isArray(inv.items)) {
              inv.items.push(newItem);
              console.log(`Updated ${inventoryName} (items array):`, inv.items);
            } else {
              console.error(`Error: ${inventoryName} doesn't have an 'items' array or is not an array.`);
            }
          }).catch(console.error);
        }

        addItemsToInventory(_._petGearInventory.items, '_petGearInventory.petGear');
        addItemsToInventory(_._petGearInventory.fetchPetGear(), '_petGearInventory.fetchPetGear()');

        // Show success message after adding the relic
        Swal.fire({
          title: 'Success!',
          text: `Pet Relic "${relicName}" (ID: ${relicID}) has been added to your inventory.`,
          icon: 'success',
          customClass: {
            container: 'my-swal',
            popup: 'my-popup'
          }
        });
      }

      get_all_pet_gear.addEventListener("click", function() {
        Swal.fire({
          title: "Warning!",
          text: "Are you sure you want to add all pet gear into the player's inventory!",
          icon: "warning", 
          showCancelButton: true,
          confirmButtonText: "Add All Pet Gear",
          cancelButtonText: "Cancel",
          customClass: {
            container: "my-swal",
            popup: "my-popup"
          }
        }).then(async function(result) {
          if (result.value) {
            let _ = await fetchInversitiesV3();
            window._ = _;

            const timestamp = Date.now();
            const newItems = [];

            // Add pet hats
            for (let i = 0; i <= _.state.states.get('Boot')._gameData.petHat.length; i++) {
              newItems.push({
                userID: _.userID,
                itemID: `petHat-${i}`,
                uuid: crypto.randomUUID(),
                quantity: 1,
                tags: ['petRelic'],
                data: {
                  asset: {
                    id: i,
                    type: 'petHat'
                  },
                  createdAt: timestamp,
                  seenAt: timestamp
                }
              });
            }

            // Add pet relics
            for (let i = 0; i <= _.state.states.get('Boot')._gameData.petRelic.length; i++) {
              newItems.push({
                userID: _.userID,
                itemID: `petRelic-${i}`,
                uuid: crypto.randomUUID(),
                quantity: 1,
                tags: ['petRelic'],
                data: {
                  asset: {
                    id: i,
                    type: 'petRelic'
                  },
                  createdAt: timestamp,
                  seenAt: timestamp
                }
              });
            }

            function addItemsToInventory(inventory, inventoryName) {
              inventory.forEach(inv => {
                if (inv?.items && Array.isArray(inv.items)) {
                  inv.items.push(...newItems);
                  console.log(`Updated ${inventoryName}:`, inv.items);
                } else {
                  console.error(`Error: ${inventoryName} .items not found or not an array.`);
                }
              }).catch(console.error);
            }

            addItemsToInventory(_._petGearInventory.fetchPetGear(), '_petGearInventory');
            addItemsToInventory(_.getOwnedPetGear(), 'getOwnedPetGear');

            // Add pet relics
            _.petRelics.forEach(relics => {
              if (Array.isArray(relics)) {
                relics.push(...newItems.filter(item => item.itemID.startsWith('petRelic')));
                console.log('Updated petRelics:', relics);
              } else {
                console.error('Error: petRelics is not an array.');
              }
            }).catch(console.error);

            // Add pet hats
            _.petHats.forEach(hats => {
              if (Array.isArray(hats)) {
                hats.push(...newItems.filter(item => item.itemID.startsWith('petHat')));
                console.log('Updated petHats:', hats);
              } else {
                console.error('Error: petHats is not an array.');
              }
            }).catch(console.error);

            Swal.fire({
              title: 'Success!',
              text: "All pet gear has been added successfully.",
              icon: 'success',
              customClass: {
                container: 'my-swal',
                popup: 'my-popup'
              }
            });
          }
        });
      });

// Verson 1.0 things and below:

delete_all_pets.addEventListener("click", function() {
  Swal.fire({
    title: "Warning!",
    text: "This will delete all pets from the player's kennel!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Delete All Pets",
    cancelButtonText: "Cancel",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    }
  }).then(function(result) {
    if (result.value) {
      Boot.prototype.game._state._current.user.source.kennel._petData.length = 0;
      Boot.prototype.game._state._current.user.source._saveEnabled = true;
      Boot.prototype.game._state._current.user.source.kennel.updated = true;
      Boot.prototype.game._state._current.user.source.updated = true;
      Boot.prototype.game._state._current.user.source.forceSaveCharacter();

    Swal.fire({
          title: 'Success!',
          text: "All pets have been deleted successfully.",
          icon: 'success',
          customClass: {
            container: 'my-swal',
            popup: 'my-popup'
          }
        });
    }
  });
});


add_monster.addEventListener("click", async () => {
    let gameData = Boot.prototype.game._state._states.get("Boot")._gameData.pet;
    gameData.sort((a, b) => (a.data.name || "").localeCompare(b.data.name || ""));

    let petOptions = Object.fromEntries(gameData.map(pet => [pet.ID, `${pet.data.name || `Pet ID: ${pet.ID}`}`]));

    let { value: petID } = await Swal.fire({
        title: "Select a Pet",
        input: "select",
        inputOptions: petOptions,
        inputPlaceholder: "Choose a pet...",
        showCancelButton: true,
        customClass: { container: "my-swal", popup: "my-popup" }
    });

    if (!petID) return;

    let petName = petOptions[petID];

    let confirm = await Swal.fire({
        title: "Confirm Selection",
        text: `Set all monsters in the current map to ${petName} (ID: ${petID})?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        customClass: { container: "my-swal", popup: "my-popup" }
    });

    if (!confirm.isConfirmed) return;

    let world = Boot.prototype.game._state._current._world;
    let user = Boot.prototype.game._state._current.user.source;
    let currentZone = world.getCurrentZone();
    let currentMap = world.getCurrentMap();
    let mapMonsters = world.zones[currentZone].maps[currentMap.split("-")[1]].mapMonsters;

    mapMonsters.forEach(monster => {
        if (monster && monster.data && monster.monsterData) {
            monster.data.ID = parseInt(petID);
            monster.monsterData.ID = parseInt(petID);
        }
    });

    user.state.updated = true;
    user.updated = true;

    let { x, y } = Boot.prototype.game._state._current.user.position;
    world.zones[currentZone].teleport(world.getCurrentMapTag(), x, y, {}, {});

    Swal.fire({
        title: "Success!",
        text: `All monsters in the current map have been updated to ${petName} (ID: ${petID}).`,
        icon: "success",
        customClass: { container: "my-swal", popup: "my-popup" }
    });
});



players_removal_toggle.addEventListener("click", function() {
    if (this.checked) {
    // Set all players and their follows invisible
    Object.keys(Boot.prototype.game._state._current.playerList).forEach(playerID => {
        const player = Boot.prototype.game._state._current.playerList[playerID];
        
        // Set player and follow visibility to false
        if (player) {
            player.visible = false;
            if (player.follow) {
                player.follow.visible = false;
            }
        }
    });

    Swal.fire({
      title: "Players Set to Invisible",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
      customClass: {
        container: "my-swal",
        popup: "my-popup"
      }
    });
  } else {
    // Set all players and their follows visible
    Object.keys(Boot.prototype.game._state._current.playerList).forEach(playerID => {
        const player = Boot.prototype.game._state._current.playerList[playerID];
        
        // Set player and follow visibility to true
        if (player) {
            player.visible = true;
            if (player.follow) {
                player.follow.visible = true;
            }
        }
    });

    Swal.fire({
      title: "Players Set to Visible",
      icon: "error",
      timer: 1500,
      showConfirmButton: false,
      customClass: {
        container: "my-swal",
        popup: "my-popup"
      }
    });
  }
});


get_specific_item.addEventListener("click", async () => {
    let user = Boot.prototype.game._state._current.user.source;
    let gameData = Boot.prototype.game._state._states.get("Boot")._gameData;

    // Mapping of category variables to custom display names
    const categoryDisplayNames = {
        "follow": "Buddies",
        "mount": "Mounts",
        "hat": "Hats",
        "boots": "Boots",
        "weapon": "Wands",
        "outfit": "Outfits",
        "item": "Items",
        "fossil": "Fossils",
        "key": "Key Items",
        "relic": "Old Relics",
        "currency": "Currency",
        "spellRelic": "Relics"
    };

    let categories = Object.keys(user.backpack.data).filter(cat => Array.isArray(user.backpack.data[cat]));

    // Create custom display options using the categoryDisplayNames mapping
    let customCategoryOptions = Object.fromEntries(categories.map(c => [c, categoryDisplayNames[c] || c]));

    let { value: category } = await Swal.fire({
        title: "Select Item Category",
        input: "select",
        inputOptions: customCategoryOptions,
        inputPlaceholder: "Choose a category",
        showCancelButton: true,
        customClass: { container: "my-swal", popup: "my-popup" }
    });

    if (!category) return;

    let items = gameData[category] || [];

    // If the selected category is 'follow', filter out the excluded items by their IDs
    if (category === "follow") {
        const excludedIDs = [125, 126, 127, 128, 129, 134, 135, 136, 137];
        items = items.filter(item => !excludedIDs.includes(item.ID));
    }

    let itemOptions = Object.fromEntries(items.map(i => [i.ID, `${i.data.name} (ID: ${i.ID})`]));

    let { value: itemID } = await Swal.fire({
        title: `Select ${customCategoryOptions[category] || category}`,
        input: "select",
        inputOptions: itemOptions,
        inputPlaceholder: "Choose an item",
        showCancelButton: true,
        customClass: { container: "my-swal", popup: "my-popup" }
    });

    if (!itemID) return;

    let { value: amount } = await Swal.fire({
        title: "Enter Quantity",
        input: "number",
        inputAttributes: { min: 1, max: 9999999999999999999999 },
        inputValue: 1,
        showCancelButton: true,
        customClass: { container: "my-swal", popup: "my-popup" }
    });

    if (!amount || amount < 1) return;

    user.backpack.data[category].push({ ID: Number(itemID), N: Number(amount) });
    user.backpack.updated = true;
    user.updated = true;

    Swal.fire({
        title: "Success!",
        text: `Added ${amount} of ID ${itemID} to ${category}.`,
        icon: "success",
        customClass: { container: "my-swal", popup: "my-popup" }
    });
});


battle_camera_zoom.addEventListener("click", function() {
  // SweetAlert with inputs for background and foreground zoom
  Swal.fire({
    title: "Set Battle Zoom",
    html: `
      <div>
        <label for="backgroundZoom">Background Zoom:</label>
        <input id="backgroundZoom" type="number" value="1" min="0" max="1000000">
      </div>
      <div>
        <label for="foregroundZoom">Foreground Zoom:</label>
        <input id="foregroundZoom" type="number" value="1" min="0" max="1000000">
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: "Set Zoom",
    cancelButtonText: "Cancel",
    customClass: { container: "my-swal", popup: "my-popup" },
  }).then(result => {
    if (result.value) {
      let backgroundZoom = parseFloat(document.getElementById("backgroundZoom").value);
      let foregroundZoom = parseFloat(document.getElementById("foregroundZoom").value);

      // Set zoom for background and foreground
      Boot.prototype.game._state._current._battleController.setZoom(backgroundZoom, foregroundZoom);

      // Success confirmation
      Swal.fire({
        title: "Success!",
        text: `Battle camera zoom set to background: ${backgroundZoom}, foreground: ${foregroundZoom}.`,
        icon: "success",
        customClass: { container: "my-swal", popup: "my-popup" }
      });
    }
  });
});



unpin_battle_message.addEventListener("click", function() {
  // Confirmation for unpinning the message
  Swal.fire({
    title: "Do you want to unpin your pinned message?",
    showCancelButton: true,
    confirmButtonText: "Unpin Message",
    cancelButtonText: "Cancel",
    customClass: { container: "my-swal", popup: "my-popup" }
  }).then(result => {
    if (result.value) {
      // Unpin the message
      Boot.prototype.game._state._current._battleController.textLog.unpinMessage();

      // Success confirmation
      Swal.fire({
        title: "Success!",
        text: "Your pinned message has been unpinned.",
        icon: "success",
        customClass: { container: "my-swal", popup: "my-popup" }
      });
    }
  });
});


show_pinned_battle_message.addEventListener("click", function() {
  // Prompt for the message to pin
  Swal.fire({
    title: "Enter the message you would like to pin",
    input: "text",
    inputPlaceholder: "Type your pinned message here",
    showCancelButton: true,
    confirmButtonText: "Pin Message",
    cancelButtonText: "Cancel",
    customClass: { container: "my-swal", popup: "my-popup" }
  }).then(result => {
    if (result.value) {
      let message = result.value;

      // Show the pinned message
      Boot.prototype.game._state._current._battleController.textLog.showPinnedMessage(message);

      // Success confirmation
      Swal.fire({
        title: "Success!",
        text: `The message has been pinned: "${message}"`,
        icon: "success",
        customClass: { container: "my-swal", popup: "my-popup" }
      });
    }
  });
});


show_battle_message.addEventListener("click", function() {
  // First prompt for the message to display
  Swal.fire({
    title: "What message would you like to send?",
    input: "text",
    inputPlaceholder: "Type your message here",
    showCancelButton: true,
    confirmButtonText: "Next",
    cancelButtonText: "Cancel",
    customClass: { container: "my-swal", popup: "my-popup" }
  }).then(result => {
    if (result.value) {
      let message = result.value;

      // Second prompt for how long the message should be visible (in milliseconds)
      Swal.fire({
        title: "How long would you like this message to be visible for?",
        input: "number",
        inputAttributes: { min: 100, max: 10000 },
        inputValue: 1500, // Default value
        showCancelButton: true,
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        customClass: { container: "my-swal", popup: "my-popup" }
      }).then(timeResult => {
        if (timeResult.value) {
          let duration = Math.max(100, Math.min(10000, parseInt(timeResult.value, 10) || 1500)); // Ensure valid time input

          // Show the message in the battle log for the specified duration
          Boot.prototype.game._state._current._battleController.textLog.showMessageForMs(duration, message);

          // Success confirmation
          Swal.fire({
            title: "Success!",
            text: `The message has been sent and will appear for ${duration} milliseconds.`,
            icon: "success",
            customClass: { container: "my-swal", popup: "my-popup" }
          });
        }
      });
    }
  });
});

get_all_pets.addEventListener("click", function() {
  Swal.fire({
    title: "Select Level for All Pets",
    input: "number",
    inputAttributes: { min: 1, max: 100 },
    inputValue: 100, // Default level set to 100
    showCancelButton: true,
    confirmButtonText: "Next",
    cancelButtonText: "Cancel",
    customClass: { container: "my-swal", popup: "my-popup" }
  }).then(result => {
    if (result.value) {
      let level = Math.max(1, Math.min(100, parseInt(result.value, 10) || 100)); // Ensure valid level

      Swal.fire({
        title: "Are you sure?",
        text: `Do you want to add all pets at level ${level}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        customClass: { container: "my-swal", popup: "my-popup" }
      }).then(confirmResult => {
        if (confirmResult.value) {
          let gameData = Boot.prototype.game._state.get("Boot")._gameData.pet;
          let kennel = Boot.prototype.game._state._current.user.source.kennel;

          gameData.forEach(petData => {
            // Check if pet is already in the kennel
            // let existingPet = kennel._petData.find(pet => pet.ID === petData.ID);
            // if (!existingPet) {
              // If pet is not in the kennel, create a new pet object and add it
            let newPet = {
              ID: petData.ID,
              catchDate: Date.now(),
              foreignSpells: [], // Add any required spells here if needed
              level: level, // Set the desired level for the new pet
              levelCaught: level,
              stars: 361, // Set initial stars (modify if needed)
              uniqueID: Math.random().toString(36).substr(2, 9) // Generate a unique ID
            };

            // Add the new pet to the kennel
            kennel._petData.push(newPet);
            // }
          });

          // Mark the kennel data as updated
          Boot.prototype.game._state._current.user.source._saveEnabled = true;
          Boot.prototype.game._state._current.user.source.kennel.updated = true;
          Boot.prototype.game._state._current.user.source.updated = true;
          Boot.prototype.game._state._current.user.source.forceSaveCharacter();

          Swal.fire({
            title: "Success!",
            text: `All pets have been added at level ${level}.`,
            icon: "success",
            customClass: { container: "my-swal", popup: "my-popup" }
          });
        }
      });
    }
  });
});



get_specific_pet.addEventListener("click", function() {
  let petData = Boot.prototype.game._state.get("Boot")._gameData.pet;
  let options = petData.map(pet => `<option value="${pet.ID}">${pet.data.name}</option>`).join("");

  Swal.fire({
    title: "Select Pet",
    html: `<select id="petSelect" class="swal2-select">${options}</select>`,
    showCancelButton: true,
    confirmButtonText: "Next",
    cancelButtonText: "Cancel",
    customClass: { container: "my-swal", popup: "my-popup" },
    didOpen: () => {
      document.getElementById("petSelect").focus();
    }
  }).then(result => {
    if (result.value) {
      let selectedID = document.getElementById("petSelect").value;
      let selectedPet = petData.find(pet => pet.ID == selectedID);
      let selectedPetName = selectedPet.data.name;
      let selectedPetLevel = selectedPet.level;

      Swal.fire({
        title: `Set Level for ${selectedPetName}`,
        input: "number",
        inputAttributes: { min: 1, max: 100 },
        inputValue: selectedPetLevel,
        showCancelButton: true,
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        customClass: { container: "my-swal", popup: "my-popup" }
      }).then(result => {
        if (result.value) {
          let level = Math.max(1, Math.min(100, parseInt(result.value, 10) || 1)); // Ensure valid level
          let userSource = Boot.prototype.game._state._current.user.source;
          let kennel = userSource.kennel;

          // Create the new pet object
          let newPet = {
            ID: selectedPet.ID, // Use selected pet's ID
            catchDate: Date.now(), // Timestamp for the catch date
            foreignSpells: [], // Add any foreign spells if needed
            level: level, // Set the level
            levelCaught: level, // Initially set the level caught to the same
            stars: 361, // Default stars, can be adjusted if necessary
            uniqueID: generateUniqueID() // Generate or assign a unique ID (you can define this function)
          };

          // Add the pet to the kennel
          kennel._petData.push(newPet);
          console.log(kennel._petData);

          // Save the data
          userSource._saveEnabled = true;
          userSource.kennel.updated = true;
          userSource.updated = true;
          userSource.forceSaveCharacter();

          Swal.fire({
            title: "Success!",
            text: `${selectedPetName} has been added to your kennel at level ${level}.`,
            icon: "success",
            customClass: { container: "my-swal", popup: "my-popup" }
          });
        }
      });
    }
  });
});

// Helper function to generate unique ID (you can modify this if needed)
function generateUniqueID() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}




get_specific_furniture.addEventListener("click", function() {
  let gameData = Boot.prototype.game._state._states.get("Boot")._gameData.dorm;
  let options = gameData.map(item => `<option value="${item.ID}">${item.name}</option>`).join("");

  Swal.fire({
    title: "Select Furniture",
    html: `<select id="furnitureSelect" class="swal2-select">${options}</select>`,
    showCancelButton: true,
    confirmButtonText: "Next",
    cancelButtonText: "Cancel",
    customClass: { container: "my-swal", popup: "my-popup" },
    didOpen: () => {
      document.getElementById("furnitureSelect").focus();
    }
  }).then(result => {
    if (result.value) {
      let selectedID = document.getElementById("furnitureSelect").value;
      let selectedName = gameData.find(item => item.ID == selectedID).name;

      Swal.fire({
        title: `Enter Quantity for ${selectedName}`,
        input: "number",
        inputAttributes: { min: 1 },
        inputValue: 1,
        showCancelButton: true,
        confirmButtonText: "Unlock",
        cancelButtonText: "Cancel",
        customClass: { container: "my-swal", popup: "my-popup" }
      }).then(result => {
        if (result.value) {
          let quantity = Math.max(1, parseInt(result.value, 10) || 1);
          let e = Boot.prototype.game._state._current.user.source;

          e.house.data.items[selectedID] = { A: [], N: quantity };
          e.house.updated = true;
          e.updated = true;

          Swal.fire({
            title: "Success!",
            text: `Unlocked ${quantity} of ${selectedName}.`,
            icon: "success",
            customClass: { container: "my-swal", popup: "my-popup" }
          });
        }
      });
    }
  });
});


get_all_furniture.addEventListener("click", function() {
  Swal.fire({
    title: "Unlock All Furniture",
    text: "Are you sure you want to unlock all furniture with an unlimited quantity?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Unlock",
    cancelButtonText: "Cancel",
    customClass: { container: "my-swal", popup: "my-popup" }
  }).then(function(result) {
    if (result.value) {
      let e = Boot.prototype.game._state._current.user.source;
      e.house.data.items = {};
      Boot.prototype.game._state._states.get("Boot")._gameData.dorm.forEach(t => {
        e.house.data.items[t.ID] = { A: [], N: 999999999999999 };
      });
      e.house.updated = true;
      e.updated = true;

      Swal.fire({
        title: "Success!",
        text: "All furniture items have been unlocked.",
        icon: "success",
        customClass: { container: "my-swal", popup: "my-popup" }
      });
    }
  });
});

get_all_gems.addEventListener("click", function() {
  Swal.fire({
    title: "Confirm Gems Addition",
    text: "Are you sure you want to add all gems to your backpack?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Add Gems",
    cancelButtonText: "Cancel",
    customClass: { container: "my-swal", popup: "my-popup" }
  }).then(function(result) {
    if (result.value) {
      let e = Boot.prototype.game._state._current.user.source;
      [3, 4, 10, 11, 17].forEach(t => {
        let a = e.backpack.data.key.find(e => e.ID === t);
        a ? a.N += 1 : e.backpack.data.key.push({ ID: t, N: 1 });
      });
      e.appearance.updated = true;
      e.updated = true;
      e.saveEnabled = true;
      e.forceSaveCharacter();
      e.appearanceChanged = true;
      e.backpack.updated = true;
      console.log("Attempted to add gems")
      Swal.fire({
        title: "Success!",
        text: "All gems have been added to your backpack.",
        icon: "success",
        customClass: { container: "my-swal", popup: "my-popup" }
      });
    }
  });
});

player_teleporter.addEventListener("click", function() {
  Swal.fire({
    title: "Select Zone",
    html: `<select id="zoneSelect" class="swal2-select"></select>`,
    showCancelButton: true,
    confirmButtonText: "Next",
    cancelButtonText: "Cancel",
    customClass: { container: "my-swal", popup: "my-popup" },
    didOpen: function() {
      var zoneSelect = document.getElementById("zoneSelect"),
          zones = Object.keys(Boot.prototype.game._state._current._world.zones);
          
      zones.forEach(zone => {
        var option = document.createElement("option"),
            zoneData = Boot.prototype.game._state._current._world.zones[zone];
        option.value = zone;
        option.textContent = zoneData.name || zone;
        zoneSelect.appendChild(option);
      });
    }
  }).then(function(result) {
    if (result.value) {
      var selectedZone = document.getElementById("zoneSelect").value,
          maps = Object.keys(Boot.prototype.game._state._current._world.zones[selectedZone].maps);

      Swal.fire({
        title: "Select Map",
        html: `<select id="mapSelect" class="swal2-select"></select>`,
        showCancelButton: true,
        confirmButtonText: "Next",
        cancelButtonText: "Cancel",
        customClass: { container: "my-swal", popup: "my-popup" },
        didOpen: function() {
          var mapSelect = document.getElementById("mapSelect");
          maps.forEach(map => {
            var option = document.createElement("option"),
                mapData = Boot.prototype.game._state._current._world.zones[selectedZone].maps[map];
            option.value = map;
            option.textContent = `${map} - ${mapData.name || map}`;
            mapSelect.appendChild(option);
          });
        }
      }).then(function(result) {
        if (result.value) {
          var selectedMap = document.getElementById("mapSelect").value; // ✅ Fix: Get value before moving to next step
          var mapTag = Boot.prototype.game._state._current._world.zones[selectedZone].maps[selectedMap].zoneName; // ✅ Now this won't be null

          Swal.fire({
            title: "Enter Coordinates",
            html: `<input type="text" id="positionInput" value="500, 500" class="swal2-input">`,
            showCancelButton: true,
            confirmButtonText: "Teleport",
            cancelButtonText: "Cancel",
            customClass: { container: "my-swal", popup: "my-popup" }
          }).then(function(result) {
            if (result.value) {
              var coords = document.getElementById("positionInput").value.split(",").map(n => parseInt(n.trim(), 10));
              if (isNaN(coords[0]) || isNaN(coords[1])) {
                Swal.fire({ title: "Error", text: "Invalid coordinates.", icon: "error", customClass: { container: "my-swal", popup: "my-popup" } });
                return;
              }

              Boot.prototype.game._state._current._world.zones[selectedZone].teleport(mapTag.substring(mapTag.indexOf("-") + 1), coords[0], coords[1], {}, {});

              Swal.fire({ title: "Success!", text: `Teleported to ${mapTag} at (${coords[0]}, ${coords[1]})`, icon: "success", customClass: { container: "my-swal", popup: "my-popup" } });
            }
          });
        }
      });
    }
  });
});



set_custom_player_level.addEventListener("click", function() {
  Swal.fire({
    title: "Set Custom Player Level",
    input: "number",
    inputPlaceholder: "",
    showCancelButton: true,
    confirmButtonText: "Set",
    cancelButtonText: "Cancel",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    }
  }).then(function(result) {
    if (result.value) {
      let level = parseInt(result.value);
      if (isNaN(level)) {
        Swal.fire({
          title: "Error",
          text: "Please enter a valid number",
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
          customClass: {
            container: "my-swal",
            popup: "my-popup"
          }
        });
        return;
      }

      Boot.prototype.game._state._current.user.source.getPlayerData().level = level;
      Boot.prototype.game._state._current.user.source.data.level = level;
      Boot.prototype.game._state._current.user.source.getLevel = () => level;
      
      Swal.fire({
        title: "Success",
        text: "Custom Player level set successfully",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        customClass: {
          container: "my-swal",
          popup: "my-popup"
        }
      });
    }
  });
});


get_specific_epic_buddy.addEventListener("click", function () {
  const followPets = [
    { ID: 125, assetID: 270, name: "Big Hex" },
    { ID: 126, assetID: 271, name: "Florafox" },
    { ID: 127, assetID: 272, name: "Arctursus" },
    { ID: 128, assetID: 273, name: "Diveodile" },
    { ID: 129, assetID: 274, name: "Magmischief" },
    { ID: 134, assetID: 1261, name: "Chill & Char" },
    { ID: 135, assetID: 1263, name: "Tidus" },
    { ID: 136, assetID: 1283, name: "Luma" },
    { ID: 137, assetID: 1284, name: "Eclipse" }
  ];

  let options = followPets.map(pet => `<option value="${pet.ID}">${pet.name}</option>`).join("");

  Swal.fire({
    title: "Select an Epic",
    html: `<select id="epicSelect" class="swal2-select">${options}</select>`,
    showCancelButton: true,
    confirmButtonText: "Add Epic",
    cancelButtonText: "Cancel",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    },
    didOpen: () => {
      document.getElementById("epicSelect").focus();
    }
  }).then((result) => {
    if (result.value) {
      const selectedID = parseInt(document.getElementById("epicSelect").value);
      const pet = followPets.find(p => p.ID === selectedID);

      if (pet) {
        const backpack = Boot.prototype.game._state._current.user.source.backpack.data;
        if (!backpack.follow) backpack.follow = [];

        backpack.follow.push({
          ID: pet.ID,
          assetID: pet.assetID,
          N: 1,
          defence: 0,
          hp: 0,
          power: 0,
          speed: 40,
          type: "follow"
        });

        Boot.prototype.game._state._current.user.source.updated = true;
        Boot.prototype.game._state._current.user.source.backpack.updated = true;

        Swal.fire({
          title: 'Success!',
          text: `${pet.name} has been added successfully.`,
          icon: 'success',
          customClass: {
            container: 'my-swal',
            popup: 'my-popup'
          }
        });
      }
    }
  });
});


get_all_epic_buddies.addEventListener("click", function () {
  Swal.fire({
    title: "Add All Epics?",
    text: "This will add all epics to your backpack.",
    icon: "info",
    showCancelButton: true,
    confirmButtonText: "Add Epics",
    cancelButtonText: "Cancel",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    }
  }).then(function (result) {
    if (result.value) {
      const backpack = Boot.prototype.game._state._current.user.source.backpack.data;
      if (!backpack.follow) backpack.follow = [];

      const followPets = [
        { ID: 125, assetID: 270, name: "Big Hex" },
        { ID: 126, assetID: 271, name: "Florafox" },
        { ID: 127, assetID: 272, name: "Arctursus" },
        { ID: 128, assetID: 273, name: "Diveodile" },
        { ID: 129, assetID: 274, name: "Magmischief" },
        { ID: 134, assetID: 1261, name: "Chill & Char" },
        { ID: 135, assetID: 1263, name: "Tidus" },
        { ID: 136, assetID: 1283, name: "Luma" },
        { ID: 137, assetID: 1284, name: "Eclipse" }
      ];

      followPets.forEach(pet => {
        backpack.follow.push({
          ID: pet.ID,
          assetID: pet.assetID,
          N: 1,
          defence: 0,
          hp: 0,
          power: 0,
          speed: 40,
          type: "follow"
        });
      });

      Boot.prototype.game._state._current.user.source.updated = true;
      Boot.prototype.game._state._current.user.source.backpack.updated = true;

      Swal.fire({
          title: 'Success!',
          text: "All epics have been added successfully.",
          icon: 'success',
          customClass: {
            container: 'my-swal',
            popup: 'my-popup'
          }
        });
    }
  });
});

exit_battle.addEventListener("click", function() {
  Swal.fire({
    title: "Warning!",
    text: "This will kick player out of their current battle!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Exit Player",
    cancelButtonText: "Cancel",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    }
  }).then(function(result) {
    if (result.value) {
      if (Boot.prototype.game._state.current === 'SecureBattleRevamp') {
        Boot.prototype.game._state._current.init();
      };
    }
  });
});

remove_monsters.addEventListener("click", function() {
  Swal.fire({
    title: "Warning!",
    text: "This hack is still being tested, are you sure?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Remove Monsters",
    cancelButtonText: "Cancel",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    }
  }).then(function(result) {
    if (result.value) {
      var a = Boot.prototype.game._state._current._world.getCurrentZone(),
      b = Boot.prototype.game._state._current._world.getCurrentMap(),
      c = Boot.prototype.game._state._current._world.zones[a].maps[b.split("-")[1]].mapMonsters,
      d = -1;
      
      c.forEach(function(e) {
          if (e && e.data && e.monsterData) {
              e.data.ID = d;
              e.monsterData.ID = d;
          }
      });
      
      Boot.prototype.game._state._current.user.source.state.updated = true;
      Boot.prototype.game._state._current.user.source.updated = true;
      
      // Save current zone, map, and player coordinates
      var current_zone_id = Boot.prototype.game._state._current._world.getCurrentZone();
      var current_map_tag = Boot.prototype.game._state._current._world.getCurrentMapTag();
      var current_x_pos = Boot.prototype.game._state._current.user.position._x;
      var current_y_pos = Boot.prototype.game._state._current.user.position._y;
      
      // Teleport to the exact same spot to refresh
      Boot.prototype.game._state._current._world.zones[current_zone_id].teleport(current_map_tag, current_x_pos, current_y_pos, {}, {});
      
      // Small timeout to ensure everything processes smoothly
      setTimeout(function() {
          console.log("All monsters in area have been removed!")
      }, 100); // 100ms delay to ensure teleport completes
    }
  });
});

getAllItemsButton.addEventListener("click", function() {
  Swal.fire({
    title: "Unlock All Items",
    input: "number",
    inputPlaceholder: "",
    showCancelButton: true,
    confirmButtonText: "Unlock",
    cancelButtonText: "Cancel",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    },
    inputValidator: function(e) {
      if (!e || isNaN(e) || e < 1 || e > 1e308 || e % 1 != 0) {
        Swal.fire({
          title: "Error",
          text: "Please enter a valid whole number between 1 and 1e308",
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
          customClass: {
            container: "my-swal",
            popup: "my-popup"
          }
        });
        return false;
      }
    }
  }).then(function(result) {
    if (result.value) {
      unlockAllItems(result.value);
        Swal.fire({
  title: "Success!",
  text: `Succesfully unlocked all items with amount ${result.value}`,
  icon: "success",
  customClass: {
    container: "my-swal",
    popup: "my-popup"
  }
});
    }
  });
});

clearAllItemsButton.addEventListener("click", function() {
  Swal.fire({
    title: "Clear All Items",
    showCancelButton: true,
    confirmButtonText: "Clear",
    cancelButtonText: "Cancel",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    }
  }).then(function(result) {
    if (result.value) {
      clearAllItems();
        Swal.fire({
  title: "Success!",
  text: "All items cleared successfully.",
  icon: "success",
  customClass: {
    container: "my-swal",
    popup: "my-popup"
  }
});
    }
  });
});

// Function to unlock all items
function unlockAllItems(quantity=value) {
  var types = [
    "boots",
    "currency",
    "fossil",
    "hat",
    "item",
    "key",
    "mount",
    "outfit",
    "relic",
    "spellRelic",
    "weapon",
    "follow"
  ];

  types.forEach(type => {
    var itemType = `Boot.prototype.game._state._current.user.source.backpack.data.${type}`;

    if (!eval(itemType)) {
      eval(`${itemType} = []`);
    }

    eval(`${itemType}.length = 0`);

    var itemsData = Boot.prototype.game._state._states.get("Boot")._gameData[type];

    var excludedIDs = []
    if (type === "follow") {
      excludedIDs = [125, 126, 127, 128, 129, 134, 135, 136, 137]
    }

    itemsData.forEach(item => {
      if (!(type === "follow" && excludedIDs.includes(item.ID))) {
        eval(`${itemType}.push({ "ID": item.ID, "N": quantity })`);
      }
    });

  });


  // Set backpack updated to true to indicate changes
  Boot.prototype.game._state._current.user.source.backpack.updated = true;

  Swal.fire({
    title: "Success!",
    text: "All items unlocked successfully.",
    icon: "success",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    }
  });
}

// Function to clear all items
function clearAllItems() {
  var types = [
    "boots",
    "currency",
    "fossil",
    "hat",
    "item",
    "key",
    "mount",
    "outfit",
    "relic",
    "spellRelic",
    "weapon",
    "follow"
  ];

  types.forEach(type => {
    var itemType = `Boot.prototype.game._state._current.user.source.backpack.data.${type}`;
    eval(`${itemType} = []`);
  });

  // Set backpack updated to true to indicate changes
  Boot.prototype.game._state._current.user.source.backpack.updated = true;

  console.log(`Cleared all items.`);
}
    
SetPlayerCustomNameButton.addEventListener("click", function() {
  Swal.fire({
    title: "Set Custom Player Name",
    input: "text",
    inputPlaceholder: "Enter custom name",
    showCancelButton: true,
    confirmButtonText: "Set",
    cancelButtonText: "Cancel",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    }
  }).then(result => {
    if (result.value) {
      Boot.prototype.game._state._current.user.source.getName = () => {
        return result.value;
      };
      Boot.prototype.game._state._current.user.source.appearanceChanged = true;
      Swal.fire({
        title: "Success",
        text: "Custom name set successfully",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        customClass: {
          container: "my-swal",
          popup: "my-popup"
        }
      });
    }
  });
});

setPlayerNameButton.addEventListener("click", function () {
    changeName('first');
});

basicMembershipToggle.addEventListener("click", function() {
    if (this.checked) {
    Boot.prototype.game._state._current.user.source.hasMembership = function() {
      return true;
    };
    _._segment._activePlayer._player.getMemberTier = () => {return 101};
    Boot.prototype.game._state._current.user.source.appearanceChanged = true;
    reloadSave()
    Swal.fire({
      title: "Basic Membership Enabled",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
      customClass: {
        container: "my-swal",
        popup: "my-popup"
      }
    });
  } else {
    _._segment._activePlayer._player.getMemberTier = () => {return 0};
    Boot.prototype.game._state._current.user.source.hasMembership = function() {
      return false;
    };
    _._segment._activePlayer._player.getMemberTier = () => {return 0};
    Boot.prototype.game._state._current.user.source.appearanceChanged = true;
    Swal.fire({
      title: "Basic Membership Disabled",
      icon: "error",
      timer: 1500,
      showConfirmButton: false,
      customClass: {
        container: "my-swal",
        popup: "my-popup"
      }
    });
  }
});
    
 fixMorphCrashButton.addEventListener("click", function() {
  Boot.prototype.game._state._current.user.source.getPlayerData().playerTransformation = void 0;
  Boot.prototype.game._state._current.user.source.appearanceChanged = true;
  Boot.prototype.game._state._current.user._morphTransformation.clearMorphedAppearance();
  Boot.prototype.game._state._current.user._morphTransformation.clearMorphedAppearanceWithoutEffect();
  Swal.fire({
    title: "Success",
    text: "Morph glitch fixed",
    icon: "success",
    timer: 1500,
    showConfirmButton: false,
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    }
  });
});   
    
setPlayerMorphButton.addEventListener("click", function () {
  Swal.fire({
    title: 'Which morph type?',
    input: 'select',
    inputOptions: {
      pet: 'Pet',
      dorm: 'Furniture',
      follow: 'Follow',
    },
    inputPlaceholder: 'Morph Type',
    inputValidator: (e) => e ? '' : 'Please select a morph type.',
    showCancelButton: true,
    showConfirmButton: true,
    confirmButtonText: 'Continue',
    customClass: {
      container: 'my-swal',
      popup: 'my-popup'
    }
  }).then((result) => {
    if (!result.value) {
      return;
    }
    var morphType = result.value;
    var options = {};
    Boot.prototype.game._state._states.get('Boot')._gameData[morphType].forEach((e) => {
      options[e.ID] = `${e.data.name} (${e.ID})`;
    });
    Swal.fire({
      title: 'Which morph?',
      input: 'select',
      inputOptions: options,
      inputPlaceholder: 'Morph ID',
      inputValidator: (e) => e ? '' : 'Please select a morph ID.',
      showCancelButton: true,
      customClass: {
        container: 'my-swal',
        popup: 'my-popup'
      }
    }).then((result) => {
      if (!result.value) {
        return;
      }
      var morphID = result.value;
      Boot.prototype.game._state._current.user.source.getPlayerData().playerTransformation = {
        transformType: morphType,
        transformID: morphID,
        maxTime: 36e5,
        timeRemaining: 36e5,
      };
        Boot.prototype.game._state._current.user._morphTransformation.createMorphAppearance();
      Boot.prototype.game._state._current.user.source.appearanceChanged = true;
      Swal.fire({
        title: 'Morphed!',
        text: 'You\'ve been morphed.',
        icon: 'success',
        customClass: {
          container: 'my-swal',
          popup: 'my-popup'
        }
      });
    });
  });
});
    var sizeInterval = null;

   setPlayerSizeButton.addEventListener("click", function() {
  Swal.fire({
    title: "Set Player Size",
    input: "number",
    inputPlaceholder: "",
    showCancelButton: true,
    confirmButtonText: "Set",
    cancelButtonText: "Cancel",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    },
    inputValidator: function(e) {
      if (!e || isNaN(e) || e < 0 || e > 3) {
        Swal.fire({
          title: "Error",
          text: "Please enter a valid number between 0 and 3",
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
          customClass: {
            container: "my-swal",
            popup: "my-popup"
          }
        });
        return false;
      }
    },
    footer: "The default size is 1"
  }).then(function(result) {
    if (result.value) {
      let newSize = parseFloat(result.value);
      if (sizeInterval) {
        clearInterval(sizeInterval);
      }
      sizeInterval = setInterval(() => {
        Boot.prototype.game._state._current.user.worldScale.set(newSize, newSize);
        Boot.prototype.game._state._current.user.scale.set(newSize, newSize);
      }, 50);
      Swal.fire({
        title: "Success",
        text: "Player size set successfully",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        customClass: {
          container: "my-swal",
          popup: "my-popup"
        }
      });
    }
  });
});
    
togglePauseGameButton.addEventListener("click", function() {
  Boot.prototype.game.paused = !Boot.prototype.game.paused;
  if (Boot.prototype.game.paused) {
    Swal.fire({
      title: "Game Paused",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
      customClass: {
        container: "my-swal",
        popup: "my-popup"
      }
    });
  } else {
    Swal.fire({
      title: "Game Resumed",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
      customClass: {
        container: "my-swal",
        popup: "my-popup"
      }
    });
  }
});
    
crashGameButton.addEventListener("click", function() {
  Swal.fire({
    title: "Warning!",
    text: "This will crash your game! Are you sure?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Crash Game",
    cancelButtonText: "Cancel",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    }
  }).then(function(result) {
    if (result.value) {
      Boot.prototype.game._state._current.shutdown();
    setInterval(function() { Boot.prototype.game.paused = true }, 50);
    }
  });
});
    
    hideNameToggle.addEventListener("change", function() {
  if (this.checked) {
    Swal.fire({
      title: "Player Name Hidden",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
      customClass: {
        container: "my-swal",
        popup: "my-popup"
      }
    });
    hideNameInterval = setInterval(() => {
      Boot.prototype.game._state._current.user.hideName();
    }, 50); // adjust the interval to a reasonable value
  } else {
    Swal.fire({
      title: "Player Name Shown",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
      customClass: {
        container: "my-swal",
        popup: "my-popup"
      }
    });
    clearInterval(hideNameInterval);
    Boot.prototype.game._state._current.user.showName();
  }
});
    
spinButton.addEventListener("click", function() {
  Boot.prototype.game._state._current.user.source.canSpin = function() {
    return true;
  };
  Swal.fire({
    title: "Success",
    text: "Unlimited spins enabled",
    icon: "success",
    timer: 1500,
    showConfirmButton: false,
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    }
  });
});
  noclipToggle.addEventListener("change", function() {
    if (this.checked) {
      Swal.fire({
        title: "Noclip Enabled",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        customClass: {
          container: "my-swal",
          popup: "my-popup"
        }
      });
      previousAreaState = Boot.prototype.game._state._current.area.map(e => e.slice());
      NoclipInterval = setInterval(() => {
        for (var e = Boot.prototype.game._state._current.area, t = 0; t < e.length; t++) e[t] = Array(64).fill(1);
      }, 50);
    } else {
      Swal.fire({
        title: "Noclip Disabled",
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
        customClass: {
          container: "my-swal",
          popup: "my-popup"
        }
      });
      clearInterval(NoclipInterval);
      for (var e = Boot.prototype.game._state._current.area, t = 0; t < e.length; t++) e[t] = previousAreaState[t];
    }
  });

saveGameButton.addEventListener("click", function() {
  var currentState = Boot.prototype.game._state._current;
  currentState.update();
  currentState.updateOnFaintData();
  currentState.updatePlayer(currentState.user.source.userID);
  currentState.screenUpdate();
  
  var user = currentState.user;
  user.update();
  user.updateTransform();
  user.updateMountAppearance();
  user.source.updated = true;
  user.source.appearance.updated = true;
  user.source.appearanceChanged = true;
  user.source.saveEnabled = true;
  user.source._saveEnabled = true;
  user.source.forceSaveCharacter();
  user.source.backpack.updated = true;
  user.source.kennel.updated = true;
  
  Swal.fire({
          title: "Success",
          text: "Game saved succesfully",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
          customClass: {
            container: "my-swal",
            popup: "my-popup"
          }
        });
});
    
  invisibilityToggle.addEventListener("change", function() {
    if (this.checked) {
      Swal.fire({
        title: "Invisibility Enabled",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        customClass: {
          container: "my-swal",
          popup: "my-popup"
        }
      });
      invisibilityInterval = setInterval(() => {
        Boot.prototype.game._state._current.user.visible = false;
      }, 50);
    } else {
      Swal.fire({
        title: "Invisibility Disabled",
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
        customClass: {
          container: "my-swal",
          popup: "my-popup"
        }
      });
      clearInterval(invisibilityInterval);
      Boot.prototype.game._state._current.user.visible = true;
    }
  });

  setGoldButton.addEventListener("click", function() {
  Swal.fire({
    title: "Set Gold",
    input: "number",
    inputPlaceholder: "",
    showCancelButton: true,
    confirmButtonText: "Set",
    cancelButtonText: "Cancel",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    },
    inputValidator: function(e) {
      if (!e || isNaN(e) || e < 1 || e > 1e7 || e % 1 != 0) {
        Swal.fire({
          title: "Error",
          text: "Please enter a valid whole number between 1 and 10,000,000",
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
          customClass: {
            container: "my-swal",
            popup: "my-popup"
          }
        });
        return false;
      }
    }
  }).then(function(e) {
    if (e.value) {
      Boot.prototype.game._state._current.user.source.getPlayerData().gold = parseInt(e.value);
      Boot.prototype.game._state._current.user.source.data.gold = parseInt(e.value);
      Boot.prototype.game._state._current.user.source.updated = true;
      Swal.fire({
        title: "Success",
        text: "Gold set successfully",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        customClass: {
          container: "my-swal",
          popup: "my-popup"
        }
      });
    }
  });
});
setBountyScoreButton.addEventListener("click", function() {
  Swal.fire({
    title: "Set Bounty Score",
    input: "number",
    inputPlaceholder: "",
    showCancelButton: true,
    confirmButtonText: "Set",
    cancelButtonText: "Cancel",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    },
    inputValidator: function(e) {
      if (!e || isNaN(e) || e < 0 || e > 1e308 || e % 1 != 0) {
        Swal.fire({
          title: "Error",
          text: "Please enter a valid whole number between 0 and e+308",
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
          customClass: {
            container: "my-swal",
            popup: "my-popup"
          }
        });
        return false;
      }
    }
  }).then(function(result) {
    if (result.value) {
      Boot.prototype.game._state._current.user.source.getPlayerData().bountyScore = parseInt(result.value);
      Boot.prototype.game._state._current.user.source.data.bountyScore = parseInt(result.value);
      Boot.prototype.game._state._current.user.source.updated = true;
      Swal.fire({
        title: "Success",
        text: "Bounty score set successfully",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        customClass: {
          container: "my-swal",
          popup: "my-popup"
        }
      });
    }
  });
});
setPlayerLevelButton.addEventListener("click", function() {
  Swal.fire({
    title: "Set Player Level",
    input: "number",
    inputPlaceholder: "",
    showCancelButton: true,
    confirmButtonText: "Set",
    cancelButtonText: "Cancel",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    },
    inputValidator: function(e) {
      if (!e || isNaN(e) || e < 1 || e > 100 || e % 1 != 0) {
        Swal.fire({
          title: "Error",
          text: "Please enter a valid whole number between 1 and 100",
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
          customClass: {
            container: "my-swal",
            popup: "my-popup"
          }
        });
        return false;
      }
    }
  }).then(function(result) {
    if (result.value) {
      Boot.prototype.game._state._current.user.source.getPlayerData().level = parseInt(result.value);
      Boot.prototype.game._state._current.user.source.data.level = parseInt(result.value);
      Boot.prototype.game._state._current.user.source.updated = true;
      Swal.fire({
        title: "Success",
        text: "Player level set successfully",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        customClass: {
          container: "my-swal",
          popup: "my-popup"
        }
      });
    }
  });
});
setGradeButton.addEventListener("click", function() {
  Swal.fire({
    title: "Set Grade",
    input: "number",
    inputPlaceholder: "",
    showCancelButton: true,
    confirmButtonText: "Set",
    cancelButtonText: "Cancel",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    },
    inputValidator: function(e) {
      if (!e || isNaN(e) || e < 1 || e > 8 || e % 1 != 0) {
        Swal.fire({
          title: "Error",
          text: "Please enter a valid whole number between 1 and 8",
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
          customClass: {
            container: "my-swal",
            popup: "my-popup"
          }
        });
        return false;
      }
    }
  }).then(function(result) {
    if (result.value) {
      Boot.prototype.game._state._current.user.source.educationData.grade = parseInt(result.value);
      Boot.prototype.game._state._current.user.source.educationData.chosenGrade = parseInt(result.value);
      Boot.prototype.game._state._current.user.source.grade = parseInt(result.value);
      Boot.prototype.game._state._current.user.source.updated = true;
      Swal.fire({
        title: "Success",
        text: "Grade set successfully",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        customClass: {
          container: "my-swal",
          popup: "my-popup"
        }
      });
    }
  });
});

let walkSpeedInterval = null;
let customWalkSpeed = null; // store custom walkspeed value

teleportClickToggle.addEventListener("change", function() {
  if (this.checked) {
    Swal.fire({
      title: "Teleport Click Enabled",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
      customClass: {
        container: "my-swal",
        popup: "my-popup"
      }
    });
    startWalkSpeedInterval(true);
  } else {
    Swal.fire({
      title: "Teleport Click Disabled",
      icon: "error",
      timer: 1500,
      showConfirmButton: false,
      customClass: {
        container: "my-swal",
        popup: "my-popup"
      }
    });
    stopWalkSpeedInterval();
    if (customWalkSpeed !== null) {
      // restore custom walkspeed value when teleport click is disabled
      Boot.prototype.game._state._current.user.walkSpeed = customWalkSpeed;
      customWalkSpeed = null;
    } else {
      // set walkspeed to default value (1.5) if no custom value is set
      Boot.prototype.game._state._current.user.walkSpeed = 1.5;
    }
  }
});
    
setPlayerWalkspeedButton.addEventListener("click", function() {
  Swal.fire({
    title: "Set Walkspeed",
    input: "number",
    inputPlaceholder: "",
    showCancelButton: true,
    confirmButtonText: "Set",
    cancelButtonText: "Cancel",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    },
    inputValidator: function(e) {
      if (!e || isNaN(e) || e < 0 || e > 1e308 || !/^-?\d+(\.\d+)?$/.test(e)) {
        Swal.fire({
          title: "Error",
          text: "Please enter a valid decimal number between 0 and e+308",
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
          customClass: {
            container: "my-swal",
            popup: "my-popup"
          }
        });
        return false;
      }
    },
    footer: "The default walkspeed is 1.5"
  }).then(function(result) {
    if (result.value) {
      if (teleportClickToggle.checked) {
        // store custom walkspeed value when teleport click is enabled
        customWalkSpeed = parseFloat(result.value);
      } else {
        Boot.prototype.game._state._current.user.walkSpeed = parseFloat(result.value);
      }
      Swal.fire({
        title: "Success",
        text: "Walkspeed set successfully",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        customClass: {
          container: "my-swal",
          popup: "my-popup"
        }
      });
    }
  });
});

function startWalkSpeedInterval(teleportClickEnabled, customWalkSpeedValue) {
  if (walkSpeedInterval) {
    clearInterval(walkSpeedInterval);
  }
  walkSpeedInterval = setInterval(() => {
    if (teleportClickEnabled) {
      // prioritize custom walkspeed when teleport click is enabled
      Boot.prototype.game._state._current.user.walkSpeed = customWalkSpeedValue || 1e100;
    } else {
      Boot.prototype.game._state._current.user.walkSpeed = customWalkSpeedValue || 1.5;
    }
  }, 50);
}

function stopWalkSpeedInterval() {
  if (walkSpeedInterval) {
    clearInterval(walkSpeedInterval);
  }
}
    
setPlayerMemberStarsButton.addEventListener("click", function() {
  Swal.fire({
    title: "Set Member Stars",
    input: "number",
    inputPlaceholder: "",
    showCancelButton: true,
    confirmButtonText: "Set",
    cancelButtonText: "Cancel",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    },
    inputValidator: function(e) {
      if (!e || isNaN(e) || e < 0 || e > 1e308 || e % 1 != 0) {
        Swal.fire({
          title: "Error",
          text: "Please enter a valid whole number between 0 and e+308",
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
          customClass: {
            container: "my-swal",
            popup: "my-popup"
          }
        });
        return false;
      }
    }
  }).then(function(result) {
    if (result.value) {
      Boot.prototype.game._state._current.user.source.getPlayerData().storeMemberStars = parseInt(result.value);
      Boot.prototype.game._state._current.user.source.data.storedMemberStars = parseInt(result.value);
      Boot.prototype.game._state._current.user.source.updated = true;
      Swal.fire({
        title: "Success",
        text: "Member stars set successfully",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        customClass: {
          container: "my-swal",
          popup: "my-popup"
        }
      });
    }
  });
});
setTowerButton.addEventListener("click", function() {
  Swal.fire({
    title: "Set Dark Tower Level",
    input: "number",
    inputPlaceholder: "",
    showCancelButton: true,
    confirmButtonText: "Set",
    cancelButtonText: "Cancel",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    },
    inputValidator: function(e) {
      if (!e || isNaN(e) || e < 1 || e > 1000 || e % 1 != 0) {
        Swal.fire({
          title: "Error",
          text: "Please enter a valid whole number between 1 and 1000",
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
          customClass: {
            container: "my-swal",
            popup: "my-popup"
          }
        });
        return false;
      }
    }
  }).then(function(result) {
    if (result.value) {
      Boot.prototype.game._state._current.user.source.getPlayerData().tower = parseInt(result.value);
      Boot.prototype.game._state._current.user.source.data.tower = parseInt(result.value);
      Boot.prototype.game._state._current.user.source.updated = true;
      Swal.fire({
        title: "Success",
        text: "Dark Tower level set successfully",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        customClass: {
          container: "my-swal",
          popup: "my-popup"
        }
      });
    }
  });
});

  // Create toggle menu button
  var toggleMenu = document.createElement("div");
  toggleMenu.id = "toggleMenu";
  document.body.appendChild(toggleMenu);

  toggleMenu.onclick = function() {
    if (cheatMenu.classList.contains("hidden")) {
      cheatMenu.classList.remove("hidden");
      cheatMenu.classList.add("visible");
      toggleMenu.classList.add("rotated");
    } else {
      cheatMenu.classList.remove("visible");
      cheatMenu.classList.add("hiding");
      toggleMenu.classList.remove("rotated");
      setTimeout(function() {
        cheatMenu.classList.remove("hiding");
        cheatMenu.classList.add("hidden");
      }, 250);
    }
  };
}); // Close Promise.all block