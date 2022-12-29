import { InjectionKey, Ref } from 'vue'

export const menuButtonInfoKey: InjectionKey<
  Ref<UniApp.GetMenuButtonBoundingClientRectRes | undefined>
> = Symbol('menuButtonInfo')
