import { Router, Route, Navigate } from '@solidjs/router'
import { Show } from 'solid-js'
import { AuthProvider, useAuth } from './lib/auth'
import Account from './routes/account'
import Settings from './routes/settings'
import RoutePage from './routes/route'
import Stats from './routes/stats'

function ProtectedRoute(props: { children: any }) {
  const { session } = useAuth()
  
  return (
    <Show
      when={session().user}
      fallback={<Navigate href="/account" />}
    >
      {props.children}
    </Show>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Route path="/account" component={Account} />
        <Route path="/settings" component={Settings} />
        <Route
          path="/tools"
          component={() => (
            <ProtectedRoute>
              <div class="container mx-auto">
                <Stats />
              </div>
            </ProtectedRoute>
          )}
        />
        <Route
          path="/*"
          component={() => (
            <ProtectedRoute>
              <RoutePage />
            </ProtectedRoute>
          )}
        />
      </Router>
    </AuthProvider>
  )
} 