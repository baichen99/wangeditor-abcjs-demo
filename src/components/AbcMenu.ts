import type { IButtonMenu, IDomEditor } from '@wangeditor/editor'

export class AbcMenu implements IButtonMenu {
  readonly title = 'ABC'
  readonly iconSvg = '<svg viewBox="0 0 1024 1024" width="20" height="20"><text x="0" y="750" font-size="750">𝄞</text></svg>'
  readonly tag = 'button'
  private showModal: () => void
  constructor(showModal: () => void) {
    this.showModal = showModal
  }
  getValue(_editor: IDomEditor): string | boolean {
    return ''
  }
  isActive(_editor: IDomEditor): boolean {
    return false
  }
  isDisabled(_editor: IDomEditor): boolean {
    return false
  }
  exec(_editor: IDomEditor, _value: string | boolean): void {
    this.showModal()
  }
}
