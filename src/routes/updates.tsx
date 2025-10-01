import { createSignal } from 'solid-js'

export default function Updates() {
  return (
    <div class="flex flex-col items-center gap-8 p-8">
      <div class="flex flex-col items-center gap-4">
        <h1 class="text-4xl font-bold">Release 3.0</h1>
        <p class="text-lg opacity-70">3.0 Update</p>
      </div>

      <div class="flex flex-col items-center gap-4 max-w-2xl">
        <h2 class="text-2xl font-semibold">What's New</h2>
        <div class="flex flex-col gap-4 w-full">
          <div class="collapse collapse-arrow bg-base-200">
            <input type="checkbox" />
            <div class="collapse-title text-xl font-medium">New Features</div>
            <div class="collapse-content">
              <ul class="list-disc list-inside space-y-2">
                <li>Better UI - Cleaner, more modern interface</li>
                <li>YouTube - Coming soon page added</li>
                <li>Better Cloaking - Now disguised as Google Classroom</li>
              </ul>
            </div>
          </div>

          <div class="collapse collapse-arrow bg-base-200">
            <input type="checkbox" />
            <div class="collapse-title text-xl font-medium">Improvements</div>
            <div class="collapse-content">
              <ul class="list-disc list-inside space-y-2">
                <li>Removed laggy 3D background effects for better performance</li>
                <li>Consistent dark theme across all pages</li>
                <li>Simplified navigation system</li>
                <li>Changed Proxy to Pr0xy branding</li>
              </ul>
            </div>
          </div>

          <div class="collapse collapse-arrow bg-base-200">
            <input type="checkbox" />
            <div class="collapse-title text-xl font-medium">Current Issues</div>
            <div class="collapse-content">
              <ul class="list-disc list-inside space-y-2">
                <li>Kodub - Currently not working</li>
                <li>GitHub - Currently not working</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 