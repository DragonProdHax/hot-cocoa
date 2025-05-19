import { Router, Route, Navigate } from '@solidjs/router'
import { Show } from 'solid-js'
import { AuthProvider, useAuth } from './lib/auth'
import Account from './routes/account'
import Settings from './routes/settings'
import RoutePage from './routes/route'

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