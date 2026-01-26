import mgmt from "/Users/dalin/fantula/nuxt-frontend/layouts/mgmt.vue";
import mobile from "/Users/dalin/fantula/nuxt-frontend/layouts/mobile.vue";
import pc from "/Users/dalin/fantula/nuxt-frontend/layouts/pc.vue";
import type { ComputedRef, MaybeRef } from 'vue'
declare module 'nuxt/app' {
  interface NuxtLayouts {
    'mgmt': InstanceType<typeof mgmt>['$props'],
    'mobile': InstanceType<typeof mobile>['$props'],
    'pc': InstanceType<typeof pc>['$props'],
}
  export type LayoutKey = keyof NuxtLayouts extends never ? string : keyof NuxtLayouts
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}