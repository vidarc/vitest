import type { Arrayable, DeepMerge, Nullable } from '../types'

export function notNullish<T>(v: T | null | undefined): v is NonNullable<T> {
  return v != null
}

export function slash(str: string) {
  return str.replace(/\\/g, '/')
}

export function mergeSlashes(str: string) {
  return str.replace(/\/\//g, '/')
}

export const noop = () => { }

export function clone<T>(val: T): T {
  let k: any, out: any, tmp: any

  if (Array.isArray(val)) {
    out = Array(k = val.length)
    while (k--)
      // eslint-disable-next-line no-cond-assign
      out[k] = (tmp = val[k]) && typeof tmp === 'object' ? clone(tmp) : tmp
    return out as any
  }

  if (Object.prototype.toString.call(val) === '[object Object]') {
    out = {} // null
    for (k in val) {
      if (k === '__proto__') {
        Object.defineProperty(out, k, {
          value: clone((val as any)[k]),
          configurable: true,
          enumerable: true,
          writable: true,
        })
      }
      else {
        // eslint-disable-next-line no-cond-assign
        out[k] = (tmp = (val as any)[k]) && typeof tmp === 'object' ? clone(tmp) : tmp
      }
    }
    return out
  }

  return val
}
/**
 * Convert `Arrayable<T>` to `Array<T>`
 *
 * @category Array
 */

export function toArray<T>(array?: Nullable<Arrayable<T>>): Array<T> {
  array = array || []
  if (Array.isArray(array))
    return array
  return [array]
}

export const toString = (v: any) => Object.prototype.toString.call(v)
export const isPlainObject = (val: any): val is object => toString(val) === '[object Object]'

export function isObject(item: unknown): boolean {
  return item != null && typeof item === 'object' && !Array.isArray(item)
}

/**
 * Deep merge :P
 *
 * Will merge objects only if they are plain
 */
export function deepMerge<T extends object = object, S extends object = T>(target: T, ...sources: S[]): DeepMerge<T, S> {
  if (!sources.length)
    return target as any

  const source = sources.shift()
  if (source === undefined)
    return target as any

  if (isMergableObject(target) && isMergableObject(source)) {
    (Object.keys(source) as (keyof S & keyof T)[]).forEach((key) => {
      if (isMergableObject(source[key])) {
        if (!target[key])
          target[key] = {} as any

        deepMerge(target[key] as any, source[key] as any)
      }
      else if (Array.isArray(source[key])) {
        if (!target[key])
          target[key] = [] as any

        (target[key] as any).push(...source[key] as any)
      }
      else {
        target[key] = source[key] as any
      }
    })
  }

  return deepMerge(target, ...sources)
}

function isMergableObject(item: any): item is Object {
  return isPlainObject(item) && !Array.isArray(item)
}
