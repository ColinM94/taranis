import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
  }
}

declare module '*module.scss' {
  const content: Record<string, string>
  export default content
}
