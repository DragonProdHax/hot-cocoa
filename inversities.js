(async function() {
  window._ = window._ || {};
  window._.prodigy = {};
  
  await Promise.all(Array.from(document.scripts).map(async function(script) {
    if (script.src.includes("https://code.prodigygame.com/code")) {
      try {
        await (await fetch(script.src)).text();
        var container = Boot.prototype.add.prodigyGame._rootContainer._inversifyContainer;
        if (container && container._bindingDictionary) {
          container._bindingDictionary._map.forEach(function(binding, key) {
            try {
              var instance = container.get(key);
              if (instance && typeof instance === "object") {
                for (var prop of Object.getOwnPropertyNames(instance)) {
                  window._.prodigy[prop] = instance[prop];
                }
                for (var proto = Object.getPrototypeOf(instance); proto && proto !== Object.prototype;) {
                  for (var protoProp of Object.getOwnPropertyNames(proto)) {
                    if (!(protoProp in window._.prodigy)) {
                      window._.prodigy[protoProp] = instance[protoProp];
                    }
                  }
                  proto = Object.getPrototypeOf(proto);
                }
              }
            } catch (err) {}
          });
        }
      } catch (err) {}
    }
  }));
  
  console.log("Loaded Prodigy");
})();
