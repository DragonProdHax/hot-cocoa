export default function MikeIkes() {
  const launchMikeAndIkes = () => {
    const newWindow = window.open('about:blank', '_blank');
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Mike And Ikes</title>
        <style>
          body { margin: 0; padding: 0; }
          iframe { width: 100vw; height: 100vh; border: none; }
        </style>
      </head>
      <body>
        <iframe src="https://mike-ikes.onrender.com/" frameborder="0"></iframe>
      </body>
      </html>
    `;
    newWindow?.document.write(htmlContent);
    newWindow?.document.close();
  };

  return (
    <div class="absolute left-1/2 top-1/2 flex w-screen -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-6">
      <div class="flex items-center gap-4 mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="h-16 w-16 text-red-500">
          <title>YouTube</title>
          <path
            fill="currentColor"
            d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"
          />
        </svg>
        <h1 class="text-6xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">Mike And Ikes</h1>
      </div>
      
      <div class="card bg-base-100/80 backdrop-blur-sm shadow-2xl border border-red-500/20 p-8 max-w-md w-full">
        <div class="card-body items-center text-center">
          <h2 class="card-title text-3xl mb-4 text-red-500">YouTube Watcher</h2>
          <p class="text-lg opacity-80 mb-6">Watch YouTube videos</p>
          
          <div class="card-actions">
            <button
              onClick={launchMikeAndIkes}
              class="btn btn-error btn-lg gap-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="h-5 w-5">
                <path
                  fill="currentColor"
                  d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"
                />
              </svg>
              Launch Mike And Ikes
            </button>
          </div>
          
          <div class="mt-4 text-sm opacity-60">
          </div>
        </div>
      </div>
    </div>
  )
}
