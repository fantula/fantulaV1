import type { ComputedRef, MaybeRef } from 'vue'

type ComponentProps<T> = T extends new(...args: any) => { $props: infer P } ? NonNullable<P>
  : T extends (props: infer P, ...args: any) => any ? P
  : {}

declare module 'nuxt/app' {
  interface NuxtLayouts {
    mgmt: ComponentProps<typeof import("/Users/dalin/fantula/nuxt-frontend/layouts/mgmt.vue").default>,
    mobile: ComponentProps<typeof import("/Users/dalin/fantula/nuxt-frontend/layouts/mobile.vue").default>,
    pc: ComponentProps<typeof import("/Users/dalin/fantula/nuxt-frontend/layouts/pc.vue").default>,
}
  export type LayoutKey = keyof NuxtLayouts extends never ? string : keyof NuxtLayouts
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}