type Option<T> = {
  label: string
  value: T
}

export interface InputOptionsProps<T> {
  options: Option<T>[]
  value: T
  setValue: (value: T) => void
  label?: string
  className?: string
}
