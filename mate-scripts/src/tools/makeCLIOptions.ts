export function makeCLIOptions(options: Record<string, any>) {
  return Object.entries(options)
    .filter(([, value]) => (
      typeof value === 'boolean'
        ? value
        : true
    ))
    .reduce((acc, [key, value]) => (
      `${acc} --${key}${typeof value === 'boolean'
        ? ''
        : ` ${value}`}`
    ), '');
}
