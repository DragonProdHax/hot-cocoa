import { createEffect, createSignal, onMount } from 'solid-js'
import toast from 'solid-toast'
import store from 'store2'
import { handleTabCloak } from '../lib/cloak'
import { handleDebug } from '../lib/debug'
import { handleTheme, themes } from '../lib/theme'
import { openAbWindow } from '../lib/aboutblank'
import type { DebugData, PanicData, TabData, ThemeData, TransportData, AboutBlankData, DevtoolsData } from '../lib/types'

import { CircleCheck, CircleHelp, Code, Globe } from 'lucide-solid'
import { exportData, importData, resetData } from '../lib/browsingdata'
import { handleTransport } from '../lib/transport'

export const [exportSuccessful, setExportStatus] = createSignal(false)
export const [importSuccessful, setImportStatus] = createSignal(false)

interface AutoRunCode {
  website: string
  code: string
}

export default function Settings() {
  const [tabName, setTabName] = createSignal('')
  const [tabIcon, setTabIcon] = createSignal('')

  const [panicKey, setPanicKey] = createSignal('')
  const [panicUrl, setPanicUrl] = createSignal('https://classroom.google.com/h')

  const [aboutBlank, setAboutBlank] = createSignal('disabled')
  const [autoRunCodes, setAutoRunCodes] = createSignal<AutoRunCode[]>(store.get('autoruncodes') || [])
  const [newWebsite, setNewWebsite] = createSignal('')
  const [newCode, setNewCode] = createSignal('')

  const [theme, setTheme] = createSignal('forest')

  const [debug, setDebug] = createSignal('disabled')
  
  const [devtools, setDevtools] = createSignal('disabled')

  const [transport, setTransport] = createSignal('epoxy')

  const [moreInfoTitle, setMoreInfoTitle] = createSignal('')
  const [moreInfoContent, setMoreInfoContent] = createSignal('')
  const [moreInfoVisibility, setMoreInfoVisiblity] = createSignal(false)

  let fileImport: HTMLInputElement
  let exportWarning: HTMLDialogElement
  let importWarning: HTMLDialogElement
  let deleteWarning: HTMLDialogElement
  let moreInfo: HTMLDialogElement

  onMount(() => {
    const tabData = store('tab') as TabData
    if (tabData.name) setTabName(tabData.name)
    if (tabData.icon) setTabIcon(tabData.icon)

    const panicData = store('panic') as PanicData
    if (panicData.key) setPanicKey(panicData.key)
    if (panicData.url) setPanicUrl(panicData.url)

    const aboutblankData = store('aboutblank') as AboutBlankData
    if (aboutblankData.enabled) {
      setAboutBlank('enabled')
    } else {
      setAboutBlank('disabled')
    }

    const themeData = store('theme') as ThemeData
    if (themeData.theme) setTheme(themeData.theme)

    const debugData = store('debug') as DebugData
    setDebug(debugData.enabled ? 'enabled' : 'disabled')

    const devtoolsData = store('devtools') as DevtoolsData
    setDevtools(devtoolsData.enabled ? 'enabled' : 'disabled')

    const transportData = store('transport') as TransportData
    if (transportData.transport) setTransport(transportData.transport)

    // Add default Auto-Run Code for pizzaedition.one if it doesn't exist
    const autoRunCodes = store.get('autoruncodes') as AutoRunCode[] || []
    // Remove any existing codes for pizzaedition.one
    const filteredCodes = autoRunCodes.filter(code => code.website !== 'https://pizzaedition.one/g/tag/')
    // Add the new code
    const newCodes = [...filteredCodes, {
      website: 'https://pizzaedition.one/g/tag/',
      code: `(function() {
  const oldIframe = document.querySelector("#embed-frame");

  if (oldIframe) {
    const newIframe = document.createElement("iframe");
    newIframe.id = "embed-frame";
    newIframe.src = "https://tag-game-vvjh.onrender.com/pizza.html";
    newIframe.style.width = oldIframe.style.width || "100%";
    newIframe.style.height = oldIframe.style.height || "100%";
    newIframe.style.border = "none";

    oldIframe.parentNode.replaceChild(newIframe, oldIframe);
    console.log("Iframe replaced successfully.");
  } else {
    console.warn("No element with ID 'embed-frame' found.");
  }
})();`
    }]
    store.set('autoruncodes', newCodes)
    setAutoRunCodes(newCodes)
  })

  function save() {
    store('tab', {
      name: tabName(),
      icon: tabIcon()
    })

    store('panic', {
      key: panicKey(),
      url: panicUrl()
    })

    store('aboutblank', {
      enabled: aboutBlank() === 'enabled'
    })

    store('theme', {
      theme: theme()
    })

    store('debug', {
      enabled: debug() === 'enabled'
    })

    store('devtools', {
      enabled: devtools() === 'enabled'
    })

    store('transport', {
      transport: transport()
    })

    handleTabCloak()
    handleDebug()
    handleTheme()
    handleTransport()

    toast.custom(() => {
      return (
        <div class="toast toast-center toast-top">
          <div class="alert alert-success w-80">
            <CircleCheck />
            <span>Settings saved.</span>
          </div>
        </div>
      )
    })
  }

  createEffect(() => {
    if (importSuccessful()) {
      importWarning.close()
    }

    if (exportSuccessful()) {
      exportWarning.close()
    }
  })

  createEffect(() => {
    if (moreInfoVisibility()) moreInfo.showModal()
  })

  function addAutoRunCode() {
    if (!newWebsite() || !newCode()) return

    const newCodes = [...autoRunCodes(), { website: newWebsite(), code: newCode() }]
    setAutoRunCodes(newCodes)
    store.set('autoruncodes', newCodes)
    setNewWebsite('')
    setNewCode('')
  }

  function removeAutoRunCode(index: number) {
    const newCodes = autoRunCodes().filter((_, i) => i !== index)
    setAutoRunCodes(newCodes)
    store.set('autoruncodes', newCodes)
  }

  return (
    <div class="flex flex-col items-center gap-4">
      <div class="box-border flex flex-wrap justify-center gap-6 pt-8">
        <div class="flex group relative w-80 flex-col items-center gap-4 rounded-box bg-base-200 p-4">
          <h1 class="text-2xl font-semibold">Cloaking</h1>
          <p class="text-xs">Change how Cocoa appears in your browser</p>
          <input type="text" class="input input-bordered w-full" value={tabName()} onInput={(e) => setTabName(e.target.value)} placeholder="Tab name" />
          <input type="text" class="input input-bordered w-full" value={tabIcon()} onInput={(e) => setTabIcon(e.target.value)} placeholder="Tab icon" />

          <span
            class="absolute top-2.5 right-2.5 text-base-content/50 opacity-0 group-hover:opacity-100 duration-150 cursor-pointer"
            onMouseDown={() => {
              setMoreInfoTitle('Tab Cloaking')
              setMoreInfoContent("Changing these settings change how the tab in your browser looks. You can make it look like Google Docs, Quizlet, or another learning site. The Tab Icon field requires an image URL - search one on Google and copy it's image address.")
              setMoreInfoVisiblity(true)
            }}
          >
            <CircleHelp class="h-5 w-5" />
          </span>
        </div>

        <div class="flex group relative w-80 flex-col items-center gap-4 rounded-box bg-base-200 p-4">
          <h1 class="text-2xl font-semibold">Panic Key</h1>
          <p class="text-center text-xs">Press a key to redirect to a URL (works in proxy)</p>
          <input type="text" class="input input-bordered w-full" value={panicKey()} onInput={(e) => setPanicKey(e.target.value)} placeholder="Panic key" />
          <input type="text" class="input input-bordered w-full" value={panicUrl()} onInput={(e) => setPanicUrl(e.target.value)} placeholder="Panic URL" />

          <span
            class="absolute top-2.5 right-2.5 text-base-content/50 opacity-0 group-hover:opacity-100 duration-150 cursor-pointer"
            onMouseDown={() => {
              setMoreInfoTitle('Panic Key')
              setMoreInfoContent("Set the Panic Key field to automatically redirect to a website when you press that key. It's useful for when teachers are coming and you need to quickly close Mocha. The panic button also works when you're browsing inside the proxy!")
              setMoreInfoVisiblity(true)
            }}
          >
            <CircleHelp class="h-5 w-5" />
          </span>
        </div>

        <div class="flex relative group w-80 flex-col items-center gap-4 rounded-box bg-base-200 p-4">
          <h1 class="text-2xl font-semibold">about:blank</h1>
          <p class="text-center text-xs">Open Mocha in an about:blank tab automatically</p>
          <select class="select select-bordered w-full max-w-xs" value={aboutBlank()} onChange={(e) => setAboutBlank(e.target.value)}>
            <option value="enabled">Enabled</option>
            <option value="disabled">Disabled</option>
          </select>

          <span
            class="absolute top-2.5 right-2.5 text-base-content/50 opacity-0 group-hover:opacity-100 duration-150 cursor-pointer"
            onMouseDown={() => {
              setMoreInfoTitle('about:blank')
              setMoreInfoContent("about:blank tabs don't show up in your history and appear as system pages or pages that are still loading. Enabling this setting enables Mocha to automatically launch inside one of these tabs, and Mocha won't show up in your history.")
              setMoreInfoVisiblity(true)
            }}
          >
            <CircleHelp class="h-5 w-5" />
          </span>
        </div>

        <div class="flex group relative w-80 flex-col items-center gap-4 rounded-box bg-base-200 p-4">
          <h1 class="text-2xl font-semibold">Theme</h1>
          <p class="text-center text-xs">Change the styling of Mocha's UI</p>
          <select class="select select-bordered w-full max-w-xs" value={theme()} onChange={(e) => setTheme(e.target.value)}>
            {themes.map((item, index) => {
              // biome-ignore lint: it doesn't accept a key for some reason
              return <option value={item}>{index === 0 ? 'Default' : item.charAt(0).toUpperCase() + item.slice(1)}</option>
            })}
          </select>

          <span
            class="absolute top-2.5 right-2.5 text-base-content/50 opacity-0 group-hover:opacity-100 duration-150 cursor-pointer"
            onMouseDown={() => {
              setMoreInfoTitle('Themes')
              setMoreInfoContent("It's simple - themes change the colors of Mocha's UI.")
              setMoreInfoVisiblity(true)
            }}
          >
            <CircleHelp class="h-5 w-5" />
          </span>
        </div>

        <div class="flex group relative w-80 flex-col items-center gap-4 rounded-box bg-base-200 p-4">
          <h1 class="text-2xl font-semibold">about:blank Opener</h1>
          <p class="text-center text-xs">Open current URL in an about:blank tab</p>
          <button
            class="btn btn-primary w-full" 
            type="button"
            onClick={() => {
              const currentUrl = window.location.href
              openAbWindow(currentUrl, false)
            }}
          >
            Open in about:blank
          </button>

          <span
            class="absolute top-2.5 right-2.5 text-base-content/50 opacity-0 group-hover:opacity-100 duration-150 cursor-pointer"
            onMouseDown={() => {
              setMoreInfoTitle('about:blank Opener')
              setMoreInfoContent('This button will open the current page in a new about:blank tab. This is useful for hiding your browsing activity as about:blank tabs don\'t show up in your browser history.')
              setMoreInfoVisiblity(true)
            }}
          >
            <CircleHelp class="h-5 w-5" />
          </span>
        </div>

        <div class="flex group relative w-80 flex-col items-center gap-4 rounded-box bg-base-200 p-4">
          <h1 class="text-2xl font-semibold">Storage</h1>
          <p class="text-center text-xs">Clear all stored data and settings</p>
          <button 
            class="btn btn-error w-full" 
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            Clear All Data
          </button>

          <span
            class="absolute top-2.5 right-2.5 text-base-content/50 opacity-0 group-hover:opacity-100 duration-150 cursor-pointer"
            onMouseDown={() => {
              setMoreInfoTitle('Clear Storage')
              setMoreInfoContent("This will clear all stored data including settings, bookmarks, and other preferences. The page will reload after clearing.")
              setMoreInfoVisiblity(true)
            }}
          >
            <CircleHelp class="h-5 w-5" />
          </span>
        </div>

        <div class="collapse collapse-arrow">
          <input type="checkbox" />
          <div class="collapse-title left-1/2 w-1/3 -translate-x-1/2 text-xl font-medium">Advanced</div>
          <div class="collapse-content mt-6">
            <div class="flex flex-wrap justify-center gap-6">
              <div class="flex group relative w-80 flex-col items-center gap-4 rounded-box bg-base-200 p-4">
                <h1 class="text-2xl font-semibold">Debug</h1>
                <p class="text-center text-xs">Enable Eruda devtools (helps with debugging)</p>
                <select class="select select-bordered w-full max-w-xs" value={debug()} onChange={(e) => setDebug(e.target.value)}>
                  <option value="enabled">Enabled</option>
                  <option value="disabled">Disabled</option>
                </select>

                <span
                  class="absolute top-2.5 right-2.5 text-base-content/50 opacity-0 group-hover:opacity-100 duration-150 cursor-pointer"
                  onMouseDown={() => {
                    setMoreInfoTitle('Debug Menu')
                    setMoreInfoContent("Enabling this enables the Eruda devtools menu. This puts a little wrench icon in the bottom right of your screen and can be used in conjunction with Mocha's dev team to diagnose issues, even when you don't have normal Chrome devtools enabled on your device.")
                    setMoreInfoVisiblity(true)
                  }}
                >
                  <CircleHelp class="h-5 w-5" />
                </span>
              </div>

              <div class="flex group relative w-80 flex-col items-center gap-4 rounded-box bg-base-200 p-4">
                <h1 class="text-2xl font-semibold">Proxy Devtools</h1>
                <p class="text-center text-xs">Enable a devtools option inside the proxy</p>
                <select class="select select-bordered w-full max-w-xs" value={devtools()} onChange={(e) => setDevtools(e.target.value)}>
                  <option value="enabled">Enabled</option>
                  <option value="disabled">Disabled</option>
                </select>

                <span
                  class="absolute top-2.5 right-2.5 text-base-content/50 opacity-0 group-hover:opacity-100 duration-150 cursor-pointer"
                  onMouseDown={() => {
                    setMoreInfoTitle('Proxy Devtools')
                    setMoreInfoContent('When enabled, a devtools button will appear on your browsing bar to open a devtools panel inside the proxy. This can be used to run JavaScript or inspect element on a proxied site.')
                    setMoreInfoVisiblity(true)
                  }}
                >
                  <CircleHelp class="h-5 w-5" />
                </span>
              </div>

              <div class="flex group relative w-80 flex-col items-center gap-4 rounded-box bg-base-200 p-4">
                <h1 class="text-2xl font-semibold">Transport</h1>
                <p class="text-center text-xs">Change how Mocha's proxy handles requests</p>
                <select class="select select-bordered w-full max-w-xs" value={transport()} onChange={(e) => setTransport(e.target.value)}>
                  <option value="epoxy">Epoxy</option>
                  <option value="libcurl">Libcurl</option>
                </select>

                <span
                  class="absolute top-2.5 right-2.5 text-base-content/50 opacity-0 group-hover:opacity-100 duration-150 cursor-pointer"
                  onMouseDown={() => {
                    setMoreInfoTitle('Transports')
                    setMoreInfoContent('Changing the transport changes how Mocha fetches proxied requests. Each transport has its own method of doing this - changing it may improve compatibility with sites.')
                    setMoreInfoVisiblity(true)
                  }}
                >
                  <CircleHelp class="h-5 w-5" />
                </span>
              </div>

              <div class="flex group relative w-80 flex-col items-center gap-4 rounded-box bg-base-200 p-4">
                <h1 class="text-2xl font-semibold">Auto-Run Code</h1>
                <p class="text-center text-xs">Add JavaScript code to automatically run on specific websites</p>
                
                <div class="flex flex-col gap-4 w-full">
                  {autoRunCodes().map((item, index) => (
                    <div class="card bg-base-300">
                      <div class="card-body p-4">
                        <div class="flex justify-between items-start">
                          <div class="flex items-center gap-2">
                            <Globe class="h-5 w-5" />
                            <span class="font-medium">{item.website}</span>
                          </div>
                          <button
                            class="btn btn-ghost btn-sm"
                            onClick={() => removeAutoRunCode(index)}
                          >
                            Remove
                          </button>
                        </div>
                        <div class="flex items-center gap-2 mt-2">
                          <Code class="h-4 w-4" />
                          <code class="text-sm opacity-70">{item.code}</code>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div class="flex flex-col gap-4 w-full">
                  <input
                    type="text"
                    class="input input-bordered w-full"
                    placeholder="Website URL (e.g. youtube.com)"
                    value={newWebsite()}
                    onInput={e => setNewWebsite(e.currentTarget.value)}
                  />

                  <textarea
                    class="textarea textarea-bordered h-24 font-mono"
                    placeholder="JavaScript code to run"
                    value={newCode()}
                    onInput={e => setNewCode(e.currentTarget.value)}
                  />

                  <button
                    class="btn btn-primary w-full"
                    onClick={addAutoRunCode}
                    disabled={!newWebsite() || !newCode()}
                  >
                    Add Auto-Run Code
                  </button>
                </div>

                <span
                  class="absolute top-2.5 right-2.5 text-base-content/50 opacity-0 group-hover:opacity-100 duration-150 cursor-pointer"
                  onMouseDown={() => {
                    setMoreInfoTitle('Auto-Run Code')
                    setMoreInfoContent('Add JavaScript code that will automatically run when you visit specific websites through the proxy. This can be used to customize websites or add features.')
                    setMoreInfoVisiblity(true)
                  }}
                >
                  <CircleHelp class="h-5 w-5" />
                </span>
              </div>

              <div class="flex group relative w-80 flex-col items-center gap-4 rounded-box bg-base-200 p-4">
                <h1 class="text-2xl font-semibold">Browsing Data</h1>
                <p class="text-center text-xs">Export, import, or delete your proxy browsing data</p>
                <div class="flex w-full gap-2">
                  <button class="btn btn-outline flex-1" type="button" onClick={() => exportWarning.showModal()}>
                    Export
                  </button>
                  <button class="btn btn-outline flex-1" type="button" onClick={() => importWarning.showModal()}>
                    Import
                  </button>
                </div>
                <button class="btn btn-error w-full" type="button" onClick={() => deleteWarning.showModal()}>
                  Delete
                </button>

                <input
                  type="file"
                  class="hidden"
                  ref={
                    // biome-ignore lint: needs to be here for Solid refs
                    fileImport!
                  }
                />

                <span
                  class="absolute top-2.5 right-2.5 text-base-content/50 opacity-0 group-hover:opacity-100 duration-150 cursor-pointer"
                  onMouseDown={() => {
                    setMoreInfoTitle('Browsing Data')
                    setMoreInfoContent(
                      "This section allows you to import or export Mocha's browsing data. This stores all of your logged in sites, history, and other data you would normally have in a typical browser into a single file. This means you can periodically download your browsing data and import it into a new Mocha link in case the one you're on now gets blocked. It's VERY IMPORTANT to know that you DO NOT SHARE this file with ANYONE."
                    )
                    setMoreInfoVisiblity(true)
                  }}
                >
                  <CircleHelp class="h-5 w-5" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-4 py-4">
        <button class="btn btn-primary px-16" type="button" onClick={save}>
          Save
        </button>
        <button
          class="btn btn-error px-16"
          type="button"
          onClick={() => {
            setTabIcon('')
            setTabName('')
            setPanicKey('')
            setPanicUrl('https://classroom.google.com/h')
            setAboutBlank('disabled')
            setTheme('forest')
            setDebug('disabled')
            save()
          }}
        >
          Reset
        </button>
      </div>

      <dialog
        class="modal"
        ref={
          // biome-ignore lint: needs to be here for Solid refs
          exportWarning!
        }
      >
        <div class="modal-box">
          <h3 class="text-lg font-bold">Continue with export?</h3>
          <p class="py-4">
            Warning! This file contains all the data that would normally be stored in your browser if you were to visit websites un-proxied on your computer. This includes any logins you used while inside the proxy. <span class="font-bold underline">Don't give this file to other people.</span>
          </p>
          <div class="modal-action flex gap-2">
            <button class="btn w-28" type="button" onClick={() => exportWarning.close()}>
              Cancel
            </button>
            <button class="btn btn-success w-28" type="button" onClick={exportData}>
              Proceed
            </button>
          </div>
        </div>
      </dialog>

      <dialog
        class="modal"
        ref={
          // biome-ignore lint: needs to be here for Solid refs
          importWarning!
        }
      >
        <div class="modal-box">
          <h3 class="text-lg font-bold">Current browsing data will be removed</h3>
          <p class="py-4">Warning! By proceeding, your proxy browsing data will be replaced by the imported data. This is irreversible. Continue?</p>
          <div class="modal-action flex gap-2">
            <button class="btn w-28" type="button" onClick={() => importWarning.close()}>
              Cancel
            </button>
            <button class="btn btn-error w-28" type="button" onClick={() => importData(fileImport)}>
              Proceed
            </button>
          </div>
        </div>
      </dialog>

      <dialog
        class="modal"
        ref={
          // biome-ignore lint: needs to be here for Solid refs
          deleteWarning!
        }
      >
        <div class="modal-box">
          <h3 class="text-lg font-bold">Current browsing data will be deleted</h3>
          <p class="py-4">Warning! By proceeding, your proxy browsing data will be wiped completely. This is irreversible. Continue?</p>
          <div class="modal-action">
            <form method="dialog" class="flex gap-2">
              <button class="btn w-28" type="submit">
                Cancel
              </button>
              <button class="btn btn-error w-28" type="button" onClick={() => resetData()}>
                Proceed
              </button>
            </form>
          </div>
        </div>
      </dialog>

      <dialog
        class="modal"
        ref={
          // biome-ignore lint: needs to be here for Solid refs
          moreInfo!
        }
      >
        <div class="modal-box">
          <h3 class="text-lg font-bold">{moreInfoTitle()}</h3>
          <p class="py-4">{moreInfoContent()}</p>
          <div class="modal-action">
            <form method="dialog" class="flex gap-2">
              <button
                class="btn w-28"
                type="submit"
                onClick={() => {
                  setMoreInfoVisiblity(false)
                  setMoreInfoTitle('')
                  setMoreInfoContent('')
                }}
              >
                Got it
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}
