// stores/auth.ts
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as null | {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      language?:string | 'en'
      provider?: string
      userType?: string
      roles?: Array<{
        context: string
        contextId: string
        role: string
      }>
    },
    currentContext: null as null | {
      context: string
      contextId: string
    }
  }),

  actions: {
    setUser(sessionUser: any) {
      this.user = {...sessionUser}
    },
    clearUser() {
      this.user = null
      this.currentContext = null
    },
    switchContext(context: string, contextId: string) {
      this.currentContext = { context, contextId }
    },
    hasAccess(requiredRole: string, context?: string, contextId?: string): boolean {
      if (!this.user || !this.user.roles) return false;
      const currentContext = context && contextId ? { context, contextId } : this.currentContext;
      if (!currentContext) return false;
      return this.user.roles.some(role =>
        role.context === currentContext.context &&
        role.contextId === currentContext.contextId &&
        role.role === requiredRole
      );
    }
  }
})
