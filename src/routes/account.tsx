import { createSignal, Show } from 'solid-js'
import { useAuth } from '../lib/auth'
import { A } from '@solidjs/router'
import type { User } from '../lib/supabase'

export default function Account() {
  const { session, signIn, signUp, signOut } = useAuth()
  const [isSignUp, setIsSignUp] = createSignal(false)
  const [email, setEmail] = createSignal('')
  const [password, setPassword] = createSignal('')
  const [username, setUsername] = createSignal('')
  const [error, setError] = createSignal('')

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    setError('')
    
    try {
      if (isSignUp()) {
        await signUp(email(), password(), username())
      } else {
        await signIn(email(), password())
      }
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div class="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {isSignUp() ? 'Create your account' : 'Sign in to your account'}
        </h2>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Show
            when={session().user}
            fallback={
              <>
                <form class="space-y-6" onSubmit={handleSubmit}>
                  <Show when={isSignUp()}>
                    <div>
                      <label for="username" class="block text-sm font-medium text-gray-700">
                        Username
                      </label>
                      <div class="mt-1">
                        <input
                          id="username"
                          name="username"
                          type="text"
                          required
                          value={username()}
                          onInput={(e) => setUsername(e.currentTarget.value)}
                          class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </Show>

                  <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <div class="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={email()}
                        onInput={(e) => setEmail(e.currentTarget.value)}
                        class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label for="password" class="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div class="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        value={password()}
                        onInput={(e) => setPassword(e.currentTarget.value)}
                        class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <Show when={error()}>
                    <div class="rounded-md bg-red-50 p-4">
                      <div class="flex">
                        <div class="ml-3">
                          <h3 class="text-sm font-medium text-red-800">{error()}</h3>
                        </div>
                      </div>
                    </div>
                  </Show>

                  <div>
                    <button
                      type="submit"
                      class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {isSignUp() ? 'Sign up' : 'Sign in'}
                    </button>
                  </div>
                </form>

                <div class="mt-6">
                  <div class="relative">
                    <div class="relative flex justify-center text-sm">
                      <button
                        type="button"
                        onClick={() => setIsSignUp(!isSignUp())}
                        class="text-indigo-600 hover:text-indigo-500"
                      >
                        {isSignUp() ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                      </button>
                    </div>
                  </div>
                </div>
              </>
            }
          >
            <div class="text-center">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Welcome, {session().user?.user_metadata?.username || 'User'}!
              </h3>
              <div class="mt-2 text-sm text-gray-500">
                <p>You are signed in as {session().user?.email}</p>
              </div>
              <div class="mt-5">
                <button
                  onClick={() => signOut()}
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Sign out
                </button>
              </div>
            </div>
          </Show>
        </div>
      </div>
    </div>
  )
} 